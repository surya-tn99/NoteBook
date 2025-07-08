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

def add_node(name: str, is_file: bool, parent_id: int = None, content: str = "") -> int:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO nodes (name, is_file, parent_id, content)
            VALUES (?, ?, ?, ?)
        """, (name, is_file, parent_id, content if is_file else ""))
        conn.commit()
        return cursor.lastrowid

def delete_node(node_id: int):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM nodes WHERE id = ?", (node_id,))
        conn.commit()
