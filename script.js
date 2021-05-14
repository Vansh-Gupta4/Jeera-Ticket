
let filterColor = document.querySelectorAll(".filter");   //querySelectorAll h ..therefore array milega
let mainContainer = document.querySelector(".main-container");
let modalColors = document.querySelectorAll(".modal-color");   //querySelectorAll h ..therefore array milega
let modalContainer = document.querySelector(".modal_container");
let taskBox = document.querySelector(".task_box");
let modalFlag = false;
let deleteState = false;
let plusBtn = document.querySelector(".plus");
let crossBtn = document.querySelector(".cross");
let iColor="black";   //initial color is black
let colors=["pink","blue","green","black"];
let filterContainers = document.querySelectorAll(".filter_color-container");

//First of all check is there something in local storage or not
let allTasks = [];

if (localStorage.getItem("allTasks")) {
    let strArr = localStorage.getItem("allTasks");
    allTasks = JSON.parse(strArr);    //string se wapas normal form mai convert kar lia

    for (let i = 0; i < allTasks.length; i++) {
        
        createTicketFromLocalStorage(allTasks[i]);
    }

}
function createTicketFromLocalStorage(taskObj) {
    let { id, color, task } = taskObj;    //taskObj se id,color and task nikal liya
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
    // let task = prompt("Enter Yout Task");
    // let color = prompt("Color");

   modalContainer.style.display="flex";   //jab "+" par click toh modal container visible ho jayega
    
})
crossBtn.addEventListener("click",setDeleteState)

taskBox.addEventListener("keydown",function(e){    //agar text area of modal par click karenge toh function chalega 
    
    if (e.key == "Enter" && taskBox.value != "") {
        let taskContainer = document.createElement("div");  //creates div
        let task=taskBox.value;
        console.log(task)
        taskContainer.setAttribute("class", "ticket_container"); 
        let id = Math.random().toString(32).slice(2);  //it generates random id
        taskContainer.innerHTML = `<div class="ticket_color ${iColor}"></div>   
             <div class="ticket_desc_container">
                 <div class="ticket_id">#${id}</div>
                 <div class="ticket_desc" >${task}</div>
             </div>`;  //.innerHTML adds html
             mainContainer.appendChild(taskContainer);

             //for local storage
            let ticketObj = {}   //ticket bane ke liye ticket color,ticket ka content and ticket id jaruri h...therefore yeh sab hum local stage mai store kar lenge
            ticketObj.task = task;
            ticketObj.color = iColor;
            ticketObj.id = id;
            allTasks.push(ticketObj);
            let strArr = JSON.stringify(allTasks);   //local storage key value pair sirf string mai hi store karta h
            localStorage.setItem('allTasks', strArr);
    
            //cleanup code
             modalContainer.style.display="none";   //modal invisble ho jayega
             taskBox.value="";    //ab next time par appear hoga toh textarea khaali milega
             iColor="black";
             addFunctionality(taskContainer);
             
             taskContainer.addEventListener("click",deleteTask);
    }
})

for(let i=0; i<modalColors.length; i++){
    modalColors[i].addEventListener("click", function(){   //agar modal color mai  kisi bhi color par click ho toh function chalega
        let color=modalColors[i].classList[1];   //classList=>uss element par jitni class h h voh de deta h (example => "modal-color pink" mai se humne "pink" choose kiya)
        iColor=color;
        for(let j=0;j<modalColors.length;j++){
            //remove "border" class from every color
            modalColors[j].classList.remove("border");   //remove function aisa h jiss par "border" class lagi h usse remove kar dega aur jispar nhi lagi usko kuch nhi bolega (err nhi dega)
        }
        modalColors[i].classList.add("border");   //jis par click kiya uss par "border" class add kar dega
    })
}

//ticket bane ke baad uska color change karne ka function
function addFunctionality(taskContainer){
    let ticketColor=taskContainer.querySelector(".ticket_color");  //ticket ka present color ka selector mil jayega
    ticketColor.addEventListener("click",function(){   //uss selector par click hua toh function chalega
        let cColor=ticketColor.classList[1];   //isse current color mil jayega
        let idx=colors.indexOf(cColor);   //indexOf function bata dega ki voh present color konse index par h
        let newIdx=(idx+1)%4;   //circular array bann jayega
        let newColor=colors[newIdx];   //new color mil jayega
        ticketColor.classList.remove(cColor);  //phele wale color ko remove kiya
        ticketColor.classList.add(newColor);   //aur new color ko set kar dia

        //Agar hum color change kare toh change of color local storage mai bhi reflect ho
        let ticketIdElem = taskContainer.querySelector(".ticket_id");    //this will be done by help of ID
        let id = ticketIdElem.innerText;  //isse id=#ndsovb7r aa jayegi ...ab "#" nikalne ke liye slice
        id = id.slice(1);
        
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {    //agar jis ki id change kari h voh id local storage mai h toh local storage se uska color update kar do
                allTasks[i].color = newColor
                let strArr = JSON.stringify(allTasks);
                localStorage.setItem('allTasks', strArr);   //local storage mai update kar dia
            }
        }

    })
}


//Filtering Logic
let prevColor = null;
for (let i = 0; i < filterContainers.length; i++) {

    filterContainers[i].addEventListener("click", function() {   //jis bhi filter par click hua uske chiildren ki class nikal lo
        let child = filterContainers[i].children[0];    //ek hi element h ..example="filter_color pink" mil gya
        let color = child.classList[1];             //color="pink" mil gya

        if (prevColor == color) {     //double click par saari tickets dikha do
            let ticketContainers = document.querySelectorAll(".ticket_container");   //saare tickets mil gai
            for (let j = 0; j < ticketContainers.length; j++) {    //saari tickets par jaa kar 
                ticketContainers[j].style.display = "block";       ///saari tickets dikha do
            }
            prevColor = null;
        } else {
            let ticketContainers = document.querySelectorAll(".ticket_container");    //saare tickets mil gai
            for (let j = 0; j < ticketContainers.length; j++) {     //saari tickets par jaa kar 
                let ticketColor = ticketContainers[j].children[0]; //"ticket_pink" aa gya
                let mycolor = ticketColor.classList[1];            //isse pink nikal gya 
                if (mycolor == color) {
                    ticketContainers[j].style.display = "block";    //jo color choose kiya h voh hi select kiya h toh uss color ki saari tickets show kardo
                } else {
                    ticketContainers[j].style.display = "none";    //baaki ko hide
                }
            }
            prevColor = color;
        }


    })
} 






function setDeleteState(e) {  //delete btton par click kiya toh black color ka ho jayega

    let crossBtn = e.currentTarget;
 
    if (deleteState == false) {
        crossBtn.classList.add("active");
    } else {
        crossBtn.classList.remove("active");
    }
    deleteState = !deleteState;
}
function deleteTask(e) {     //agar delete button ki state active h aur fir user kisi ticket par click kare toh remove ticket
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
