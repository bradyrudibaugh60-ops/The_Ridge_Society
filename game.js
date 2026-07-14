// =========================================================
// THE RIDGE SOCIETY
// GAME ENGINE
// Version 0.1 Alpha
// Part 1/15
//
// Creator:
// Admiral Armadillo
// =========================================================


const Game = {



    // =====================================================
    // ENGINE INFO
    // =====================================================

    version: "0.1 Alpha",

    title: "The Ridge Society",

    creator: "Admiral Armadillo",



    // =====================================================
    // GAME STATE
    // =====================================================

    initialized: false,

    running: false,

    paused: false,

    loading: false,



    // =====================================================
    // PLAYER STATE
    // =====================================================

    player: null,



    // =====================================================
    // WORLD
    // =====================================================

    currentArea: "facility_entrance",

    currentEpisode: "episode_1",

    currentAct: 1,



    // =====================================================
    // GAME CLOCK
    // =====================================================

    deltaTime: 0,

    lastFrame: 0,

    totalPlayTime: 0,



    // =====================================================
    // REFERENCES
    // =====================================================

    canvas: null,

    context: null,



    // =====================================================
    // INITIALIZE
    // =====================================================

    initialize: function(){


        console.log(
            "Initializing Game..."
        );



        this.canvas =
        document.getElementById(
            "game-canvas"
        );



        if(
            !this.canvas
        ){

            console.error(
                "Game canvas not found."
            );

            return;

        }



        this.context =
        this.canvas.getContext(
            "2d"
        );



        this.initializeSystems();



        this.initialized =
        true;



        console.log(
            "Game Initialized"
        );

    },



    // =====================================================
    // INITIALIZE SYSTEMS
    // =====================================================

    initializeSystems: function(){


        if(
            typeof DebugSystem !== "undefined"
        ){

            DebugSystem.log(
                "Connecting systems..."
            );

        }



        if(
            typeof EpisodeSystem !== "undefined"
        ){

            EpisodeSystem.initialize();

        }



        if(
            typeof CutsceneSystem !== "undefined"
        ){

            CutsceneSystem.initialize();

        }



        if(
            typeof DialogueSystem !== "undefined"
        ){

            DialogueSystem.initialize();

        }



    },
// =========================================================
// START GAME
// =========================================================

    start: function(){


        if(
            !this.initialized
        ){

            this.initialize();

        }



        console.log(
            "Starting Game..."
        );



        this.running =
        true;



        this.paused =
        false;



        this.lastFrame =
        performance.now();



        this.totalPlayTime =
        0;



        this.gameLoop(
            this.lastFrame
        );



        if(
            typeof DebugSystem !== "undefined"
        ){

            DebugSystem.log(
                "Game Started"
            );

        }


    },



// =========================================================
// MAIN GAME LOOP
// =========================================================

    gameLoop: function(
        currentTime
    ){


        if(
            !this.running
        ){

            return;

        }



        this.deltaTime =
        (
            currentTime -
            this.lastFrame
        ) / 1000;



        this.lastFrame =
        currentTime;



        if(
            !this.paused
        ){

            this.update(
                this.deltaTime
            );



            this.render();

        }



        requestAnimationFrame(

            this.gameLoop.bind(
                this
            )

        );


    },



// =========================================================
// PAUSE GAME
// =========================================================

    pause: function(){


        if(
            this.paused
        ){

            return;

        }



        this.paused =
        true;



        document
            .getElementById(
                "pause-menu"
            )
            ?.classList.remove(
                "hidden"
            );



        console.log(
            "Game Paused"
        );


    },



// =========================================================
// RESUME GAME
// =========================================================

    resume: function(){


        this.paused =
        false;



        document
            .getElementById(
                "pause-menu"
            )
            ?.classList.add(
                "hidden"
            );



        console.log(
            "Game Resumed"
        );


    },



// =========================================================
// STOP GAME
// =========================================================

    stop: function(){


        this.running =
        false;



        console.log(
            "Game Stopped"
        );


    },



// =========================================================
// RESTART GAME
// =========================================================

    restart: function(){


        this.stop();



        this.initialize();



        this.start();


    },
// =========================================================
// UPDATE GAME
// =========================================================

    update: function(
        deltaTime
    ){


        // ==============================================
        // PLAY TIME
        // ==============================================

        this.totalPlayTime +=
        deltaTime;



        // ==============================================
        // PLAYER
        // ==============================================

        this.updatePlayer(
            deltaTime
        );



        // ==============================================
        // WORLD
        // ==============================================

        this.updateWorld(
            deltaTime
        );



        // ==============================================
        // EPISODES
        // ==============================================

        this.updateEpisodes();



        // ==============================================
        // OBJECTIVES
        // ==============================================

        this.updateObjectives();



        // ==============================================
        // CUTSCENES
        // ==============================================

        this.updateCutscenes();



        // ==============================================
        // DIALOGUE
        // ==============================================

        this.updateDialogue();



        // ==============================================
        // AUDIO
        // ==============================================

        this.updateAudio();



        // ==============================================
        // DEBUG
        // ==============================================

        this.updateDebug();



        // ==============================================
        // AUTO SAVE TIMER
        // ==============================================

        this.updateAutosave(
            deltaTime
        );


    },



// =========================================================
// PLAYER UPDATE
// =========================================================

    updatePlayer: function(
        deltaTime
    ){


        if(
            typeof Player ===
            "undefined"
        ){

            return;

        }



        if(
            typeof Player.update ===
            "function"
        ){

            Player.update(
                deltaTime
            );

        }


    },



// =========================================================
// WORLD UPDATE
// =========================================================

    updateWorld: function(
        deltaTime
    ){


        /*
            Handles:

            NPC AI

            Animations

            Environment

            Physics

            Triggers

            Events

        */


    },



// =========================================================
// EPISODE UPDATE
// =========================================================

    updateEpisodes: function(){


        if(
            typeof EpisodeSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof EpisodeSystem.update ===
            "function"
        ){

            EpisodeSystem.update();

        }


    },



// =========================================================
// OBJECTIVE UPDATE
// =========================================================

    updateObjectives: function(){


        if(
            typeof ObjectiveSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof ObjectiveSystem.update ===
            "function"
        ){

            ObjectiveSystem.update();

        }


    },



// =========================================================
// CUTSCENE UPDATE
// =========================================================

    updateCutscenes: function(){


        if(
            typeof CutsceneSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof CutsceneSystem.update ===
            "function"
        ){

            CutsceneSystem.update();

        }


    },



// =========================================================
// DIALOGUE UPDATE
// =========================================================

    updateDialogue: function(){


        if(
            typeof DialogueSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof DialogueSystem.update ===
            "function"
        ){

            DialogueSystem.update();

        }


    },



// =========================================================
// AUDIO UPDATE
// =========================================================

    updateAudio: function(){


        if(
            typeof AudioSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof AudioSystem.update ===
            "function"
        ){

            AudioSystem.update();

        }


    },
// =========================================================
// RENDER GAME
// =========================================================

    render: function(){


        if(
            !this.context
        ){

            return;

        }



        // ==============================================
        // CLEAR SCREEN
        // ==============================================

        this.clearScreen();



        // ==============================================
        // CAMERA
        // ==============================================

        this.updateCamera();



        // ==============================================
        // WORLD
        // ==============================================

        this.renderWorld();



        // ==============================================
        // PLAYER
        // ==============================================

        this.renderPlayer();



        // ==============================================
        // EFFECTS
        // ==============================================

        this.renderEffects();



        // ==============================================
        // UI
        // ==============================================

        this.renderUI();


    },



// =========================================================
// CLEAR SCREEN
// =========================================================

    clearScreen: function(){


        this.context.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );


    },



