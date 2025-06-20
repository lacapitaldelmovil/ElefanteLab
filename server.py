#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
        print(f"✅ ElefanteLab servidor iniciado en puerto {PORT}")
        print(f"🌐 Accede a: http://localhost:{PORT}")
        httpd.serve_forever()