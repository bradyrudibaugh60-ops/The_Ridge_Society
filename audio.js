/*
===========================================================
THE RIDGE SOCIETY
Audio Management System

File:
audio.js

Part 1/?

Handles:
- Audio initialization
- Music management foundation
- Sound effect foundation
- Volume controls
- Audio categories
- Audio state tracking
- Browser compatibility

Designed for:
- Act 1-3 progression
- Atmospheric horror
- Dialogue sounds
- Cutscenes
- Weather
- Dynamic environments
===========================================================
*/


// =========================================================
// AUDIO DATABASE
// =========================================================


const RidgeAudio = {


    music: {},


    sounds: {},


    ambience: {},


    dialogue: {},


    currentMusic: null,


    currentAmbience: null,


    initialized: false,


};



// =========================================================
// AUDIO MANAGER
// =========================================================


const AudioManager = {



    // -----------------------------------------------------
    // AUDIO SETTINGS
    // -----------------------------------------------------


    masterVolume: 1.0,


    musicVolume: 0.8,


    soundVolume: 1.0,


    ambienceVolume: 0.7,


    dialogueVolume: 1.0,



    muted: false,



    // -----------------------------------------------------
    // AUDIO STATE
    // -----------------------------------------------------


    currentTrack: null,


    currentEnvironment: null,


    audioObjects: {},


    fadeObjects: {},



    // -----------------------------------------------------
    // INITIALIZATION
    // -----------------------------------------------------


    initialize: function(){



        if(this.initialized){

            return;

        }



        this.createAudioContext();



        this.loadDefaultSettings();



        this.initialized = true;



        console.log(
            "Ridge Society Audio System Loaded"
        );



    },



// =========================================================
// AUDIO CONTEXT
// =========================================================


    audioContext: null,



    createAudioContext: function(){



        try {



            const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;



            if(AudioContext){


                this.audioContext =
                new AudioContext();


            }



        }

        catch(error){


            console.warn(
                "Audio Context unavailable:",
                error
            );


        }



    },



// =========================================================
// DEFAULT SETTINGS
// =========================================================


    loadDefaultSettings: function(){



        this.masterVolume = 1.0;


        this.musicVolume = 0.8;


        this.soundVolume = 1.0;


        this.ambienceVolume = 0.7;


        this.dialogueVolume = 1.0;



    },



// =========================================================
// REGISTER AUDIO
// =========================================================


    registerAudio: function(
        id,
        file,
        type
    ){



        let audioData = {


            id:
            id,


            file:
            file,


            type:
            type,


            loaded:
            false,


            volume:
            1.0



        };



        switch(type){



            case "music":



                RidgeAudio.music[id] =
                audioData;



            break;



            case "sound":



                RidgeAudio.sounds[id] =
                audioData;



            break;



            case "ambience":



                RidgeAudio.ambience[id] =
                audioData;



            break;



            case "dialogue":



                RidgeAudio.dialogue[id] =
                audioData;



            break;



            default:



                console.warn(
                    "Unknown audio type:",
                    type
                );



            break;



        }



    },



// =========================================================
// LOAD AUDIO FILE
// =========================================================


    loadAudio: function(id){



        let audioData =
        this.findAudio(id);



        if(!audioData){


            console.warn(
                "Audio not found:",
                id
            );


            return;


        }



        let audio =
        new Audio(
            audioData.file
        );



        audio.preload =
        "auto";



        this.audioObjects[id] =
        audio;



        audioData.loaded =
        true;



        return audio;



    },



// =========================================================
// FIND AUDIO
// =========================================================


    findAudio: function(id){



        return (

            RidgeAudio.music[id] ||

            RidgeAudio.sounds[id] ||

            RidgeAudio.ambience[id] ||

            RidgeAudio.dialogue[id]

        );



    },
// =========================================================
// AUDIO PLAYBACK SYSTEM
// =========================================================


    play: function(id, loop = false){



        let audio =
        this.audioObjects[id];



        if(!audio){



            audio =
            this.loadAudio(id);



        }



        if(!audio){



            console.warn(
                "Unable to play audio:",
                id
            );



            return;



        }



        audio.loop =
        loop;



        audio.volume =
        this.calculateVolume(id);



        if(this.muted){



            audio.volume =
            0;



        }



        audio.currentTime =
        0;



        audio.play()
        .catch(
            error=>{


                console.warn(
                    "Audio playback blocked:",
                    error
                );


            }
        );



        return audio;



    },



// =========================================================
// STOP AUDIO
// =========================================================


    stop: function(id){



        let audio =
        this.audioObjects[id];



        if(!audio){



            return;



        }



        audio.pause();



        audio.currentTime =
        0;



    },



// =========================================================
// PAUSE AUDIO
// =========================================================


    pause: function(id){



        let audio =
        this.audioObjects[id];



        if(audio){



            audio.pause();



        }



    },



// =========================================================
// RESUME AUDIO
// =========================================================


    resume: function(id){



        let audio =
        this.audioObjects[id];



        if(audio){



            audio.play();



        }



    },



// =========================================================
// VOLUME CALCULATION
// =========================================================


    calculateVolume: function(id){



        let data =
        this.findAudio(id);



        if(!data){



            return this.masterVolume;



        }



        let volume =
        data.volume;



        switch(data.type){



            case "music":



                volume *=
                this.musicVolume;



            break;



            case "sound":



                volume *=
                this.soundVolume;



            break;



            case "ambience":



                volume *=
                this.ambienceVolume;



            break;



            case "dialogue":



                volume *=
                this.dialogueVolume;



            break;



        }



        volume *=
        this.masterVolume;



        return volume;



    },



// =========================================================
// MUSIC SYSTEM
// =========================================================


    playMusic: function(track){



        if(
            this.currentTrack === track
        ){



            return;



        }



        if(
            this.currentTrack
        ){



            this.stopMusic();



        }



        this.currentTrack =
        track;



        this.play(
            track,
            true
        );



    },



// =========================================================
// STOP MUSIC
// =========================================================


    stopMusic: function(){



        if(
            !this.currentTrack
        ){



            return;



        }



        this.stop(
            this.currentTrack
        );



        this.currentTrack =
        null;



    },



// =========================================================
// SWITCH MUSIC
// =========================================================


    switchMusic: function(
        newTrack
    ){



        this.fadeOutMusic();



        setTimeout(
            ()=>{



                this.playMusic(
                    newTrack
                );



            },
            1000
        );



    },



// =========================================================
// ACT MUSIC SYSTEM
// =========================================================


    actMusic: {



        act1:
        "ridge_morning",



        act2:
        "ridge_darkness",



        act3:
        "final_revelation"



    },



    playActMusic: function(
        act
    ){



        let track =
        this.actMusic[
            "act" + act
        ];



        if(track){



            this.playMusic(
                track
            );



        }



    },



// =========================================================
// LOCATION AMBIENCE
// =========================================================


    locationAmbience: {



        village:
        "village_ambience",



        forest:
        "forest_ambience",



        church:
        "church_ambience",



        underground:
        "tunnel_ambience"



    },



    playLocationAmbience: function(
        location
    ){



        let ambience =
        this.locationAmbience[
            location
        ];



        if(!ambience){



            return;



        }



        this.playAmbience(
            ambience
        );



    },
// =========================================================
// AMBIENCE SYSTEM
// =========================================================


    playAmbience: function(id){



        if(
            this.currentAmbience === id
        ){



            return;



        }



        if(
            this.currentAmbience
        ){



            this.stopAmbience();



        }



        this.currentAmbience =
        id;



        this.play(
            id,
            true
        );



    },



// =========================================================
// STOP AMBIENCE
// =========================================================


    stopAmbience: function(){



        if(
            !this.currentAmbience
        ){



            return;



        }



        this.stop(
            this.currentAmbience
        );



        this.currentAmbience =
        null;



    },



// =========================================================
// CROSSFADE SYSTEM
// =========================================================


    fadeIn: function(
        id,
        duration = 2000
    ){



        let audio =
        this.audioObjects[id];



        if(!audio){



            audio =
            this.loadAudio(id);



        }



        if(!audio){



            return;



        }



        audio.volume =
        0;



        audio.play();



        let target =
        this.calculateVolume(id);



        let steps =
        20;



        let increase =
        target / steps;



        let delay =
        duration / steps;



        let counter =
        0;



        let interval =
        setInterval(
            ()=>{



                counter++;



                audio.volume +=
                increase;



                if(
                    counter >= steps
                ){



                    audio.volume =
                    target;



                    clearInterval(
                        interval
                    );



                }



            },
            delay
        );



    },



// =========================================================
// FADE OUT SYSTEM
// =========================================================


    fadeOut: function(
        id,
        duration = 2000
    ){



        let audio =
        this.audioObjects[id];



        if(!audio){



            return;



        }



        let startingVolume =
        audio.volume;



        let steps =
        20;



        let decrease =
        startingVolume / steps;



        let delay =
        duration / steps;



        let counter =
        0;



        let interval =
        setInterval(
            ()=>{



                counter++;



                audio.volume -=
                decrease;



                if(
                    counter >= steps
                ){



                    audio.volume =
                    0;



                    audio.pause();



                    clearInterval(
                        interval
                    );



                }



            },
            delay
        );



    },



// =========================================================
// MUSIC FADE HELPERS
// =========================================================


    fadeOutMusic: function(){



        if(
            this.currentTrack
        ){



            this.fadeOut(
                this.currentTrack
            );



        }



    },



// =========================================================
// AMBIENCE FADE HELPERS
// =========================================================


    fadeOutAmbience: function(){



        if(
            this.currentAmbience
        ){



            this.fadeOut(
                this.currentAmbience
            );



        }



    },



// =========================================================
// WEATHER AUDIO SYSTEM
// =========================================================


    weatherSounds: {



        rain:
        "rain_loop",



        storm:
        "storm_loop",



        wind:
        "wind_loop",



        snow:
        "snow_wind"



    },



    currentWeather: null,



    setWeather: function(
        weather
    ){



        if(
            this.currentWeather === weather
        ){



            return;



        }



        this.stopWeather();



        this.currentWeather =
        weather;



        let sound =
        this.weatherSounds[
            weather
        ];



        if(sound){



            this.play(
                sound,
                true
            );



        }



    },



// =========================================================
// STOP WEATHER
// =========================================================


    stopWeather: function(){



        if(
            !this.currentWeather
        ){



            return;



        }



        let sound =
        this.weatherSounds[
            this.currentWeather
        ];



        if(sound){



            this.stop(
                sound
            );



        }



        this.currentWeather =
        null;



    },



// =========================================================
// ENVIRONMENTAL AUDIO
// =========================================================


    environmentalSounds: {},



    registerEnvironmentSound: function(
        location,
        sound
    ){



        this.environmentalSounds[
            location
        ] = sound;



    },



    playEnvironmentSound: function(
        location
    ){



        let sound =
        this.environmentalSounds[
            location
        ];



        if(sound){



            this.play(
                sound,
                true
            );



        }



    },
// =========================================================
// DIALOGUE AUDIO SYSTEM
// =========================================================


    dialogueVoices: {},



    currentSpeaker: null,



    registerVoice: function(
        character,
        audioFile
    ){



        this.dialogueVoices[character] = {


            file:
            audioFile,


            enabled:
            true



        };



    },



// =========================================================
// PLAY CHARACTER VOICE
// =========================================================


    playVoice: function(
        character
    ){



        let voice =
        this.dialogueVoices[character];



        if(!voice){



            return;



        }



        if(
            !voice.enabled
        ){



            return;



        }



        this.play(
            character + "_voice"
        );



        this.currentSpeaker =
        character;



    },



// =========================================================
// STOP VOICE
// =========================================================


    stopVoice: function(){



        if(
            this.currentSpeaker
        ){



            this.stop(
                this.currentSpeaker +
                "_voice"
            );



            this.currentSpeaker =
            null;



        }



    },



// =========================================================
// TEXT TYPE SOUND SYSTEM
// =========================================================


    typingSounds: {



        default:
        "text_tick",



        elder:
        "old_voice_tick",



        child:
        "child_voice_tick",



        unknown:
        "distorted_tick"



    },



    playTypingSound: function(
        style = "default"
    ){



        let sound =
        this.typingSounds[style];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// DIALOGUE MOOD AUDIO
// =========================================================


    dialogueMoods: {



        friendly:
        "dialogue_warm",



        suspicious:
        "dialogue_tension",



        frightening:
        "dialogue_horror",



        revelation:
        "dialogue_reveal"



    },



    playDialogueMood: function(
        mood
    ){



        let sound =
        this.dialogueMoods[mood];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// CUTSCENE AUDIO SYSTEM
// =========================================================


    cutsceneTracks: {},



    registerCutsceneAudio: function(
        cutsceneID,
        track
    ){



        this.cutsceneTracks[
            cutsceneID
        ] = track;



    },



// =========================================================
// PLAY CUTSCENE AUDIO
// =========================================================


    playCutsceneAudio: function(
        cutsceneID
    ){



        let track =
        this.cutsceneTracks[
            cutsceneID
        ];



        if(track){



            this.playMusic(
                track
            );



        }



    },



// =========================================================
// CINEMATIC AUDIO STATES
// =========================================================


    cinematicMode: false,



    enableCinematicMode: function(){



        this.cinematicMode =
        true;



        this.musicVolume *=
        0.8;



        this.ambienceVolume *=
        1.2;



    },



    disableCinematicMode: function(){



        this.cinematicMode =
        false;



        this.loadDefaultSettings();



    },



// =========================================================
// AUDIO EVENT SYSTEM
// =========================================================


    events: {},



    registerEvent: function(
        eventName,
        audioID
    ){



        this.events[eventName] =
        audioID;



    },



// =========================================================
// TRIGGER AUDIO EVENT
// =========================================================


    triggerEvent: function(
        eventName
    ){



        let sound =
        this.events[eventName];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// STORY AUDIO EVENTS
// =========================================================


    storyAudioEvents: {



        joinSociety:
        "ceremony_theme",



        discoverSecret:
        "reveal_sound",



        danger:
        "danger_sting",



        ending:
        "final_theme"



    },



// =========================================================
// PLAY STORY AUDIO
// =========================================================


    playStoryEvent: function(
        event
    ){



        let sound =
        this.storyAudioEvents[event];



        if(sound){



            this.play(
                sound
            );



        }



    },
// =========================================================
// AUDIO SETTINGS SYSTEM
// =========================================================


    settings: {


        master:
        1.0,


        music:
        0.8,


        sound:
        1.0,


        ambience:
        0.7,


        dialogue:
        1.0


    },



// =========================================================
// UPDATE SETTINGS
// =========================================================


    updateSetting: function(
        setting,
        value
    ){



        if(
            this.settings[setting]
            === undefined
        ){



            console.warn(
                "Unknown audio setting:",
                setting
            );



            return;



        }



        value =
        Math.max(
            0,
            Math.min(
                value,
                1
            )
        );



        this.settings[setting] =
        value;



        this.applySettings();



    },



// =========================================================
// APPLY SETTINGS
// =========================================================


    applySettings: function(){



        this.masterVolume =
        this.settings.master;



        this.musicVolume =
        this.settings.music;



        this.soundVolume =
        this.settings.sound;



        this.ambienceVolume =
        this.settings.ambience;



        this.dialogueVolume =
        this.settings.dialogue;



        this.refreshAudioVolumes();



    },



// =========================================================
// REFRESH ACTIVE AUDIO
// =========================================================


    refreshAudioVolumes: function(){



        Object.keys(
            this.audioObjects
        ).forEach(
            (id)=>{



                let audio =
                this.audioObjects[id];



                audio.volume =
                this.calculateVolume(
                    id
                );



            }
        );



    },



// =========================================================
// MUTE SYSTEM
// =========================================================


    toggleMute: function(){



        this.muted =
        !this.muted;



        this.refreshMuteState();



        return this.muted;



    },



// =========================================================
// APPLY MUTE
// =========================================================


    refreshMuteState: function(){



        Object.values(
            this.audioObjects
        ).forEach(
            (audio)=>{



                if(this.muted){



                    audio.volume =
                    0;



                }

                else {



                    let id =
                    Object.keys(
                        this.audioObjects
                    ).find(
                        key=>
                        this.audioObjects[key]
                        === audio
                    );



                    audio.volume =
                    this.calculateVolume(
                        id
                    );



                }



            }
        );



    },



// =========================================================
// SAVE DATA EXPORT
// =========================================================


    exportSettings: function(){



        return {


            settings:
            this.settings,


            muted:
            this.muted,


            currentMusic:
            this.currentTrack,


            currentAmbience:
            this.currentAmbience



        };


    },



// =========================================================
// LOAD SETTINGS
// =========================================================


    loadSettings: function(
        data
    ){



        if(!data){



            return;



        }



        if(
            data.settings
        ){



            this.settings =
            data.settings;



        }



        if(
            data.muted !== undefined
        ){



            this.muted =
            data.muted;



        }



        this.applySettings();



    },



// =========================================================
// RESET AUDIO SETTINGS
// =========================================================


    resetSettings: function(){



        this.settings = {



            master:
            1.0,


            music:
            0.8,


            sound:
            1.0,


            ambience:
            0.7,


            dialogue:
            1.0



        };



        this.muted =
        false;



        this.applySettings();



    },



// =========================================================
// DEBUG AUDIO SYSTEM
// =========================================================


    debug: function(){



        console.log(
            "===== RIDGE SOCIETY AUDIO ====="
        );



        console.log(
            "Current Music:",
            this.currentTrack
        );



        console.log(
            "Current Ambience:",
            this.currentAmbience
        );



        console.log(
            "Tension:",
            this.tensionLevel
        );



        console.log(
            "Loaded Audio:",
            this.audioObjects
        );



    },



// =========================================================
// DEBUG PLAY
// =========================================================


    debugPlay: function(
        id
    ){



        console.log(
            "Debug playing:",
            id
        );



        this.play(
            id
        );



    },



// =========================================================
// DEBUG STOP ALL
// =========================================================


    debugStopAll: function(){



        Object.keys(
            this.audioObjects
        ).forEach(
            (id)=>{



                this.stop(
                    id
                );



            }
        );



        this.currentTrack =
        null;



        this.currentAmbience =
        null;



    },
// =========================================================
// ADVANCED SOUNDSCAPE SYSTEM
// =========================================================


    soundscapes: {},



    activeSoundscape: null,



    registerSoundscape: function(
        name,
        layers
    ){



        this.soundscapes[name] = {


            layers:
            layers,


            active:
            false



        };



    },



// =========================================================
// START SOUNDSCAPE
// =========================================================


    startSoundscape: function(
        name
    ){



        let soundscape =
        this.soundscapes[name];



        if(!soundscape){



            console.warn(
                "Soundscape not found:",
                name
            );



            return;



        }



        this.stopSoundscape();



        this.activeSoundscape =
        name;



        soundscape.active =
        true;



        soundscape.layers.forEach(
            (layer)=>{



                this.play(
                    layer,
                    true
                );



            }
        );



    },



// =========================================================
// STOP SOUNDSCAPE
// =========================================================


    stopSoundscape: function(){



        if(
            !this.activeSoundscape
        ){



            return;



        }



        let soundscape =
        this.soundscapes[
            this.activeSoundscape
        ];



        if(soundscape){



            soundscape.layers.forEach(
                (layer)=>{



                    this.stop(
                        layer
                    );



                }
            );



            soundscape.active =
            false;



        }



        this.activeSoundscape =
        null;



    },



// =========================================================
// NPC AUDIO SYSTEM
// =========================================================


    npcSounds: {},



    registerNPCSound: function(
        npcID,
        sound
    ){



        this.npcSounds[npcID] =
        sound;



    },



// =========================================================
// PLAY NPC SOUND
// =========================================================


    playNPCSound: function(
        npcID
    ){



        let sound =
        this.npcSounds[npcID];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// INTERACTION SOUNDS
// =========================================================


    interactionSounds: {},



    registerInteractionSound: function(
        action,
        sound
    ){



        this.interactionSounds[action] =
        sound;



    },



// =========================================================
// PLAY INTERACTION SOUND
// =========================================================


    playInteractionSound: function(
        action
    ){



        let sound =
        this.interactionSounds[action];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// FOOTSTEP SYSTEM
// =========================================================


    footsteps: {



        grass:
        "grass_step",



        stone:
        "stone_step",



        wood:
        "wood_step",



        dirt:
        "dirt_step"



    },



    playFootstep: function(
        surface
    ){



        let sound =
        this.footsteps[surface];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// DOOR AUDIO
// =========================================================


    doors: {



        open:
        "door_open",



        close:
        "door_close",



        locked:
        "door_locked"



    },



    playDoorSound: function(
        type
    ){



        let sound =
        this.doors[type];



        if(sound){



            this.play(
                sound
            );



        }



    },



// =========================================================
// WEATHER INTENSITY
// =========================================================


    weatherIntensity: 0,



    setWeatherIntensity: function(
        intensity
    ){



        this.weatherIntensity =
        Math.max(
            0,
            Math.min(
                intensity,
                100
            )
        );



        this.updateWeatherLayers();



    },



// =========================================================
// WEATHER LAYERS
// =========================================================


    updateWeatherLayers: function(){



        if(
            this.weatherIntensity >= 70
        ){



            this.play(
                "heavy_weather",
                true
            );



        }

        else if(
            this.weatherIntensity >= 30
        ){



            this.play(
                "light_weather",
                true
            );



        }

        else {



            this.stop(
                "heavy_weather"
            );


            this.stop(
                "light_weather"
            );



        }



    },



// =========================================================
// AUDIO QUEUE SYSTEM
// =========================================================


    queue: [],



    queueSound: function(
        sound,
        delay = 0
    ){



        this.queue.push({


            sound:
            sound,


            delay:
            delay



        });



    },



// =========================================================
// PROCESS AUDIO QUEUE
// =========================================================


    processQueue: function(){



        this.queue.forEach(
            (item)=>{



                setTimeout(
                    ()=>{



                        this.play(
                            item.sound
                        );



                    },
                    item.delay
                );



            }
        );



        this.queue = [];



    },
// =========================================================
// AUDIO SAVE COMPATIBILITY
// =========================================================


    createSaveData: function(){



        return {



            settings:
            this.settings,



            muted:
            this.muted,



            music:
            this.currentTrack,



            ambience:
            this.currentAmbience,



            tension:
            this.tensionLevel,



            weather:
            this.currentWeather



        };



    },



// =========================================================
// LOAD SAVE AUDIO DATA
// =========================================================


    loadSaveData: function(
        data
    ){



        if(!data){



            return;



        }



        if(
            data.settings
        ){



            this.settings =
            data.settings;



        }



        if(
            data.muted !== undefined
        ){



            this.muted =
            data.muted;



        }



        if(
            data.tension !== undefined
        ){



            this.tensionLevel =
            data.tension;



        }



        if(
            data.weather
        ){



            this.currentWeather =
            data.weather;



        }



        this.applySettings();



    },



// =========================================================
// AUDIO PRELOAD SYSTEM
// =========================================================


    preloadList: [],



    addPreload: function(
        id
    ){



        if(
            !this.preloadList.includes(
                id
            )
        ){



            this.preloadList.push(
                id
            );



        }



    },



// =========================================================
// PRELOAD ALL AUDIO
// =========================================================


    preloadAll: function(){



        this.preloadList.forEach(
            (id)=>{



                this.loadAudio(
                    id
                );



            }
        );



        console.log(
            "Audio preload complete."
        );



    },



// =========================================================
// AUDIO CLEANUP
// =========================================================


    cleanup: function(){



        Object.keys(
            this.audioObjects
        ).forEach(
            (id)=>{



                this.stop(
                    id
                );



                delete this.audioObjects[id];



            }
        );



        this.currentTrack =
        null;



        this.currentAmbience =
        null;



    },



// =========================================================
// FINAL STATUS CHECK
// =========================================================


    getStatus: function(){



        return {



            initialized:
            this.initialized,



            music:
            this.currentTrack,



            ambience:
            this.currentAmbience,



            tension:
            this.tensionLevel,



            muted:
            this.muted,



            loadedSounds:
            Object.keys(
                this.audioObjects
            ).length



        };



    }


};


// =========================================================
// GLOBAL ACCESS
// =========================================================


if(
    typeof window !== "undefined"
){



    window.RidgeAudio =
    RidgeAudio;



    window.AudioManager =
    AudioManager;



}



// =========================================================
// NODE COMPATIBILITY
// =========================================================


if(
    typeof module !== "undefined"
){



    module.exports = {



        RidgeAudio,


        AudioManager



    };



}



// =========================================================
// AUTO INITIALIZATION
// =========================================================


if(
    typeof AudioManager !== "undefined"
){



    AudioManager.initialize();



}



// =========================================================
// END OF AUDIO.JS
// THE RIDGE SOCIETY
// =========================================================
