#!/usr/bin/env python3
import http.server
import socketserver
import os
import threading
import time

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    os.chdir('/home/runner/workspace')
    PORT = 8080
    
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
        print(f"🌐 Website running on http://0.0.0.0:{PORT}")
        print("📋 Ready to view with all updates:")
        print("   ✓ EVERYTHING IS POSSIBLE gradient title")
        print("   ✓ Solutions dropdown menu")
        print("   ✓ Redesigned cards with icons")
        print("   ✓ Time is money message")
        print(f"🚀 Use Deploy button for permanent URL")
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()