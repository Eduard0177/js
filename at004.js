const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const produtos = [];
const pessoas = [];

// Função para cadastrar um produto
function cadastrarProduto() {
  rl.question('Digite o nome do produto: ', (nomeProduto) => {
    produtos.push(nomeProduto);
    console.log(`Produto "${nomeProduto}" cadastrado com sucesso.`);
    menu();
  });
}

// Função para cadastrar uma pessoa
function cadastrarPessoa() {
  rl.question('Digite o nome da pessoa: ', (nomePessoa) => {
    pessoas.push(nomePessoa);
    console.log(`Pessoa "${nomePessoa}" cadastrada com sucesso.`);
    menu();
  });
}

// Função para realizar o sorteio
function sortear() {
  if (produtos.length === 0 || pessoas.length === 0) {
    console.log("É necessário cadastrar produtos e pessoas antes de realizar o sorteio.");
    menu();
    return;
  }

  // Gera números aleatórios para escolher um produto e uma pessoa
  const indiceProdutoSorteado = Math.floor(Math.random() * produtos.length);
  const produtoSorteado = produtos[indiceProdutoSorteado];

  const indicePessoaSorteada = Math.floor(Math.random() * pessoas.length);
  const pessoaSorteada = pessoas[indicePessoaSorteada];

  console.log(`A pessoa sorteada (${pessoaSorteada}) ganhou o produto "${produtoSorteado}".`);

  // Pergunta se o usuário deseja realizar outro sorteio ou sair
  rl.question('Deseja realizar outro sorteio? (S para sim, qualquer tecla para sair): ', (resposta) => {
    if (resposta.toLowerCase() === 's') {
      sortear();
    } else {
      console.log("Saindo do programa.");
      rl.close();
    }
  });
}

// Função para exibir o menu principal
function menu() {
  console.log("\nMenu:");
  console.log("1. Cadastrar Produto");
  console.log("2. Cadastrar Pessoa");
  console.log("3. Sortear");
  console.log("4. Sair");

  // Aguarda a entrada do usuário para escolher uma opção
  rl.question('Digite o número da opção desejada: ', (opcao) => {
    switch (opcao) {
      case '1':
        cadastrarProduto();
        break;
      case '2':
        cadastrarPessoa();
        break;
      case '3':
        sortear();
        break;
      case '4':
        console.log("Saindo do programa.");
        rl.close();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
        menu();
    }
  });
}

// Mensagem de boas-vindas ao iniciar o programa
console.log("Bem-vindo ao Sorteio de Produtos!");
menu(); // Inicia o menu principal
