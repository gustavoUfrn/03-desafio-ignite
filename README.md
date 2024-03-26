# Criando API REST com Node.js
Neste projeto foi desenvolvida uma API REST, utilizando fastify, knex, typescript e outras ferramentas para auxiliar durante o desenvolvimento.
## Requisitos e regras do sistema
- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
### Fastify 
Fastify é um microframework semelhante ao express. Essas tecnologias são essenciais para a parte tradicional de construção de uma API em node para lhe dar com rotas, parâmetros, plugins externos, cabeçalhos, respostas em JSON, entender requisições em JSON.
Por que não usar express?
- Fastify tem mais updates e um time mais ativo para mantê-lo atualizado, dando manutenção e mantendo a comunidade dentro do fastify
- Continua sendo popular dentro do node e semelhante ao express
- Mais performático e mais pronto para lhe dar com novas features do JS.
> Neste projeto é usado fastify pelo fato de que ele é um microframework(menos robusto), diferente por exemplos do next.js que necessita de uma estrutura de pastas, uma convenção a ser seguida, um set de ferramentas e Banco de dados serão usados, não se podendo fugir muito dessas convenções.
### Typescript
TypeScript é um superset do Javascript, ele é um adicional ao JS que permite trabalhar com a tipagem estática de deixar o código muito mais "inteligente", evitando erros que acabam indo para produção. O código criado em Ts é convertido para Js após permitir essa tipagem.
>Uma linguagem tipada é uma linguagem de programação onde cada variável é associada a um tipo específico de dado fazendo com que as operações nessas variáveis se tornem restritas aos tipos de dados que elas querem usar.
#### @types no Ts
Normalmente nessa linguagem existem "type definitions" que é uma forma de tipagem existente. Porém quando essas tipagens não vem por padrão, podemos incluí-las com npm i @types/node-do-pacoten e podemos criá-las nos mesmos.
Para a criação delas é necessário criar @types na pasta raiz do projeto e fazer manualmente o código dessas definições de tipo.
No projeto criar o tipo de requisição do fastify e os tipos para as tabelas do knex nos ajudaram a codar com mais facilidade e traram um contexto a mais para o projeto.
>As definições de tipo permitem que o TypeScript entenda melhor como você está utilizando as bibliotecas JavaScript em seu código, fornecendo recursos como autocompletar, verificação de tipo estático e detecção de erros em tempo de compilação.
### ESLint
Eslint é uma forma de padronizar o código para que uma equipe trabalhe com um código limpo. Eslint vai fazer essa formatação do código, buscando por problemas e erros de sintaxe como os exemplos a seguir:
- Usar aspas duplas
- Usar ponto e vírgula ao terminar a linha
- Checar potenciais bugs	
### Banco de dados - SQLite
O banco de dados para o desenvolvimento do projeto é o SQLite, um banco de dados relacional. O sqlite foi escolhido para esse projeto, já que boa parte das querys é extremamente semelhante a qualquer banco relacional. Por ser relacional, torna mais fácil focar no aprendizado das outras partes do código, além de não ser preciso subir nenhum banco ou ferramenta na máquina, já que seus bancos são arquivos físicos.
>A estratégia de conexão usada será o query builder **Knex.js**, sendo atualmente o query builder mais famoso para o node. Ele facilita a escrita dos SQL's utilizando código Js em sua sintaxe.
### Zod - Validação de dados
Zod é um biblioteca de validação de dados, além de validar a presença de dados, é possível validar o tipo do dado recebido. Ela será usada para validar se dados foram recebidos e não e também para validar os dados que foram recebidos do front-end.
###Insomnia
Insomnia é um aplicativo de desktop que server para fazer design, testes e requisições para a sua API. Usaremos principalmente nos testes de rotas que seram feitas durante e depois o desenvolvimento de projeto.

