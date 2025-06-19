import http.server
import socketserver
import os

PORT = 8080
os.chdir('/home/runner/workspace')

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("0.0.0.0", PORT), MyHandler) as httpd:
    print(f"Elefante Lab server running on port {PORT}")
    print(f"Access: http://0.0.0.0:{PORT}")
    httpd.serve_forever()