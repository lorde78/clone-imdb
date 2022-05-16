<?php

require_once './vendor/autoload.php';
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Blog.php';

//$token = str_replace('Bearer ', '', getallheaders()['Authorization'] ?? '') ?? '';

/**
 * Je pourrais ne pas passer d'authorization en header
 * et simplement me servir du fait que le cookie d'auth
 * est passé également en requête !
 * Attention cependant à la validité du cookie.
 * Il faudrait le vérifier avant la requête, on en reparle
 * avec les Interceptor de Axios !
 */
$token = $_COOKIE['hetic_token'] ?? '';
$blogTitle = $_POST['title'] ?? '';
$blogContent = $_POST['content'] ?? '';

if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post here'
    ]);
    exit;
}

if (!$blogContent || !$blogTitle) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Your blog needs a title and a content'
    ]);
    exit;
}

$pdo = (new PDOFactory())->getPdo();

try {
    $jwt = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($appSecret, 'HS256'));

    $blog = (new Blog())
        ->setTitle($blogTitle)
        ->setContent($blogContent)
        ->setAuthorId($jwt->userId);

    $update = $pdo->prepare('INSERT INTO Blog (title, content, authorId, date) VALUES (:title, :content, :authorId, NOW())');
    $update->bindValue('title', $blog->getTitle(), PDO::PARAM_STR);
    $update->bindValue('content', $blog->getContent(), PDO::PARAM_STR);
    $update->bindValue('authorId', $jwt->userId, PDO::PARAM_INT);

    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Blog saved',
        ]);
    }


} catch (\Firebase\JWT\ExpiredException $expiredException) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Expired Token'
    ]);
}

catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid Token'
    ]);

} finally {
    exit;
}