// =========================================================
// RENDER WORLD
// =========================================================

    renderWorld: function(){


        /*

            World rendering goes here.

            Handles:

            - Rooms
            - Objects
            - Environment
            - Lighting
            - Background layers


        */



    },



// =========================================================
// RENDER PLAYER
// =========================================================

    renderPlayer: function(){


        if(
            typeof Player ===
            "undefined"
        ){

            return;

        }



        if(
            typeof Player.render ===
            "function"
        ){

            Player.render(
                this.context
            );

        }


    },



// =========================================================
// CAMERA UPDATE
// =========================================================

    updateCamera: function(){


        if(
            typeof CameraSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof CameraSystem.update ===
            "function"
        ){

            CameraSystem.update();

        }


    },



// =========================================================
// RENDER EFFECTS
// =========================================================

    renderEffects: function(){


        /*

            Visual atmosphere:

            - CRT distortion
            - VHS static
            - Film grain
            - Fog
            - Glitches
            - Screen shake


        */



        if(
            typeof EffectsSystem !==
            "undefined"
        ){

            if(
                typeof EffectsSystem.render ===
                "function"
            ){

                EffectsSystem.render(
                    this.context
                );

            }

        }


    },



// =========================================================
// RENDER UI
// =========================================================

    renderUI: function(){


        /*

            UI is mostly HTML based.

            This function exists for:

            - Canvas HUD
            - Minimap
            - Future interfaces


        */



    },
// =========================================================
// INPUT SYSTEM
// =========================================================

    keys: {},

    mouse: {

        x: 0,

        y: 0,

        pressed: false

    },



