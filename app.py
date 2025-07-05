from flask import Flask, request, jsonify, send_from_directory, abort
from modules.db import init_db, add_node, update_node, delete_node, get_connection
import os

app = Flask(__name__)
init_db()

# Serve main directory
@app.route('/')
def index():
    return send_from_directory('./FrontEnd/html', 'directory.html')

# Serve dynamic HTML pages like editNotes.html, viewNotes.html
@app.route('/<filename>.html')
def serve_html_file(filename):
    path = os.path.join('./FrontEnd/html', f'{filename}.html')
    if os.path.exists(path):
        return send_from_directory('./FrontEnd/html', f'{filename}.html')
    else:
        abort(404)

# Return a single note and its children
@app.route('/tree', methods=['GET'])
def get_tree():
    node_id = request.args.get('id', type=int)

    if node_id is not None:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM nodes WHERE id = ?", (node_id,))
            row = cursor.fetchone()
            if not row:
                return jsonify({"error": "Node not found"}), 404

            node = {
                "id": row[0],
                "name": row[1],
                "is_file": bool(row[2]),
                "parent_id": row[3],
                "content": row[4]
            }

            children = []
            if not node["is_file"]:
                cursor.execute("SELECT * FROM nodes WHERE parent_id = ?", (node_id,))
                children = [
                    {
                        "id": r[0],
                        "name": r[1],
                        "is_file": bool(r[2]),
                        "parent_id": r[3],
                        "content": r[4]
                    }
                    for r in cursor.fetchall()
                ]

            return jsonify({"node": node, "children": children})

    return send_from_directory('./FrontEnd/html', 'directory.html')

# For deep links like /tree/folder1/folder2
@app.route('/tree/<path:subpath>')
def serve_tree_deep(subpath):
    return send_from_directory('./FrontEnd/html', 'directory.html')

# Add a new node (file or folder)
@app.route('/tree/add', methods=['POST'])
def add_node_api():
    data = request.get_json()
    name = data.get('name')
    is_file = data.get('is_file')
    parent_id = data.get('parent_id')
    content = data.get('content', "")

    if name is None or is_file is None:
        return jsonify({"error": "Missing required fields"}), 400

    new_id = add_node(name=name, is_file=is_file, parent_id=parent_id, content=content)
    return jsonify({"message": "Node added", "id": new_id})

# Update note content and name
@app.route('/tree/update', methods=['PUT'])
def update_note():
    data = request.get_json()
    note_id = data.get('id')
    new_name = data.get('name')
    new_content = data.get('content')

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE nodes SET name=?, content=? WHERE id=?", (new_name, new_content, note_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True})

# Delete a node
@app.route('/tree/delete', methods=['DELETE'])
def delete_node_api():
    data = request.get_json()
    node_id = data.get('id')
    if node_id is None:
        return jsonify({"error": "Missing id"}), 400

    delete_node(node_id)
    return jsonify({"message": "Node deleted"})

# Get note content by ID
@app.route("/tree/note")
def get_note():
    note_id = request.args.get("id", type=int)
    if not note_id:
        return jsonify({"error": "Missing ID"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, content FROM nodes WHERE id=? AND is_file=1", (note_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify({"id": row[0], "name": row[1], "content": row[2] or ""})
    return jsonify({"error": "Note not found"}), 404

# Serve viewNotes page
@app.route("/tree/<path:subpath>/$view")
def view_note_page(subpath):
    return send_from_directory('./FrontEnd/html', 'viewNotes.html')

if __name__ == '__main__':
    app.run(debug=True)
