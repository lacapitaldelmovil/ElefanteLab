#!/usr/bin/env python3
"""
Servidor web simple para Elefante Lab
Resuelve problemas de conectividad con configuración optimizada
"""
import http.server
import socketserver
import os
import sys
import socket
from pathlib import Path

class WebHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/home/runner/workspace', **kwargs)
    
    def do_GET(self):
        # Redirect root to index.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        
        # Force no caching
        self.send_response(200)
        
        # Determine content type
        if self.path.endswith('.html'):
            self.send_header('Content-type', 'text/html; charset=utf-8')
        elif self.path.endswith('.css'):
            self.send_header('Content-type', 'text/css')
        elif self.path.endswith('.js'):
            self.send_header('Content-type', 'application/javascript')
        else:
            self.send_header('Content-type', 'text/html; charset=utf-8')
        
        # Headers for CORS and no cache
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Serve file content
        try:
            file_path = f'/home/runner/workspace{self.path}'
            if os.path.exists(file_path) and os.path.isfile(file_path):
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                # If file not found, serve index.html
                with open('/home/runner/workspace/index.html', 'rb') as f:
                    self.wfile.write(f.read())
        except Exception as e:
            self.wfile.write(f"Error: {str(e)}".encode())
    
    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

def start_server():
    PORT = 8080
    
    print("=== ELEFANTE LAB WEB SERVER ===")
    print(f"Iniciando en puerto {PORT}")
    
    # Check if port is available
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', PORT))
    if result == 0:
        print(f"Puerto {PORT} está ocupado, intentando liberar...")
        sock.close()
        os.system(f"pkill -f 'python.*{PORT}'")
        import time
        time.sleep(2)
    else:
        sock.close()
    
    # Verify files exist
    required_files = ['index.html', 'styles.css']
    for file in required_files:
        if not os.path.exists(file):
            print(f"ERROR: {file} no encontrado")
            return False
    
    print("Archivos verificados correctamente")
    
    try:
        # Use ThreadingTCPServer for better performance
        with socketserver.ThreadingTCPServer(("0.0.0.0", PORT), WebHandler) as httpd:
            httpd.allow_reuse_address = True
            
            print(f"SERVIDOR FUNCIONANDO")
            print(f"URL: https://ef4d5500-beb9-48fc-9f24-4533632449e7-00-3h3qn40nzrj3r.worf.replit.dev")
            print(f"Puerto local: http://0.0.0.0:{PORT}")
            print("Páginas disponibles:")
            
            html_files = [f for f in os.listdir('.') if f.endswith('.html')]
            for i, file in enumerate(sorted(html_files)[:10], 1):
                print(f"   {i}. {file}")
            if len(html_files) > 10:
                print(f"   ... y {len(html_files)-10} más")
            
            print("\nCONTENIDO IMPLEMENTADO:")
            print("   - EVERYTHING IS POSSIBLE (gradiente)")
            print("   - Menú Soluciones dropdown")
            print("   - Time is money actualizado")
            print("   - CSS con efectos y animaciones")
            print("\n[Presiona Ctrl+C para detener]")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServidor detenido por usuario")
    except Exception as e:
        print(f"Error del servidor: {e}")
        return False
    
    return True

if __name__ == "__main__":
    os.chdir('/home/runner/workspace')
    success = start_server()
    sys.exit(0 if success else 1)