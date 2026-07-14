/*
===========================================================
THE RIDGE SOCIETY
Achievement System
File: achievements.js

Part 1/?
===========================================================

This file manages:
- Achievement creation
- Achievement tracking
- Unlock states
- Progress tracking
- Player milestones

Designed for:
- Act 1-3 progression
- Story choices
- Faith system
- Reputation system
- Save system integration
===========================================================
*/


// =========================================================
// ACHIEVEMENT DATABASE
// =========================================================

const RidgeAchievements = {

    // -----------------------------------------------------
    // STORY ACHIEVEMENTS
    // -----------------------------------------------------

    "first_steps": {
        id: "first_steps",
        title: "First Steps",
        description: "Begin your journey within The Ridge Society.",
        category: "Story",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "welcome_to_the_ridge": {
        id: "welcome_to_the_ridge",
        title: "Welcome To The Ridge",
        description: "Become accepted into the Ridge Society.",
        category: "Story",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "act_one_complete": {
        id: "act_one_complete",
        title: "The Flock",
        description: "Complete Act I.",
        category: "Story",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "act_two_complete": {
        id: "act_two_complete",
        title: "The Shepherd's Work",
        description: "Complete Act II.",
        category: "Story",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "act_three_complete": {
        id: "act_three_complete",
        title: "The Final Revelation",
        description: "Complete Act III.",
        category: "Story",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    // -----------------------------------------------------
    // EXPLORATION ACHIEVEMENTS
    // -----------------------------------------------------

    "first_discovery": {
        id: "first_discovery",
        title: "Something Is Wrong",
        description: "Discover your first hidden secret.",
        category: "Exploration",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "forbidden_area": {
        id: "forbidden_area",
        title: "Where You Shouldn't Be",
        description: "Enter a forbidden location.",
        category: "Exploration",
        unlocked: false,
        hidden: true,
        progress: 0,
        maxProgress: 1
    },


    "old_records": {
        id: "old_records",
        title: "The Forgotten Records",
        description: "Find records hidden from the Society.",
        category: "Exploration",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    // -----------------------------------------------------
    // PLAYER DEVELOPMENT
    // -----------------------------------------------------

    "faithful_member": {
        id: "faithful_member",
        title: "A Faithful Member",
        description: "Earn the trust of the Society.",
        category: "Player",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 100
    },


    "doubt_begins": {
        id: "doubt_begins",
        title: "A Crack In The Faith",
        description: "Begin questioning the Ridge Society.",
        category: "Player",
        unlocked: false,
        hidden: false,
        progress: 0,
        maxProgress: 1
    },


    "outsider": {
        id: "outsider",
        title: "The Outsider",
        description: "Lose the trust of the Society.",
        category: "Player",
        unlocked: false,
        hidden: true,
        progress: 0,
        maxProgress: 1
    }

};


// =========================================================
// ACHIEVEMENT STORAGE
// =========================================================


let AchievementManager = {

    achievements: RidgeAchievements,

    unlockedCount: 0,

    totalCount: 0,


    initialize: function(){

        this.totalCount = Object.keys(
            this.achievements
        ).length;


        this.calculateUnlocked();


    },


    calculateUnlocked: function(){

        this.unlockedCount = 0;


        Object.values(
            this.achievements
        ).forEach((achievement)=>{


            if(achievement.unlocked){

                this.unlockedCount++;

            }


        });


    },


    getAchievement: function(id){

        if(this.achievements[id]){

            return this.achievements[id];

        }


        console.warn(
            "Achievement does not exist:",
            id
        );


        return null;

    },


    isUnlocked: function(id){

        let achievement =
        this.getAchievement(id);


        if(!achievement){

            return false;

        }


        return achievement.unlocked;

    },


    unlock: function(id){


        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return;

        }



        if(achievement.unlocked){

            return;

        }



        achievement.unlocked = true;

        achievement.progress =
        achievement.maxProgress;



        this.unlockedCount++;



        this.displayUnlock(
            achievement
        );


    },


    updateProgress: function(id, amount){


        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return;

        }



        if(achievement.unlocked){

            return;

        }



        achievement.progress += amount;



        if(
            achievement.progress >=
            achievement.maxProgress
        ){

            this.unlock(id);

        }


    },


    setProgress: function(id, amount){


        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return;

        }



        achievement.progress =
        Math.min(
            amount,
            achievement.maxProgress
        );



        if(
            achievement.progress >=
            achievement.maxProgress
        ){

            this.unlock(id);

        }


    },
// =========================================================
// ACHIEVEMENT DISPLAY SYSTEM
// =========================================================


    displayUnlock: function(achievement){


        console.log(
            "ACHIEVEMENT UNLOCKED:",
            achievement.title
        );


        console.log(
            achievement.description
        );


        this.createNotification(
            achievement
        );


    },



// =========================================================
// ACHIEVEMENT NOTIFICATIONS
// =========================================================


    notifications: [],


    createNotification: function(achievement){


        let notification = {


            id:
            achievement.id,


            title:
            achievement.title,


            description:
            achievement.description,


            time:
            Date.now(),


            viewed:
            false


        };



        this.notifications.push(
            notification
        );



        if(typeof UIManager !== "undefined"){

            if(UIManager.showAchievement){

                UIManager.showAchievement(
                    notification
                );

            }

        }


    },



// =========================================================
// NOTIFICATION MANAGEMENT
// =========================================================


    getNotifications: function(){


        return this.notifications;


    },



    clearNotifications: function(){


        this.notifications = [];


    },



    markNotificationViewed: function(id){


        this.notifications.forEach(
            (notification)=>{


                if(notification.id === id){

                    notification.viewed = true;

                }


            }
        );


    },



// =========================================================
// CATEGORY MANAGEMENT
// =========================================================


    getByCategory: function(category){


        let results = [];



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                if(
                    achievement.category === category
                ){

                    results.push(
                        achievement
                    );

                }


            }
        );



        return results;


    },



    getUnlockedAchievements: function(){


        let results = [];



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                if(
                    achievement.unlocked
                ){

                    results.push(
                        achievement
                    );

                }


            }
        );



        return results;


    },



    getLockedAchievements: function(){


        let results = [];



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                if(
                    !achievement.unlocked
                ){

                    results.push(
                        achievement
                    );

                }


            }
        );



        return results;


    },



