const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6; // linhas
const columns = 5; //colunas
let currentRow = 0;
let currentColumn = 0;

let palavra = "VASCO"
let palavraMap = {}
for (let index = 0; index < palavra.length; index++){
  palavraMap[palavra[index]] = index
}
const guesses = []

for (let rowIndex = 0; rowIndex < rows; rowIndex++) { //Aqui consiste no Loop para as novas linhas
  guesses[rowIndex] = new Array(columns)
  const tileRow = document.createElement("div"); // Criação de uma nova linha
  tileRow.setAttribute("id", "row" + rowIndex); //define o indicador da linha
  tileRow.setAttribute("class", "tile-row"); // define a classe da linha

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) { //Loop para as colunas
    const tileColumn = document.createElement("div"); //Cria uma nova coluna(tile)
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute("class", rowIndex === 0 ? "tile-column typing" : "tile-column disabled"); //define o identificador da cluna
    tileRow.append(tileColumn); //Define a classe da coluna
    guesses[rowIndex][columnIndex] = ""
  }
  tiles.append(tileRow); 
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("")
  if(guess.length !== columns){
    return;
  }

  var currentColumns = document.querySelectorAll(".typing")
  for (let index = 0; index < columns; index++) {
    const letter = guess[index]
    if(palavraMap[letter] === undefined) {
      currentColumns[index].classList.add("wrong")
    } else{
      if(palavraMap[letter] === index) {
        currentColumns[index].classList.add("right")
      } else {
        currentColumns[index].classList.add("displaced")
      }
    }
  }
  if(guess === palavra) {
    window.alert('Parabens você acertou!!!')
    return
  } {
      if(currentRow === rows -1){
        window.alert("errou")
      } else {
        moveToNextRow()
      }
  } 
};

const moveToNextRow = () => {
  var typingColumns = document.querySelectorAll(".typing")
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove("typing")
    typingColumns[index].classList.add('disabled') 
  }
  currentRow++
  currentColumn=0

  const currentRowE1 = document.querySelector("#row"+currentRow)
  var currentColumns = currentRowE1.querySelectorAll(".tile-column")
  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove("disabled")
    currentColumns[index].classList.add('typing') 
  }
}

//Toda vez que uma tentativa for realizada
const handleKeyboardOnClick = (key) => {
  if(currentColumn === columns){
    return
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key
  guesses[currentRow][currentColumn] = key
  currentColumn++
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button"); //Cria novo button
    buttonElement.textContent = key; //define o texto do butao como tecla
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if(currentColumn == 0) {
    return
  }
  currentColumn--
  guesses[currentRow][currentColumn] = ""
  const tile = document.querySelector("#row"+currentRow+"column"+currentColumn)
  tile.textContent = ""
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<";
backspaceAndEnterRow.append(backspaceButton);



const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

/*
document.onkeydown = function (evt) {
  evt = evt || window.evt
  if(evt.key === "Enter") {
    checkGuess();
  } else if (evt.key === "Backspace"){
    handleBackspace()
  } else{
    handleKeyboardOnClick(evt.key.toUpperCase())
  }
}
  */