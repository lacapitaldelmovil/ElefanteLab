#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

PORT = int(os.environ.get('PORT', 8080))
os.chdir('/home/runner/workspace')

print(f"🚀 Elefante Lab server running on port {PORT}")
print("📄 Available pages:")
for f in sorted([f for f in os.listdir('.') if f.endswith('.html')]):
    print(f"   • {f}")

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n✋ Server stopped")
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)