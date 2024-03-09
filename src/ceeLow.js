
// ceeLoDice.js
// Function to simulate a single dice roll
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  // Function to simulate rolling three dice for Cee-Lo
  function rollDice() {
    const diceResults = [];
    for (let i = 0; i < 3; i++) {
      diceResults.push(rollDie());
    }
    return diceResults;
  }
  
  // Function to determine the outcome of a Cee-Lo roll
  function getOutcome(diceResults) {
    const sortedResults = diceResults.sort((a, b) => a - b);
  
    // Check for automatic wins or losses
    if (sortedResults[0] === 4 && sortedResults[1] === 5 && sortedResults[2] === 6) {
      return "Automatic Win (Cee-Lo)";
    } else if (sortedResults[0] === 1 && sortedResults[1] === 2 && sortedResults[2] === 3) {
      return "Automatic Loss (1-2-3)";
    }
  
    // Check for point number
    if (sortedResults[0] === sortedResults[1] || sortedResults[1] === sortedResults[2]) {
      const pointNumber = sortedResults[2] === sortedResults[0] ? sortedResults[1] : sortedResults[0];
      return `Point Number: ${pointNumber}`;
    }
  
    // Non-point roll
    return `Non-Point Roll: ${sortedResults[2]}`;
  }

  function Win() {
    return "4 5 6"
  }
  
  //Lose comment
  function Lose() {
    return "1 2 3"
  }


  module.exports = { Win, Lose, getOutcome, rollDice, rollDie };