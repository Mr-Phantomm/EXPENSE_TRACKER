const groupExpensediv=document.querySelector("#group-expense-addition");
function addExpense(group){
    if(currentGroupRight!=="groupAddExpense"){
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