// =========================================================
// INITIALIZE INPUT
// =========================================================

    initializeInput: function(){


        console.log(
            "Initializing Input..."
        );



        window.addEventListener(

            "keydown",

            function(event){


                Game.keys[
                    event.key.toLowerCase()
                ] =
                true;



                Game.handleKeyPress(
                    event.key.toLowerCase()
                );


            }

        );



        window.addEventListener(

            "keyup",

            function(event){


                Game.keys[
                    event.key.toLowerCase()
                ] =
                false;


            }

        );



        window.addEventListener(

            "mousemove",

            function(event){


                Game.mouse.x =
                event.clientX;



                Game.mouse.y =
                event.clientY;


            }

        );



        window.addEventListener(

            "mousedown",

            function(){


                Game.mouse.pressed =
                true;


            }

        );



        window.addEventListener(

            "mouseup",

            function(){


                Game.mouse.pressed =
                false;


            }

        );


    },



// =========================================================
// KEY PRESS HANDLER
// =========================================================

    handleKeyPress: function(
        key
    ){



        switch(
            key
        ){



            // ==========================================
            // PAUSE
            // ==========================================

            case "escape":


                if(
                    this.paused
                ){

                    this.resume();

                }

                else{

                    this.pause();

                }


                break;




            // ==========================================
            // INVENTORY
            // ==========================================

            case "i":


                this.toggleInventory();


                break;




            // ==========================================
            // JOURNAL
            // ==========================================

            case "j":


                this.toggleJournal();


                break;




            // ==========================================
            // CUTSCENE SKIP
            // ==========================================

            case " ":


                if(
                    typeof CutsceneSystem !==
                    "undefined"
                ){

                    CutsceneSystem.skip();

                }


                break;



        }


    },



// =========================================================
// TOGGLE INVENTORY
// =========================================================

    toggleInventory: function(){


        let inventory =
        document.getElementById(
            "inventory-window"
        );



        if(
            inventory
        ){

            inventory.classList.toggle(
                "hidden"
            );

        }


    },



// =========================================================
// TOGGLE JOURNAL
// =========================================================

    toggleJournal: function(){


        let journal =
        document.getElementById(
            "journal-window"
        );



        if(
            journal
        ){

            journal.classList.toggle(
                "hidden"
            );

        }


    },
// =========================================================
// SAVE SYSTEM CONNECTION
// =========================================================

    saveTimer: 0,

    autosaveInterval: 300,



// =========================================================
// UPDATE AUTOSAVE
// =========================================================

    updateAutosave: function(
        deltaTime
    ){


        this.saveTimer +=
        deltaTime;



        if(
            this.saveTimer >=
            this.autosaveInterval
        ){


            this.saveGame(
                "autosave"
            );



            this.saveTimer =
            0;


        }


    },



// =========================================================
// CREATE SAVE DATA
// =========================================================

    createSaveData: function(){


        return {


            game:

            {

                version:
                this.version,


                playTime:
                this.totalPlayTime,


                area:
                this.currentArea,


                episode:
                this.currentEpisode,


                act:
                this.currentAct


            },



            player:

            (

                typeof Player !==
                "undefined"

                ?

                Player.getData()

                :

                null

            ),



            episodes:

            (

                typeof EpisodeSystem !==
                "undefined"

                ?

                EpisodeSystem.getData()

                :

                null

            ),



            dialogue:

            (

                typeof DialogueSystem !==
                "undefined"

                ?

                DialogueSystem.getData()

                :

                null

            )



        };


    },



// =========================================================
// SAVE GAME
// =========================================================

    saveGame: function(
        slot
    ){


        let data =
        this.createSaveData();



        if(
            typeof SaveSystem !==
            "undefined"
        ){


            SaveSystem.save(
                slot,
                data
            );


        }

        else{


            localStorage.setItem(

                "ridge_society_" +
                slot,

                JSON.stringify(
                    data
                )

            );


        }



        console.log(
            "Saved game:",
            slot
        );



    },



// =========================================================
// LOAD GAME
// =========================================================

    loadGame: function(
        slot
    ){


        let data;



        if(
            typeof SaveSystem !==
            "undefined"
        ){


            data =
            SaveSystem.load(
                slot
            );


        }

        else{


            let saved =
            localStorage.getItem(

                "ridge_society_" +
                slot

            );



            if(
                saved
            ){

                data =
                JSON.parse(
                    saved
                );


            }


        }



        if(
            !data
        ){


            console.warn(
                "No save found."
            );


            return false;


        }



        this.restoreSaveData(
            data
        );



        return true;


    },



// =========================================================
// RESTORE SAVE DATA
// =========================================================

    restoreSaveData: function(
        data
    ){


        this.totalPlayTime =
        data.game.playTime;



        this.currentArea =
        data.game.area;



        this.currentEpisode =
        data.game.episode;



        this.currentAct =
        data.game.act;



        if(
            typeof Player !==
            "undefined"
        ){

            Player.loadData(
                data.player
            );

        }



        if(
            typeof EpisodeSystem !==
            "undefined"
        ){

            EpisodeSystem.loadData(
                data.episodes
            );

        }



        if(
            typeof DialogueSystem !==
            "undefined"
        ){

            DialogueSystem.loadData(
                data.dialogue
            );

        }



        console.log(
            "Save loaded."
        );


    },
