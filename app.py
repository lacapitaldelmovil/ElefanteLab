#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class ElefanteLabHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Log request for debugging
        print(f"Request: {self.path}")
        
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Ensure we're serving from the correct directory
        return super().do_GET()
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

def main():
    PORT = int(os.environ.get('PORT', 5173))
    
    # Change to the correct directory
    os.chdir('/home/runner/workspace')
    
    # List available HTML files for verification
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    print(f"Serving {len(html_files)} HTML files from /home/runner/workspace")
    for file in sorted(html_files):
        print(f"  • {file}")
    
    # Start server
    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteLabHandler) as httpd:
        print(f"\nElefante Lab website running on http://0.0.0.0:{PORT}")
        print(f"Ready to serve requests...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")
            sys.exit(0)

if __name__ == "__main__":
    main()