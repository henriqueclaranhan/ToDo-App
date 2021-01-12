class SidebarController {
    constructor(){
        this._sidebarIsFull;

        this._sidebarMenuCheckbox = document.querySelector("#sidebar-menu")
        this._sidebarElements = document.querySelector(".sidebar")
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

    showFullSidebar(marginLeft = "0", transition="0.25s ease-in-out"){
        this._fullSidebar.style = `
            margin-left: ${marginLeft};
            transition: ${transition};`;
    }

    hideFullSidebar(marginLeft = "-80%", transition="0.25s ease-in-out"){
        this._fullSidebar.style = `
        margin-left: ${marginLeft};
        transition: ${transition};`;
    }

    showExitFullSidebarOverlay(opacity = 50, transition="0.25s ease-in-out"){
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

    showFullSidebarEvent(whereThisWasCalledFrom){
        let sidebarTransition = (whereThisWasCalledFrom == "touchend") ? "0s" : undefined;
        
        sidebar.showFullSidebar(0, sidebarTransition);
        sidebar.hideNewTaskButton();
        sidebar.showExitFullSidebarOverlay();
        sidebar._sidebarIsFull = true;
        this._sidebarMenuCheckbox.checked = true;
    }

    hideFullSidebarEvent(){
        sidebar.hideFullSidebar();
        sidebar.showNewTaskButton();
        sidebar.hideExitFullSidebarOverlay();
        sidebar._sidebarIsFull = false;
        this._sidebarMenuCheckbox.checked = false;
    }

    initMenuEvents(){
        // SHOW / HIDE NEW TASK BUTTON
        this._sidebarMenuCheckbox.addEventListener('change', function(){
            if(this.checked){
                sidebar.showFullSidebarEvent();
            } else{
                sidebar.hideFullSidebarEvent();
            }
        },false)
    }


    initTouchEvents(){
        let touchX = 0;
        let lastTouch = 0;
        let touchstartX;
        let currentFullSidebarMarginLeft = 0;
        let overlayOpacity= 0;
        
        // EXIT FULL SIDEBAR
        this._clickExitFullSidebar.addEventListener('click', function(){
            sidebar.hideFullSidebarEvent();
        },false)

        this._sidebarElements.addEventListener('touchstart', function(e) {
            for (let i=0; i < e.touches.length; i++) {
                touchstartX = e.touches[i].pageX;
            }
        }, false);

        this._sidebarElements.addEventListener('touchmove', function(e) {
            for (let i=0; i < e.touches.length; i++) {
                touchX = e.touches[i].pageX;
                currentFullSidebarMarginLeft =(parseInt(window.getComputedStyle(sidebar._fullSidebar).marginLeft)*100/screen.width);

                let fullSidebarMarginLeft = touchX-215;

                overlayOpacity = ((currentFullSidebarMarginLeft/100*screen.width)/4)+43;

                if(touchX > 56){
                    sidebar.hideNewTaskButton();

                    if(overlayOpacity <= 50){
                        sidebar.showExitFullSidebarOverlay(overlayOpacity, "none");
                    }

                } else{
                    sidebar.showNewTaskButton();
                    sidebar.showExitFullSidebarOverlay(0);
                }

                if(currentFullSidebarMarginLeft >= 0){
                    sidebar.showFullSidebarEvent();
                } else if(currentFullSidebarMarginLeft < 0) {
                    sidebar.showFullSidebar(`${fullSidebarMarginLeft}px`, "none");
                    sidebar._sidebarMenuCheckbox.checked = (touchX <= 110) ? false : true;
                    touchstartX = touchX;
                }

                if(sidebar._sidebarIsFull){
                    if(currentFullSidebarMarginLeft <= 0 && touchX <= 216 && touchstartX>touchX){
                        sidebar.hideFullSidebar(`${fullSidebarMarginLeft}px`, "none");
                    }
                }

            }
        }, false);

        this._sidebarElements.addEventListener('touchend', (e) => {
            lastTouch = touchX;
            overlayOpacity= 0;

            if(touchX != 0){
                if (touchX <= 110){
                    sidebar.hideFullSidebarEvent();
                } else {
                    sidebar.showFullSidebarEvent("touchend");
                }
                touchX = 0;
            }
        }, false);
    }

}