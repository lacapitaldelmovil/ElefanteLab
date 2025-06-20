
#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 3000))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

print(f"🚀 ElefanteLab server starting on port {PORT}")
print(f"📱 Public URL: https://{os.environ.get('REPL_SLUG', 'workspace')}.{os.environ.get('REPL_OWNER', 'admin2198')}.repl.co")
print("📄 Available pages:")

for file in sorted([f for f in os.listdir('.') if f.endswith('.html')]):
    print(f"   • {file}")

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"✅ Server ready and listening on 0.0.0.0:{PORT}")
    httpd.serve_forever()
