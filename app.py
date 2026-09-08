from dotenv import load_dotenv
load_dotenv()
import authenticate  # Import your authentication module
from authenticate import app, Flask, url_for, session, render_template, redirect, oauth
import sqlite3 as sqlite
import db_handler

@app.route("/")
def home():
    return render_template("mailsense.html")

@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/auth/callback')
def auth():
    token = oauth.google.authorize_access_token()
    session['user'] = token['userinfo']

    google_sub = token['userinfo']['sub']
    email = token['userinfo']['email']
    name = token['userinfo']['name']
    picture_url = token['userinfo']['picture']
    access_token = token['access_token']
    refresh_token = token.get('refresh_token')
    token_expiry = token['expires_at']

    # Insert or update user in the database
    user_id = db_handler.insert_user(
        google_sub, email, name, picture_url, access_token, refresh_token, token_expiry
    )

    session['user_id'] = user_id
    return redirect(url_for('dashboard'))


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')  # Redirect to the dashboard after logout


@app.route("/dashboard")
def dashboard():
    return render_template("index.html", name = session['user']['name'], email = session['user']['email'], picture_url = session['user']['picture'])


if __name__ == "__main__":
    db_handler.create_table()  # Ensure the users table is created before running the app
    app.run(debug=True)