import http.server
import socketserver
import os

os.chdir('/home/runner/workspace')
PORT = 3000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Server running on port {PORT}")
    httpd.serve_forever()