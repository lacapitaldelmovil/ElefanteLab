#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = int(os.environ.get('PORT', 3000))

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# Change to project directory
os.chdir('/home/runner/workspace')

# Verify files exist
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print(f"Starting Elefante Lab server on port {PORT}")
print(f"Serving {len(html_files)} HTML files")

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped")
    sys.exit(0)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)