<?php
    # Recebendo o ID do contato
    $id = $_GET['id'];

     # Conectando no BD
     $ds = "mysql:host=localhost;dbname=tcc";
     $user = 'root';
     $pass = 'vertrigo';
     $db = new PDO($ds, $user, $pass);

     # SQL para remover registro do BD
     $query = "DELETE FROM usuario WHERE id=?";
     $stm = $db->prepare($query);
     $stm->bindParam(1, $id);

     # Executando o SQL
     if ($stm->execute()){
         header("location:index.php");
     }
     else{
         print "<p>Erro ao remover</p>";
     }

?>