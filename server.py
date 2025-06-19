#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 8080

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def log_message(self, format, *args):
        sys.stdout.write("%s - - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format%args))

def main():
    os.chdir('/home/runner/workspace')
    
    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
        print(f"Elefante Lab website running on port {PORT}")
        print("Available pages:")
        for f in sorted([f for f in os.listdir('.') if f.endswith('.html')]):
            print(f"  - http://localhost:{PORT}/{f}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()