const targetCharacter = document.getElementById("Target");
const buttonHolder = document.getElementById("buttons");

let kanjiJSON;
let kanjiKeys;

let isLoaded = false;

LoadKanji();

function Main() {
  isLoaded = true;

  RandomKanji();

  GenerateRandomButtons();
}

function GenerateRandomButtons() {
  let noOfButtons = 16;

  let buttons = [];

  buttonHolder.innerHTML = "";
  for (let i = 0; i < noOfButtons; i++) {
    let randomIndex = Math.floor(Math.random() * kanjiKeys.length);
    let randomChar = kanjiKeys[randomIndex];
    let str = kanjiJSON[randomChar]["readings_kun"];
    if (str == ""){ i--; continue;}

    buttons.push(document.createElement("button"));
    buttons[i].innerHTML = str;
    buttonHolder.appendChild(buttons[i]);
  }
}

function RandomKanji() {
  let randomIndex = Math.floor(Math.random() * kanjiKeys.length);
  let character = kanjiKeys[randomIndex];
  targetCharacter.innerHTML = character;
  return character;
}

async function LoadKanji() {
  let response = await fetch("./Kanji.json");

  if (response.ok) {
    kanjiJSON = await response.json();
    kanjiKeys = Object.keys(kanjiJSON);
    Main();
  } else {
    alert("Load Error: " + response.status);
  }
}