// =========================================================
// WORLD SYSTEM
// =========================================================

    areas: {},

    spawnPoints: {},

    currentSpawn: null,



// =========================================================
// REGISTER AREA
// =========================================================

    registerArea: function(
        id,
        data
    ){


        this.areas[id] =
        data;



        console.log(
            "Area registered:",
            id
        );


    },



// =========================================================
// LOAD AREA
// =========================================================

    loadArea: function(
        id,
        spawn
    ){


        if(
            !this.areas[id]
        ){


            console.error(
                "Area does not exist:",
                id
            );


            return;


        }



        console.log(
            "Loading area:",
            id
        );



        this.currentArea =
        id;



        this.currentSpawn =
        spawn
        ||
        null;



        let area =
        this.areas[id];



        // ==============================================
        // UPDATE ENVIRONMENT
        // ==============================================

        if(
            area.environment
        ){


            this.setEnvironment(
                area.environment
            );


        }



        // ==============================================
        // MOVE PLAYER
        // ==============================================

        this.movePlayerToSpawn(
            spawn
        );



        // ==============================================
        // UPDATE MAP
        // ==============================================

        if(
            typeof MapSystem !==
            "undefined"
        ){


            MapSystem.load(
                id
            );


        }


    },



// =========================================================
// SET ENVIRONMENT
// =========================================================

    setEnvironment: function(
        environment
    ){


        console.log(
            "Environment:",
            environment
        );



        document.body.dataset.environment =
        environment;



    },



// =========================================================
// REGISTER SPAWN POINT
// =========================================================

    registerSpawn: function(
        id,
        position
    ){


        this.spawnPoints[id] =
        position;



    },



// =========================================================
// MOVE PLAYER TO SPAWN
// =========================================================

    movePlayerToSpawn: function(
        spawn
    ){


        if(
            !spawn
        ){

            return;

        }



        let position =
        this.spawnPoints[spawn];



        if(
            !position
        ){

            console.warn(
                "Spawn not found:",
                spawn
            );


            return;


        }



        if(
            typeof Player !==
            "undefined"
        ){


            Player.x =
            position.x;



            Player.y =
            position.y;


        }



    },



// =========================================================
// ROOM TRANSITION
// =========================================================

    transitionArea: function(
        area,
        spawn
    ){


        console.log(
            "Transitioning..."
        );



        if(
            typeof EffectsSystem !==
            "undefined"
        ){


            EffectsSystem.fadeToBlack();


        }



        setTimeout(

            () => {


                this.loadArea(
                    area,
                    spawn
                );


            },

            1000

        );


    },



// =========================================================
// TRIGGER ZONE
// =========================================================

    triggerZone: function(
        zone
    ){


        console.log(
            "Triggered:",
            zone
        );



        if(
            zone.type ===
            "cutscene"
        ){


            CutsceneSystem.start(
                zone.id
            );


        }



        if(
            zone.type ===
            "transition"
        ){


            this.transitionArea(

                zone.area,

                zone.spawn

            );


        }



    },
// =========================================================
// ENTITY SYSTEM
// =========================================================

    entities: [],



// =========================================================
// REGISTER ENTITY
// =========================================================

    registerEntity: function(
        entity
    ){


        this.entities.push(
            entity
        );



        console.log(
            "Entity registered:",
            entity.id
        );


    },



// =========================================================
// REMOVE ENTITY
// =========================================================

    removeEntity: function(
        id
    ){


        this.entities =
        this.entities.filter(

            entity =>

            entity.id !== id

        );


    },



// =========================================================
// UPDATE ENTITIES
// =========================================================

    updateEntities: function(
        deltaTime
    ){


        this.entities.forEach(

            entity => {


                if(
                    typeof entity.update ===
                    "function"
                ){

                    entity.update(
                        deltaTime
                    );


                }


            }

        );


    },



// =========================================================
// RENDER ENTITIES
// =========================================================

    renderEntities: function(){


        this.entities.forEach(

            entity => {


                if(
                    typeof entity.render ===
                    "function"
                ){

                    entity.render(
                        this.context
                    );


                }


            }

        );


    },



// =========================================================
// FIND ENTITY
// =========================================================

    findEntity: function(
        id
    ){


        return this.entities.find(

            entity =>

            entity.id === id

        );


    },



// =========================================================
// INTERACTION SYSTEM
// =========================================================

    interactionRange: 80,

    nearbyEntity: null,



