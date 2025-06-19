import http.server
import socketserver
import webbrowser
import threading

PORT = 5173
Directory = "/home/runner/workspace"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=Directory, **kwargs)

with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
    print(f"Elefante Lab website running on port {PORT}")
    httpd.serve_forever()