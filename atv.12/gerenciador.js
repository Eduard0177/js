// Classe ContaBancaria
class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    getSaldo() {
        return this.saldo;
    }

    setSaldo(saldo) {
        this.saldo = saldo;
    }

    sacar(valor) {
        this.saldo -= valor;
    }

    depositar(valor) {
        this.saldo += valor;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }

    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(cartaoCredito) {
        this.cartaoCredito = cartaoCredito;
    }
}

class ContaPoupanca extends ContaBancaria {
    // Não é necessário adicionar nada específico, pois herda tudo de ContaBancaria
}

class ContaUniversitaria extends ContaBancaria {
    sacar(valor) {
        if (valor > 500) {
            console.log("Saque não permitido para Conta Universitária acima de R$ 500.");
        } else {
            this.saldo -= valor;
        }
    }
}


// Lista para armazenar as contas
let listaContas = [];

// Função para inserir uma nova conta
function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let novaConta;

    // Criar instância da conta correspondente ao tipo selecionado
    if (tipo === "corrente") {
        const cartaoCredito = parseFloat(prompt("Digite o limite do cartão de crédito:"));
        novaConta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === "poupanca") {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "universitaria") {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    // Adicionar a nova conta à lista
    listaContas.push(novaConta);

    // Limpar os campos do formulário
    document.getElementById("agencia").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("saldo").value = "";

    alert("Conta inserida com sucesso!");
}


// Função para deletar uma conta
function deletarConta() {
    const selectContas = document.getElementById("contas");
    const indiceSelecionado = selectContas.selectedIndex;

    if (indiceSelecionado !== -1) {
        listaContas.splice(indiceSelecionado, 1);
        alert("Conta deletada com sucesso!");
    } else {
        alert("Selecione uma conta para deletar.");
    }
}

// Função para visualizar contas
function visualizarContas() {
    const listaContasHTML = document.getElementById("lista-contas");
    listaContasHTML.innerHTML = "";

    listaContas.forEach((conta) => {
        const itemLista = document.createElement("li");
        itemLista.textContent = `Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: R$ ${conta.saldo.toFixed(2)}`;
        listaContasHTML.appendChild(itemLista);
    });
}
