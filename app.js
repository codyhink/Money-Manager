const description = document.getElementById("description");
const transactions = document.querySelector(".items");
const amount = document.getElementById("amount");
const submitButton = document.getElementById("submit");
const form = document.getElementById("addNewTransaction");
const trash = document.getElementById("trash");
const listItem = document.querySelectorAll(".item");

let redGreen;

// Delete Transaction
transactions.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Capture user inputs for new item
submitButton.addEventListener("click", function addTransaction(e) {
  e.preventDefault();
  const addedDescription = description.value.trim();
  const userAmount = amount.value.trim();
  function radioValue() {
    const creditDebit = document.getElementsByName("plus-minus");
    for (i = 0; i < creditDebit.length; i++) {
      if (creditDebit[i].checked) {
        transactionCat = creditDebit[i].value;
      }
    }
  }

  radioValue();
  if (transactionCat == "expense") {
    redGreen = "credit";
  } else {
    redGreen = "debit";
  }

  newTransaction(addedDescription, redGreen, userAmount);
  form.reset();
});

// Template for new item in transactions
const newTransaction = (addedDescription, redGreen, userAmount) => {
  const newItem = `
  <div class="item">
  <p>${addedDescription}</p>
  <p class="${redGreen}">$${userAmount}</p>
  <i class="fa-solid fa-trash delete"></i>


  </div>
  `;

  transactions.innerHTML += newItem;
};
