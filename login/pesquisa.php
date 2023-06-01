<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		<title>Login</title>
	</head>
	<body>
		<h2>Pesquisa de Usuarios</h2>
		<form method="post" action="pesquisa.php">
			<label>Nome parcial:</label>
			<input type="text" name="nome" />
			<button type="submit">Pesquisar</button>
		</form>

		<h2>Listagem de Contatos</h2>
		<?php
			$nome = '';
			if (isset($_POST['nome'])){
				$nome = $_POST['nome'];
			}
		
			/* Conectando com o banco de dados para listar registros */
			$datasource = 'mysql:host=localhost;dbname=tcc';
			$user = 'root';
			$pass = 'vertrigo';
			$db = new PDO($datasource, $user, $pass);
	
			$query = "SELECT * FROM usuario WHERE nome LIKE '%$nome%'";
			$stm = $db -> prepare($query);
			
			if ($stm -> execute()) {
				print "<table border>
							<tr>
								<th>Nome</th>
								<th>Usuario</th>
								<th>Senha</th>
								<th>Ações</th>
							</tr>";
				while ($row = $stm -> fetch()) {
					$id = $row['id'];
					$nome = $row['nome'];
					$email = $row['usuario'];
					$telefone = $row['senha'];
	
					print "<tr>
								<td>$nome</td>
								<td>$usuario</td>
								<td>$senha</td>
								<td>
									<a href='delete.php?id=$id'>Delete</a> | 
									<a href='edita.php?id=$id'>Edita</a>
								</td>
							</tr>";				
				}
				print "</table>";
			} else {
				print '<p>Erro ao listar!</p>';
			}
		?>
		<a href='index.php'>Voltar</a>
	</body>
</html>