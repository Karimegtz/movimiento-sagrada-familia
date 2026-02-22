# movimiento-sagrada-familia

Aplicación web estática de concepto **"Manager Building"** para una residencia premium, con operación sin contacto humano.

## Funcionalidades incluidas

- Inicio de sesión con Google Identity Services (y botón demo para pruebas locales).
- Home/dashboard de residente.
- Reserva de instalaciones: **GYM**, **Grill**, **Cinema**.
- Solicitud de citas de mantenimiento.
- Noticias de la comunidad.
- Generación de acceso de visitantes mediante código QR.
- Visualización de estado de cuenta.
- Catálogo de servicios disponibles:
  - Mudanza
  - Limpieza
  - Comida
  - Entretenimiento
  - Instalación de internet

## Ejecución local

Como es una app estática, puedes abrir `index.html` directamente o ejecutar un servidor simple:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173`.

> Para habilitar el login real de Google, reemplaza `YOUR_GOOGLE_CLIENT_ID` en `index.html` por tu Client ID.
