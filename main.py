import http.server
import socketserver
import os

PORT = 5173

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
    print(f"✅ Elefante Lab corriendo en http://0.0.0.0:{PORT}")
    print("🌐 Tu sitio web está listo!")
    httpd.serve_forever()