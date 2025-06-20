#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Servidor funcionando en puerto {PORT}")
    print("Tu sitio web está listo!")
    print("Páginas disponibles:")
    for file in os.listdir('.'):
        if file.endswith('.html'):
            print(f"  - {file}")
    httpd.serve_forever()