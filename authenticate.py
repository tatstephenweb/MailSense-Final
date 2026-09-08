from flask import Flask, url_for, session
from flask import render_template, redirect
import os
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.secret_key = os.getenv("mailsense_secret_key")

GOOGLE_SCOPES = " ".join([
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/gmail.readonly",
])

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

oauth = OAuth(app)# or oauth = OAuth(app) if you have an app context
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url=CONF_URL,
    client_kwargs={
        "scope": GOOGLE_SCOPES
    }
)