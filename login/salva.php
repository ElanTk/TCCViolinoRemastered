<?php
    # Recebendo os dados do form
    $nome = $_POST['nome'];
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];

    # Conectando no BD
    include_once "../bd.php";

    # SQL para inscrição
    $query = "INSERT INTO usuario (
                        nome,
                        usuario,
                        senha
                        ) VALUES (?,?,?)";

   # Preparando o sql
   $stm = $db->prepare($query);
   $stm->bindParam(1, $nome);
   $stm->bindParam(2, $usuario);
   $stm->bindParam(3, $senha);  
   
   # Executa o sql
   if($stm->execute()){
       header("location:index.php");
   }
   else {
       print "<p>Erro ao inserir</p>";
   }

?>