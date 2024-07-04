const description = document.getElementById("description");
const transactions = document.querySelector(".items");
const amount = document.getElementById("amount");
const submitButton = document.getElementById("submit");
const form = document.getElementById("addNewTransaction");
const trash = document.getElementById("trash");
const listItem = document.querySelectorAll(".item");
const checkingAccount = document.querySelector("#checking");
const savingsAccount = document.querySelector("#savings");

let checkingTotal = 5600;
let savingsTotal = 15000;

checkingAccount.textContent = `$${addCommasToNumber(checkingTotal)}`;
savingsAccount.textContent = `$${addCommasToNumber(savingsTotal)}`;

let redGreen;

// Delete Transaction
transactions.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		e.target.parentElement.remove();
	}
});

// Capture user inputs for new item
submitButton.addEventListener("click", addTransaction);

// Add a new transaction
function addTransaction(e) {
	e.preventDefault();
	const addedDescription = description.value.trim();
	const userAmount = amount.value.trim();
	const transactionCat = document.querySelector(
		'input[name="plus-minus"]:checked'
	).value;
	const accountSelected = document.querySelector("#choose-account").value;
	console.log(accountSelected);

	transactionCat === "expense" ? (redGreen = "credit") : (redGreen = "debit");

	newTransaction(addedDescription, redGreen, userAmount);
	updateAccount(accountSelected, transactionCat, userAmount);

	accountSelected === "checking"
		? addCommasToNumber(checkingTotal)
		: addCommasToNumber(savingsTotal);

	form.reset();
}

// Template for new item in transactions
const newTransaction = (addedDescription, redGreen, userAmount) => {
	const newItem = document.createElement("div");
	newItem.classList.add("item");
	newItem.innerHTML = ` 
  <p>${addedDescription}</p>
  <p class="${redGreen}">$${userAmount}</p>
  <i class="fa-solid fa-trash delete"></i>
  `;

	transactions.appendChild(newItem);
};

function updateAccount(account, plusMinus, amount) {
	if (account === "checking") {
		plusMinus === "expense"
			? (checkingTotal -= Number(amount))
			: (checkingTotal += Number(amount));
	} else {
		plusMinus === "expense"
			? (savingsTotal -= amount)
			: (savingsTotal += amount);
	}

	checkingAccount.textContent = `$${addCommasToNumber(checkingTotal)}`;
	savingsAccount.textContent = `$${addCommasToNumber(savingsTotal)}`;
}

// Add commas to number in the DOM
function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
