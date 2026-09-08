from dotenv import load_dotenv
load_dotenv()
import authenticate  # Import your authentication module
from authenticate import app, Flask, url_for, session, render_template, redirect, oauth

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
    return redirect(url_for('dashboard'))


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')  # Redirect to the dashboard after logout


@app.route("/dashboard")
def dashboard():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)