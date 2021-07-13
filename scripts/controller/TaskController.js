class TaskController {
    constructor(){

        this.taskData = {
            taskName: "",
            
        };

        this._taskCheckbox = document.querySelector(".checkbox");
        this._unfinishedTasksSection = document.querySelector("#unfinished-tasks")
        this._completedTasksSection = document.querySelector("#completed-tasks")

        this.initialize()
    }

    initialize(){
        
    }

    getUnfinishedTasks(){
        
    }

    getCompletedTasks(){

    }



    taskCard = (taskName = "", checked="") => {
        return `
        <div class="task">
            <input onclick="tasks.toggleTaskStatus(this.parentNode)" class="checkbox" type="checkbox" ${checked}>
            <p class="task-name">${taskName}</p>
            <p class="important-task">☆</p>
        </div>
        `
    }

    moveTaskToUnfinished(task){
    
    }

    moveTaskToCompleted(task){
        
    }

    toggleTaskStatus = (task) => {

        task.style=`
        opacity: 0;
        visibility: hidden;
        `;

        setTimeout(function(){
            task.remove();
        }, 250);

    }
}