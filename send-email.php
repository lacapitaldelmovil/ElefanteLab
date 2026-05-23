<?php
header('Content-Type: application/json; charset=utf-8');
http_response_code(410);
echo json_encode([
    'success' => false,
    'message' => 'Este endpoint fue reemplazado por /api/contact en el servidor Node.js.',
]);
