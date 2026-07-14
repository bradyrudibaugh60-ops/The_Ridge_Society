// =========================================================
// THE RIDGE SOCIETY
// EPISODE SYSTEM
// Version 0.1
// Part 1/5
// =========================================================



const EpisodeSystem = {



    initialized: false,



    episodes: {},



    currentEpisode: null,



    completedEpisodes: [],



    unlockedEpisodes: [],



    progress: {},



// =========================================================
// INITIALIZATION
// =========================================================


    initialize: function(){


        this.initialized =
        true;



        console.log(
            "Episode System Initialized"
        );



    },



// =========================================================
// REGISTER EPISODE
// =========================================================


    registerEpisode: function(
        id,
        data
    ){


        this.episodes[id] =
        data;



    },



// =========================================================
// GET EPISODE
// =========================================================


    getEpisode: function(
        id
    ){


        return (
            this.episodes[id]
            ||
            null
        );


    },



// =========================================================
// CREATE EPISODE
// =========================================================


    createEpisode: function(
        id,
        title,
        act
    ){


        this.episodes[id] = {


            id:
            id,


            title:
            title,


            act:
            act,


            unlocked:
            false,


            completed:
            false



        };


    },



// =========================================================
// SET CURRENT EPISODE
// =========================================================


    setCurrent: function(
        id
    ){


        let episode =
        this.getEpisode(
            id
        );



        if(
            !episode
        ){


            console.error(
                "Episode not found:",
                id
            );


            return false;


        }



        this.currentEpisode =
        episode;



        return true;


    },



// =========================================================
// GET CURRENT EPISODE
// =========================================================


    getCurrent: function(){


        return this.currentEpisode;


    },
// =========================================================
// UNLOCK EPISODE
// =========================================================


    unlockEpisode: function(
        id
    ){


        let episode =
        this.getEpisode(
            id
        );



        if(
            !episode
        ){


            return false;


        }



        episode.unlocked =
        true;



        if(
            !this.unlockedEpisodes.includes(
                id
            )
        ){


            this.unlockedEpisodes.push(
                id
            );


        }



        console.log(
            "Episode unlocked:",
            id
        );



        return true;


    },



// =========================================================
// LOCK EPISODE
// =========================================================


    lockEpisode: function(
        id
    ){


        let episode =
        this.getEpisode(
            id
        );



        if(
            !episode
        ){


            return;


        }



        episode.unlocked =
        false;



        this.unlockedEpisodes =
        this.unlockedEpisodes.filter(
            item =>
            item !== id
        );


    },



// =========================================================
// CHECK IF UNLOCKED
// =========================================================


    isUnlocked: function(
        id
    ){


        return (
            this.unlockedEpisodes.includes(
                id
            )
        );


    },



// =========================================================
// COMPLETE EPISODE
// =========================================================


    completeEpisode: function(
        id
    ){


        let episode =
        this.getEpisode(
            id
        );



        if(
            !episode
        ){


            return false;


        }



        episode.completed =
        true;



        if(
            !this.completedEpisodes.includes(
                id
            )
        ){


            this.completedEpisodes.push(
                id
            );


        }



        console.log(
            "Episode completed:",
            id
        );



        return true;


    },



// =========================================================
// CHECK COMPLETION
// =========================================================


    isCompleted: function(
        id
    ){


        return (
            this.completedEpisodes.includes(
                id
            )
        );


    },



// =========================================================
// REQUIREMENT CHECK
// =========================================================


    checkRequirement: function(
        requirement
    ){


        if(
            !requirement
        ){


            return true;


        }



        switch(
            requirement.type
        ){



            case "episode":


                return this.isCompleted(
                    requirement.id
                );




            case "act":


                if(
                    typeof ActSystem !== "undefined"
                ){


                    return ActSystem.currentAct >= requirement.value;


                }


                break;




            default:


                return true;



        }



        return false;


    },



// =========================================================
// AUTO UNLOCK CHECK
// =========================================================


    updateUnlocks: function(){


        Object.keys(
            this.episodes
        ).forEach(
            id => {



                let episode =
                this.episodes[id];



                if(
                    this.checkRequirement(
                        episode.requirement
                    )
                ){


                    this.unlockEpisode(
                        id
                    );


                }



            }
        );


    },
// =========================================================
// START EPISODE
// =========================================================


    startEpisode: function(
        id
    ){


        if(
            !this.isUnlocked(id)
        ){


            console.warn(
                "Episode locked:",
                id
            );


            return false;


        }



        this.setCurrent(
            id
        );



        let episode =
        this.currentEpisode;



        this.progress[id] = {


            started:
            true,


            completed:
            false,


            currentScene:
            0



        };



        console.log(
            "Starting episode:",
            episode.title
        );



        if(
            episode.startCutscene
            &&
            typeof CutsceneSystem !== "undefined"
        ){


            CutsceneSystem.start(
                episode.startCutscene
            );


        }



        return true;


    },



// =========================================================
// UPDATE EPISODE PROGRESS
// =========================================================


    updateProgress: function(
        scene
    ){


        if(
            !this.currentEpisode
        ){


            return;


        }



        let id =
        this.currentEpisode.id;



        if(
            !this.progress[id]
        ){


            this.progress[id] = {};


        }



        this.progress[id].currentScene =
        scene;



    },



// =========================================================
// GET EPISODE PROGRESS
// =========================================================


    getProgress: function(
        id
    ){


        return (
            this.progress[id]
            ||
            null
        );


    },



// =========================================================
// END EPISODE
// =========================================================


    endEpisode: function(){


        if(
            !this.currentEpisode
        ){


            return;


        }



        let id =
        this.currentEpisode.id;



        this.completeEpisode(
            id
        );



        this.progress[id].completed =
        true;



        if(
            this.currentEpisode.endCutscene
            &&
            typeof CutsceneSystem !== "undefined"
        ){


            CutsceneSystem.start(
                this.currentEpisode.endCutscene
            );


        }



        console.log(
            "Episode finished:",
            id
        );



        this.currentEpisode =
        null;



    },



// =========================================================
// GET AVAILABLE EPISODES
// =========================================================


    getAvailableEpisodes: function(){


        return Object.values(
            this.episodes
        ).filter(
            episode =>
            episode.unlocked
        );


    },



// =========================================================
// GET COMPLETED EPISODES
// =========================================================


    getCompletedEpisodes: function(){


        return this.completedEpisodes;


    },



// =========================================================
// GET NEXT EPISODE
// =========================================================


    getNextEpisode: function(){


        let ids =
        Object.keys(
            this.episodes
        );



        let current =
        ids.indexOf(
            this.currentEpisode.id
        );



        return (
            this.episodes[
                ids[current + 1]
            ]
            ||
            null
        );


    },
// =========================================================
// EPISODE HISTORY
// =========================================================


    history: [],



// =========================================================
// ADD HISTORY ENTRY
// =========================================================


    addHistory: function(
        id
    ){


        this.history.push({


            episode:
            id,


            date:
            Date.now()



        });



    },



// =========================================================
// GET HISTORY
// =========================================================


    getHistory: function(){


        return this.history;


    },



// =========================================================
// SAVE EPISODE DATA
// =========================================================


    saveState: function(){


        return {


            currentEpisode:
            this.currentEpisode
            ?
            this.currentEpisode.id
            :
            null,



            completedEpisodes:
            this.completedEpisodes,



            unlockedEpisodes:
            this.unlockedEpisodes,



            progress:
            this.progress,



            history:
            this.history



        };


    },



// =========================================================
// LOAD EPISODE DATA
// =========================================================


    loadState: function(
        data
    ){


        if(
            !data
        ){


            return;


        }



        this.completedEpisodes =
        data.completedEpisodes
        ||
        [];



        this.unlockedEpisodes =
        data.unlockedEpisodes
        ||
        [];



        this.progress =
        data.progress
        ||
        [];



        this.history =
        data.history
        ||
        [];



        if(
            data.currentEpisode
        ){


            this.setCurrent(
                data.currentEpisode
            );


        }



    },



// =========================================================
// REPLAY EPISODE
// =========================================================


    replayEpisode: function(
        id
    ){


        let episode =
        this.getEpisode(
            id
        );



        if(
            !episode
        ){


            return false;


        }



        console.log(
            "Replaying episode:",
            id
        );



        return this.startEpisode(
            id
        );


    },



// =========================================================
// EPISODE STATISTICS
// =========================================================


    getStatistics: function(){


        return {


            total:
            Object.keys(
                this.episodes
            ).length,



            unlocked:
            this.unlockedEpisodes.length,



            completed:
            this.completedEpisodes.length



        };


    },



// =========================================================
// RESET PROGRESS
// =========================================================


    resetProgress: function(){


        this.currentEpisode =
        null;



        this.completedEpisodes =
        [];



        this.unlockedEpisodes =
        [];



        this.progress =
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


    window.EpisodeSystem =
    EpisodeSystem;


}



// =========================================================
// DEBUG TOOLS
// =========================================================


const EpisodeDebug = {



    list: function(){


        console.log(
            EpisodeSystem.episodes
        );


    },



    current: function(){


        console.log(
            EpisodeSystem.getCurrent()
        );


    },



    statistics: function(){


        console.log(
            EpisodeSystem.getStatistics()
        );


    },



    complete: function(
        id
    ){


        EpisodeSystem.completeEpisode(
            id
        );


    },



    unlock: function(
        id
    ){


        EpisodeSystem.unlockEpisode(
            id
        );


    }



};



// =========================================================
// EXPORT DEBUG
// =========================================================


if(
    typeof window !== "undefined"
){


    window.EpisodeDebug =
    EpisodeDebug;


}



// =========================================================
// STARTUP INITIALIZATION
// =========================================================


function initializeEpisodeSystem(){


    if(
        !EpisodeSystem.initialized
    ){


        EpisodeSystem.initialize();


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


            initializeEpisodeSystem();


        }
    );


}



// =========================================================
// THE RIDGE SOCIETY
// EPISODE SYSTEM COMPLETE
// =========================================================
