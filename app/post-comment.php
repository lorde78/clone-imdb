<?php

require_once './vendor/autoload.php';
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Movie.php';
require_once 'Classes/Comment.php';

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
$commentContent = $_POST['content'] ?? '';

if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post here'
    ]);
    exit;
}

if (!$commentContent) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Your movie needs a title and a content'
    ]);
    exit;
}

$pdo = (new PDOFactory())->getPdo();

try {
    $jwt = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($appSecret, 'HS256'));

    $comment = new Comment();
      $comment  ->setContent($commentContent)
        ->setAuthorId($jwt->userId)
        ->setmovieId(12);


    $update = $pdo->prepare('INSERT INTO Comment (content, authorId, movieId) VALUES (:content, :authorId, 12)');
    $update->bindValue('content', $comment->getContent(), PDO::PARAM_STR);
    $update->bindValue('authorId', $jwt->userId, PDO::PARAM_INT);

    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Comment saved',
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
