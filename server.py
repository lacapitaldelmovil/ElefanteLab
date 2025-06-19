#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Add CORS headers for external access
        self.send_response(200)
        self.send_header('Content-type', self.guess_type(self.path))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()
        
        # Serve the file
        try:
            with open(self.path[1:], 'rb') as f:
                self.wfile.write(f.read())
        except FileNotFoundError:
            # Fallback to index.html
            try:
                with open('index.html', 'rb') as f:
                    self.wfile.write(f.read())
            except:
                self.wfile.write(b'Error: File not found')
    
    def log_message(self, format, *args):
        print(f"Serving: {args[0]} - {args[1]}")

def main():
    PORT = int(os.environ.get('PORT', 3000))
    
    # Change to workspace directory
    os.chdir('/home/runner/workspace')
    
    # List HTML files
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    print(f"Elefante Lab server starting on port {PORT}")
    print(f"HTML files available: {len(html_files)}")
    for file in sorted(html_files):
        print(f"  - {file}")
    
    print(f"\nPublic URL: https://workspace.admin2198.repl.co")
    print(f"Local URL: http://0.0.0.0:{PORT}")
    
    # Start server
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()