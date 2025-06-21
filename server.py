#!/usr/bin/env python3
import subprocess
import sys
import os

print("ElefanteLab - Iniciando servidor Node.js...")

# Ejecutar el servidor Node.js
try:
    subprocess.run(["node", "server.js"], check=True)
except KeyboardInterrupt:
    print("\nServidor detenido")
    sys.exit(0)
except subprocess.CalledProcessError as e:
    print(f"Error ejecutando servidor Node.js: {e}")
    sys.exit(1)
except FileNotFoundError:
    print("Error: Node.js no encontrado")
    sys.exit(1)