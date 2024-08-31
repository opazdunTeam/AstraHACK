import sqlite3
import hashlib
import json


class SQLdb():
    def __init__(self) -> None:
        self.con = sqlite3.connect("zkt.db")
        self.cur = self.con.cursor()
        try:
            self.cur.execute("""CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,  
                    username TEXT, 
                    password TEXT,
                    chats JSON)
                """)
            
            chats = json.dumps([
                { "name": 'Андрей Беляев', "id": 1, "avatar": 'https://i.pinimg.com/originals/96/85/73/968573016b60734245728f7845b2ae80.jpg', "messages": [] },
                { "name": 'Александр Жданов', "id": 2, "avatar": 'https://otzz.ru/wp-content/uploads/2023/11/kuplinov-avatar-1.webp', "messages": [] },
            ])

            password = "123456789"
            password = password.encode()
            password = hashlib.sha256(password).hexdigest()

            self.cur.execute("INSERT INTO users(username, password, chats) VALUES(?, ?, ?)", ("admin", password, chats))

            self.con.commit()
        except:
            ...


    def authorization_user(self, username: str, password: str) -> bool:
        password = password.encode()
        password = hashlib.sha256(password).hexdigest()

        self.cur.execute("SELECT * FROM users WHERE username = ? and password = ?", (username, password))
        res = self.cur.fetchall()

        if res == []:
            return False
        else:
            return True


    def check_user(self, username: str) -> bool:
        self.cur.execute("SELECT * FROM users WHERE username = ?", (username,))
        res = self.cur.fetchall()

        if res == []:
            return False
        else:
            return True



    def add_user(self, username: str, password: str) -> bool:
        password = password.encode()
        password = hashlib.sha256(password).hexdigest()
        self.cur.execute("INSERT INTO users(username, password, chats) VALUES(?, ?, ?)", (username, password, json.dumps({})))
        
        self.con.commit()

        return True
    

    def get_chats(self, username: str) -> json:
        self.cur.execute("SELECT chats FROM users WHERE username = ?", (username,))
        res = self.cur.fetchall()

        return json.loads(res[0][0])
    

    def search_global_chats(self, query: str) -> list:
        search_term = f"%{query}%"  # Создаем строку с подстановкой для LIKE
        self.cur.execute("""
            SELECT json_extract(value, '$.id'), json_extract(value, '$.name'), json_extract(value, '$.avatar'), json_extract(value, '$.messages')
            FROM users, json_each(users.chats) 
            WHERE json_extract(value, '$.name') LIKE ?
        """, (search_term,))
        res = self.cur.fetchall()
        res = [{"id": i[0], "name": i[1], "avatar": i[2], "message": i[3]} for i in res]

        return res

    

    # def add_chats(self, username: str, message)
    