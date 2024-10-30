// Select HTML elements
const billInput = document.getElementById('total');
const tipButtons = document.querySelectorAll('.buttons button');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.querySelector('.tip-amount p:last-child');
const totalDisplay = document.querySelector('.total p:last-child');
const resetButton = document.getElementById('Reset');

// Default variables for calculations
let bill = 0;
let tipPercentage = 0;
let people = 1;

// Function to calculate and display the tip and total per person
function calculateTip() {
  if (people <= 0) {
    alert("Number of people can't be zero or negative!");
    return;
  }
  
  const tipAmount = (bill * tipPercentage) / people;
  const total = (bill / people) + tipAmount;

  // Display the calculated values
  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Event listener for bill input
billInput.addEventListener('input', () => {
  bill = parseFloat(billInput.value) || 0;
  calculateTip();
});

// Event listeners for tip percentage buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons and add to clicked one
    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Set tip percentage based on button text (remove % symbol and parse as number)
    tipPercentage = parseFloat(button.textContent) / 100;
    customTipInput.value = ''; // Clear custom tip input if a button is selected
    calculateTip();
  });
});

// Event listener for custom tip input
customTipInput.addEventListener('input', () => {
  tipPercentage = parseFloat(customTipInput.value) / 100 || 0;
  tipButtons.forEach(button => button.classList.remove('active')); // Remove active class from buttons
  calculateTip();
});

// Event listener for number of people input
peopleInput.addEventListener('input', () => {
  people = parseInt(peopleInput.value) || 1;
  calculateTip();
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  // Reset all values
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '1';
  tipButtons.forEach(button => button.classList.remove('active'));
  bill = 0;
  tipPercentage = 0;
  people = 1;
  tipAmountDisplay.textContent = '$0.00';
  totalDisplay.textContent = '$0.00';
});
