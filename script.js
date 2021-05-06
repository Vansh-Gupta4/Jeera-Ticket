let filterColor = document.querySelectorAll(".filter");
let mainContainer = document.querySelector(".main-container");
let modalContainer = document.querySelector(".modal_container");
let taskBox = document.querySelector(".task_box");
let modalFlag = false;
let plusBtn = document.querySelector(".plus");
let iColor="black";

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

   modalContainer.style.display="flex";
    
})

taskBox.addEventListener("keydown",function(e){
    
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
             modalContainer.style.display="none";
             taskBox.value="";
    }
})
