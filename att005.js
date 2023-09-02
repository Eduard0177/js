const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array para armazenar os alunos e suas notas
const alunos = [];

// Função para cadastrar um novo aluno
function cadastrarAluno() {
  rl.question('Digite o nome do aluno: ', (nomeAluno) => {
    const alunoExistente = alunos.find((aluno) => aluno.nome === nomeAluno);
    if (alunoExistente) {
      console.log('Aluno já cadastrado.');
      menu();
    } else {
      alunos.push({ nome: nomeAluno, notas: [] });
      console.log(`Aluno "${nomeAluno}" cadastrado com sucesso.`);
      menu();
    }
  });
}

// Função para cadastrar notas para um aluno existente
function cadastrarNotas() {
  rl.question('Digite o nome do aluno: ', (nomeAluno) => {
    const aluno = alunos.find((aluno) => aluno.nome === nomeAluno);
    if (!aluno) {
      console.log('Aluno não encontrado.');
      menu();
    } else {
      rl.question('Digite as notas do aluno (separadas por espaço): ', (notasInput) => {
        const notas = notasInput.split(' ').map(parseFloat);
        if (notas.some(isNaN)) {
          console.log('Digite notas válidas.');
          cadastrarNotas(); // Peça novamente as notas em caso de entrada inválida.
        } else {
          aluno.notas = notas.map(Math.round);
          console.log(`Notas do aluno "${nomeAluno}" cadastradas com sucesso.`);
          menu();
        }
      });
    }
  });
}

// Função para calcular a média de um conjunto de notas
function calcularMedia(notas) {
  const soma = notas.reduce((total, nota) => total + nota, 0);
  return Math.round(soma / notas.length);
}

// Função para exibir o boletim de um aluno
function exibirBoletim() {
  rl.question('Digite o nome do aluno: ', (nomeAluno) => {
    const aluno = alunos.find((aluno) => aluno.nome === nomeAluno);
    if (!aluno) {
      console.log('Aluno não encontrado.');
      menu();
    } else {
      const media = calcularMedia(aluno.notas);
      let status;
      if (media >= 7) {
        status = 'Aprovado';
      } else if (media >= 5) {
        status = 'Em Recuperação';
      } else {
        status = 'Reprovado';
      }
      console.log(`Nome: ${aluno.nome}`);
      console.log(`Notas: ${aluno.notas.join(', ')}`);
      console.log(`Média: ${media}`);
      console.log(`Status: ${status}`);
      menu();
    }
  });
}

// Função para exibir o menu principal
function menu() {
  console.log('\nMenu:');
  console.log('1. Cadastrar Aluno');
  console.log('2. Cadastrar Notas');
  console.log('3. Exibir Boletim');
  console.log('4. Sair');

  rl.question('Digite o número da opção desejada: ', (opcao) => {
    switch (opcao) {
      case '1':
        cadastrarAluno();
        break;
      case '2':
        cadastrarNotas();
        break;
      case '3':
        exibirBoletim();
        break;
      case '4':
        console.log('Saindo do programa.');
        rl.close();
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
        menu();
    }
  });
}

console.log('Bem-vindo ao Sistema Acadêmico!');
menu(); // Inicia o menu principal

