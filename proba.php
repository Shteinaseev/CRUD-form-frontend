<?php
header('Content-Type: application/json; charset=utf-8');

$odeljenja = [
    [
        "idodeljenje" => 1,
        "oznaka_odeljenja" => "I-1",
        "razred" => 1,
        "skolska_godina_idskolska_godina" => 1,
        "smer_idsmer" => 1
    ],
    [
        "idodeljenje" => 2,
        "oznaka_odeljenja" => "II-2",
        "razred" => 2,
        "skolska_godina_idskolska_godina" => 1,
        "smer_idsmer" => 2
    ],
    [
        "idodeljenje" => 3,
        "oznaka_odeljenja" => "III-1",
        "razred" => 3,
        "skolska_godina_idskolska_godina" => 2,
        "smer_idsmer" => 1
    ]
];

echo json_encode($odeljenja, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>