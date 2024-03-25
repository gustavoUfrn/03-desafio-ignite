# Criando API REST com Node.js
Neste projeto foi desenvolvida uma API REST, utilizando fastify, knex, typescript e outras ferramentas para auxuliar durante o desenvolvimento.

### Fastify 
Fastify é um microframework semelhante ao express. Essas tecnologias são essenciais para a parte tradicional de construções de uma API em node para lhe dar com rotas, parametros, plugins externos, cabeçalhos, respostas em JSON, entender requisições em JSON.
Por que não user express?
- Fastify tem mais updates e um time mais ativo para mante-lo atualizado, dando manutenção e mantendo a comunidade dentro do fastify
- Continua sendo popular dentro do node e semelhante ao express
- Mais performatico e mais pronto para lhe dar com novas features do JS.
> Neste projeto é usado fastify pelo fato de que ele é um microframework(menos robusto), diferente por exemplos do next.js que necessita de uma estrutura de pastas, uma convenção a ser seguida, um set de ferramentas e Banco de dados seram usados, não se podendo fugir muito dessas convenções.

### Typescript
Typescript é um superset do Javascript, ele é um adicional ao JS que permite trabalhar com a tipagem estatica de deixar o código muito mais "inteligente", evitando erros que acabam indo pra produção. O código criado em Ts é covertido para Js apos permitir essa tipagem.
>Uma linguagem tipada é uma linguagem de programação onde cada variavel é associada a um tipo especifico de dado fazendo com que as operações nessas variaveis se tornem restritas aos tipos de dados que elas querem usar.
### ESLint
Eslint é uma forma de padronizar o código para que uma equipe trabalhe com um código limpo. Eslint vai fazer essa formatação do código, buscando por problemas e erros de sintaxe como os exemplos a seguir:
- Usar aspas duplas
- Usar ponto e virgula ao ternimar a linha
- Checar potenciais bugs	
### Banco de dados - SQLite
O banco de dados para o desenvolvimento do projeto é o SQLite, um banco de dados relacional. O sqlite foi escolha para essa projeto, já que boa parte das querys é extremamente semelhante a qualquer banco relacional. Por ser relacional se torna mais facil focar no aprendizado das outros partes do código, além de não ser preciso subir nenhum banco ou ferramenta na maquina, já que seus bancos são arquivos físicos.
>A estrategia de conexção usada será o query builder **Knex.js**, sendo atualmente o query builder mais famoso para o node. Ele facilita a escrita dos SQL's utilizando código Js em sua sintaxe.
### Zod - Validação de dados
Zod é um biblioteca de validação de dados, além de validar a presença de dados, é possivel validar o tipo do dado recebido. Ela será usado para validar se dados foram recebidos e não e também para validar os dados que forem recebidos do front-end.
