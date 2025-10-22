const UserAddButton=document.querySelector("#user-add");
const userSwitch=document.querySelector("#user-switch");
const listOfUsers=document.querySelector("#list-of-users-for-groups");
let id= parseInt(localStorage.getItem("CurrentUserId"))||0;
let users=JSON.parse(localStorage.getItem("Users"))||[{'Id':0,"Name":"Arun"}];

users.forEach((user)=>{
    let item = document.createElement("option");
    item.value=user.Id;
    item.innerHTML=`${user.Name}`;
    userSwitch.appendChild(item);
    
});
userSwitch.value = id;
function currentUser(){
    return (users.find(u=>u.Id==id)||users[0]);
}

UserAddButton.addEventListener("click",()=>{
    let inputName=prompt("What is the new Users Name");
    if(inputName.length!=0){
        addUser(users.length,inputName);
        addUserToGroupList(users.length-1,inputName);
    }
});

function addUser(newId,newName){
    let newUser={'Id':newId,"Name":newName};
    users.push(newUser);
    localStorage.setItem("Users",JSON.stringify(users));

    let item = document.createElement("option");
    item.value=newId;
    item.innerHTML=`${newName}`;
    userSwitch.appendChild(item);
}

function switchUser(newId){
    id=newId;
    personalreload();
    reloadUser(newId);
    reloadList(newId);
    
    localStorage.setItem("CurrentUserId",id.toString());
}

userSwitch.addEventListener("change",()=>{
    switchUser(userSwitch.value);
})

