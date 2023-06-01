<?php
    # Recebe os dados para UPDATE
    $id = $_POST["id"];
    $nome = $_POST["nome"];
    $email = $_POST["usuario"];
    $telefone = $_POST["senha"];

    # Conectando no BD
    $ds = "mysql:host=localhost;dbname=tcc";
    $user = 'root';
    $pass = 'vertrigo';
    $db = new PDO($ds, $user, $pass);

    #SQL para UPDATE
    $query = "UPDATE usuario
                SET nome=?, usuario=?, senha=?
                WHERE id=?";
    $stm = $db->prepare($query);
    $stm->bindParam(1, $nome);
    $stm->bindParam(2, $usuario);
    $stm->bindParam(3, $senha);
    $stm->bindParam(4, $id);

    # Executa o SQL
    if($stm->execute()){
        header("location:index.php");
    }
    else{
        print "<p>Erro ao atualizar</p>";
    }

?>