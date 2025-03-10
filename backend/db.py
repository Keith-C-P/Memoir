import sqlite3

# Connect to a new database file (or overwrite if exists)
conn = sqlite3.connect("memoir.db")
cursor = conn.cursor()

class database_connector:
    def __init__(self):
        self.conn = sqlite3.connect("memoir.db")
        
    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Biodata (
            pid TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            relation_to_patient TEXT,
            pfp_path TEXT,
            dir_path TEXT
        )
        """)
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Transcripts (
            conv_id TEXT PRIMARY KEY,
            pid TEXT NOT NULL,
            time_of_convo TEXT,
            raw_transcript TEXT,
            summarised_convo TEXT,
            FOREIGN KEY (pid) REFERENCES Biodata(pid)
        )
        """)
        self.conn.commit()
        
    def insert_mock(self):
        cursor = self.conn.cursor()
        cursor.executemany("""
        INSERT INTO Biodata (pid, name, relation_to_patient, pfp_path, dir_path) VALUES (?, ?, ?, ?, ?)
        """, [
            ("001", "Shashvat", "Friend", "frontend/public/assets/pfps/001.jpg", "frontend/public/assets/txts/001.txt"),
            ("002", "Kironmoy", "Friend", "frontend/public/assets/pfps/002.jpg", "frontend/public/assets/txts/002.txt"),
            ("003", "Sheerin", "Friend", "frontend/public/assets/pfps/003.jpg", "frontend/public/assets/txts/003.txt"),
            ("004", "Keith", "Friend", "frontend/public/assets/pfps/004.jpg", "frontend/public/assets/txts/004.txt"),
            
        ])

        cursor.executemany("""
        INSERT INTO Transcripts (conv_id, pid, time_of_convo, raw_transcript, summarised_convo) VALUES (?, ?, ?, ?, ?)
        """, [
            ("conv001", "001", "2024-12-01 10:00", "/transcripts/conv001.txt", "Talked about groceries."),
            ("conv002", "002", "2024-12-02 14:00", "/transcripts/conv002.txt", "Discussed football match."),
        ])
        
        self.conn.commit()
    
    def get_biodata(self,pid):
        cursor = self.conn.cursor()
        cursor.execute(f"""SELECT * FROM Biodata WHERE pid = ?; """, (pid,))
        row = cursor.fetchone()
        return (row[1:4])
    
    def get_time_convo(self,pid):
        cursor = self.conn.cursor()
        cursor.execute(f"""SELECT * FROM Transcripts WHERE pid = ? ORDER BY time_of_convo DESC LIMIT 1""",(pid,))
        row = cursor.fetchone()
        return (row[2],row[4])
    
    def get_card_info(self,pid):
        a = self.get_biodata(pid)
        a += self.get_time_convo(pid)       
        return a
        
if __name__ == "__main__":
    conn = database_connector()
    print(conn.get_card_info("001"))
    
        


