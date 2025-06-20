#!/usr/bin/env python3
import http.server
import socketserver
import os
import subprocess
import signal
import sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def cleanup():
    subprocess.run(['pkill', '-f', 'python'], stderr=subprocess.DEVNULL)

def main():
    cleanup()
    
    PORT = 8080
    os.chdir('/home/runner/workspace')
    
    print(f"Servidor iniciando en puerto {PORT}")
    print(f"URL: ef4d5500-beb9-48fc-9f24-4533632449e7-00-3h3qn40nzrj3r.worf.replit.dev")
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
            httpd.allow_reuse_address = True
            print("SERVIDOR ACTIVO")
            signal.signal(signal.SIGTERM, lambda s, f: httpd.shutdown())
            httpd.serve_forever()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()