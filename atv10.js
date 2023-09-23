function isMagicSquare(matrix) {
    const n = matrix.length; // Obtém a ordem da matriz (n x n)
  
    // Verifica se a matriz é quadrada
    if (!isSquareMatrix(matrix)) {
      return false;
    }
  
    // Calcula a soma esperada de uma linha, coluna ou diagonal
    const expectedSum = (n * (n * n + 1)) / 2;
  
    // Verifica a soma das linhas e colunas
    for (let i = 0; i < n; i++) {
      let rowSum = 0;
      let colSum = 0;
      
      for (let j = 0; j < n; j++) {
        rowSum += matrix[i][j];
        colSum += matrix[j][i];
      }
  
      if (rowSum !== expectedSum || colSum !== expectedSum) {
        return false;
      }
    }
  
    // Verifica a soma da diagonal principal e secundária
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
  
    for (let i = 0; i < n; i++) {
      mainDiagonalSum += matrix[i][i];
      secondaryDiagonalSum += matrix[i][n - 1 - i];
    }
  
    // Se todas as verificações passarem, é um Quadrado Mágico
    return mainDiagonalSum === expectedSum && secondaryDiagonalSum === expectedSum;
  }
  
  // Função auxiliar para verificar se a matriz é quadrada
  function isSquareMatrix(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      if (matrix[i].length !== n) {
        return false;
      }
    }
    return true;
  }
  
  
  const matrix = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
  ];

//condição para retornar "True" se a matriz for um Quadrado Mágico e "False" caso contrário.

  if (isMagicSquare(matrix)) {
    console.log("True");
  } else {
    console.log("False");
  }
  