// =========================================================
// HIDDEN ACHIEVEMENTS
// =========================================================


    revealAchievement: function(id){


        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return;

        }



        achievement.hidden = false;


    },



    hideAchievement: function(id){


        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return;

        }



        achievement.hidden = true;


    },



    getVisibleAchievements: function(){


        let results = [];



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                if(
                    !achievement.hidden ||
                    achievement.unlocked
                ){

                    results.push(
                        achievement
                    );

                }


            }
        );



        return results;


    },



// =========================================================
// STORY EVENT HANDLERS
// =========================================================


    storyEvent: function(event){


        switch(event){



            case "GAME_START":


                this.unlock(
                    "first_steps"
                );


            break;




            case "JOINED_SOCIETY":


                this.unlock(
                    "welcome_to_the_ridge"
                );


            break;




            case "ACT_1_COMPLETE":


                this.unlock(
                    "act_one_complete"
                );


            break;




            case "ACT_2_COMPLETE":


                this.unlock(
                    "act_two_complete"
                );


            break;




            case "ACT_3_COMPLETE":


                this.unlock(
                    "act_three_complete"
                );


            break;




            case "FOUND_SECRET":


                this.unlock(
                    "first_discovery"
                );


            break;




            case "ENTERED_FORBIDDEN_AREA":


                this.unlock(
                    "forbidden_area"
                );


            break;




            case "FOUND_RECORDS":


                this.unlock(
                    "old_records"
                );


            break;




            case "QUESTIONED_BELIEF":


                this.unlock(
                    "doubt_begins"
                );


            break;




            case "LOST_TRUST":


                this.unlock(
                    "outsider"
                );


            break;



            default:


                console.log(
                    "Unknown story event:",
                    event
                );


            break;


        }


    },

// =========================================================
// SAVE SYSTEM INTEGRATION
// =========================================================


    exportData: function(){


        let data = {


            achievements: {},


            notifications:
            this.notifications,


            unlockedCount:
            this.unlockedCount,


            totalCount:
            this.totalCount


        };



        Object.keys(
            this.achievements
        ).forEach(
            (id)=>{


                let achievement =
                this.achievements[id];



                data.achievements[id] = {


                    unlocked:
                    achievement.unlocked,


                    progress:
                    achievement.progress,


                    hidden:
                    achievement.hidden


                };


            }
        );



        return data;


    },



