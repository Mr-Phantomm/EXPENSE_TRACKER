const groupCreationForm=document.querySelector("#group-creation-form");

function reloadUser(newId){
    listOfUsers.innerHTML="";
    users.forEach(u => {
        if(u.Id==newId)return;
        let item=document.createElement("li");
        let innerCheck=document.createElement("input");
        innerCheck.type="checkbox";
        innerCheck.value=u.id;
        item.appendChild(innerCheck);
        item.innerHTML+=u.Name;
        listOfUsers.append(item);
    });
}
reloadUser(id);
function addUserToGroupList(UserID,newName){
    let item=document.createElement("li");
    let innerCheck=document.createElement("input");
    innerCheck.type="checkbox";
    innerCheck.value=UserID;
    item.appendChild(innerCheck);
    item.innerHTML+=newName;
    listOfUsers.append(item);
}

groupCreationForm.addEventListener("submit",(e)=>{
    e.preventDefault();

})