// =========================================================
// CHECK INTERACTIONS
// =========================================================

    checkInteractions: function(){


        if(
            typeof Player ===
            "undefined"
        ){

            return;

        }



        this.nearbyEntity =
        null;



        this.entities.forEach(

            entity => {


                let distance =

                Math.sqrt(

                    Math.pow(

                        Player.x -
                        entity.x,

                        2

                    )

                    +

                    Math.pow(

                        Player.y -
                        entity.y,

                        2

                    )

                );



                if(
                    distance <=
                    this.interactionRange
                ){


                    this.nearbyEntity =
                    entity;


                }


            }

        );


        this.updateInteractionPrompt();


    },



// =========================================================
// INTERACT
// =========================================================

    interact: function(){


        if(
            !this.nearbyEntity
        ){

            return;

        }



        let entity =
        this.nearbyEntity;



        console.log(
            "Interacting with:",
            entity.id
        );



        if(
            entity.dialogue
        ){


            DialogueSystem.start(
                entity.dialogue
            );


        }



        if(
            typeof entity.interact ===
            "function"
        ){


            entity.interact();


        }



    },



// =========================================================
// UPDATE PROMPT
// =========================================================

    updateInteractionPrompt: function(){


        let prompt =
        document.getElementById(

            "interaction-prompt"

        );



        if(
            !prompt
        ){

            return;

        }



        if(
            this.nearbyEntity
        ){


            prompt.classList.remove(
                "hidden"
            );


        }

        else{


            prompt.classList.add(
                "hidden"
            );


        }


    },
// =========================================================
// PLAYER CONTROL SYSTEM
// =========================================================

    movementEnabled: true,



// =========================================================
// UPDATE PLAYER CONTROLS
// =========================================================

    updateControls: function(
        deltaTime
    ){


        if(
            !this.movementEnabled
        ){

            return;

        }



        if(
            typeof Player ===
            "undefined"
        ){

            return;

        }



        if(
            typeof Player.handleInput ===
            "function"
        ){

            Player.handleInput(

                this.keys,

                deltaTime

            );

        }



    },



// =========================================================
// ENABLE MOVEMENT
// =========================================================

    enableMovement: function(){


        this.movementEnabled =
        true;



    },



// =========================================================
// DISABLE MOVEMENT
// =========================================================

    disableMovement: function(){


        this.movementEnabled =
        false;



    },



// =========================================================
// COLLISION CHECK
// =========================================================

    checkCollision: function(
        object
    ){


        if(
            typeof CollisionSystem ===
            "undefined"
        ){

            return false;

        }



        if(
            typeof CollisionSystem.check ===
            "function"
        ){

            return CollisionSystem.check(
                object
            );

        }



        return false;


    },



// =========================================================
// DOOR SYSTEM
// =========================================================

    doors: {},



// =========================================================
// REGISTER DOOR
// =========================================================

    registerDoor: function(
        id,
        data
    ){


        this.doors[id] =
        data;



    },



// =========================================================
// OPEN DOOR
// =========================================================

    openDoor: function(
        id
    ){


        let door =
        this.doors[id];



        if(
            !door
        ){

            console.warn(
                "Door not found:",
                id
            );

            return;

        }



        if(
            door.locked
        ){


            if(
                !this.hasItem(
                    door.requiredItem
                )
            ){

                console.log(
                    "Door locked."
                );


                return;


            }


        }



        door.open =
        true;



        console.log(
            "Door opened:",
            id
        );


    },



// =========================================================
// ITEM CHECK
// =========================================================

    hasItem: function(
        item
    ){


        if(
            typeof InventorySystem ===
            "undefined"
        ){

            return false;

        }



        return InventorySystem.hasItem(
            item
        );


    },



// =========================================================
// ACTIVATE OBJECT EVENT
// =========================================================

    activateEvent: function(
        event
    ){


        console.log(
            "Event activated:",
            event
        );



        switch(
            event.type
        ){


            case "dialogue":


                DialogueSystem.start(
                    event.id
                );


                break;



            case "cutscene":


                CutsceneSystem.start(
                    event.id
                );


                break;



            case "episode":


                EpisodeSystem.advance(
                    event.id
                );


                break;



        }


    },
// =========================================================
// CUTSCENE MANAGEMENT
// =========================================================

    activeCutscene: null,

    cutsceneQueue: [],



// =========================================================
// START CUTSCENE
// =========================================================

    startCutscene: function(
        id
    ){


        if(
            typeof CutsceneSystem ===
            "undefined"
        ){

            console.warn(
                "Cutscene system missing."
            );

            return;

        }



        console.log(
            "Starting cutscene:",
            id
        );



        this.disableMovement();



        this.activeCutscene =
        id;



        CutsceneSystem.start(
            id
        );


    },



// =========================================================
// END CUTSCENE
// =========================================================

    endCutscene: function(){


        this.activeCutscene =
        null;



        this.enableMovement();



        console.log(
            "Cutscene ended."
        );


    },



