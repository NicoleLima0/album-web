Álbum Web

Um aplicativo web moderno e responsivo para criar e gerenciar seus álbuns de fotos pessoais. Crie, personalize e organize suas memórias de forma simples e intuitiva.

Sobre o Projeto
O Álbum Web foi desenvolvido como uma solução front-end completa para a organização de fotografias digitais. A aplicação permite que os usuários criem uma conta (simulada via LocalStorage), montem álbuns com título e descrição, e gerenciem suas fotos de maneira eficiente.

O projeto foi construído utilizando as tecnologias mais modernas do ecossistema React, com foco em uma experiência de usuário fluida e um design limpo e agradável.

🚀 Funcionalidades Principais

👤 Autenticação de Usuário: Sistema de cadastro e login simulado, utilizando o LocalStorage para persistir os dados da sessão.

🖼️ Galeria de Álbuns: Visualize todos os seus álbuns em uma tela principal. Crie novos álbuns com título e descrição personalizados.

✏️ Edição e Exclusão de Álbuns: Edite o título e a descrição de um álbum a qualquer momento. Um álbum só pode ser excluído se estiver vazio, garantindo a segurança das suas fotos.

📷 Gerenciamento de Fotos:

Upload: Adicione novas fotos aos seus álbuns.

Detalhes da Foto: Cada foto possui título, descrição, data de aquisição, tamanho e cor predominante.

Exclusão: Remova fotos de um álbum.

👁️ Modos de Visualização: Alterne a exibição das fotos dentro de um álbum entre o formato de tabela detalhada ou miniaturas (grid).

🛠️ Tecnologias Utilizadas
Este projeto foi construído com as seguintes ferramentas e bibliotecas:

React.js: Biblioteca principal para a construção da interface de usuário.

JavaScript: Linguagem base da aplicação.

SCSS: Pré-processador CSS para uma estilização mais organizada e modular.

Bootstrap: Framework CSS para agilizar a criação de layouts responsivos.

MUI: Biblioteca de componentes UI para garantir elementos de interface ricos e consistentes.

LocalStorage: Utilizado para simular o banco de dados e a autenticação do usuário diretamente no navegador.

📦 Como Executar o Projeto
Siga os passos abaixo para rodar o projeto em sua máquina local.

Clone o repositório:
git clone https://github.com/seu-usuario/album-web.git

Acesse o diretório do projeto:
cd album-web

Instale as dependências:
yarn

Inicie a aplicação:
yarn dev

Pronto! Agora você pode abrir http://localhost:3000 no seu navegador para visualizar o projeto.