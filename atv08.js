class ContaBancaria {
  constructor(agencia, numero, tipo, saldo) {
    this.agencia = agencia;  // Número da agência
    this.numero = numero;    // Número da conta
    this.tipo = tipo;        // Tipo da conta (por exemplo, conta corrente)
    this._saldo = saldo;     // Saldo da conta (marcado como privado com prefixo _)
  }

  // Getter para obter o saldo
  get saldo() {
    return this._saldo;
  }

  // Setter para atualizar o saldo
  set saldo(novoSaldo) {
    this._saldo = novoSaldo;
  }

  // Método para realizar um saque
  sacar(valor) {
    if (valor > 0 && valor <= this._saldo) {
      this._saldo -= valor;
      console.log(`Saque de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log("Saldo insuficiente ou valor de saque inválido.");
    }
  }

  // Método para realizar um depósito
  depositar(valor) {
    if (valor > 0) {
      this._saldo += valor;
      console.log(`Depósito de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log("Valor de depósito inválido.");
    }
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(agencia, numero, cartaoCredito, saldo = 0) {
    super(agencia, numero, "conta corrente", saldo);  // Chama o construtor da classe base
    this._cartaoCredito = cartaoCredito;  // Adiciona o atributo específico de Conta Corrente
    this.tipo = "conta corrente"; // Define o tipo como "conta corrente" por padrão
  }

  // Getter para obter o cartão de crédito
  get cartaoCredito() {
    return this._cartaoCredito;
  }

  // Setter para atualizar o cartão de crédito
  set cartaoCredito(novoCartaoCredito) {
    this._cartaoCredito = novoCartaoCredito;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, "conta poupança", saldo); // Chama o construtor da classe base
  }
}

class ContaUniversitaria extends ContaBancaria {
  constructor(agencia, numero, saldo = 0) {
    super(agencia, numero, "conta universitária", saldo); // Chama o construtor da classe base
  }

  // Sobrescreve o método sacar para limitar o valor máximo
  sacar(valor) {
    if (valor > 0 && valor <= 500 && valor <= this._saldo) {
      this._saldo -= valor;
      console.log(`Saque de R$ ${valor} realizado com sucesso.`);
    } else {
      console.log("Valor de saque inválido.");
    }
  }
}

// Exemplo de uso das classes
const contaCorrente = new ContaCorrente("001", "12345", 1000, 2000);
contaCorrente.sacar(500); // Exemplo de saque
contaCorrente.depositar(1000); // Exemplo de depósito

const contaUniversitaria = new ContaUniversitaria("002", "54321", 800);
contaUniversitaria.sacar(300); // Exemplo de saque dentro do limite
contaUniversitaria.sacar(600); // Exemplo de saque acima do limite

const contaPoupanca = new ContaPoupanca("003", "67890", 5000);
contaPoupanca.depositar(1000); // Exemplo de depósito na conta poupança
