
#!/usr/bin/env python3
import http.server
import socketserver
import os
import threading
import time

PORT = int(os.environ.get('PORT', 3000))

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"📥 Request: {self.path}")
        
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Remove leading slash for file system
        file_path = self.path[1:] if self.path.startswith('/') else self.path
        
        try:
            # Check if file exists
            if os.path.exists(file_path):
                return super().do_GET()
            else:
                # Fallback to index.html for SPA behavior
                self.path = '/index.html'
                return super().do_GET()
        except Exception as e:
            print(f"❌ Error serving {self.path}: {e}")
            self.send_error(500, f"Server Error: {e}")
    
    def end_headers(self):
        # Add headers to prevent caching issues
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    print(f"🚀 ElefanteLab server starting on port {PORT}")
    print(f"📱 Public URL: https://{os.environ.get('REPL_SLUG', 'workspace')}.{os.environ.get('REPL_OWNER', 'admin2198')}.repl.co")
    print("📄 Available pages:")
    
    html_files = sorted([f for f in os.listdir('.') if f.endswith('.html')])
    for file in html_files:
        print(f"   • {file}")
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
            print(f"✅ Server ready and listening on 0.0.0.0:{PORT}")
            print("🌐 Tu sitio web está disponible en:")
            print(f"   👉 https://workspace.admin2198.repl.co")
            httpd.serve_forever()
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        raise

if __name__ == "__main__":
    start_server()
