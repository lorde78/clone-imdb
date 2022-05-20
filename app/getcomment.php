<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Comment.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT * FROM Movie INNER JOIN Comment ON Comment.movieId = Movie.id;');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $post) {
    var_dump($post);
    $res[] = [
        'id' => $post['id'],
        "date" => $post['date'],
        'content' => $post['content'],
        'author' => $post['username'],
        'movie' => $post['movie'],
    ];
}

echo json_encode($res);
