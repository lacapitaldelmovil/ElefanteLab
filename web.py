import http.server
import socketserver
import webbrowser
import threading
import time

PORT = 5000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Elefante Lab running on port {PORT}")
        print(f"Access: http://0.0.0.0:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()