// =========================================================
// LOAD ACHIEVEMENT DATA
// =========================================================


    loadData: function(data){


        if(!data){

            return;

        }



        if(data.achievements){



            Object.keys(
                data.achievements
            ).forEach(
                (id)=>{



                    if(
                        this.achievements[id]
                    ){


                        let saved =
                        data.achievements[id];



                        this.achievements[id].unlocked =
                        saved.unlocked;



                        this.achievements[id].progress =
                        saved.progress;



                        this.achievements[id].hidden =
                        saved.hidden;



                    }



                }
            );


        }



        if(data.notifications){


            this.notifications =
            data.notifications;


        }



        this.calculateUnlocked();



    },



// =========================================================
// RESET SYSTEM
// =========================================================


    resetAll: function(){



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{



                achievement.unlocked =
                false;



                achievement.progress =
                0;



            }
        );



        this.notifications = [];



        this.calculateUnlocked();



    },



// =========================================================
// COMPLETION TRACKING
// =========================================================


    getCompletionPercentage: function(){


        if(this.totalCount <= 0){


            return 0;


        }



        return Math.floor(


            (
                this.unlockedCount /
                this.totalCount
            )
            *
            100


        );


    },



// =========================================================
// STATISTICS
// =========================================================


    getStatistics: function(){


        return {


            total:
            this.totalCount,


            unlocked:
            this.unlockedCount,


            remaining:
            this.totalCount -
            this.unlockedCount,


            percentage:
            this.getCompletionPercentage()



        };


    },



// =========================================================
// FAITH SYSTEM CONNECTION
// =========================================================


    updateFaithAchievement: function(faith){



        if(
            typeof faith !== "number"
        ){

            return;

        }



        this.setProgress(
            "faithful_member",
            faith
        );



    },



// =========================================================
// CHOICE TRACKING
// =========================================================


    choices: {},



    registerChoice: function(
        choiceID,
        value
    ){


        this.choices[choiceID] =
        value;



        this.checkChoiceAchievements(
            choiceID,
            value
        );


    },



    checkChoiceAchievements: function(
        choiceID,
        value
    ){



        switch(choiceID){



            case "trust_the_elder":


                if(value === false){


                    this.unlock(
                        "doubt_begins"
                    );


                }


            break;



            case "enter_hidden_church":


                if(value === true){


                    this.unlock(
                        "forbidden_area"
                    );


                }


            break;



            default:


            break;


        }



    },



// =========================================================
// AGE PROGRESSION SYSTEM
// =========================================================


    updateAge: function(age){



        if(
            typeof age !== "number"
        ){

            return;

        }



        if(age >= 18){


            this.unlock(
                "welcome_to_the_ridge"
            );


        }



    },



// =========================================================
// ACT TRACKING
// =========================================================


    currentAct: 1,



    setAct: function(act){


        this.currentAct =
        act;



        this.checkActProgress();



    },



    checkActProgress: function(){



        switch(this.currentAct){



            case 2:


                this.unlock(
                    "act_one_complete"
                );


            break;



            case 3:


                this.unlock(
                    "act_two_complete"
                );


            break;



            case 4:


                this.unlock(
                    "act_three_complete"
                );


            break;



            default:


            break;



        }


    },
// =========================================================
// ACHIEVEMENT SEARCH SYSTEM
// =========================================================


    search: function(query){


        let results = [];


        if(!query){

            return results;

        }



        query =
        query.toLowerCase();



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                let title =
                achievement.title.toLowerCase();


                let description =
                achievement.description.toLowerCase();



                if(
                    title.includes(query) ||
                    description.includes(query)
                ){

                    results.push(
                        achievement
                    );

                }



            }
        );



        return results;


    },



// =========================================================
// SORTING SYSTEM
// =========================================================


    sortByName: function(list){


        return list.sort(
            (a,b)=>{


                return a.title.localeCompare(
                    b.title
                );


            }
        );


    },



    sortByProgress: function(list){


        return list.sort(
            (a,b)=>{


                return b.progress -
                a.progress;


            }
        );


    },



    sortByCategory: function(list){


        return list.sort(
            (a,b)=>{


                return a.category.localeCompare(
                    b.category
                );


            }
        );


    },



