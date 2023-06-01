<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>
<div id = "dbody">
    <div id = "inserir">
    <h3>Cadastro de usuário</h3>
    <form action="salva.php" method="POST">
        <label>Nome: </label>
        <input name="nome"><br>
        <label>Usuario: </label>
        <input name="usuario"><br>
        <label>Senha: </label>
        <input name="senha"><br>
        <button type="submit">Salvar</button>
    </form>
</div>
    <div id ="lista">
    <h3>Listagem de contatos</h3>
    <?php

    # Conectando no BD
    include_once "../bd.php";

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
            $usuario = $row['usuario'];
            $senha = $row['senha'];
            
            print "<tr>
                        <td class = 'a'>$id</td>
                        <td class = 'a'>$nome</td>
                        <td class = 'a'>$usuario</td>
                        <td class = 'a' >$senha</td>
                     
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
    </div>
    </div>
</body>

</html>