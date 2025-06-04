# Minerva

Esta é a documentação do frontend da aplicação Minerva e conterá explicações sobre as rotas, principais componentes, arquivos e outras anotações de desenvolvimento. Para mais informações sobre a lista de tarefas do desenvolvimento da aplicação, consulte: [Notion - Minerva](https://www.notion.so/Projeto-Profissional-Desenvolvimento-de-Sistemas-1ea09dc95b2380e698b0fc78f3d460a0).

## Sumário

## Sumário

1. [Descrição](#minerva)
2. [Desenvolvimento](#desenvolvimento)  
   1. [Configurar no Git](#configurar-no-git)  
   2. [Clonando o Repositório na Máquina](#clonando-o-repositório-na-máquina)  
   3. [Configurando Arquivos e Servidor](#configurando-arquivos-e-servidor)  
   4. [Iniciando o Servidor](#iniciando-o-servidor)  
   5. [Fazendo Alterações no Projeto](#fazendo-alterações-no-projeto)  
3. [Linguagens, Bibliotecas, Frameworks e Recursos Utilizados](#linguagens-bibliotecas-frameworks-e-recursos-utilizados)  
4. [Explicação do Código](#explicação-do-código)  
   1. [README.md](#readmemd)  
   2. [LICENSE](#license)  
   3. [.prettierrc](#prettierrc)  
   4. [.gitignore](#gitignore)  
   5. [package.json e package-lock.json](#packagejson-e-package-lockjson)  
   6. [tsconfig.json](#tsconfigjson)  
   7. [postcss.config.mjs](#postcssconfigmjs)  
   8. [next.config.ts](#nextconfigts)  
   9. [eslint.config.mjs](#eslintconfigmjs)  
   10. [node_modules](#node_modules)  
   11. [public](#public)  
   12. [src](#src)  
5. [Rotas e Componentes](#rotas-e-componentes)  
6. [Formatação e Convenções](#formatação-e-convenções)  
7. [Deploy](#deploy)

## Desenvolvimento

Você precisa ter uma conta no github e ter sido colocado como colaborador do projeto para executar os passos abaixo.

### Configurar no Git

Caso não esteja configurado no Git, você deve colocar no git bash os comandos:

```
git config --global user.name "Nome de Usuário"
git config --global user.email "emailgithub@gmail.com"
```

### Clonando o repositório na máquina

É necessário fazer uma clonagem do repositório na sua máquina. Para isso, você deve colocar no git bash os comandos:

```
git clone https://github.com/bruno08nunes/minerva-frontend.git
cd minerva-frontend
```

### Configurando arquivos e servidor

Primeiramente, você deve instalar as depências com o código abaixo:

```
npm i
```

### Iniciando o servidor

Por fim, você precisa rodar o servidor no modo de desenvolvimento.

```
npm run dev
```

### Fazendo alterações no projeto

Antes de começar a trabalhar, é sempre recomendado puxar as alterações feitas para a sua máquina, usando o comando:

```
git pull origin main
```

Também é recomendado criar uma nova branch para fazer as alterações. Você deve fazer usando:

```
git checkout -b dev
```

É recomendado que as alterações sejam feitas por etapas, de pouco a pouco. Você deve fazer um commit com as alterações feitas, colocando no git bash:

```
git add .
git commit -m "Mensagem descrevendo as alterações"
```

Depois é necessário apenas enviar para o repositório remoto. Caso você já esteja conectado entre o git e o github, você deve executar o primeiro código, se não, o segundo.

1.

```
git push -u origin main
```

2.

```
git push origin main
```

Caso haja mais dúvidas, veja: [Git e Github - Tutorial](https://docs.google.com/document/d/1UeFRh8nkwYq1HemMNNc_1RpyQb_FGNWZEEgKtZuF8Ko/edit)

## Linguagens, Bibliotecas, Frameworks e Recursos Utilizados

-   TypeScript;
-   Next.js;
    -   React;
-   Tailwind.

## Explicação do Código

### README.md

Documentação do frontend do projeto

### LICENSE

Licença de copyright da aplicação

### .prettierrc

Arquivo com estilização padrão para o desenvolvimento do site, usado em conjunto com a extensão presente no Visual Studio Code e outras IDEs: Prettier.

### .gitignore

Arquivo que serve para não levar arquivos que não devem ser colocados no github.

### package.json e package-lock.json

Informações sobre as dependências do projeto. A primeira pode sofrer algumas alterações, como na parte de scripts, enquanto a segunda não deve ser alterada.

### tsconfig.json

Arquivo de configuração do TypeScript.

### postcss.config.mjs

Arquivo de configuração do Tailwind.

### next.config.ts

Arquivo de configuração do Next.js.

### eslint.config.mjs

Arquivo de configuração do ESLint.

### node_modules

Pasta com as dependências do projeto, instalada com npm i. Não deve ser alterada ou enviada para o Github de forma nenhuma.

### public

Pasta com os arquivos estáticos da aplicação, como imagens padrões do frontend. Seus itens podem ser acessados diretamente pela raiz (/).

### src

Contém os arquivos TypeScript usados no frontend. Sua estrutura de pastas segue:

-   app - Contém as rotas da aplicação;
-   components - Contém os principais componentes da aplicação reutilizados em diversas rotas. Veja mais sobre cada componente em seu capítulo específico; e
-   lib - Contém funções/objetos de bibliotecas úteis para aplicação.

## Rotas e Componentes

As rotas da aplicação são:

-   / - Página com informações da aplicação.

Os principais componentes da aplicação são:
-   Figure - Tag `<figure>` com estilização para possuir uma descrição acima da imagem. Recebe image, title e isColored (opcional); e
-   Header - Cabeçalho principal da aplicação.

## Formatação e Convenções

Por padrão, os códigos do projeto devem seguir:

-   Geral:
    -   Quatro (4) espaços para indentação do código. Para facilitar isso, você deve instalar a extensão Prettier.
-   TypeScript:
    -   Nome de variáveis em inglês;
    -   Nome de variáveis coerentes, com palavras separadas por _camelCase_ (como: `carrinhoDeProdutos`); e
    -   Variáveis declaradas apenas com `let` e `const`.

## Deploy

### Repositório Remoto

O repositório remoto está no Github: <https://github.com/bruno08nunes/minerva-frontend>