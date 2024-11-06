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

for (let rowIndex = 0; rowIndex < rows; rowIndex++) { //Aqui consiste no Loop para as novas linhas
  const tileRow = document.createElement("div"); // Criação de uma nova linha
  tileRow.setAttribute("id", "row" + rowIndex); //define o indicador da linha
  tileRow.setAttribute("class", "tile-row"); // define a classe da linha

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) { //Loop para as colunas
    const tileColumn = document.createElement("div"); //Cria uma nova coluna(tile)
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute("class", "tile-column"); //define o identificador da cluna
    tileRow.append(tileColumn); //Define a classe da coluna
  }
  tiles.append(tileRow); 
}

const handleKeyboardOnClick = (key) => {
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key
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
  console.log("Apaga");
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<";
backspaceAndEnterRow.append(backspaceButton);

const handleEnter = () => {
  console.log("verifica palavra");
};

const enterButton = document.createElement("button");
enterButton.addEventListener("click", handleEnter);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);
