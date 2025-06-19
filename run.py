#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
from threading import Timer

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

print("=" * 50)
print("🚀 ELEFANTE LAB - SITIO WEB INICIADO")
print("=" * 50)
print(f"URL: http://localhost:{PORT}")
print(f"Puerto: {PORT}")
print("Páginas disponibles:")
print("  - / (inicio)")
print("  - /servicios.html")
print("  - /casos.html") 
print("  - /como-trabajamos.html")
print("=" * 50)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor corriendo en puerto {PORT}")
    httpd.serve_forever()