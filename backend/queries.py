import sqlite3

# Connect to a new database file (or overwrite if exists)
conn = sqlite3.connect("memoir.db")
cursor = conn.cursor()

# Create Biodata table
cursor.execute("""
SELECT * FROM BIODATA;
""")

for row in cursor:
    print(row)

