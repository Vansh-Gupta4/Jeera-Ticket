
let filterColor = document.querySelectorAll(".filter");  
let mainContainer = document.querySelector(".main-container");
let modalColors = document.querySelectorAll(".modal-color");   
let modalContainer = document.querySelector(".modal_container");
let taskBox = document.querySelector(".task_box");
let modalFlag = false;
let deleteState = false;
let plusBtn = document.querySelector(".plus");
let crossBtn = document.querySelector(".cross");
let iColor="black";  
let colors=["pink","blue","green","black"];
let filterContainers = document.querySelectorAll(".filter_color-container");
let infoBtn = document.querySelector(".information_container");
let body=document.body;


let allTasks = [];

if (localStorage.getItem("allTasks")) {
    let strArr = localStorage.getItem("allTasks");
    allTasks = JSON.parse(strArr);    

    for (let i = 0; i < allTasks.length; i++) {
        
        createTicketFromLocalStorage(allTasks[i]);
    }

}
function createTicketFromLocalStorage(taskObj) {
    let { id, color, task } = taskObj;    
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "ticket_container");
    taskContainer.innerHTML = `<div class="ticket_color ${color}"></div>
        <div class="ticket_desc_container">
        <div class="ticket_id">#${id}</div>
        <div class="ticket_desc" >${task}</div>
        </div>`;
    mainContainer.appendChild(taskContainer);
    taskContainer.addEventListener("click",deleteTask);
    addFunctionality(taskContainer);
}


for (let i = 0; i < filterColor.length; i++) {
    filterColor[i].addEventListener("click", function () {
        let classes = filterColor[i].getAttribute("class");
        // console.log(classes);
        let strArr = classes.split(" ");
        let color = strArr[1];
        let mainClasses = mainContainer.getAttribute("class");
        let mainCArr = mainClasses.split(" ");
        mainCArr[1] = color;
        mainClasses = mainCArr.join(" ");
        mainContainer.setAttribute("class", mainClasses);
    })
}
plusBtn.addEventListener("click", function() {
   
   modalContainer.style.display="flex";  
})
crossBtn.addEventListener("click",setDeleteState)

taskBox.addEventListener("keydown",function(e){   
    
    if (e.key == "Enter" && taskBox.value != "") {
        let taskContainer = document.createElement("div");  
        let task=taskBox.value;
        console.log(task)
        taskContainer.setAttribute("class", "ticket_container"); 
        let id = Math.random().toString(32).slice(2);
        taskContainer.innerHTML = `<div class="ticket_color ${iColor}"></div>   
             <div class="ticket_desc_container">
                 <div class="ticket_id">#${id}</div>
                 <div class="ticket_desc" >${task}</div>
             </div>`;  
             mainContainer.appendChild(taskContainer);

            
            let ticketObj = {}   
            ticketObj.task = task;
            ticketObj.color = iColor;
            ticketObj.id = id;
            allTasks.push(ticketObj);
            let strArr = JSON.stringify(allTasks);  
            localStorage.setItem('allTasks', strArr);
    
      
             modalContainer.style.display="none";   
             taskBox.value="";    
             iColor="black";
             addFunctionality(taskContainer);
             
             taskContainer.addEventListener("click",deleteTask);
    }
})

for(let i=0; i<modalColors.length; i++){
    modalColors[i].addEventListener("click", function(){  
        let color=modalColors[i].classList[1];  
        iColor=color;
        for(let j=0;j<modalColors.length;j++){
            
            modalColors[j].classList.remove("border");   
        }
        modalColors[i].classList.add("border");   
    })
}


function addFunctionality(taskContainer){
    let ticketColor=taskContainer.querySelector(".ticket_color"); 
    ticketColor.addEventListener("click",function(){   
        let cColor=ticketColor.classList[1];   
        let idx=colors.indexOf(cColor);   
        let newIdx=(idx+1)%4;   
        let newColor=colors[newIdx];  
        ticketColor.classList.remove(cColor);  
        ticketColor.classList.add(newColor);  

      
        let ticketIdElem = taskContainer.querySelector(".ticket_id");  
        let id = ticketIdElem.innerText;  
        id = id.slice(1);
        
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {   
                allTasks[i].color = newColor
                let strArr = JSON.stringify(allTasks);
                localStorage.setItem('allTasks', strArr);   
            }
        }

    })
}


//Filtering Logic
let prevColor = null;
for (let i = 0; i < filterContainers.length; i++) {

    filterContainers[i].addEventListener("click", function() {
        let child = filterContainers[i].children[0];    
        let color = child.classList[1];            

        if (prevColor == color) {     
            let ticketContainers = document.querySelectorAll(".ticket_container");   
            for (let j = 0; j < ticketContainers.length; j++) {    
                ticketContainers[j].style.display = "block";       
            }
            prevColor = null;
        } else {
            let ticketContainers = document.querySelectorAll(".ticket_container");  
            for (let j = 0; j < ticketContainers.length; j++) {    
                let ticketColor = ticketContainers[j].children[0]; 
                let mycolor = ticketColor.classList[1];           
                if (mycolor == color) {
                    ticketContainers[j].style.display = "block";   
                } else {
                    ticketContainers[j].style.display = "none";   
                }
            }
            prevColor = color;
        }


    })
} 






function setDeleteState(e) {  

    let crossBtn = e.currentTarget;
 
    if (deleteState == false) {
        crossBtn.classList.add("active");
    } else {
        crossBtn.classList.remove("active");
    }
    deleteState = !deleteState;
}
function deleteTask(e) {    
    let taskContainer = e.currentTarget;
    if (deleteState) {
        let TicketIDElem= taskContainer.querySelector(".ticket_id");
        
        let TicketID = TicketIDElem.innerText.split("#")[1];
      
        for (let i = 0; i < allTasks.length; i++) {
            let { id } = allTasks[i];
            console.log(id, TicketID);
            if (id == TicketID) {
                
                allTasks.splice(i, 1);
                console.log("1");
                let finalTaskArr = JSON.stringify(allTasks);
                console.log(finalTaskArr);
                localStorage.setItem("allTasks", finalTaskArr);
                taskContainer.remove();
                break;
            }
        }
      taskContainer.remove();
        }
 }


infoBtn.addEventListener("mouseover", function () {

	let functionalities = document.createElement("div");
	functionalities.setAttribute("class", "functionalities");
	functionalities.innerHTML = `<h2><u>Features:</u></h2>
	<ul>
		<li><b>Add Tasks:</b> Click '+' Icon.</li>
		<br />
		<li><b>Delete Tasks:</b> Click 'x' Icon.</li>
		<br />
		<li>
			<b>Edit Tasks:</b> Unlock the lock by pressing the lock
			button and click the task description.
		</li>
		<br />
		<li><b>View All Tasks:</b> Double click any color in the Toolbar.</li>
		<br />
		<li>
			<b>Lock/Unlock Task Editing:</b> Click Lock/Unlock icon on
			Task Container.
		</li>
		<br />
		<li><b>Change Color of a Task:</b> Click color bar of the Task Container.</li>
		<br />
		<li>
			<b>Filter specific Tasks:</b> Click that specific color in the Toolbar.
		</li>
		<br />		
			
		<p>
			<b><i>Your data will be stored for the next time you visit us.</b>
		<i></i></p>
	</ul>`;
	body.appendChild(functionalities);
});

infoBtn.addEventListener("mouseout", function () {

	body.removeChild(body.childNodes[body.childNodes.length - 1]);
});
