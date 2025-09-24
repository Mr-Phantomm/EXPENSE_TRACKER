
const expenseForm=document.querySelector("#expense-form");
const expenseType=document.querySelector("#expense-type");
const customType=document.querySelector("#custom-expense-type");
const amount=document.querySelector("#expense-amount");
const description=document.querySelector("#Description");
const futureCheck=document.querySelector("#add-to-checklist");
const expenseTable = document.querySelector("#list-of-expenses");
const futurelist=document.querySelector("#checklist");
const sidebarLinks=document.querySelectorAll(".sidebar-link")
const personalView=document.querySelector("#personal");
const groupView=document.querySelector("#group");
const groupAddIcon=document.querySelector("#group-add-icon");
let expenseCounter = 1;
let currentView="personal";


 const savedExpense=JSON.parse(localStorage.getItem('expense'))||[];
    savedExpense.forEach(expenses => {
        const newRow=document.createElement('tr');
        newRow.innerHTML=`
        <td>${expenseCounter}</td>
        <td>${expenses.type}</td>
        <td>${expenses.amount}</td>
        <td>${expenses.description}</td>
        `
        expenseTable.appendChild(newRow);
        expenseCounter++;
        if(expenses.ischecked){
            const checklistItem=document.createElement('li');
            checklistItem.textContent=`${expenses.type}: ${expenses.amount} - ${expenses.description}`;
            futurelist.appendChild(checklistItem);
        }
    });


expenseType.addEventListener('change',()=>{
    if(expenseType.value==='Custom'){
        customType.style.display='block';
    }
    else{
        customType.style.display='none';
        customType.value='';
    }
});

expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let expenseTypeForm=expenseType.value;
    if(expenseTypeForm === 'Custom'){
        expenseTypeForm = customType.value.trim();
    }

    let amountForm = parseFloat(amount.value).toFixed(2);
    let descriptionForm = description.value.trim();

    if(!expenseTypeForm||isNaN(amountForm)||amountForm<=0){
        alert('Please fill in valid expense');
        return;
    }
    
    const newRow=document.createElement('tr');
    newRow.innerHTML=`
    <td>${expenseCounter}</td>
    <td>${expenseTypeForm}</td>
    <td>${amountForm}</td>
    <td>${descriptionForm}</td>
    `
    expenseTable.appendChild(newRow);
    expenseCounter++;
    if(futureCheck.checked){
        const checklistItem=document.createElement('li');
        checklistItem.textContent=`${expenseTypeForm}: ${amountForm} - ${descriptionForm}`;
        futurelist.appendChild(checklistItem);
    }
    expenseForm.reset();
    customType.style.display='none';
    let expensenow={
        type:expenseTypeForm,
        amount:amountForm,
        description:descriptionForm,
        ischecked:futureCheck.checked
    }
    savedExpense.push(expensenow);
    localStorage.setItem('expense',JSON.stringify(savedExpense));
});

sidebarLinks.forEach((link)=>{

    link.addEventListener("click",(e)=>{
        e.preventDefault();
        sidebarLinks.forEach((activeClass)=>activeClass.classList.remove("active"));
        link.classList.add("active");
        
        currentView=link.dataset.view;

        if(currentView==="personal"){
            personalView.style.display="flex";
            groupView.style.display="none";
        }
        else{
            personalView.style.display="none";
            groupView.style.display="flex";
        }

    })
})