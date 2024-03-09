const ceeLow = require("./ceeLow.js");

function add(a, b) {
  return a + b;
}

function helloNpm() {
  return "Hello NPM!"
}

function ceeLowWin(){
 return  ceeLow.Win();
}

function ceeLowLose(){
  return  ceeLow.Lose();
 }

 function ceeLowDie(){
  return  ceeLow.rollDice();
 }

 
module.exports = { add, helloNpm ,ceeLowDie, ceeLowWin,ceeLowLose };