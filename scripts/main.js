let unfinishedTasks = document.querySelector("#unfinished-tasks")
let completedTasks = document.querySelector("#completed-tasks")

unfinishedTasks.innerHTML +=
   `
    <div class="task">
        <input class="checkbox" type="checkbox">
        <p class="task-name">Task task task task task task task task task task task task </p>
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

let clickExitFullSidebar = document.querySelector('#exit-full-sidebar')

clickExitFullSidebar.addEventListener('click', function(){
    document.querySelector("#sidebar-menu").checked = false;
},false)
