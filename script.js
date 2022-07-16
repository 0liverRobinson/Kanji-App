const targetCharacter = document.getElementById("Target");
const buttonHolder = document.getElementById("buttons");
const meanings = document.getElementById("Meanings");

let kanjiJSON;
let kanjiKeys;

let isLoaded = false;
let kanjiPacks = [];

LoadKanji();

function Main() {
  isLoaded = true;

  PackKanji();
  GenerateKanji(5);
  GenerateKun(5);
}

function PackKanji() {
  for (let i = 0; i < 5; i++) {
    kanjiPacks[i] = [];
    for (let j = 0; j < kanjiKeys.length; j++) {
      if (kanjiJSON[kanjiKeys[j]]["jlpt_new"] == i + 1) {
        let temp = {
          character: kanjiKeys[j],
          data: kanjiJSON[kanjiKeys[j]],
        };
        kanjiPacks[i].push(temp);
      }
    }
  }
}

function GenerateKun(level) {
  let noOfButtons = 16;

  let buttons = [];

  buttonHolder.innerHTML = "";

  for (let i = 0; i < noOfButtons; i++) {
    let pack = kanjiPacks[level - 1];
    let randomIndex = Math.floor(Math.random() * pack.length);
    let str = pack[randomIndex]["data"]["readings_kun"];
    if (str == "") {
      i--;
      continue;
    }

    buttons.push(document.createElement("button"));
    buttons[i].innerHTML = str;
    buttonHolder.appendChild(buttons[i]);
  }
}

function GenerateKanji(level) {
  let pack = kanjiPacks[level - 1];
  let randomIndex = Math.floor(Math.random() * pack.length);
  let character = pack[randomIndex]["character"];
  targetCharacter.innerHTML = character;
  meanings.innerHTML = kanjiJSON[character]["wk_meanings"];
  
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
