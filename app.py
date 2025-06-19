from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_files(filename):
    if filename.endswith('.html'):
        return send_file(filename)
    elif filename.endswith('.css'):
        return send_file(filename, mimetype='text/css')
    elif filename.endswith('.js'):
        return send_file(filename, mimetype='application/javascript')
    else:
        return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)