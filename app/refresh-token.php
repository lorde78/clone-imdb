<?php

require_once './vendor/autoload.php';
require_once 'Classes/TokenHelper.php';
require_once 'headers.php';
require_once 'Classes/User.php';
require_once 'Classes/CookieHelper.php';

$token = $_COOKIE['hetic_token'] ?? '';

try {
    $oldJwt = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($appSecret, 'HS256'));

    $user = (new User())
        ->setId($oldJwt->userId)
        ->setUsername($oldJwt->username);


    $jwt = TokenHelper::buildJWT($user);


    CookieHelper::setCookie($jwt, $oldJwt->username);

    echo json_encode([
        'status' => 'success',
        'username' => $oldJwt->username,
        'token' => $jwt
    ]);
    exit;


} catch (\Firebase\JWT\ExpiredException $expiredException) {
    $oldJwt = json_decode(base64_decode(explode('.', $token)[1]));


    $user = (new User())
        ->setId($oldJwt->userId)
        ->setUsername($oldJwt->username);


    $jwt = TokenHelper::buildJWT($user);


    CookieHelper::setCookie($jwt, $oldJwt->username);

    echo json_encode([
        'status' => 'success',
        'username' => $oldJwt->username,
        'token' => $jwt
    ]);
    exit;

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid Token'
    ]);
    exit;

}
