const groupExpensediv=document.querySelector("#group-expense-addition");
const groupExpenseForm=document.querySelector("#group-expense-form");
const groupExpenseType=document.querySelector("#group-expense-type");
const groupCustomExpenseType=document.querySelector("#group-custom-expense-type");
const groupExpenseAmount=document.querySelector("#group-expense-amount");
const groupDescription=document.querySelector("#group-Description");

let currentGroup=null;
function addExpense(group){
    currentGroup=group;
    if(currentGroupRight!=="groupAddExpense"){
        displayNoneRight();
        groupRight.style.display="flex";
        groupExpensediv.style.display="flex";
        currentGroupRight=groupExpensediv.dataset.group;
    }
    else{
        groupRight.style.display="none";
        groupExpensediv.style.display="none";
        currentGroupRight="none";
    }  
}

groupExpenseType.addEventListener("change",()=>{
    if(groupExpenseType.value==="Custom"){
        groupCustomExpenseType.style.display="block";
    }
    else{
        groupCustomExpenseType.style.display="none";
        groupCustomExpenseType.value='';
    }
})


groupExpenseForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let expenseType;
    let expenseAmount;
    let expenseDescription;
    if(groupExpenseType.value==="Custom"){
        expenseType=groupCustomExpenseType.value;
    }
    else{
        expenseType=groupExpenseType.value;
    }

    expenseType=expenseType.trim();
    expenseAmount=groupExpenseAmount.value;
    expenseDescription=groupDescription.value.trim();
    let expense={
        "type":expenseType,
        "amount":expenseAmount,
        "desc":expenseDescription,
        "user":currentUser()
    };
    console.log(expense);
    currentGroup.expenses.push(expense);
    localStorage.setItem("groups",JSON.stringify(groups));
    groupExpenseForm.reset();
})


function displayNoneRight(){
    groupRight.style.display="none";
    groupDetails.style.display="none";
    groupExpensediv.style.display="none";
    groupCreation.style.display="none";
    currentGroupRight="none";
}