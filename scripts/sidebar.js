let unfinishedTasks = document.querySelector("#unfinished-tasks")
let completedTasks = document.querySelector("#completed-tasks")

//The lines of code below are for testing purposes only

unfinishedTasks.innerHTML +=
   `
    <div class="task">
        <input class="checkbox" type="checkbox">
        <p class="task-name teste">Task task task task task task task task task task task task </p>
        <p class="important-task">★</p>
    </div>
    `;

for (var x=0; x<5; x++){
   unfinishedTasks.innerHTML +=
   `
    <div class="task">
        <input class="checkbox" type="checkbox">
        <p class="task-name">Unfinished task ${x+1}</p>
        <p class="important-task">★</p>
    </div>
    `
}

for (var x=0; x<14; x++){
    completedTasks.innerHTML +=
    `
    <div class="task">
        <input class="checkbox" type="checkbox" checked="checked"/>
        <p class="task-name">Completed task ${x+1}</p>
        <p class="important-task">☆</p>
    </div>
    ` 
}

let sidebarMenuCheckbox = document.querySelector("#sidebar-menu")
let clickExitFullSidebar = document.querySelector('#exit-full-sidebar')
let newTaskBtn = document.querySelector("#new-task-btn")

// EXIT FULL SIDEBAR
clickExitFullSidebar.addEventListener('click', function(){
    sidebarMenuCheckbox.checked = false;
    newTaskBtn.style = "margin-bottom: 17px;";
},false)

// SHOW / HIDE NEW TASK BUTTON
sidebarMenuCheckbox.addEventListener('change', function(){
    if(sidebarMenuCheckbox.checked){
        newTaskBtn.style = "margin-bottom: -50%;";
    } else{
        newTaskBtn.style = "margin-bottom: 17px;";
    }
},false)
