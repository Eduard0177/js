const readline = require('readline');

// Inicialização do Sistema
const biblioteca = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para exibir o menu principal
function exibirMenu() {
  console.log("\nMenu Principal:");
  console.log("1. Cadastrar Livro");
  console.log("2. Alterar Livro");
  console.log("3. Deletar Livro");
  console.log("4. Realizar Empréstimo de Livro");
  console.log("5. Devolver Livro");
  console.log("6. Sair");
}

// Função para cadastrar um livro
function cadastrarLivro(callback) {
  rl.question("Informe o título do livro:", (titulo) => {
    rl.question("Informe o autor do livro:", (autor) => {
      const id = biblioteca.length + 1;
      const emprestado = false;
  
      const livro = { id, titulo, autor, emprestado };
      biblioteca.push(livro);
      console.log("Livro cadastrado com sucesso!");
      if (typeof callback === 'function') {
        callback();
      }
    });
  });
}

// Função para alterar um livro
function alterarLivro(callback) {
  rl.question("Informe o ID do livro que deseja alterar:", (id) => {
    const livro = biblioteca.find((livro) => livro.id === parseInt(id));

    if (livro) {
      rl.question("Informe o novo título (ou deixe em branco para manter o atual):", (novoTitulo) => {
        rl.question("Informe o novo autor (ou deixe em branco para manter o atual):", (novoAutor) => {
          if (novoTitulo) {
            livro.titulo = novoTitulo;
          }

          if (novoAutor) {
            livro.autor = novoAutor;
          }

          console.log("Livro alterado com sucesso!");
          if (typeof callback === 'function') {
            callback();
          }
        });
      });
    } else {
      console.log("Livro não encontrado.");
      if (typeof callback === 'function') {
        callback();
      }
    }
  });
}

// Função para deletar um livro
function deletarLivro(callback) {
  rl.question("Informe o ID do livro que deseja deletar:", (id) => {
    const index = biblioteca.findIndex((livro) => livro.id === parseInt(id));

    if (index !== -1) {
      biblioteca.splice(index, 1);
      console.log("Livro deletado com sucesso!");
    } else {
      console.log("Livro não encontrado.");
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}

// Função para realizar empréstimo de um livro
function realizarEmprestimo(callback) {
  rl.question("Informe o ID do livro que deseja emprestar:", (id) => {
    const livro = biblioteca.find((livro) => livro.id === parseInt(id));

    if (livro) {
      if (!livro.emprestado) {
        livro.emprestado = true;
        console.log("Livro emprestado com sucesso!");
      } else {
        console.log("Este livro já está emprestado.");
      }
    } else {
      console.log("Livro não encontrado.");
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}

// Função para devolver um livro emprestado
function devolverLivro(callback) {
  rl.question("Informe o ID do livro que deseja devolver:", (id) => {
    const livro = biblioteca.find((livro) => livro.id === parseInt(id));

    if (livro) {
      if (livro.emprestado) {
        livro.emprestado = false;
        console.log("Livro devolvido com sucesso!");
      } else {
        console.log("Este livro não está emprestado.");
      }
    } else {
      console.log("Livro não encontrado.");
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}

// Laço de Repetição
function menuPrincipal() {
  exibirMenu();
  rl.question("Escolha uma opção:", (escolha) => {
    switch (parseInt(escolha)) {
      case 1:
        cadastrarLivro(menuPrincipal);
        break;
      case 2:
        alterarLivro(menuPrincipal);
        break;
      case 3:
        deletarLivro(menuPrincipal);
        break;
      case 4:
        realizarEmprestimo(menuPrincipal);
        break;
      case 5:
        devolverLivro(menuPrincipal);
        break;
      case 6:
        console.log("Saindo do sistema.");
        rl.close();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
        menuPrincipal();
    }
  });
}

menuPrincipal();
