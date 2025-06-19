#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 3000
os.chdir('/home/runner/workspace')

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def log_message(self, format, *args):
        print(f"Serving: {self.path}")

with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
    print(f"Elefante Lab website running on http://0.0.0.0:{PORT}")
    print("Files available:")
    for f in os.listdir('.'):
        if f.endswith('.html'):
            print(f"  - {f}")
    httpd.serve_forever()