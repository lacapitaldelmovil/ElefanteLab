#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

os.chdir('/home/runner/workspace')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Available pages:")
    for f in sorted([f for f in os.listdir('.') if f.endswith('.html')]):
        print(f"  - {f}")
    httpd.serve_forever()