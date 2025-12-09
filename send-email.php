<?php
// Configuración SMTP de IONOS
// IMPORTANTE: Actualiza la contraseña con tu contraseña de IONOS

$to_email = "admin@lacapital.es"; // Correo donde recibirás los mensajes
$smtp_host = "smtp.ionos.es"; // o smtp.ionos.com según tu región
$smtp_port = 587;
$smtp_user = "admin@lacapital.es"; // Tu correo de IONOS
$smtp_pass = "pabloypato"; // Contraseña de IONOS

// Recibir datos del formulario
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$empresa = isset($_POST['empresa']) ? htmlspecialchars($_POST['empresa']) : 'No especificada';
$asunto = isset($_POST['asunto']) ? htmlspecialchars($_POST['asunto']) : 'Contacto desde web';
$tipo_proyecto = isset($_POST['tipo_proyecto']) ? htmlspecialchars($_POST['tipo_proyecto']) : 'No especificado';
$mensaje = isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : '';

// Validar campos requeridos
if (empty($nombre) || empty($email) || empty($mensaje)) {
    echo json_encode(['success' => false, 'message' => 'Por favor completa todos los campos requeridos']);
    exit;
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Construir el mensaje
$email_subject = "Nuevo contacto web: $asunto";
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #00D4AA; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #00D4AA; }
        .footer { background: #1a1a1a; color: #ccc; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🐘 Nuevo Contacto - Elefante Lab</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Nombre:</span><br>
                $nombre
            </div>
            <div class='field'>
                <span class='label'>Email:</span><br>
                <a href='mailto:$email'>$email</a>
            </div>
            <div class='field'>
                <span class='label'>Empresa:</span><br>
                $empresa
            </div>
            <div class='field'>
                <span class='label'>Tipo de Proyecto:</span><br>
                $tipo_proyecto
            </div>
            <div class='field'>
                <span class='label'>Asunto:</span><br>
                $asunto
            </div>
            <div class='field'>
                <span class='label'>Mensaje:</span><br>
                " . nl2br($mensaje) . "
            </div>
        </div>
        <div class='footer'>
            Este mensaje fue enviado desde el formulario de contacto de elefantelab.com
        </div>
    </div>
</body>
</html>
";

// Headers del email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Elefante Lab <$smtp_user>\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";

// Enviar email usando mail() de PHP (funciona con IONOS hosting)
$sent = mail($to_email, $email_subject, $email_body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado correctamente! Te contactaremos pronto.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor intenta de nuevo.']);
}
?>
