import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 3000))
os.chdir('/home/runner/workspace')

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Server running on port {PORT}")
    httpd.serve_forever()