<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Movie.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT * FROM User INNER JOIN Movie ON Movie.authorId = User.id ORDER BY `date` DESC');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $post) {
//    var_dump($post);
    $res[] = [
        'id' => $post['id'],
        "date" => $post['date'],
        'title' => $post['title'],
        'content' => $post['content'],
        'author' => $post['username']
    ];
}

echo json_encode($res);