// =========================================================
// QUEUE CUTSCENE
// =========================================================

    queueCutscene: function(
        id
    ){


        this.cutsceneQueue.push(
            id
        );



    },



// =========================================================
// PLAY NEXT CUTSCENE
// =========================================================

    playNextCutscene: function(){


        if(
            this.cutsceneQueue.length === 0
        ){

            return;

        }



        let next =
        this.cutsceneQueue.shift();



        this.startCutscene(
            next
        );


    },



// =========================================================
// CHARACTER STAGING
// =========================================================

    stagedCharacters: {},



// =========================================================
// PLACE CHARACTER
// =========================================================

    stageCharacter: function(
        id,
        position
    ){


        this.stagedCharacters[id] =
        position;



        console.log(
            "Character staged:",
            id
        );


    },



// =========================================================
// REMOVE CHARACTER
// =========================================================

    removeStageCharacter: function(
        id
    ){


        delete this.stagedCharacters[id];


    },



// =========================================================
// CAMERA CINEMATIC CONTROL
// =========================================================

    focusCamera: function(
        target,
        duration
    ){


        if(
            typeof CameraSystem ===
            "undefined"
        ){

            return;

        }



        CameraSystem.focus(

            target,

            duration ||
            1000

        );


    },



// =========================================================
// CINEMATIC TRANSITION
// =========================================================

    cinematicTransition: function(
        type,
        duration
    ){


        let overlay =
        document.getElementById(
            "transition-screen"
        );



        if(
            !overlay
        ){

            return;

        }



        overlay.dataset.transition =
        type;



        overlay.classList.remove(
            "hidden"
        );



        setTimeout(

            function(){


                overlay.classList.add(
                    "hidden"
                );


            },

            duration ||
            1000

        );


    },



// =========================================================
// WAIT EVENT
// =========================================================

    wait: function(
        time,
        callback
    ){


        setTimeout(

            function(){

                callback();

            },

            time

        );


    },
// =========================================================
// STORY STATE SYSTEM
// =========================================================

    variables: {},

    flags: {},

    discoveries: [],



// =========================================================
// SET VARIABLE
// =========================================================

    setVariable: function(
        name,
        value
    ){


        this.variables[name] =
        value;



        console.log(
            "Variable set:",
            name,
            value
        );


    },



// =========================================================
// GET VARIABLE
// =========================================================

    getVariable: function(
        name
    ){


        return this.variables[name];


    },



// =========================================================
// CHECK VARIABLE
// =========================================================

    checkVariable: function(
        name,
        value
    ){


        return (

            this.variables[name]
            ===
            value

        );


    },



// =========================================================
// SET STORY FLAG
// =========================================================

    setFlag: function(
        flag
    ){


        this.flags[flag] =
        true;



        console.log(
            "Story flag unlocked:",
            flag
        );


    },



// =========================================================
// REMOVE STORY FLAG
// =========================================================

    removeFlag: function(
        flag
    ){


        delete this.flags[flag];


    },



// =========================================================
// CHECK FLAG
// =========================================================

    hasFlag: function(
        flag
    ){


        return Boolean(
            this.flags[flag]
        );


    },



// =========================================================
// DISCOVERY SYSTEM
// =========================================================

    addDiscovery: function(
        discovery
    ){


        if(
            this.discoveries.includes(
                discovery
            )
        ){

            return;

        }



        this.discoveries.push(
            discovery
        );



        console.log(
            "Discovery found:",
            discovery
        );


    },



// =========================================================
// CHECK DISCOVERY
// =========================================================

    hasDiscovery: function(
        discovery
    ){


        return this.discoveries.includes(
            discovery
        );


    },



// =========================================================
// RESET STORY DATA
// =========================================================

    resetStory: function(){


        this.variables = {};

        this.flags = {};

        this.discoveries = {};



        console.log(
            "Story data reset."
        );


    },



// =========================================================
// EXPORT STORY DATA
// =========================================================

    getStoryData: function(){


        return {


            variables:
            this.variables,


            flags:
            this.flags,


            discoveries:
            this.discoveries


        };


    },



// =========================================================
// IMPORT STORY DATA
// =========================================================

    loadStoryData: function(
        data
    ){


        if(
            !data
        ){

            return;

        }



        this.variables =
        data.variables
        ||
        {};



        this.flags =
        data.flags
        ||
        {};



        this.discoveries =
        data.discoveries
        ||
        [];



        console.log(
            "Story data loaded."
        );


    },
// =========================================================
// ACHIEVEMENT SYSTEM CONNECTION
// =========================================================

    achievements: [],



