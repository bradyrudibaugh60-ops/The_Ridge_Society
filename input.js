// =========================================================
// THE RIDGE SOCIETY
// INPUT SYSTEM
// Version 0.1 Alpha
// =========================================================


const InputSystem = {


    // =====================================================
    // INPUT STORAGE
    // =====================================================

    keys: {},


    mouse:

    {

        x: 0,

        y: 0,

        pressed: false

    },



    controller:

    {

        connected: false,

        index: null,

        buttons: {}

    },



    // =====================================================
    // DEFAULT CONTROLS
    // =====================================================

    controls:

    {

        moveUp: "w",

        moveDown: "s",

        moveLeft: "a",

        moveRight: "d",


        interact: "e",

        inventory: "i",

        journal: "j",

        pause: "escape"


    },



    // =====================================================
    // INITIALIZE
    // =====================================================

    initialize: function(){


        console.log(

            "Input system initialized."

        );



        this.keyboard();

        this.mouseInput();

        this.controllerInput();



    },



    // =====================================================
    // KEYBOARD INPUT
    // =====================================================

    keyboard: function(){


        window.addEventListener(

            "keydown",

            (event)=>{


                let key =

                event.key.toLowerCase();



                this.keys[key] = true;



                this.handleKeyDown(
                    key
                );


            }

        );



        window.addEventListener(

            "keyup",

            (event)=>{


                let key =

                event.key.toLowerCase();



                this.keys[key] = false;



            }

        );


    },



    // =====================================================
    // KEY ACTIONS
    // =====================================================

    handleKeyDown: function(
        key
    ){


        if(
            key === this.controls.interact
        ){

            this.interact();


        }



        if(
            key === this.controls.inventory
        ){

            this.inventory();


        }



        if(
            key === this.controls.journal
        ){

            this.journal();


        }



        if(
            key === this.controls.pause
        ){

            this.pause();


        }


    },



    // =====================================================
    // MOUSE INPUT
    // =====================================================

    mouseInput: function(){


        window.addEventListener(

            "mousemove",

            (event)=>{


                this.mouse.x =

                event.clientX;



                this.mouse.y =

                event.clientY;


            }

        );



        window.addEventListener(

            "mousedown",

            ()=>{


                this.mouse.pressed = true;


            }

        );



        window.addEventListener(

            "mouseup",

            ()=>{


                this.mouse.pressed = false;


            }

        );


    },
  // =====================================================
// CONTROLLER INPUT SYSTEM
// =====================================================



    controllerInput: function(){



        window.addEventListener(

            "gamepadconnected",

            (event)=>{



                console.log(

                    "Controller connected:",

                    event.gamepad.id

                );



                this.controller.connected = true;



                this.controller.index =

                event.gamepad.index;



            }

        );





        window.addEventListener(

            "gamepaddisconnected",

            ()=>{



                console.log(

                    "Controller disconnected."

                );



                this.controller.connected = false;



                this.controller.index = null;



            }

        );



    },





// =====================================================
// UPDATE CONTROLLER
// =====================================================


    updateController: function(){



        if(

            !this.controller.connected

        ){

            return;

        }





        let pads =

        navigator.getGamepads();



        let pad =

        pads[this.controller.index];





        if(

            !pad

        ){

            return;

        }





        this.controller.buttons = {};





        pad.buttons.forEach(

            (button,index)=>{



                this.controller.buttons[index] =

                button.pressed;



            }

        );





        this.checkControllerActions(

            pad

        );



    },





// =====================================================
// CONTROLLER ACTIONS
// =====================================================


    checkControllerActions: function(
        pad
    ){



        // A BUTTON

        if(

            pad.buttons[0].pressed

        ){



            this.interact();



        }





        // START BUTTON

        if(

            pad.buttons[9].pressed

        ){



            this.pause();



        }





        // X BUTTON

        if(

            pad.buttons[2].pressed

        ){



            this.inventory();



        }





        // Y BUTTON

        if(

            pad.buttons[3].pressed

        ){



            this.journal();



        }



    },





// =====================================================
// ANALOG MOVEMENT
// =====================================================


    getMovement: function(){



        let movement =

        {


            x: 0,


            y: 0



        };





        // KEYBOARD



        if(

            this.keys[
                this.controls.moveLeft
            ]

        ){


            movement.x -= 1;


        }



        if(

            this.keys[
                this.controls.moveRight
            ]

        ){


            movement.x += 1;


        }



        if(

            this.keys[
                this.controls.moveUp
            ]

        ){


            movement.y -= 1;


        }



        if(

            this.keys[
                this.controls.moveDown
            ]

        ){


            movement.y += 1;


        }





        // CONTROLLER



        if(

            this.controller.connected

        ){



            let pads =

            navigator.getGamepads();



            let pad =

            pads[this.controller.index];



            if(

                pad

            ){



                movement.x +=

                pad.axes[0];



                movement.y +=

                pad.axes[1];



            }


        }





        return movement;


    },
// =====================================================
// GAME ACTION CONNECTIONS
// =====================================================



    interact: function(){



        console.log(

            "Interaction pressed."

        );





        if(

            typeof Game !==

            "undefined"

        ){



            Game.interact();



        }



    },





// =====================================================
// INVENTORY INPUT
// =====================================================



    inventory: function(){



        console.log(

            "Inventory opened."

        );





        if(

            typeof Game !==

            "undefined"

        ){



            Game.toggleInventory();



        }



    },





// =====================================================
// JOURNAL INPUT
// =====================================================



    journal: function(){



        console.log(

            "Journal opened."

        );





        if(

            typeof Game !==

            "undefined"

        ){



            Game.toggleJournal();



        }



    },





// =====================================================
// PAUSE INPUT
// =====================================================



    pause: function(){



        console.log(

            "Pause pressed."

        );





        if(

            typeof Game !==

            "undefined"

        ){



            if(

                Game.paused

            ){



                Game.resume();



            }

            else{


                Game.pause();



            }


        }



    },





// =====================================================
// SEND INPUT TO PLAYER
// =====================================================



    updatePlayerInput: function(
        deltaTime
    ){



        if(

            typeof Player ===

            "undefined"

        ){

            return;

        }





        let movement =

        this.getMovement();





        if(

            typeof Player.move ===

            "function"

        ){



            Player.move(

                movement.x,

                movement.y,

                deltaTime

            );



        }



    },





// =====================================================
// CHECK INPUT STATE
// =====================================================



    isPressed: function(
        key
    ){



        return Boolean(

            this.keys[

                key.toLowerCase()

            ]

        );


    },





// =====================================================
// CHECK CONTROLLER BUTTON
// =====================================================



    controllerPressed: function(
        button
    ){



        return Boolean(

            this.controller.buttons[

                button

            ]

        );



    },





// =====================================================
// UPDATE LOOP
// =====================================================



    update: function(
        deltaTime
    ){



        this.updateController();



        this.updatePlayerInput(

            deltaTime

        );



    },
// =====================================================
// CONTROL CONFIGURATION SYSTEM
// =====================================================



    defaultControls:

    {


        moveUp: "w",

        moveDown: "s",

        moveLeft: "a",

        moveRight: "d",


        interact: "e",

        inventory: "i",

        journal: "j",

        pause: "escape"


    },





// =====================================================
// REBIND KEY
// =====================================================



    rebindKey: function(
        action,
        key
    ){



        if(

            this.controls[action]

        ===

            undefined

        ){



            console.warn(

                "Unknown action:",

                action

            );



            return;


        }





        this.controls[action] =

        key.toLowerCase();





        console.log(

            "Control changed:",

            action,

            key

        );





        this.saveControls();



    },





// =====================================================
// SAVE CONTROLS
// =====================================================



    saveControls: function(){



        localStorage.setItem(

            "ridge_controls",

            JSON.stringify(

                this.controls

            )

        );



    },





// =====================================================
// LOAD CONTROLS
// =====================================================



    loadControls: function(){



        let saved =

        localStorage.getItem(

            "ridge_controls"

        );





        if(

            saved

        ){



            this.controls =

            JSON.parse(

                saved

            );



            console.log(

                "Controls loaded."

            );


        }



    },





// =====================================================
// RESET CONTROLS
// =====================================================



    resetControls: function(){



        this.controls =

        {

            ...this.defaultControls

        };





        this.saveControls();





        console.log(

            "Controls reset."

        );


    },





// =====================================================
// WAIT FOR INPUT
// =====================================================



    waitingForInput: false,

    rebindAction: null,





    listenForRebind: function(
        action
    ){



        this.waitingForInput = true;



        this.rebindAction =

        action;





        console.log(

            "Waiting for input:",

            action

        );



    },





// =====================================================
// PROCESS REBIND INPUT
// =====================================================



    processRebind: function(
        key
    ){



        if(

            !this.waitingForInput

        ){

            return;

        }





        this.rebindKey(

            this.rebindAction,

            key

        );





        this.waitingForInput = false;



        this.rebindAction = null;



    },
// =====================================================
// MENU INPUT SYSTEM
// =====================================================



    menuIndex: 0,

    menuButtons: [],





// =====================================================
// INITIALIZE MENU INPUT
// =====================================================



    initializeMenu: function(){



        this.menuButtons =

        Array.from(

            document.querySelectorAll(

                ".menu-button"

            )

        );





        console.log(

            "Menu input initialized."

        );



    },





// =====================================================
// MOVE MENU SELECTION
// =====================================================



    moveMenu: function(
        direction
    ){



        if(

            this.menuButtons.length === 0

        ){

            return;

        }





        this.menuIndex +=

        direction;





        if(

            this.menuIndex < 0

        ){



            this.menuIndex =

            this.menuButtons.length - 1;



        }





        if(

            this.menuIndex >=

            this.menuButtons.length

        ){



            this.menuIndex = 0;



        }





        this.highlightMenuButton();



    },





// =====================================================
// HIGHLIGHT BUTTON
// =====================================================



    highlightMenuButton: function(){



        this.menuButtons.forEach(

            button => {



                button.classList.remove(

                    "selected"

                );



            }

        );





        let current =

        this.menuButtons[

            this.menuIndex

        ];





        if(

            current

        ){



            current.classList.add(

                "selected"

            );



        }



    },





// =====================================================
// CONFIRM MENU
// =====================================================



    confirmMenu: function(){



        let button =

        this.menuButtons[

            this.menuIndex

        ];





        if(

            button

        ){



            button.click();



        }



    },





// =====================================================
// CANCEL/BACK
// =====================================================



    cancel: function(){



        let windows =

        document.querySelectorAll(

            ".menu-window:not(.hidden)"

        );





        if(

            windows.length

        ){



            windows[0]

            .classList

            .add(

                "hidden"

            );



            return;



        }





        console.log(

            "Nothing to close."

        );



    },





// =====================================================
// PROLOGUE INPUT
// =====================================================



    skipPrologue: function(){



        let screen =

        document.getElementById(

            "prologue-screen"

        );





        if(

            screen &&

            !screen.classList.contains(

                "hidden"

            )

        ){



            if(

                typeof finishPrologue ===

                "function"

            ){



                finishPrologue();



            }



        }



    },





// =====================================================
// CINEMATIC CONTROL
// =====================================================



    cinematicControl: function(
        key
    ){



        if(

            key === " "

        ){



            this.skipPrologue();



        }





        if(

            key === "escape"

        ){



            this.cancel();



        }



    },
// =====================================================
// FINAL INPUT UPDATE
// =====================================================



    finalUpdate: function(
        deltaTime
    ){



        this.update(

            deltaTime

        );



        this.cinematicControlInput();



    },





// =====================================================
// CINEMATIC KEY CHECK
// =====================================================



    cinematicControlInput: function(){



        if(

            this.keys[" "]

        ){



            this.skipPrologue();



        }



    },





// =====================================================
// CLEANUP
// =====================================================



    cleanup: function(){



        this.keys = {};



        this.mouse =

        {

            x: 0,

            y: 0,

            pressed: false

        };





        this.controller.buttons = {};





        console.log(

            "Input system cleaned."

        );



    }





};





// =====================================================
// GLOBAL EXPORT
// =====================================================



if(

    typeof window !==

    "undefined"

){



    window.InputSystem =

    InputSystem;



}





// =====================================================
// AUTO START
// =====================================================



window.addEventListener(

    "load",

    function(){



        InputSystem.initialize();



        InputSystem.loadControls();



        InputSystem.initializeMenu();



    }

);





// =====================================================
// CONNECT TO GAME LOOP
// =====================================================



window.addEventListener(

    "gameupdate",

    function(event){



        InputSystem.update(

            event.detail.deltaTime

        );



    }

);





// =====================================================
// THE RIDGE SOCIETY
// INPUT SYSTEM COMPLETE
// Version 0.1 Alpha
// =====================================================
