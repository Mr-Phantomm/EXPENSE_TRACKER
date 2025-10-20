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
const groupRight=document.querySelector("#group-right");
const groupCreation=document.querySelector("#group-creation");
const userPhoto=document.querySelector("#user-photo");
let currentGroupRight="none";
let expenseCounter = 1;
let currentView="personal";

// Group js
groupAddIcon.addEventListener("click",()=>{
    
    if(currentGroupRight!=="groupCreate"){
    groupRight.style.display="flex";
    groupCreation.style.display="flex";
    currentGroupRight=groupCreation.dataset.group;
    // console.log(currentGroupRight);
    }
    else{
        groupRight.style.display="none";
        groupCreation.style.display="none";
        currentGroupRight="none";
        // console.log(currentGroupRight);
    }
})




//Personal
function personalreload(){
    userPhoto.src="/assets/picture"+(currentUser().Id%7)+".png";
    document.querySelector("#user-name").innerHTML=currentUser().Name;
    const savedExpense=JSON.parse(localStorage.getItem(`expense_${currentUser().Id}`))||[];
    expenseCounter=1;
    futurelist.innerHTML="";
    while(expenseTable.rows.length>1)expenseTable.deleteRow(1);
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

}
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
        "type":expenseTypeForm,
        "amount":amountForm,
        "description":descriptionForm,
        "ischecked":futureCheck.checked
    }
    let savedExpense = JSON.parse(localStorage.getItem(`expense_${currentUser().Id}`)) || [];
    savedExpense.push(expensenow);
    localStorage.setItem(`expense_${currentUser().Id}`,JSON.stringify(savedExpense));
    });

// Sidebar
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
personalreload();