// =========================================================
// UNLOCK ACHIEVEMENT
// =========================================================

    unlockAchievement: function(
        id
    ){


        if(
            this.achievements.includes(
                id
            )
        ){

            return;

        }



        this.achievements.push(
            id
        );



        console.log(
            "Achievement unlocked:",
            id
        );



        if(
            typeof AchievementSystem !==
            "undefined"
        ){


            AchievementSystem.unlock(
                id
            );


        }


    },



// =========================================================
// CHECK ACHIEVEMENT
// =========================================================

    hasAchievement: function(
        id
    ){


        return this.achievements.includes(
            id
        );


    },



// =========================================================
// PLAYER STATISTICS
// =========================================================

    statistics:

    {

        deaths: 0,

        interactions: 0,

        itemsCollected: 0,

        secretsFound: 0,

        cutscenesViewed: 0,

        choicesMade: 0

    },



// =========================================================
// INCREASE STAT
// =========================================================

    increaseStat: function(
        stat,
        amount
    ){


        if(
            this.statistics[stat]
            ===
            undefined
        ){

            console.warn(
                "Unknown statistic:",
                stat
            );


            return;

        }



        this.statistics[stat] +=

        amount ||
        1;



    },



// =========================================================
// GET STATISTICS
// =========================================================

    getStatistics: function(){


        return this.statistics;


    },



// =========================================================
// PERFORMANCE MONITOR
// =========================================================

    performance:

    {

        fps: 0,

        frames: 0,

        lastTime: 0

    },



// =========================================================
// UPDATE PERFORMANCE
// =========================================================

    updatePerformance: function(){


        let now =
        performance.now();



        this.performance.frames++;



        if(
            now -
            this.performance.lastTime
            >=
            1000
        ){


            this.performance.fps =

            this.performance.frames;



            this.performance.frames =
            0;



            this.performance.lastTime =
            now;



            let counter =
            document.getElementById(

                "fps-counter"

            );



            if(
                counter
            ){

                counter.textContent =

                "FPS: "
                +
                this.performance.fps;

            }


        }


    },



// =========================================================
// EXPORT PLAYER PROGRESS
// =========================================================

    getProgressData: function(){


        return {


            achievements:
            this.achievements,


            statistics:
            this.statistics,


            playtime:
            this.totalPlayTime



        };


    },



// =========================================================
// LOAD PLAYER PROGRESS
// =========================================================

    loadProgressData: function(
        data
    ){


        if(
            !data
        ){

            return;

        }



        this.achievements =

        data.achievements
        ||
        [];



        this.statistics =

        data.statistics
        ||
        this.statistics;



        this.totalPlayTime =

        data.playtime
        ||
        0;



    },
// =========================================================
// AUDIO MANAGEMENT
// =========================================================

    audio:

    {

        music: null,

        ambience: null,

        masterVolume: 1,

        musicVolume: 1,

        effectsVolume: 1

    },



// =========================================================
// PLAY MUSIC
// =========================================================

    playMusic: function(
        track
    ){


        if(
            typeof AudioSystem ===
            "undefined"
        ){

            console.warn(
                "Audio system unavailable."
            );


            return;

        }



        this.audio.music =
        track;



        AudioSystem.playMusic(
            track
        );



        console.log(
            "Music playing:",
            track
        );


    },



// =========================================================
// STOP MUSIC
// =========================================================

    stopMusic: function(){


        if(
            typeof AudioSystem !==
            "undefined"
        ){


            AudioSystem.stopMusic();


        }



        this.audio.music =
        null;



    },



// =========================================================
// PLAY SOUND EFFECT
// =========================================================

    playSound: function(
        sound
    ){


        if(
            typeof AudioSystem ===
            "undefined"
        ){

            return;

        }



        AudioSystem.playSound(
            sound
        );



    },



// =========================================================
// PLAY AMBIENCE
// =========================================================

    playAmbience: function(
        ambience
    ){


        this.audio.ambience =
        ambience;



        if(
            typeof AudioSystem !==
            "undefined"
        ){


            AudioSystem.playAmbience(
                ambience
            );


        }


    },



// =========================================================
// STOP AMBIENCE
// =========================================================

    stopAmbience: function(){


        if(
            typeof AudioSystem !==
            "undefined"
        ){


            AudioSystem.stopAmbience();


        }



        this.audio.ambience =
        null;



    },



// =========================================================
// SET MASTER VOLUME
// =========================================================

    setMasterVolume: function(
        volume
    ){


        this.audio.masterVolume =
        Math.max(

            0,

            Math.min(
                volume,
                1
            )

        );



        if(
            typeof AudioSystem !==
            "undefined"
        ){


            AudioSystem.setMasterVolume(

                this.audio.masterVolume

            );


        }


    },



// =========================================================
// SET MUSIC VOLUME
// =========================================================

    setMusicVolume: function(
        volume
    ){


        this.audio.musicVolume =
        volume;



        if(
            typeof AudioSystem !==
            "undefined"
        ){


            AudioSystem.setMusicVolume(
                volume
            );


        }


    },



