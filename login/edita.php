<?php
    # Recebendo p id do contato
    $id = $_GET['id'];
     # Conectando no BD
     $ds = "mysql:host=localhost;dbname=tcc";
     $user = 'root';
     $pass = 'vertrigo';
     $db = new PDO($ds, $user, $pass);
    

     #SQL para buscar dados do contato
     $query = "SELECT * FROM usuario WHERE id=?";
     $stm = $db->prepare($query);
     $stm->bindParam(1, $id);
    
     $nome = "";
     $email = "";
     $telefone = "";
     if ($stm->execute()){
         if ($row = $stm->fetch()){
             $nome = $row["nome"];
             $email = $row["usuario"];
             $telefone = $row["senha"];
         }
     }


?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h3>Edição de contatos</h3>
    <form action="atualiza.php" method="POST">
        <input type="hidden" name = "id" value = "<?php print $id ?>"> 
        <label>Nome: </label>
        <input name="nome" value="<?php print $nome ?>"><br>
        <label>Usuario: </label>
        <input name="usuario" value="<?php print $usuario ?>"><br>
        <label>Senha: </label>
        <input name="senha" value="<?php print $senha ?>"><br>
        <button type="submit">Atualizar</button>
    </form>
    <h3>Listagem de contatos</h3>
    <?php
        # Conectando no BD
    $ds = "mysql:host=localhost;dbname=tcc";
    $user = 'root';
    $pass = 'vertrigo';
    $db = new PDO($ds, $user, $pass);

    # SQL para listagem
    $query = "SELECT * FROM usuario";
    $stm = $db->prepare($query);
    

    # Executando o SQL
    if ($stm->execute()){
        print "<table border>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Usuario</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>";
        $result = $stm->fetchALL(PDO::FETCH_ASSOC);
        foreach($result as $row){
            # Montar a table com os contatos
            $id = $row['id'];
            $nome = $row['nome'];
            $email = $row['usuario'];
            $telefone = $row['senha'];
            
            print "<tr>
                        <td>$id</td>
                        <td>$nome</td>
                        <td>$usuario</td>
                        <td>$senha</td>
                        <td>
                            <a href ='delete.php?id=$id'>Delete</a> |
                            <a href ='edita.php?id=$id'>Edita</a>
                            </td>
                    </tr>";

            
        
        }
        print "</table>";

    }
    else {
        print "<p>Erro ao listar</p>";
    }

    ?>
</body>

</html>