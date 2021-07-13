sidebar = new SidebarController();
tasks = new TaskController();

let unfinishedTasks = document.querySelector("#unfinished-tasks")
let completedTasks = document.querySelector("#completed-tasks")

//☆★

unfinishedTasks.innerHTML += tasks.taskCard("task")
   

for (var x=0; x<5; x++){
   unfinishedTasks.innerHTML += tasks.taskCard(`task ${x+1}`)
}

for (var x=0; x<5; x++){
    completedTasks.innerHTML += tasks.taskCard(`finished ${x+1}`, "checked")
}