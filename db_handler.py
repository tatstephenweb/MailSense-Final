from datetime import datetime
import sqlite3 as sqlite

#Datebase creation with SQLite
def get_connection(db_name):
    try:
        return sqlite.connect(db_name)
    except Exception as e:
        print(f"Error: {e}")
        return None


def create_users_table():
    conn = get_connection("mailsense.db")
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    google_sub TEXT NOT NULL UNIQUE,
                    picture_url TEXT,
                    access_token TEXT,
                    refresh_token TEXT,
                    token_expiry DATETIME,
                    last_history_id TEXT,
                    last_synced_at DATETIME,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
            print("Table 'users' created successfully.")
        except Exception as e:
            print(f"Error: {e}")
        conn.close()

def insert_user(google_sub, email, name, picture_url, access_token, refresh_token, token_expiry):
    conn = get_connection("mailsense.db")
    if conn:
        cursor = conn.cursor()
        try:
            account_exists_query = "SELECT * FROM users WHERE google_sub = ?"
            account_exists = cursor.execute(account_exists_query, (google_sub,)).fetchone()
            if account_exists: #CHECK IF THE USER ALREADY EXIXTS IN THE DATABASE
                print(f"User with Google sub {google_sub} already exists.")
                #Updating the existing user's tokens and expiry
                cursor.execute("UPDATE users SET access_token = ?, refresh_token = ?, token_expiry = ? WHERE google_sub = ?",
                               (access_token, refresh_token, token_expiry, google_sub))
            else:
                #Inserting a new user into the database if he does not exist
                cursor.execute('''
                    INSERT INTO users (google_sub, email, name, picture_url, access_token, refresh_token, token_expiry)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (google_sub, email, name, picture_url, access_token, refresh_token, token_expiry))
                conn.commit()
                print(f"User {email} inserted successfully.")

        except Exception as e:
            print(f"Error: {e}")
        conn.close()

def create_emails_table():
    conn = get_connection("mailsense.db")
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS emails (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    email_id TEXT NOT NULL UNIQUE,
                    subject TEXT,
                    sender TEXT,
                    snippet TEXT,
                    priority TEXT,
                    status TEXT,
                    deadline DATETIME,
                    received_at DATETIME,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            ''')
            conn.commit()
            print("Table 'emails' created successfully.")
        except Exception as e:
            print(f"Error: {e}")
        conn.close()

def insert_email(user_id, email_id, subject, sender, snippet, priority, status, deadline, received_at):
    conn = get_connection("mailsense.db")
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute('''
                INSERT INTO emails (user_id, email_id, subject, sender, snippet, priority, status, deadline, received_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (user_id, email_id, subject, sender, snippet, priority, status, deadline, received_at))
            conn.commit()
            print(f"Email {email_id} inserted successfully.")
        except Exception as e:
            print(f"Error: {e}")
        conn.close()
        

if __name__ == "__main__":
    #insert emails for testing, 10 email addresses all starting with different letters of the alphabet and having priority levels of 'high', 'medium', or 'low'.
 

    #add ten more emails with but longer subject lines and snippets

    #add to letter z with longer subject lines and snippets
    
    #add numbers instead of letters for the email addresses and subject lines and snippets
    insert_email(1, '12', 'Your invoice #4482 is ready for review', 'billing@northgate-supplies.com', "Hi there, your latest invoice has been generated and is now attached to this email for your review. The total amount due is $1,240.50, with payment due within 15 business days of receipt. Please double-check the itemized charges and shipping details listed on page two, and don't hesitate to reach out to our billing team if anything looks off or if you'd like to set up a payment plan...", 'high', 'active', None, None)
   