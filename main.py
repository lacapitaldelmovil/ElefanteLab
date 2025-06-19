import http.server
import socketserver
import os

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

os.chdir('/home/runner/workspace')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Elefante Lab serving at port {PORT}")
    httpd.serve_forever()