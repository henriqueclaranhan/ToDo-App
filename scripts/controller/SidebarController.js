class SidebarController {
    constructor(){
        this._sidebarIsFull;

        this._sidebarMenuCheckbox = document.querySelector("#sidebar-menu")
        this._sidebar = document.querySelector(".sidebar")
        this._compactSidebar = document.querySelector("#compact-sidebar")
        this._fullSidebar = document.querySelector("#full-sidebar")
        this._clickExitFullSidebar = document.querySelector('#exit-full-sidebar')
        this._newTaskBtn = document.querySelector("#new-task-btn")

        this.initialize();
        this.initMenuEvents();
        this.initTouchEvents();
    }

    initialize(){
        this._sidebarIsFull = false;
    }
    
    showNewTaskButton(){
        this._newTaskBtn.style = "margin-bottom: 17px;";
    }

    hideNewTaskButton(){
        this._newTaskBtn.style = "margin-bottom: -50%;";
    }

    showFullSidebar(){
        this._fullSidebar.style = "transition: 0.25s;margin-left: 0;";
    }

    hideFullSidebar(){
        this._fullSidebar.style = "margin-left: -80%;"
    }

    showExitFullSidebarOverlay(opacity = 50, transition = "0.25s ease-in-out"){
        this._clickExitFullSidebar.style = `
            opacity: ${opacity}%;
            visibility: visible;
            transition: ${transition};
        `
    }

    hideExitFullSidebarOverlay(){
        this._clickExitFullSidebar.style = `
            opacity: 0;
            visibility: hidden;
        `
    }

    showFullSidebarEvent(){
        window.sidebar.showFullSidebar();
        window.sidebar.hideNewTaskButton();
        window.sidebar.showExitFullSidebarOverlay();
        window.sidebar._sidebarIsFull = true;
    }

    hideFullSidebarEvent(){
        window.sidebar.hideFullSidebar();
        window.sidebar.showNewTaskButton();
        window.sidebar.hideExitFullSidebarOverlay();
        window.sidebar._sidebarIsFull = false;
    }

    initMenuEvents(){
        // SHOW / HIDE NEW TASK BUTTON
        this._sidebarMenuCheckbox.addEventListener('change', function(){
            if(this.checked){
                window.sidebar.showFullSidebarEvent();
            } else{
                window.sidebar.hideFullSidebarEvent();
            }
        },false)
    }


    initTouchEvents(){
        let touchX = 0;
        let lastTouch = 0;
        let touchstartX;
        let currentFullSidebarMarginLeft = 0;
        let opacity= 0;
        
        // EXIT FULL SIDEBAR
        this._clickExitFullSidebar.addEventListener('click', function(){
            window.sidebar._sidebarMenuCheckbox.checked = false;
            window.sidebar.hideFullSidebarEvent();
        },false)

        this._sidebar.addEventListener('touchstart', function(e) {
            for (let i=0; i < e.touches.length; i++) {
                touchstartX = e.touches[i].pageX;
            }
        }, false);

        this._sidebar.addEventListener('touchmove', function(e) {
            for (let i=0; i < e.touches.length; i++) {
                touchX = e.touches[i].pageX
                currentFullSidebarMarginLeft = parseInt(window.getComputedStyle(window.sidebar._fullSidebar).marginLeft)
                
                var fullSidebarMarginLeft = touchX-215;

                if(touchX > lastTouch && !window.sidebar._sidebarIsFull && currentFullSidebarMarginLeft <= 0){
                    if(opacity <= 50){
                        opacity = (currentFullSidebarMarginLeft/4)+45
                    }

                    window.sidebar.showExitFullSidebarOverlay(opacity, "none")
                    window.sidebar.hideNewTaskButton();
                    window.sidebar._fullSidebar.style =`
                        transition: none;
                        margin-left: ${fullSidebarMarginLeft}px`

                } else
                if(touchX < lastTouch && touchX < touchstartX && window.sidebar._sidebarIsFull && currentFullSidebarMarginLeft <= 0){
                    window.sidebar.hideNewTaskButton();
                    window.sidebar._fullSidebar.style =`
                        transition: none;
                        margin-left: ${fullSidebarMarginLeft}px`
                }
            }
        }, false);

        this._sidebar.addEventListener('touchend', (e) => {
            lastTouch = touchX;
            if(touchX != 0){
                if (touchX <= 110){
                    this._sidebarMenuCheckbox.checked = false;
                    window.sidebar.hideFullSidebarEvent();
                } else {
                    this._sidebarMenuCheckbox.checked = true;
                    window.sidebar.showFullSidebarEvent();
                }
                touchX = 0;
            }
            
        }, false);
    }

}
