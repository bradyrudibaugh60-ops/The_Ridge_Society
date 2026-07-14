// =========================================================
// THE RIDGE SOCIETY
// DIALOGUE SYSTEM
// Version 0.1
// Part 1/8
// =========================================================



const DialogueSystem = {



    initialized: false,



    active: false,



    currentDialogue: null,



    currentLine: 0,



    characters: {},



    dialogues: {},



    choices: [],



    variables: {},



    typing: false,



    typingSpeed: 35,



// =========================================================
// INITIALIZATION
// =========================================================


    initialize: function(){



        this.initialized =
        true;



        console.log(
            "Dialogue System Initialized"
        );



    },



// =========================================================
// REGISTER DIALOGUE
// =========================================================


    registerDialogue: function(
        id,
        dialogue
    ){



        this.dialogues[id] =
        dialogue;



    },



// =========================================================
// GET DIALOGUE
// =========================================================


    getDialogue: function(
        id
    ){



        return (
            this.dialogues[id]
            ||
            null
        );



    },



// =========================================================
// REGISTER CHARACTER
// =========================================================


    registerCharacter: function(
        id,
        data
    ){



        this.characters[id] =
        data;



    },



// =========================================================
// START DIALOGUE
// =========================================================


    start: function(
        id
    ){



        let dialogue =
        this.getDialogue(
            id
        );



        if(
            !dialogue
        ){



            console.error(
                "Dialogue not found:",
                id
            );



            return false;



        }



        this.currentDialogue =
        dialogue;



        this.currentLine =
        0;



        this.active =
        true;



        this.showLine();



        return true;



    },
// =========================================================
// SHOW CURRENT LINE
// =========================================================


    showLine: function(){


        if(
            !this.currentDialogue
        ){


            return;


        }



        let lines =
        this.currentDialogue.lines;



        if(
            this.currentLine >= lines.length
        ){


            this.end();


            return;


        }



        let line =
        lines[this.currentLine];



        this.displayLine(
            line
        );


    },



// =========================================================
// DISPLAY LINE
// =========================================================


    displayLine: function(
        line
    ){


        let speaker =
        line.speaker
        ||
        "Unknown";



        let text =
        line.text
        ||
        "";



        this.updateSpeaker(
            speaker
        );



        this.typeText(
            text
        );


    },



// =========================================================
// UPDATE SPEAKER NAME
// =========================================================


    updateSpeaker: function(
        name
    ){


        let element =
        document.querySelector(
            ".dialogue-name"
        );



        if(
            element
        ){


            element.innerHTML =
            name;


        }



    },



// =========================================================
// TYPE TEXT EFFECT
// =========================================================


    typeText: function(
        text
    ){


        let element =
        document.querySelector(
            ".dialogue-text"
        );



        if(
            !element
        ){


            return;


        }



        this.typing =
        true;



        element.innerHTML =
        "";



        let index =
        0;



        let interval =
        setInterval(
            () => {



                if(
                    index >= text.length
                ){


                    clearInterval(
                        interval
                    );


                    this.typing =
                    false;


                    return;


                }



                element.innerHTML +=
                text[index];



                index++;



            },


            this.typingSpeed

        );


    },



// =========================================================
// FINISH CURRENT TEXT
// =========================================================


    finishTyping: function(){


        this.typing =
        false;



    },



// =========================================================
// ADVANCE DIALOGUE
// =========================================================


    advance: function(){


        if(
            this.typing
        ){


            this.finishTyping();


            return;


        }



        this.currentLine++;



        this.showLine();


    },



// =========================================================
// FORCE NEXT LINE
// =========================================================


    nextLine: function(){


        this.currentLine++;



        this.showLine();



    },
// =========================================================
// LOAD CHOICES
// =========================================================


    loadChoices: function(
        choices
    ){


        this.choices =
        choices
        ||
        [];



        this.displayChoices();



    },



// =========================================================
// DISPLAY CHOICES
// =========================================================


    displayChoices: function(){



        let container =
        document.querySelector(
            ".dialogue-choices"
        );



        if(
            !container
        ){


            return;


        }



        container.innerHTML =
        "";



        this.choices.forEach(
            (choice, index) => {



                let button =
                document.createElement(
                    "button"
                );



                button.className =
                "dialogue-choice";



                button.innerHTML =


                "<span class='choice-arrow'>▶</span>"
                +
                choice.text;



                button.onclick =
                () => {



                    this.selectChoice(
                        index
                    );



                };



                container.appendChild(
                    button
                );



            }
        );



    },



// =========================================================
// SELECT CHOICE
// =========================================================


    selectChoice: function(
        index
    ){


        let choice =
        this.choices[index];



        if(
            !choice
        ){


            return;


        }



        if(
            choice.variable
        ){


            this.setVariable(
                choice.variable,
                choice.value
            );


        }



        if(
            choice.next
        ){


            this.jumpTo(
                choice.next
            );


        }


        else{


            this.advance();


        }



    },



// =========================================================
// JUMP TO DIALOGUE LINE
// =========================================================


    jumpTo: function(
        line
    ){


        this.currentLine =
        line;



        this.showLine();



    },



// =========================================================
// VARIABLE SYSTEM
// =========================================================


    setVariable: function(
        name,
        value
    ){


        this.variables[name] =
        value;



    },



// =========================================================
// GET VARIABLE
// =========================================================


    getVariable: function(
        name
    ){


        return (
            this.variables[name]
        );


    },



// =========================================================
// CHECK REQUIREMENT
// =========================================================


    checkRequirement: function(
        requirement
    ){



        if(
            !requirement
        ){


            return true;


        }



        return (
            this.variables[
                requirement.name
            ]
            ===
            requirement.value
        );



    },



// =========================================================
// FILTER AVAILABLE CHOICES
// =========================================================


    getAvailableChoices: function(
        choices
    ){



        return choices.filter(
            choice => {



                return this.checkRequirement(
                    choice.requirement
                );



            }
        );



    },
// =========================================================
// ACT SYSTEM
// =========================================================


    currentAct: 1,



// =========================================================
// SET ACT
// =========================================================


    setAct: function(
        act
    ){


        this.currentAct =
        act;



    },



// =========================================================
// CHECK ACT REQUIREMENT
// =========================================================


    checkAct: function(
        requiredAct
    ){


        if(
            !requiredAct
        ){


            return true;


        }



        return (
            this.currentAct >=
            requiredAct
        );



    },



// =========================================================
// GET ACT DIALOGUE
// =========================================================


    getActDialogue: function(
        dialogue
    ){



        if(
            this.checkAct(
                dialogue.requiredAct
            )
        ){


            return dialogue;


        }



        return null;



    },



// =========================================================
// CHARACTER EMOTION
// =========================================================


    setEmotion: function(
        emotion
    ){


        let box =
        document.querySelector(
            ".dialogue-box"
        );



        if(
            !box
        ){


            return;


        }



        box.className =
        "dialogue-box dialogue-" +
        emotion;



    },



// =========================================================
// PORTRAIT SYSTEM
// =========================================================


    setPortrait: function(
        image
    ){


        let portrait =
        document.querySelector(
            ".dialogue-portrait img"
        );



        if(
            portrait
        ){


            portrait.src =
            image;



        }



    },



// =========================================================
// SPEAKER DATA
// =========================================================


    getCharacter: function(
        id
    ){


        return (
            this.characters[id]
            ||
            null
        );


    },



// =========================================================
// APPLY SPEAKER STYLE
// =========================================================


    applySpeakerStyle: function(
        speaker
    ){


        let character =
        this.getCharacter(
            speaker
        );



        if(
            !character
        ){


            return;


        }



        if(
            character.color
        ){


            let element =
            document.querySelector(
                ".dialogue-name"
            );



            if(
                element
            ){


                element.style.color =
                character.color;


            }



        }



    },



// =========================================================
// HORROR EFFECT MODE
// =========================================================


    horrorMode: false,



// =========================================================
// ENABLE HORROR DIALOGUE
// =========================================================


    enableHorrorMode: function(){


        this.horrorMode =
        true;



        let box =
        document.querySelector(
            ".dialogue-box"
        );



        if(
            box
        ){


            box.classList.add(
                "dialogue-horror"
            );


        }



    },



// =========================================================
// DISABLE HORROR MODE
// =========================================================


    disableHorrorMode: function(){


        this.horrorMode =
        false;



        let box =
        document.querySelector(
            ".dialogue-box"
        );



        if(
            box
        ){


            box.classList.remove(
                "dialogue-horror"
            );


        }



    },
// =========================================================
// DIALOGUE HISTORY
// =========================================================


    history: [],



// =========================================================
// ADD TO HISTORY
// =========================================================


    addHistory: function(
        line
    ){


        this.history.push(
            line
        );



    },



// =========================================================
// GET HISTORY
// =========================================================


    getHistory: function(){


        return this.history;


    },



// =========================================================
// CLEAR HISTORY
// =========================================================


    clearHistory: function(){


        this.history =
        [];



    },



// =========================================================
// LOAD DIALOGUE JSON
// =========================================================


    loadDialogues: async function(
        file
    ){


        try{


            let response =
            await fetch(
                file
            );



            let data =
            await response.json();



            this.dialogues =
            data;



            console.log(
                "Dialogues loaded"
            );


        }



        catch(error){


            console.error(
                "Dialogue loading failed:",
                error
            );


        }


    },



// =========================================================
// EXPORT DIALOGUE DATA
// =========================================================


    exportDialogues: function(){


        return JSON.stringify(
            this.dialogues
        );


    },



// =========================================================
// SAVE DIALOGUE STATE
// =========================================================


    saveState: function(){


        return {


            active:
            this.active,


            dialogue:
            this.currentDialogue,


            line:
            this.currentLine,


            variables:
            this.variables,


            history:
            this.history



        };


    },



// =========================================================
// LOAD DIALOGUE STATE
// =========================================================


    loadState: function(
        data
    ){


        if(
            !data
        ){


            return;


        }



        this.currentDialogue =
        data.dialogue || null;



        this.currentLine =
        data.line || 0;



        this.variables =
        data.variables || {};



        this.history =
        data.history || [];



    },



// =========================================================
// REPLAY DIALOGUE
// =========================================================


    replay: function(
        id
    ){


        this.start(
            id
        );



    },



// =========================================================
// CHECK IF SEEN
// =========================================================


    hasSeen: function(
        id
    ){


        return this.history.some(
            item =>
            item.id === id
        );



    },



// =========================================================
// MARK AS SEEN
// =========================================================


    markSeen: function(
        id
    ){


        this.history.push(
            {


                id:
                id,


                date:
                Date.now()



            }
        );



    },
// =========================================================
// NPC DIALOGUE CONNECTIONS
// =========================================================


    npcDialogues: {},



// =========================================================
// REGISTER NPC DIALOGUE
// =========================================================


    registerNPCDialogue: function(
        npcID,
        dialogueID
    ){


        this.npcDialogues[npcID] =
        dialogueID;



    },



// =========================================================
// START NPC CONVERSATION
// =========================================================


    talkToNPC: function(
        npcID
    ){


        let dialogue =
        this.npcDialogues[npcID];



        if(
            !dialogue
        ){


            console.warn(
                "No dialogue for NPC:",
                npcID
            );



            return false;


        }



        return this.start(
            dialogue
        );


    },



// =========================================================
// PROXIMITY SYSTEM
// =========================================================


    interactionDistance: 64,



// =========================================================
// CHECK NPC DISTANCE
// =========================================================


    canTalk: function(
        player,
        npc
    ){


        let x =
        npc.x -
        player.x;



        let y =
        npc.y -
        player.y;



        let distance =
        Math.sqrt(
            x * x +
            y * y
        );



        return (
            distance <=
            this.interactionDistance
        );



    },



// =========================================================
// FIND NEAREST NPC
// =========================================================


    findNearestNPC: function(
        player,
        npcs
    ){


        let closest =
        null;



        let distance =
        Infinity;



        npcs.forEach(
            npc => {



                let x =
                npc.x -
                player.x;



                let y =
                npc.y -
                player.y;



                let current =
                Math.sqrt(
                    x * x +
                    y * y
                );



                if(
                    current < distance
                ){


                    distance =
                    current;



                    closest =
                    npc;



                }



            }
        );



        if(
            distance <=
            this.interactionDistance
        ){


            return closest;


        }



        return null;



    },



// =========================================================
// CUTSCENE DIALOGUE LINK
// =========================================================


    startCutsceneDialogue: function(
        scene
    ){


        if(
            typeof CutsceneSystem !== "undefined"
        ){


            CutsceneSystem.start(
                scene
            );



        }



    },



// =========================================================
// AUTO ADVANCE
// =========================================================


    autoAdvance: false,



// =========================================================
// SET AUTO ADVANCE
// =========================================================


    setAutoAdvance: function(
        value
    ){


        this.autoAdvance =
        value;



    },



// =========================================================
// AUTO ADVANCE CHECK
// =========================================================


    update: function(){


        if(
            !this.active
        ){


            return;


        }



        if(
            this.autoAdvance &&
            !this.typing
        ){


            this.advance();


        }



    },
// =========================================================
// END DIALOGUE
// =========================================================


    end: function(){


        this.active =
        false;



        this.currentDialogue =
        null;



        this.currentLine =
        0;



        this.choices =
        [];



        this.hideUI();



    },



// =========================================================
// FORCE CLOSE
// =========================================================


    forceClose: function(){


        this.active =
        false;



        this.typing =
        false;



        this.currentDialogue =
        null;



    },



// =========================================================
// SHOW DIALOGUE UI
// =========================================================


    showUI: function(){


        let container =
        document.querySelector(
            ".dialogue-container"
        );



        if(
            container
        ){


            container.classList.remove(
                "hidden"
            );



            container.classList.add(
                "open"
            );


        }



    },



// =========================================================
// HIDE DIALOGUE UI
// =========================================================


    hideUI: function(){


        let container =
        document.querySelector(
            ".dialogue-container"
        );



        if(
            container
        ){


            container.classList.add(
                "hidden"
            );


        }



    },



// =========================================================
// KEYBOARD INPUT
// =========================================================


    handleInput: function(
        key
    ){


        if(
            !this.active
        ){


            return;


        }



        switch(
            key
        ){



            case "Enter":



                this.advance();



                break;




            case " ":



                this.advance();



                break;




            case "Escape":



                this.end();



                break;



        }



    },



// =========================================================
// SET TYPING SPEED
// =========================================================


    setTypingSpeed: function(
        speed
    ){


        this.typingSpeed =
        speed;



    },



// =========================================================
// GET STATUS
// =========================================================


    getStatus: function(){


        return {


            active:
            this.active,


            line:
            this.currentLine,


            typing:
            this.typing,


            dialogue:
            this.currentDialogue



        };


    },



// =========================================================
// RESET SYSTEM
// =========================================================


    reset: function(){


        this.active =
        false;



        this.currentDialogue =
        null;



        this.currentLine =
        0;



        this.characters =
        {};



        this.variables =
        {};



        this.history =
        [];



    },
// =========================================================
// END DIALOGUE
// =========================================================


    end: function(){


        this.active =
        false;



        this.currentDialogue =
        null;



        this.currentLine =
        0;



        this.choices =
        [];



        this.hideUI();



    },



// =========================================================
// FORCE CLOSE
// =========================================================


    forceClose: function(){


        this.active =
        false;



        this.typing =
        false;



        this.currentDialogue =
        null;



    },



// =========================================================
// SHOW DIALOGUE UI
// =========================================================


    showUI: function(){


        let container =
        document.querySelector(
            ".dialogue-container"
        );



        if(
            container
        ){


            container.classList.remove(
                "hidden"
            );



            container.classList.add(
                "open"
            );


        }



    },



// =========================================================
// HIDE DIALOGUE UI
// =========================================================


    hideUI: function(){


        let container =
        document.querySelector(
            ".dialogue-container"
        );



        if(
            container
        ){


            container.classList.add(
                "hidden"
            );


        }



    },



// =========================================================
// KEYBOARD INPUT
// =========================================================


    handleInput: function(
        key
    ){


        if(
            !this.active
        ){


            return;


        }



        switch(
            key
        ){



            case "Enter":



                this.advance();



                break;




            case " ":



                this.advance();



                break;




            case "Escape":



                this.end();



                break;



        }



    },



// =========================================================
// SET TYPING SPEED
// =========================================================


    setTypingSpeed: function(
        speed
    ){


        this.typingSpeed =
        speed;



    },



// =========================================================
// GET STATUS
// =========================================================


    getStatus: function(){


        return {


            active:
            this.active,


            line:
            this.currentLine,


            typing:
            this.typing,


            dialogue:
            this.currentDialogue



        };


    },



// =========================================================
// RESET SYSTEM
// =========================================================


    reset: function(){


        this.active =
        false;



        this.currentDialogue =
        null;



        this.currentLine =
        0;



        this.characters =
        {};



        this.variables =
        {};



        this.history =
        [];



    },
// =========================================================
// BROWSER GLOBAL EXPORT
// =========================================================


if(
    typeof window !== "undefined"
){


    window.DialogueSystem =
    DialogueSystem;


}



// =========================================================
// DEBUG SYSTEM
// =========================================================


const DialogueDebug = {



    start: function(
        id
    ){


        DialogueSystem.start(
            id
        );


    },



    end: function(){


        DialogueSystem.end();


    },



    status: function(){


        console.log(
            DialogueSystem.getStatus()
        );


    },



    history: function(){


        console.log(
            DialogueSystem.getHistory()
        );


    }



};



// =========================================================
// EXPORT DEBUG
// =========================================================


if(
    typeof window !== "undefined"
){


    window.DialogueDebug =
    DialogueDebug;


}



// =========================================================
// KEYBOARD LISTENER
// =========================================================


if(
    typeof window !== "undefined"
){


    window.addEventListener(
        "keydown",
        function(event){



            DialogueSystem.handleInput(
                event.key
            );



        }
    );



}



// =========================================================
// INITIALIZATION
// =========================================================


function initializeDialogueSystem(){


    if(
        !DialogueSystem.initialized
    ){


        DialogueSystem.initialize();


    }


}



// =========================================================
// PAGE LOAD INITIALIZATION
// =========================================================


if(
    typeof window !== "undefined"
){


    window.addEventListener(
        "load",
        function(){


            initializeDialogueSystem();


        }
    );


}



// =========================================================
// THE RIDGE SOCIETY
// DIALOGUE SYSTEM COMPLETE
// =========================================================
