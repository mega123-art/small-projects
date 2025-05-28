document.addEventListener("DOMContentLoaded", () => {
  const expenseform = document.getElementById("expense-form");
  const expensename = document.getElementById("expense-name");
  const expenseamt = document.getElementById("expense-amount");
  const expenselist = document.getElementById("expense-list");
  const totalamt = document.getElementById("total-amount");
  let expenses = JSON.parse(localStorage.getItem('expenses'))|| [];
  let totalamount = calculatetotal();
  renderExpenses()
  function calculatetotal() {
    return expenses.reduce((acc, currv) => acc + currv.amount, 0);
  }
  expenseform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expensename.value.trim();
    const amt = parseFloat(expenseamt.value.trim());

    if (name !== "" && !isNaN(amt) && amt > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amt,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      updateTotal();
      renderExpenses()
      expenseamt.value = "";
      expensename.value = "";
    }
  });
  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function updateTotal(){
    totalamount=calculatetotal()
    totalamt.textContent=totalamount.toFixed(2)
  }

  function renderExpenses(){
    expenselist.innerHTML="",
    expenses.forEach((expense)=> {
        const li=document.createElement("li")
        li.innerHTML=`
        ${expense.name}- $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `
        expenselist.append(li)
        
    });
   
  }
  expenselist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const expenseid=parseInt(e.target.getAttribute("data-id"))
        expenses=expenses.filter((expense)=>expense.id!==expenseid)
        saveExpensesToLocal()
        renderExpenses()
        updateTotal()
    }
  });
  
});
