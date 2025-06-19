#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Cambiar al directorio correcto
os.chdir('/home/runner/workspace')

PORT = 5000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"✅ Elefante Lab server started successfully!")
        print(f"🌐 Server running on: http://0.0.0.0:{PORT}")
        print(f"📱 Access your website at the URL shown above")
        httpd.serve_forever()
except Exception as e:
    print(f"❌ Error starting server: {e}")
    sys.exit(1)