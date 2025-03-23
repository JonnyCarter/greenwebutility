const ceeLow = require("./ceeLow.js");
const aprc = require('./APRCService.js');
const LoanRequest= aprc.LoanRequest;
const Fee= aprc.Fee;
const RateChange= aprc.RateChange;

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
module.exports = { add, helloNpm ,ceeLowDie, ceeLowWin,ceeLowLose, aprc, LoanRequest, Fee, RateChange };
