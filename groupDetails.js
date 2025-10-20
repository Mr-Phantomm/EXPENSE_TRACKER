const groupDetails=document.querySelector("#group-details");
const groupDetailsName=document.querySelector("#Group-Name-Details");
const groupDetailDes=document.querySelector("#Group-Desc-Details");
const groupUserList=document.querySelector("#List-of-Users");
const groupTable=document.querySelector("#list-of-expenses2");
function loadGroupRight(group){
    groupUserList.innerHTML="";
    while(groupTable.rows.length>1)groupTable.deleteRow(1);
    
    if(currentGroupRight!=="groupDetails"){
        displayNoneRight();
        groupRight.style.display="flex";
        groupDetails.style.display="flex";
        currentGroupRight=groupDetails.dataset.group;
    }
    else{
        groupRight.style.display="none";
        groupDetails.style.display="none";
        currentGroupRight="none";
    }

    groupDetailsName.textContent=group.Name;
    groupDetailDes.textContent=group.Desc;

    let userstoLoad=group.usersInvolved;
    // console.log(userstoLoad);
    for(let i=0;i<userstoLoad.length;i++){
        let user=users.find((user)=>user.Id===parseInt(userstoLoad[i]));
        // console.log(user);
        if(user){
            let li=document.createElement("li");
            li.textContent=user.Name;
            groupUserList.appendChild(li);
        }
    }
    let expense=group.expenses;
    console.log(group);
    let srno=1;
    expense.forEach(ex => {
        let tr=document.createElement("tr");
        let td=document.createElement("td");
        td.textContent=srno;
        tr.appendChild(td);
        let td2=document.createElement("td");
        td2.textContent=ex.type;

        let td3=document.createElement("td");
        td3.textContent=ex.amount;
        let td4=document.createElement("td");
        td4.textContent=ex.desc;
        let td5=document.createElement("td");
        td5.textContent=ex.user.Name;
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        srno++;
        groupTable.appendChild(tr);
    });



}