// =========================================================
// UI FORMATTERS
// =========================================================


    formatAchievement: function(id){



        let achievement =
        this.getAchievement(id);



        if(!achievement){

            return null;

        }



        return {


            title:
            achievement.title,


            description:
            achievement.description,


            category:
            achievement.category,


            progress:
            achievement.progress +
            "/" +
            achievement.maxProgress,


            completed:
            achievement.unlocked



        };


    },



// =========================================================
// ACHIEVEMENT MENU DATA
// =========================================================


    getMenuData: function(){



        let data = [];



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{



                if(
                    achievement.hidden &&
                    !achievement.unlocked
                ){

                    return;

                }



                data.push(

                    this.formatAchievement(
                        achievement.id
                    )

                );


            }
        );



        return data;


    },



// =========================================================
// EVENT QUEUE SYSTEM
// =========================================================


    eventQueue: [],



    queueAchievement: function(id){



        if(
            !this.achievements[id]
        ){

            return;

        }



        this.eventQueue.push(
            id
        );


    },



    processQueue: function(){



        while(
            this.eventQueue.length > 0
        ){



            let id =
            this.eventQueue.shift();



            this.unlock(id);



        }



    },



// =========================================================
// STORY FLAG SYSTEM
// =========================================================


    storyFlags: {},



    setFlag: function(
        flag,
        value
    ){



        this.storyFlags[flag] =
        value;



        this.checkStoryFlags(
            flag
        );



    },



    getFlag: function(flag){



        return this.storyFlags[flag];



    },



    checkStoryFlags: function(flag){



        switch(flag){



            case "discovered_truth":


                this.unlock(
                    "old_records"
                );


            break;



            case "left_village":


                this.unlock(
                    "outsider"
                );


            break;



            case "accepted_beliefs":


                this.unlock(
                    "faithful_member"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// DEBUG FUNCTIONS
// =========================================================


    debugUnlockAll: function(){



        Object.keys(
            this.achievements
        ).forEach(
            (id)=>{


                this.unlock(
                    id
                );


            }
        );



    },



    debugLockAll: function(){



        Object.values(
            this.achievements
        ).forEach(
            (achievement)=>{


                achievement.unlocked =
                false;


                achievement.progress =
                0;



            }
        );



        this.calculateUnlocked();



    },


    debugPrint: function(){


        console.log(
            "===== RIDGE SOCIETY ACHIEVEMENTS ====="
        );



        console.log(
            this.getStatistics()
        );



        console.log(
            this.achievements
        );


    },

// =========================================================
// RIDGE SOCIETY REPUTATION SYSTEM
// =========================================================


    reputation: {


        society: 0,


        elders: 0,


        villagers: 0,


        outsiders: 0


    },



// =========================================================
// REPUTATION UPDATES
// =========================================================


    updateReputation: function(
        group,
        amount
    ){



        if(
            this.reputation[group] === undefined
        ){

            console.warn(
                "Unknown reputation group:",
                group
            );


            return;

        }



        this.reputation[group] += amount;



        this.checkReputationAchievements(
            group
        );



    },



// =========================================================
// REPUTATION ACHIEVEMENTS
// =========================================================


    checkReputationAchievements: function(
        group
    ){



        switch(group){



            case "elders":


                if(
                    this.reputation.elders >= 100
                ){


                    this.unlock(
                        "faithful_member"
                    );


                }


            break;



            case "villagers":


                if(
                    this.reputation.villagers <= -50
                ){


                    this.unlock(
                        "outsider"
                    );


                }


            break;



            default:


            break;



        }



    },



// =========================================================
// SUSPICION SYSTEM
// =========================================================


    suspicion: 0,



    increaseSuspicion: function(amount){



        this.suspicion += amount;



        if(
            this.suspicion >= 100
        ){

            this.unlock(
                "outsider"
            );


        }



    },



    decreaseSuspicion: function(amount){



        this.suspicion -= amount;



        if(
            this.suspicion < 0
        ){

            this.suspicion = 0;

        }



    },



// =========================================================
// LOYALTY SYSTEM
// =========================================================


    loyalty: 0,



    updateLoyalty: function(amount){



        this.loyalty += amount;



        if(
            this.loyalty >= 100
        ){

            this.unlock(
                "faithful_member"
            );


        }



        if(
            this.loyalty <= -100
        ){

            this.unlock(
                "doubt_begins"
            );


        }



    },



// =========================================================
// RELATIONSHIP TRACKING
// =========================================================


    relationships: {},



    setRelationship: function(
        character,
        value
    ){



        this.relationships[character] =
        value;



        this.checkRelationshipAchievements(
            character
        );



    },



    changeRelationship: function(
        character,
        amount
    ){



        if(
            this.relationships[character]
            === undefined
        ){

            this.relationships[character] = 0;

        }



        this.relationships[character]
        += amount;



        this.checkRelationshipAchievements(
            character
        );



    },



    checkRelationshipAchievements: function(
        character
    ){



        let relationship =
        this.relationships[character];



        if(
            relationship >= 100
        ){



            this.queueAchievement(
                "elder_favor"
            );



        }



    },



// =========================================================
// ENDING TRACKING
// =========================================================


    endingPath: null,



    setEndingPath: function(path){



        this.endingPath = path;



        this.checkEndingAchievements();



    },



    checkEndingAchievements: function(){



        switch(
            this.endingPath
        ){



            case "devoted":



                this.unlock(
                    "true_believer"
                );



            break;



            case "escape":



                this.unlock(
                    "outsider"
                );



            break;



            case "truth":



                this.unlock(
                    "first_discovery"
                );



            break;



            default:


            break;



        }



    },



// =========================================================
// TIME BASED ACHIEVEMENTS
// =========================================================


    daysPlayed: 0,



    addDay: function(){



        this.daysPlayed++;



        this.checkTimeAchievements();



    },



    checkTimeAchievements: function(){



        if(
            this.daysPlayed >= 30
        ){

            this.unlock(
                "welcome_to_the_ridge"
            );


        }



        if(
            this.daysPlayed >= 365
        ){

            this.revealAchievement(
                "old_records"
            );


        }



    },



// =========================================================
// CUSTOM CONDITIONS
// =========================================================


    conditions: {},



    registerCondition: function(
        name,
        callback
    ){



        this.conditions[name] =
        callback;



    },



    checkCondition: function(name){



        if(
            this.conditions[name]
        ){



            return this.conditions[name]();



        }



        return false;



    },

// =========================================================
// EPISODE / ACT MILESTONE TRACKING
// =========================================================


    episodesCompleted: [],



    completeEpisode: function(episodeID){



        if(
            !this.episodesCompleted.includes(
                episodeID
            )
        ){


            this.episodesCompleted.push(
                episodeID
            );


        }



        this.checkEpisodeAchievements(
            episodeID
        );



    },



// =========================================================
// EPISODE ACHIEVEMENTS
// =========================================================


    checkEpisodeAchievements: function(
        episodeID
    ){



        switch(episodeID){



            case "episode_1":


                this.unlock(
                    "first_steps"
                );


            break;



            case "episode_5":


                this.unlock(
                    "welcome_to_the_ridge"
                );


            break;



            case "act_1_finale":


                this.unlock(
                    "act_one_complete"
                );


            break;



            case "act_2_finale":


                this.unlock(
                    "act_two_complete"
                );


            break;



            case "act_3_finale":


                this.unlock(
                    "act_three_complete"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// EXPLORATION TRACKING
// =========================================================


    locationsVisited: [],



    visitLocation: function(
        locationID
    ){



        if(
            !this.locationsVisited.includes(
                locationID
            )
        ){



            this.locationsVisited.push(
                locationID
            );



        }



        this.checkLocationAchievements(
            locationID
        );



    },



// =========================================================
// LOCATION ACHIEVEMENTS
// =========================================================


    checkLocationAchievements: function(
        locationID
    ){



        switch(locationID){



            case "old_church":



                this.unlock(
                    "first_discovery"
                );


            break;



            case "forbidden_tunnel":



                this.unlock(
                    "forbidden_area"
                );


            break;



            case "archive_room":



                this.unlock(
                    "old_records"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// ITEM DISCOVERY TRACKING
// =========================================================


    itemsFound: [],



    discoverItem: function(
        itemID
    ){



        if(
            !this.itemsFound.includes(
                itemID
            )
        ){



            this.itemsFound.push(
                itemID
            );



        }



        this.checkItemAchievements(
            itemID
        );



    },



    checkItemAchievements: function(
        itemID
    ){



        switch(itemID){



            case "lost_journal":



                this.unlock(
                    "old_records"
                );


            break;



            case "hidden_symbol":



                this.unlock(
                    "first_discovery"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// NPC INTERACTION TRACKING
// =========================================================


    npcsSpokenTo: [],



    speakToNPC: function(
        npcID
    ){



        if(
            !this.npcsSpokenTo.includes(
                npcID
            )
        ){



            this.npcsSpokenTo.push(
                npcID
            );



        }



        this.checkNPCAchievements(
            npcID
        );



    },



// =========================================================
// NPC ACHIEVEMENTS
// =========================================================


    checkNPCAchievements: function(
        npcID
    ){



        switch(npcID){



            case "elder_marrow":



                this.updateReputation(
                    "elders",
                    10
                );


            break;



            case "escaped_member":



                this.unlock(
                    "doubt_begins"
                );


            break;



            case "village_child":



                this.updateReputation(
                    "villagers",
                    5
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// PLAYER ACTION TRACKING
// =========================================================


    actionsPerformed: {},



    registerAction: function(
        actionID
    ){



        if(
            !this.actionsPerformed[actionID]
        ){



            this.actionsPerformed[actionID] = 0;



        }



        this.actionsPerformed[actionID]++;



        this.checkActionAchievements(
            actionID
        );



    },



// =========================================================
// ACTION ACHIEVEMENTS
// =========================================================


    checkActionAchievements: function(
        actionID
    ){



        switch(actionID){



            case "help_member":



                this.updateLoyalty(
                    5
                );


            break;



            case "question_order":



                this.increaseSuspicion(
                    10
                );


            break;



            case "explore_secret":



                this.unlock(
                    "forbidden_area"
                );


            break;



            default:


            break;



        }



    },
// =========================================================
// PLAYER MEMORY SYSTEM
// =========================================================


    memories: [],



    addMemory: function(memoryID){



        if(
            !this.memories.includes(
                memoryID
            )
        ){


            this.memories.push(
                memoryID
            );


        }



        this.checkMemoryAchievements(
            memoryID
        );



    },



// =========================================================
// MEMORY ACHIEVEMENTS
// =========================================================


    checkMemoryAchievements: function(
        memoryID
    ){



        switch(memoryID){



            case "childhood_prayer":



                this.unlock(
                    "first_steps"
                );


            break;



            case "first_question":



                this.unlock(
                    "doubt_begins"
                );


            break;



            case "truth_revealed":



                this.unlock(
                    "first_discovery"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// RITUAL EVENT TRACKING
// =========================================================


    ritualsCompleted: [],



    completeRitual: function(
        ritualID
    ){



        if(
            !this.ritualsCompleted.includes(
                ritualID
            )
        ){



            this.ritualsCompleted.push(
                ritualID
            );



        }



        this.checkRitualAchievements(
            ritualID
        );



    },



// =========================================================
// RITUAL ACHIEVEMENTS
// =========================================================


    checkRitualAchievements: function(
        ritualID
    ){



        switch(ritualID){



            case "first_ceremony":



                this.unlock(
                    "welcome_to_the_ridge"
                );


            break;



            case "elder_ceremony":



                this.updateReputation(
                    "elders",
                    20
                );


            break;



            case "secret_ceremony":



                this.unlock(
                    "forbidden_area"
                );


            break;



            default:


            break;



        }



    },



// =========================================================
// COLLECTIBLE TRACKING
// =========================================================


    collectiblesFound: [],



    collect: function(
        collectibleID
    ){



        if(
            !this.collectiblesFound.includes(
                collectibleID
            )
        ){



            this.collectiblesFound.push(
                collectibleID
            );



        }



        this.checkCollectibleAchievements();



    },



// =========================================================
// COLLECTIBLE CHECKS
// =========================================================


    checkCollectibleAchievements: function(){



        let amount =
        this.collectiblesFound.length;



        if(
            amount >= 10
        ){



            this.revealAchievement(
                "old_records"
            );


        }



        if(
            amount >= 50
        ){



            this.unlock(
                "first_discovery"
            );


        }



    },



// =========================================================
// PLAYTIME TRACKING
// =========================================================


    playtime: 0,



    addPlaytime: function(
        seconds
    ){



        this.playtime += seconds;



        this.checkPlaytimeAchievements();



    },



    checkPlaytimeAchievements: function(){



        if(
            this.playtime >= 3600
        ){



            this.revealAchievement(
                "old_records"
            );


        }



        if(
            this.playtime >= 10800
        ){



            this.unlock(
                "faithful_member"
            );


        }



    },



// =========================================================
// DIFFICULTY TRACKING
// =========================================================


    difficulty: "normal",



    setDifficulty: function(
        difficulty
    ){



        this.difficulty =
        difficulty;



        this.checkDifficultyAchievements();



    },



    checkDifficultyAchievements: function(){



        if(
            this.difficulty === "hard"
        ){



            this.revealAchievement(
                "forbidden_area"
            );


        }



    },



// =========================================================
// SESSION TRACKING
// =========================================================


    sessionsPlayed: 0,



    startSession: function(){



        this.sessionsPlayed++;



    },



    getSessionCount: function(){



        return this.sessionsPlayed;



    },



// =========================================================
// EXPORT SUMMARY
// =========================================================


    getSummary: function(){



        return {



            statistics:
            this.getStatistics(),



            faith:
            this.loyalty,



            suspicion:
            this.suspicion,



            reputation:
            this.reputation,



            endings:
            this.endingPath,



            episodes:
            this.episodesCompleted.length



        };


    },

// =========================================================
// ACHIEVEMENT BACKUP SYSTEM
// =========================================================


    backups: [],



    createBackup: function(){


        let backup = {


            timestamp:
            Date.now(),


            data:
            this.exportData()


        };



        this.backups.push(
            backup
        );



        return backup;



    },



// =========================================================
// RESTORE BACKUP
// =========================================================


    restoreBackup: function(index){



        if(
            !this.backups[index]
        ){


            console.warn(
                "Backup not found:",
                index
            );


            return;


        }



        this.loadData(
            this.backups[index].data
        );



    },



// =========================================================
// ACHIEVEMENT COMPLETION CHECKS
// =========================================================


    checkCompletion: function(){



        let total =
        Object.keys(
            this.achievements
        ).length;



        let completed =
        this.unlockedCount;



        if(
            completed >= total
        ){



            console.log(
                "All Ridge Society achievements completed."
            );



        }



    },



// =========================================================
// RANDOM EVENT ACHIEVEMENTS
// =========================================================


    triggerRandomEvent: function(){



        let events = [



            "FOUND_SECRET",


            "DISCOVERED_LOCATION",


            "MET_MEMBER",


            "READ_DOCUMENT"


        ];



        let random =

        events[
            Math.floor(
                Math.random() *
                events.length
            )
        ];



        this.storyEvent(
            random
        );



    },



// =========================================================
// ACHIEVEMENT LOG
// =========================================================


    achievementLog: [],



    addLog: function(message){



        this.achievementLog.push({



            message:
            message,



            time:
            Date.now()



        });



    },



// =========================================================
// LOG RETRIEVAL
// =========================================================


    getLog: function(){



        return this.achievementLog;



    },



// =========================================================
// COMPATIBILITY METHODS
// =========================================================


    save: function(){



        return this.exportData();



    },



    load: function(data){



        this.loadData(
            data
        );



    },



// =========================================================
// INITIALIZE
// =========================================================


    start: function(){



        this.initialize();



        console.log(
            "Ridge Society Achievement System Loaded"
        );



    }



};


// =========================================================
// GLOBAL ACCESS
// =========================================================


if(
    typeof window !== "undefined"
){



    window.RidgeAchievements =
    RidgeAchievements;



    window.AchievementManager =
    AchievementManager;



}



// =========================================================
// NODE COMPATIBILITY
// =========================================================


if(
    typeof module !== "undefined"
){



    module.exports = {


        RidgeAchievements,


        AchievementManager


    };



}



// =========================================================
// AUTO START
// =========================================================


if(
    typeof AchievementManager !== "undefined"
){



    AchievementManager.start();



}


// =========================================================
// END OF ACHIEVEMENTS.JS
// THE RIDGE SOCIETY
// =========================================================