// =========================================================
// UPDATE AUDIO
// =========================================================

    updateAudioState: function(){


        if(
            typeof AudioSystem ===
            "undefined"
        ){

            return;

        }



        if(
            typeof AudioSystem.update ===
            "function"
        ){


            AudioSystem.update();


        }


    },
// =========================================================
// SETTINGS SYSTEM
// =========================================================

    settings:

    {

        fullscreen: false,

        resolution: "1280x720",

        vibration: true,

        subtitles: true

    },



// =========================================================
// LOAD SETTINGS
// =========================================================

    loadSettings: function(){


        if(
            typeof SettingsSystem ===
            "undefined"
        ){

            return;

        }



        let saved =
        SettingsSystem.load();



        if(
            saved
        ){

            this.settings =
            saved;

        }



    },



// =========================================================
// SAVE SETTINGS
// =========================================================

    saveSettings: function(){


        if(
            typeof SettingsSystem !==
            "undefined"
        ){

            SettingsSystem.save(
                this.settings
            );

        }



    },



// =========================================================
// TOGGLE FULLSCREEN
// =========================================================

    toggleFullscreen: function(){


        this.settings.fullscreen =
        !this.settings.fullscreen;



        if(
            this.settings.fullscreen
        ){


            document.documentElement.requestFullscreen?.();


        }

        else{


            document.exitFullscreen?.();


        }



    },



// =========================================================
// CONTROLLER SUPPORT
// =========================================================

    controller:

    {

        connected: false,

        index: null

    },



// =========================================================
// CHECK CONTROLLERS
// =========================================================

    checkControllers: function(){


        let controllers =
        navigator.getGamepads?.();



        if(
            !controllers
        ){

            return;

        }



        for(
            let i = 0;
            i < controllers.length;
            i++
        ){


            if(
                controllers[i]
            ){


                this.controller.connected =
                true;



                this.controller.index =
                i;



            }


        }


    },



// =========================================================
// DEVELOPER TOOLS
// =========================================================

    developer:

    {

        enabled: true

    },



// =========================================================
// ENABLE DEVELOPER MODE
// =========================================================

    enableDeveloperMode: function(){


        this.developer.enabled =
        true;



        let panel =
        document.getElementById(

            "developer-panel"

        );



        panel?.classList.remove(
            "hidden"
        );



    },



// =========================================================
// DISABLE DEVELOPER MODE
// =========================================================

    disableDeveloperMode: function(){


        this.developer.enabled =
        false;



        let panel =
        document.getElementById(

            "developer-panel"

        );



        panel?.classList.add(
            "hidden"
        );



    },



// =========================================================
// CLEANUP GAME
// =========================================================

    cleanup: function(){


        this.running =
        false;



        this.entities =
        [];



        this.cutsceneQueue =
        [];



        this.activeCutscene =
        null;



        console.log(
            "Game cleaned up."
        );


    },
// =========================================================
// FINAL UPDATE HOOKS
// =========================================================

    finalUpdate: function(
        deltaTime
    ){


        this.updateEntities(
            deltaTime
        );



        this.checkInteractions();



        this.updatePerformance();



        this.checkControllers();



    },



// =========================================================
// FINAL SHUTDOWN
// =========================================================

    shutdown: function(){


        console.log(
            "Shutting down game..."
        );



        this.cleanup();



        if(
            typeof AudioSystem !==
            "undefined"
        ){

            AudioSystem.shutdown?.();

        }



        if(
            typeof SaveSystem !==
            "undefined"
        ){

            SaveSystem.shutdown?.();

        }



        console.log(
            "Game shutdown complete."
        );


    }



};



// =========================================================
// GLOBAL EXPORT
// =========================================================

if(
    typeof window !==
    "undefined"
){

    window.Game =
    Game;


}



// =========================================================
// GAME BOOT SEQUENCE
// =========================================================

function bootGame(){


    console.log(
        "Booting The Ridge Society..."
    );



    if(
        typeof Game !==
        "undefined"
    ){


        Game.initialize();



        Game.initializeInput();



        Game.loadSettings();



        Game.start();



    }


}



// =========================================================
// PAGE LOAD START
// =========================================================

if(
    typeof window !==
    "undefined"
){

    window.addEventListener(

        "load",

        function(){


            bootGame();


        }

    );

}



// =========================================================
// EXIT HANDLER
// =========================================================

window.addEventListener(

    "beforeunload",

    function(){


        if(
            typeof Game !==
            "undefined"
        ){

            Game.saveGame(
                "autosave"
            );



            Game.shutdown();


        }


    }

);



// =========================================================
// THE RIDGE SOCIETY
// GAME ENGINE COMPLETE
// Version 0.1 Alpha
// =========================================================
