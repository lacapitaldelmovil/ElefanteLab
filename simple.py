#!/usr/bin/env python3
import http.server
import socketserver
import os

os.chdir('/home/runner/workspace')

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

PORT = 8080
print(f"Iniciando servidor en puerto {PORT}")
print("URL: ef4d5500-beb9-48fc-9f24-4533632449e7-00-3h3qn40nzrj3r.worf.replit.dev")

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    httpd.allow_reuse_address = True
    print("SERVIDOR FUNCIONANDO")
    httpd.serve_forever()