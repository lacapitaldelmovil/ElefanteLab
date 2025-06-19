#!/usr/bin/env python3
import http.server
import socketserver
import sys
import os

# Cambiar al directorio correcto
os.chdir('/home/runner/workspace')

# Configurar el puerto
PORT = 8000

# Crear el handler
Handler = http.server.SimpleHTTPRequestHandler

# Crear y ejecutar el servidor
try:
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Servidor iniciado en puerto {PORT}")
        print(f"Accede a: http://0.0.0.0:{PORT}")
        httpd.serve_forever()
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)