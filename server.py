#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
import signal
import threading
import time

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        print(f"[REQUEST] {format % args}")

class PersistentServer:
    def __init__(self):
        self.httpd = None
        self.running = True
        
    def start_server(self):
        os.chdir('/home/runner/workspace')
        PORT = 8080
        
        print("=== ELEFANTE LAB SERVER ===")
        print(f"Puerto: {PORT}")
        print(f"URL: https://ef4d5500-beb9-48fc-9f24-4533632449e7-00-3h3qn40nzrj3r.worf.replit.dev")
        print("Estado: INICIANDO...")
        
        while self.running:
            try:
                with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
                    self.httpd = httpd
                    print("Estado: FUNCIONANDO")
                    print("Contenido disponible:")
                    print("- EVERYTHING IS POSSIBLE (gradiente)")
                    print("- Menú Soluciones dropdown")
                    print("- Time is money actualizado")
                    print("- 18 páginas HTML completas")
                    
                    httpd.serve_forever()
                    
            except Exception as e:
                if self.running:
                    print(f"Error del servidor: {e}")
                    print("Reiniciando en 5 segundos...")
                    time.sleep(5)
                else:
                    break
    
    def stop_server(self):
        self.running = False
        if self.httpd:
            self.httpd.shutdown()

def signal_handler(signum, frame):
    print("\nDeteniendo servidor...")
    server.stop_server()
    sys.exit(0)

if __name__ == "__main__":
    server = PersistentServer()
    
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)
    
    try:
        server.start_server()
    except KeyboardInterrupt:
        signal_handler(None, None)