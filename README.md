<h1 align="center">
   Relacionamentos com banco de dados no Node.js
</h1>

<!-- <p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p> -->

## :rocket: Tecnologias

-  [Node.js]()
-  [TypeScript]()
-  [TypeORM]()
-  [TDD]()

## 💻 Sobre o desafio

Criar uma nova aplicação para treinar os conhecimentos com Node.js e TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

Essa será uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

## 📝 Específicação dos testes

[x] **should be able to create a new customer:** Para que esse teste passe, sua aplicação deve permitir que um cliente seja criado, e retorne um json com o cliente criado.

[x] **should not be able to create a customer with one e-mail thats already registered:** Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um cliente com um e-mail que já esteja cadastrado no banco de dados.

[x] **should be able to create a new product:** Para que esse teste passe, sua aplicação deve permitir que um produto seja criado, e retorne um json com o produto criado.

[x] **should not be able to create a duplicated product:** Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um produto com um nome que já esteja cadastrado no banco de dados.

[x] **should be able to create a new order:** Para que esse teste passe, sua aplicação deve permitir que um pedido seja criado, e retorne um json com o todos os dados do pedido criado.

[x] **should not be able to create an order with a invalid customer:** Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.

[x] **should not be able to create an order with invalid products:** Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.

[x] **should not be able to create an order with products with insufficient quantities:** Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados não possua a quantidade necessária.

[x] **should be able to subtract an product total quantity when it is ordered:** Para que esse teste passe, sua aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

[] **should be able to list one specific order:** Para que esse teste passe, você deve permitir que a rota orders/:id retorne um pedido, contendo todas as informações do pedido com o relacionamento de customer e order_products.
