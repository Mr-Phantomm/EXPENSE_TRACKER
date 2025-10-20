const groupCreationForm=document.querySelector("#group-creation-form");
const groupNameInput=document.querySelector("#group-name");
const groupDesInput=document.querySelector("#group-description");
const listOfGroups=document.querySelector("#list-of-Groups");

const groups=JSON.parse(localStorage.getItem("groups"))||[];
let groupId=groups.length;

function reloadUser(newId){
    listOfUsers.innerHTML="";
    users.forEach(u => {
        if(u.Id==newId)return;
        let item=document.createElement("li");
        let innerCheck=document.createElement("input");
        innerCheck.type="checkbox";
        innerCheck.value=""+u.Id;
        innerCheck.classList.add("CheckBoxForIntake");
        item.appendChild(innerCheck);
        item.innerHTML+=u.Name;
        listOfUsers.append(item);
    });
}

reloadUser(id);

function reloadList(newId){
    listOfGroups.innerHTML="";
    let currentIdGroup = JSON.parse(localStorage.getItem(`Group_User_${newId}`))||[];
    let GroupPointer=0;
    let i=0;
    while(i<currentIdGroup.length&&GroupPointer<groups.length){
        if(groups[GroupPointer].id<currentIdGroup[i]){
            GroupPointer++;
        }
        else if(groups[GroupPointer].id==currentIdGroup[i]){

            let item=document.createElement("li");
            let nameDiv=document.createElement("div");

            nameDiv.classList.add("Group-Name");
            nameDiv.textContent=groups[GroupPointer].Name;
            let currentGroup=groups[GroupPointer];
            nameDiv.addEventListener("click",()=>loadGroupRight(currentGroup));


            item.appendChild(nameDiv);


            let buttondiv=document.createElement("div");
            buttondiv.classList.add("buttons");

            let buttonExpenseAdd=document.createElement("button");
            buttonExpenseAdd.classList.add("AddExpense");
            buttonExpenseAdd.textContent="Add Expense";

            buttonExpenseAdd.addEventListener("click",()=>{
                // Add Expense in`Group_Expense_${groups[GroupPointer].id}` 
                addExpense(currentGroup);
            })

            buttondiv.appendChild(buttonExpenseAdd);

            let deleteGroupButton=document.createElement("button");
            deleteGroupButton.classList.add("delete-group");
            deleteGroupButton.textContent="Delete"
            deleteGroupButton.addEventListener("click",()=>{
                alert("coming soon")
                // Delete the group for a specific user
            })

            buttondiv.appendChild(deleteGroupButton);
            item.appendChild(buttondiv);

            listOfGroups.appendChild(item);

            GroupPointer++;
            i++;
        }
        else{
            i++;
        }
        
    }
}

reloadList(id);

function addUserToGroupList(UserID,newName){
    let item = document.createElement("li");
    let innerCheck = document.createElement("input");
    innerCheck.type = "checkbox";
    innerCheck.value = UserID;
    innerCheck.class = "CheckBoxForIntake"
    item.appendChild(innerCheck);
    item.innerHTML+=newName;
    listOfUsers.append(item);
}

groupCreationForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let usersInvolved=[];
    let groupName=groupNameInput.value.trim();
    let groupDes=groupDesInput.value.trim();
    let Group={"id":groupId,"Name":groupName,"Desc":groupDes};
    groupId++; 
    let currentIdGroup = JSON.parse(localStorage.getItem(`Group_User_${id}`))||[];
    currentIdGroup.push(Group.id);
    usersInvolved.push(id);
    localStorage.setItem(`Group_User_${id}`,JSON.stringify(currentIdGroup));
    let checkBoxes=document.querySelectorAll(".CheckBoxForIntake");
    checkBoxes.forEach((box)=>{
        if(box.checked===true){
            currentIdGroup = JSON.parse(localStorage.getItem(`Group_User_${box.value}`))||[];
            currentIdGroup.push(Group.id);
            usersInvolved.push(box.value);
            // console.log(usersInvolved);
            localStorage.setItem(`Group_User_${box.value}`,JSON.stringify(currentIdGroup));
            console.log("Added" + box.value);
            
        }
    })
    Group.usersInvolved=usersInvolved;
    Group.expenses=[];
    groups.push(Group);
    localStorage.setItem("groups",JSON.stringify(groups));
    reloadList(id);
    groupCreationForm.reset();
    groupRight.style.display="none";
    groupCreation.style.display="none";
    currentGroupRight="none";


    })

