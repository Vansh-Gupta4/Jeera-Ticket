let lockBtn = document.querySelector(".lock");
let lockFlag = true;
// <!-- fa-unlock-alt -->
// <!-- fa-lock -->
lockBtn.addEventListener("click", function () {
    let taskDescElemArr = document.querySelectorAll(".ticket_desc");
   
    lockFlag = !lockFlag;
    if (lockFlag == false) {
       console.log(lockFlag,"if");
        lockBtn.classList.remove("fa-lock");
        lockBtn.classList.add("fa-unlock-alt");
        taskDescElemArr.forEach(function(taskDescElem){
            taskDescElem.setAttribute("contenteditable","true");
        })
        //  event listener  keydown -> local storage
        // blur

    }else {
       console.log("else");
        lockBtn.classList.remove("fa-unlock-alt");
        lockBtn.classList.add("fa-lock");
        taskDescElemArr.forEach(function(taskDescElem){
            taskDescElem.setAttribute("contenteditable","false");
        })
    }
  
})
