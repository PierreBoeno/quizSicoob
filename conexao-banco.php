<?php
    $servidor = "quizcosmipa.mysql.dbaas.com.br";
    $usuario = "quizcosmipa";
    $senha = "Cosmipa4105!";
    $banco = "quizcosmipa";

    $conexao = mysqli_connect($servidor, $usuario, $senha, $banco);

    // Recebendo os dados enviados por POST
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $pontos = $_POST['pontos'];
    
    // Fazendo algo com os dados recebidos
    echo "id: $nome, nome: $idade, email: $email, pontos: $pontos";

?>