let filterColor = document.querySelectorAll(".filter");   //querySelectorAll h ..therefore array milega
let mainContainer = document.querySelector(".main-container");
let modalColors = document.querySelectorAll(".modal-color");   //querySelectorAll h ..therefore array milega
let modalContainer = document.querySelector(".modal_container");
let taskBox = document.querySelector(".task_box");
let modalFlag = false;
let plusBtn = document.querySelector(".plus");
let iColor="black";   //initial color is black
let colors=["pink","blue","green","black"];

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
plusBtn.addEventListener("click", function () {
    // let task = prompt("Enter Yout Task");
    // let color = prompt("Color");

   modalContainer.style.display="flex";   //jab "+" par click toh modal container visible ho jayega
    
})

taskBox.addEventListener("keydown",function(e){    //agar text area par click karenge toh fiunction chalega 
    
    if (e.key == "Enter" && taskBox.value != "") {
        let taskContainer = document.createElement("div");  //creates div
        let task=taskBox.value;
        taskContainer.setAttribute("class", "ticket_container"); 
        taskContainer.innerHTML = `<div class="ticket_color ${iColor}"></div>   
             <div class="ticket_desc_container">
                 <div class="ticket_id">#ExampleId</div>
                 <div class="ticket_desc">${task}</div>
             </div>`;  //.innerHTML adds html
             mainContainer.appendChild(taskContainer);

            //cleanup code
             modalContainer.style.display="none";   //modal invisble ho jayega
             taskBox.value="";    //ab next time par appear hoga toh textarea khaali milega
             iColor="black";
             addFunctionality(taskContainer);  
    }
})

for(let i=0; i<modalColors.length; i++){
    modalColors[i].addEventListener("click", function(){   //agar kisi bhi color par click ho toh function chalega
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
    })
}
