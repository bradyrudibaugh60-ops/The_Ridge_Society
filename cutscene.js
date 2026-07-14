// =========================================================
// THE RIDGE SOCIETY
// CUTSCENE SYSTEM
// Version 0.1
// Part 1/6
// =========================================================


const CutsceneSystem = {



    initialized: false,


    active: false,


    currentScene: null,


    currentStep: 0,


    scenes: {},



// =========================================================
// INITIALIZATION
// =========================================================


    initialize: function(){


        this.initialized =
        true;



        console.log(
            "Cutscene System Initialized"
        );



    },



// =========================================================
// REGISTER CUTSCENE
// =========================================================


    register: function(
        id,
        scene
    ){


        this.scenes[id] =
        scene;



    },



// =========================================================
// GET CUTSCENE
// =========================================================


    getScene: function(
        id
    ){


        return (
            this.scenes[id]
            ||
            null
        );


    },



// =========================================================
// START CUTSCENE
// =========================================================


    start: function(
        id
    ){


        let scene =
        this.getScene(
            id
        );



        if(
            !scene
        ){


            console.error(
                "Cutscene not found:",
                id
            );


            return false;


        }



        this.currentScene =
        scene;



        this.currentStep =
        0;



        this.active =
        true;



        console.log(
            "Starting cutscene:",
            id
        );



        this.playStep();



        return true;


    },



// =========================================================
// GET CURRENT SCENE
// =========================================================


    getCurrent: function(){


        return this.currentScene;


    },
// =========================================================
// PLAY CURRENT STEP
// =========================================================


    playStep: function(){


        if(
            !this.active ||
            !this.currentScene
        ){


            return;


        }



        let step =
        this.currentScene.steps[
            this.currentStep
        ];



        if(
            !step
        ){


            this.end();


            return;


        }



        this.executeStep(
            step
        );



    },



// =========================================================
// EXECUTE STEP
// =========================================================


    executeStep: function(
        step
    ){



        switch(
            step.type
        ){



            case "dialogue":



                if(
                    typeof DialogueSystem !== "undefined"
                ){


                    DialogueSystem.start(
                        step.id
                    );


                }


                break;




            case "camera":



                this.cameraAction(
                    step
                );


                break;




            case "move":



                this.moveCharacter(
                    step
                );


                break;




            case "wait":



                setTimeout(
                    () => {


                        this.nextStep();


                    },

                    step.duration || 1000

                );


                break;




            case "effect":



                if(
                    typeof EffectsSystem !== "undefined"
                ){


                    EffectsSystem.apply(
                        document.body,
                        step.effect,
                        step.duration
                    );


                }


                this.nextStep();


                break;




            default:



                this.nextStep();



        }



    },



// =========================================================
// NEXT STEP
// =========================================================


    nextStep: function(){


        this.currentStep++;



        this.playStep();



    },



// =========================================================
// CAMERA ACTION
// =========================================================


    cameraAction: function(
        data
    ){


        console.log(
            "Camera action:",
            data
        );



        if(
            typeof CameraSystem !== "undefined"
        ){


            CameraSystem.move(
                data
            );


        }



        setTimeout(
            () => {


                this.nextStep();


            },

            data.duration || 1000

        );


    },



// =========================================================
// MOVE CHARACTER
// =========================================================


    moveCharacter: function(
        data
    ){


        console.log(
            "Moving character:",
            data.character
        );



        /*
            Character movement
            connects here later
        */



        setTimeout(
            () => {


                this.nextStep();


            },

            data.duration || 1000

        );


    },
// =========================================================
// CHARACTER STAGING
// =========================================================


    characters: {},



// =========================================================
// ADD CHARACTER TO SCENE
// =========================================================


    addCharacter: function(
        id,
        data
    ){


        this.characters[id] =
        data;



        console.log(
            "Character added:",
            id
        );



    },



// =========================================================
// REMOVE CHARACTER
// =========================================================


    removeCharacter: function(
        id
    ){


        delete this.characters[id];



    },



// =========================================================
// MOVE CHARACTER POSITION
// =========================================================


    setCharacterPosition: function(
        id,
        x,
        y
    ){


        if(
            !this.characters[id]
        ){


            return;


        }



        this.characters[id].x =
        x;



        this.characters[id].y =
        y;



    },



// =========================================================
// CAMERA FOCUS
// =========================================================


    focusCamera: function(
        target
    ){


        console.log(
            "Camera focusing:",
            target
        );



        if(
            typeof CameraSystem !== "undefined"
        ){


            CameraSystem.focus(
                target
            );


        }



    },



// =========================================================
// SET ENVIRONMENT
// =========================================================


    setEnvironment: function(
        environment
    ){


        this.environment =
        environment;



        console.log(
            "Environment changed:",
            environment
        );



    },



// =========================================================
// LIGHTING CONTROL
// =========================================================


    setLighting: function(
        lighting
    ){


        this.lighting =
        lighting;



        console.log(
            "Lighting set:",
            lighting
        );



    },



// =========================================================
// PLAY SOUND
// =========================================================


    playSound: function(
        sound
    ){


        console.log(
            "Playing cutscene sound:",
            sound
        );



        /*
            Audio system connects here
        */



    },



// =========================================================
// PAUSE CUTSCENE
// =========================================================


    pause: function(){


        this.active =
        false;



    },



// =========================================================
// RESUME CUTSCENE
// =========================================================


    resume: function(){


        if(
            this.currentScene
        ){


            this.active =
            true;



            this.playStep();


        }



    },
// =========================================================
// SKIP CUTSCENE
// =========================================================


    skip: function(){


        if(
            !this.active
        ){


            return;


        }



        console.log(
            "Cutscene skipped"
        );



        this.end();



    },



// =========================================================
// END CUTSCENE
// =========================================================


    end: function(){


        console.log(
            "Cutscene ended"
        );



        this.active =
        false;



        this.currentScene =
        null;



        this.currentStep =
        0;



    },



// =========================================================
// TRANSITION TO CUTSCENE
// =========================================================


    transition: function(
        id,
        effect = "fade"
    ){


        console.log(
            "Transition:",
            effect
        );



        if(
            typeof EffectsSystem !== "undefined"
        ){


            if(
                effect === "fade"
            ){


                EffectsSystem.fadeToBlack();


            }


        }



        setTimeout(
            () => {


                this.start(
                    id
                );


            },

            1000

        );


    },



// =========================================================
// SAVE CUTSCENE STATE
// =========================================================


    saveState: function(){


        return {


            active:
            this.active,



            scene:
            this.currentScene,



            step:
            this.currentStep



        };


    },



// =========================================================
// LOAD CUTSCENE STATE
// =========================================================


    loadState: function(
        data
    ){


        if(
            !data
        ){


            return;


        }



        this.active =
        data.active
        ||
        false;



        this.currentScene =
        data.scene
        ||
        null;



        this.currentStep =
        data.step
        ||
        0;



    },



// =========================================================
// CHECK ACTIVE
// =========================================================


    isPlaying: function(){


        return this.active;


    },



// =========================================================
// GET STEP
// =========================================================


    getStep: function(){


        return this.currentStep;


    },
// =========================================================
// EVENT CALLBACKS
// =========================================================


    events: {},



// =========================================================
// REGISTER EVENT
// =========================================================


    on: function(
        event,
        callback
    ){


        this.events[event] =
        callback;


    },



// =========================================================
// TRIGGER EVENT
// =========================================================


    trigger: function(
        event,
        data
    ){


        if(
            this.events[event]
        ){


            this.events[event](
                data
            );


        }


    },



// =========================================================
// START DIALOGUE SCENE
// =========================================================


    startDialogue: function(
        dialogueID
    ){


        if(
            typeof DialogueSystem !== "undefined"
        ){


            DialogueSystem.start(
                dialogueID
            );


        }



    },



// =========================================================
// COMPLETE SCENE OBJECTIVE
// =========================================================


    completeObjective: function(
        objective
    ){


        console.log(
            "Objective completed:",
            objective
        );



        if(
            typeof GameSystem !== "undefined"
        ){


            GameSystem.completeObjective(
                objective
            );


        }


    },



// =========================================================
// ADVANCE ACT
// =========================================================


    advanceAct: function(
        act
    ){


        console.log(
            "Advancing to Act:",
            act
        );



        if(
            typeof ActSystem !== "undefined"
        ){


            ActSystem.setAct(
                act
            );


        }



    },



// =========================================================
// COMPLETE EPISODE CONNECTION
// =========================================================


    completeEpisode: function(
        episode
    ){


        if(
            typeof EpisodeSystem !== "undefined"
        ){


            EpisodeSystem.completeEpisode(
                episode
            );


        }



    },



// =========================================================
// RUN CUSTOM FUNCTION
// =========================================================


    runFunction: function(
        functionName
    ){


        if(
            typeof window[functionName]
            ===
            "function"
        ){


            window[functionName]();


        }



    },



// =========================================================
// DEBUG INFORMATION
// =========================================================


    debug: function(){


        console.log(
            "Current Cutscene:",
            this.currentScene
        );


        console.log(
            "Current Step:",
            this.currentStep
        );


        console.log(
            "Active:",
            this.active
        );


    },
  // =========================================================
// BROWSER EXPORT
// =========================================================


if(
    typeof window !== "undefined"
){


    window.CutsceneSystem =
    CutsceneSystem;


}



// =========================================================
// DEBUG EXPORT
// =========================================================


if(
    typeof window !== "undefined"
){


    window.CutsceneDebug =
    function(){


        CutsceneSystem.debug();


    };


}



// =========================================================
// EXAMPLE CUTSCENE FORMAT
// =========================================================


/*

Example:

CutsceneSystem.register(
    "opening_scene",
    {

        steps: [

            {
                type: "camera",

                target: "entrance",

                duration: 2000

            },


            {
                type: "dialogue",

                id: "intro_first_meeting"

            },


            {
                type: "effect",

                effect: "screen-glitch",

                duration: 500

            }


        ]

    }

);

*/



// =========================================================
// INITIALIZATION
// =========================================================


function initializeCutsceneSystem(){


    if(
        !CutsceneSystem.initialized
    ){


        CutsceneSystem.initialize();


    }


}



// =========================================================
// PAGE LOAD
// =========================================================


if(
    typeof window !== "undefined"
){


    window.addEventListener(
        "load",
        function(){


            initializeCutsceneSystem();


        }
    );


}



// =========================================================
// THE RIDGE SOCIETY
// CUTSCENE SYSTEM COMPLETE
// =========================================================
