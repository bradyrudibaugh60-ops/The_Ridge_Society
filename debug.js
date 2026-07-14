// =========================================================
// THE RIDGE SOCIETY
// DEBUG SYSTEM
// Version 0.1
// Part 1/5
// =========================================================

const DebugSystem = {

    enabled: true,

    version: "0.1",

    logs: [],

    commands: {},


// =========================================================
// INITIALIZE
// =========================================================

    initialize: function(){

        console.log(
            "Debug System Initialized"
        );

        this.log(
            "Debug mode active."
        );

    },


// =========================================================
// LOG MESSAGE
// =========================================================

    log: function(message){

        this.logs.push({

            message: message,

            time: new Date()

        });

        console.log(
            "[DEBUG]",
            message
        );

    },


// =========================================================
// WARNING
// =========================================================

    warn: function(message){

        console.warn(
            "[DEBUG WARNING]",
            message
        );

    },


// =========================================================
// ERROR
// =========================================================

    error: function(message){

        console.error(
            "[DEBUG ERROR]",
            message
        );

    },


// =========================================================
// ENABLE / DISABLE
// =========================================================

    setEnabled: function(value){

        this.enabled = value;

        console.log(
            "Debug:",
            value
        );

    },


// =========================================================
// REGISTER COMMAND
// =========================================================

    registerCommand: function(
        name,
        callback
    ){

        this.commands[name] =
        callback;

    },


// =========================================================
// RUN COMMAND
// =========================================================

    runCommand: function(
        name,
        ...args
    ){

        if(
            this.commands[name]
        ){

            this.commands[name](
                ...args
            );

        }

        else{

            this.warn(
                "Unknown command: " + name
            );

        }

    },
// =========================================================
// CHANGE ACT
// =========================================================

    setAct: function(
        act
    ){

        if(
            typeof ActSystem === "undefined"
        ){

            this.warn(
                "ActSystem not found."
            );

            return;

        }

        ActSystem.setAct(
            act
        );

        this.log(
            "Changed to Act " + act
        );

    },


// =========================================================
// START EPISODE
// =========================================================

    startEpisode: function(
        id
    ){

        if(
            typeof EpisodeSystem === "undefined"
        ){

            this.warn(
                "EpisodeSystem not found."
            );

            return;

        }

        EpisodeSystem.unlockEpisode(
            id
        );

        EpisodeSystem.startEpisode(
            id
        );

        this.log(
            "Started episode: " + id
        );

    },


// =========================================================
// START CUTSCENE
// =========================================================

    playCutscene: function(
        id
    ){

        if(
            typeof CutsceneSystem === "undefined"
        ){

            this.warn(
                "CutsceneSystem not found."
            );

            return;

        }

        CutsceneSystem.start(
            id
        );

        this.log(
            "Playing cutscene: " + id
        );

    },


// =========================================================
// SHOW VARIABLES
// =========================================================

    showVariables: function(){

        if(
            typeof DialogueSystem === "undefined"
        ){

            this.warn(
                "DialogueSystem not found."
            );

            return;

        }

        console.table(
            DialogueSystem.variables
        );

    },


// =========================================================
// SHOW SAVE DATA
// =========================================================

    showSaveData: function(){

        if(
            typeof SaveSystem === "undefined"
        ){

            this.warn(
                "SaveSystem not found."
            );

            return;

        }

        console.log(
            SaveSystem.getSaveData()
        );

    },


// =========================================================
// PLAYER POSITION
// =========================================================

    playerPosition: function(){

        if(
            typeof Player === "undefined"
        ){

            this.warn(
                "Player object not found."
            );

            return;

        }

        console.log({

            x: Player.x,

            y: Player.y,

            direction: Player.direction

        });

    },
// =========================================================
// GOD MODE
// =========================================================

    godMode: false,


    toggleGodMode: function(){

        this.godMode =
        !this.godMode;

        this.log(
            "God Mode: " +
            (
                this.godMode
                ?
                "Enabled"
                :
                "Disabled"
            )
        );

    },


// =========================================================
// COLLISION
// =========================================================

    collisionEnabled: true,


    toggleCollision: function(){

        this.collisionEnabled =
        !this.collisionEnabled;

        this.log(
            "Collision: " +
            (
                this.collisionEnabled
                ?
                "Enabled"
                :
                "Disabled"
            )
        );

    },


// =========================================================
// FREE CAMERA
// =========================================================

    freeCamera: false,


    toggleFreeCamera: function(){

        this.freeCamera =
        !this.freeCamera;

        this.log(
            "Free Camera: " +
            (
                this.freeCamera
                ?
                "Enabled"
                :
                "Disabled"
            )
        );

    },


// =========================================================
// FPS COUNTER
// =========================================================

    showFPS: function(){

        if(
            typeof PerformanceSystem !== "undefined"
        ){

            PerformanceSystem.toggleFPS();

            this.log(
                "FPS Counter toggled."
            );

        }

        else{

            this.warn(
                "PerformanceSystem not found."
            );

        }

    },


// =========================================================
// UNLOCK EVERYTHING
// =========================================================

    unlockEverything: function(){

        if(
            typeof EpisodeSystem !== "undefined"
        ){

            Object.keys(
                EpisodeSystem.episodes
            ).forEach(
                episode => {

                    EpisodeSystem.unlockEpisode(
                        episode
                    );

                }
            );

        }

        this.log(
            "All available content unlocked."
        );

    },


// =========================================================
// COMPLETE CURRENT EPISODE
// =========================================================

    completeCurrentEpisode: function(){

        if(
            typeof EpisodeSystem === "undefined"
        ){

            return;

        }

        let current =
        EpisodeSystem.getCurrent();

        if(
            current
        ){

            EpisodeSystem.completeEpisode(
                current.id
            );

            this.log(
                "Completed: " +
                current.title
            );

        }

    },
// =========================================================
// TELEPORT PLAYER
// =========================================================

    teleportPlayer: function(
        x,
        y
    ){

        if(
            typeof Player === "undefined"
        ){

            this.warn(
                "Player object not found."
            );

            return;

        }

        Player.x = x;
        Player.y = y;

        this.log(
            "Teleported player to (" +
            x +
            ", " +
            y +
            ")"
        );

    },


// =========================================================
// INSPECT OBJECT
// =========================================================

    inspect: function(
        object
    ){

        console.dir(
            object
        );

    },


// =========================================================
// MEMORY INFORMATION
// =========================================================

    memoryInfo: function(){

        if(
            performance &&
            performance.memory
        ){

            console.table({

                usedJSHeapSize:
                performance.memory.usedJSHeapSize,

                totalJSHeapSize:
                performance.memory.totalJSHeapSize,

                jsHeapSizeLimit:
                performance.memory.jsHeapSizeLimit

            });

        }

        else{

            this.warn(
                "Memory information unavailable in this browser."
            );

        }

    },


// =========================================================
// DEBUG OVERLAY
// =========================================================

    toggleOverlay: function(){

        let overlay =
        document.getElementById(
            "debug-overlay"
        );

        if(
            overlay
        ){

            overlay.remove();

            this.log(
                "Debug overlay disabled."
            );

            return;

        }

        overlay =
        document.createElement(
            "div"
        );

        overlay.id =
        "debug-overlay";

        overlay.style.position =
        "fixed";

        overlay.style.top =
        "10px";

        overlay.style.left =
        "10px";

        overlay.style.zIndex =
        "99999";

        overlay.style.background =
        "rgba(0,0,0,0.75)";

        overlay.style.color =
        "#00ff00";

        overlay.style.padding =
        "10px";

        overlay.style.fontFamily =
        "monospace";

        overlay.textContent =
        "DEBUG MODE ACTIVE";

        document.body.appendChild(
            overlay
        );

        this.log(
            "Debug overlay enabled."
        );

    },


// =========================================================
// GENERATE ERROR REPORT
// =========================================================

    generateReport: function(){

        return {

            version:
            this.version,

            debugEnabled:
            this.enabled,

            logCount:
            this.logs.length,

            timestamp:
            new Date().toISOString()

        };

    },
// =========================================================
// CLEAR DEBUG LOGS
// =========================================================

    clearLogs: function(){

        this.logs = [];

        console.clear();

        this.log(
            "Debug logs cleared."
        );

    },


// =========================================================
// GET DEBUG LOGS
// =========================================================

    getLogs: function(){

        return this.logs;

    }

};


// =========================================================
// BROWSER EXPORT
// =========================================================

if(
    typeof window !== "undefined"
){

    window.DebugSystem =
    DebugSystem;

}


// =========================================================
// QUICK CONSOLE SHORTCUTS
// =========================================================

if(
    typeof window !== "undefined"
){

    window.debug =
    DebugSystem;

}


// =========================================================
// INITIALIZATION
// =========================================================

function initializeDebugSystem(){

    if(
        !DebugSystem.enabled
    ){

        return;

    }

    DebugSystem.initialize();

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

            initializeDebugSystem();

        }
    );

}


// =========================================================
// EXAMPLE CONSOLE COMMANDS
// =========================================================

/*

Examples:

debug.toggleGodMode();

debug.toggleCollision();

debug.unlockEverything();

debug.playCutscene(
    "opening_scene"
);

debug.startEpisode(
    "episode_1"
);

debug.teleportPlayer(
    128,
    256
);

debug.showVariables();

debug.memoryInfo();

*/


// =========================================================
// THE RIDGE SOCIETY
// DEBUG SYSTEM COMPLETE
// =========================================================
