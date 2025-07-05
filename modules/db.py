import sqlite3
import os

DB_NAME = os.path.abspath("./data/NoteBook.db")
os.makedirs(os.path.dirname(DB_NAME), exist_ok=True)

def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_NAME)
    conn.execute("PRAGMA foreign_keys = ON;")  # Ensure cascading works
    return conn

def init_db():
    """Initializes the 'nodes' table."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS nodes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                is_file BOOLEAN NOT NULL,
                parent_id INTEGER,
                content TEXT,
                FOREIGN KEY (parent_id) REFERENCES nodes(id) ON DELETE CASCADE
            );
        """)
        conn.commit()

# ✅ 1. Add file or folder
def add_node(name: str, is_file: bool, parent_id: int = None, content: str = "") -> int:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO nodes (name, is_file, parent_id, content)
            VALUES (?, ?, ?, ?)
        """, (name, is_file, parent_id, content if is_file else ""))
        conn.commit()
        return cursor.lastrowid

# ✅ 2. Update file or folder (name and content)
def update_node(node_id: int, name: str, content: str):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE nodes SET name = ?, content = ? WHERE id = ?
        """, (name, content, node_id))
        conn.commit()

# ✅ 3. Delete node (and all its children if folder)
def delete_node(node_id: int):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM nodes WHERE id = ?", (node_id,))
        conn.commit()

# ✅ 4. Optional: Get all nodes under a parent (e.g., for rendering a folder)
def get_children(parent_id: int = None) -> list[dict]:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, is_file, parent_id, content FROM nodes WHERE parent_id IS ?", (parent_id,))
        rows = cursor.fetchall()
        return [
            {"id": row[0], "name": row[1], "is_file": bool(row[2]), "parent_id": row[3], "content": row[4]}
            for row in rows
        ]
