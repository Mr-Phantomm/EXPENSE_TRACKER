const groupDetails=document.querySelector("#group-details");
const groupDetailsName=document.querySelector("#Group-Name-Details");
const groupDetailDes=document.querySelector("#Group-Desc-Details");
const groupUserList=document.querySelector("#List-of-Users");

function loadGroupRight(group){
    groupUserList.innerHTML="";

    
    if(currentGroupRight!=="groupDetails"){

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
    console.log(userstoLoad);
    for(let i=0;i<userstoLoad.length;i++){
        let user=users.find((user)=>user.Id===parseInt(userstoLoad[i]));
        console.log(user);
        if(user){
            let li=document.createElement("li");
            li.textContent=user.Name;
            groupUserList.appendChild(li);
        }
    }


}