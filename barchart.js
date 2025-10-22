const canvas=document.querySelector("#barchart");
const ctx=canvas.getContext("2d");

function loadGraph(myExpense,otherExpense){
    let originalMyExpense=myExpense;
    let originalOtherExpense=otherExpense;
    let groundY=200;
    let max=Math.max(myExpense,otherExpense);
    let scaleFactor = (groundY * 0.8) / max;
    myExpense=myExpense*scaleFactor;
    otherExpense=otherExpense*scaleFactor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#111";
    ctx.fillRect(50,groundY-myExpense,60,myExpense);
    ctx.fillStyle = "#36A2EB";
    ctx.fillRect(50 + 60 + 10, groundY - otherExpense, 60, otherExpense)
    ctx.fillStyle = '#000'; 
    ctx.font = '12px Arial';  
    ctx.textAlign = 'center';
    ctx.fillText("My",80,groundY+10)
    
    ctx.fillStyle = '#000'; 
    ctx.font = '12px Arial';  
    ctx.textAlign = 'center';
    ctx.fillText("Others",150,groundY+10)

    ctx.fillStyle = '#000'; 
    ctx.font = '12px Arial';  
    ctx.textAlign = 'center';
    ctx.fillText(originalMyExpense,80,groundY-myExpense-5);
    ctx.fillStyle = '#000'; 
    ctx.font = '12px Arial';  
    ctx.textAlign = 'center';
    ctx.fillText(originalOtherExpense,150,groundY-otherExpense-5);

}
loadGraph(200,400);