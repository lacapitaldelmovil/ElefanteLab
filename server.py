#!/usr/bin/env python3
import http.server
import socketserver
import os

class ElefanteHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        print(f"📥 {args[0]} - {args[1]}")

def main():
    PORT = int(os.environ.get('PORT', 3000))

    print(f"🚀 ElefanteLab Server iniciando en puerto {PORT}")
    print(f"🌐 URL pública: https://workspace.admin2198.repl.co")
    print("✅ Servidor listo")

    with socketserver.TCPServer(("0.0.0.0", PORT), ElefanteHandler) as httpd:
        httpd.serve_forever()

if __name__ == "__main__":
    main()