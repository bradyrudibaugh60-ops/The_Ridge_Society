// =========================================================
// THE RIDGE SOCIETY
// COLLISION SYSTEM
// Version 0.1
// =========================================================


const CollisionSystem = {



    initialized: false,



    debugMode: false,



    tileSize: 32,



    player: null,



    npcs: [],



    objects: [],



    zones: [],



    doors: [],



    blockedTiles: [],



    currentMap: null,



// =========================================================
// INITIALIZATION
// =========================================================


    initialize: function(){



        this.initialized = true;



        console.log(
            "Collision System Initialized"
        );



    },



// =========================================================
// SET PLAYER
// =========================================================


    setPlayer: function(
        player
    ){



        this.player =
        player;



    },



// =========================================================
// SET MAP
// =========================================================


    setMap: function(
        map
    ){



        this.currentMap =
        map;



        if(
            map.collision
        ){



            this.blockedTiles =
            map.collision;



        }



    },



// =========================================================
// ADD NPC
// =========================================================


    addNPC: function(
        npc
    ){



        this.npcs.push(
            npc
        );



    },



// =========================================================
// REMOVE NPC
// =========================================================


    removeNPC: function(
        npcID
    ){



        this.npcs =
        this.npcs.filter(
            npc =>
            npc.id !== npcID
        );



    },



// =========================================================
// ADD OBJECT COLLISION
// =========================================================


    addObject: function(
        object
    ){



        this.objects.push(
            object
        );



    },



// =========================================================
// REMOVE OBJECT
// =========================================================


    removeObject: function(
        id
    ){



        this.objects =
        this.objects.filter(
            object =>
            object.id !== id
        );



    },
// =========================================================
// COLLISION BOX CREATION
// =========================================================


    createBox: function(
        x,
        y,
        width,
        height
    ){



        return {



            x:
            x,



            y:
            y,



            width:
            width,



            height:
            height



        };



    },



// =========================================================
// BASIC RECTANGLE COLLISION
// =========================================================


    checkRectangleCollision: function(
        a,
        b
    ){



        return (


            a.x <
            b.x + b.width


            &&


            a.x + a.width >
            b.x


            &&


            a.y <
            b.y + b.height


            &&


            a.y + a.height >
            b.y



        );



    },



// =========================================================
// POINT COLLISION
// =========================================================


    checkPointCollision: function(
        point,
        box
    ){



        return (


            point.x >= box.x


            &&


            point.x <=
            box.x + box.width


            &&


            point.y >= box.y


            &&


            point.y <=
            box.y + box.height



        );



    },



// =========================================================
// PLAYER MOVEMENT COLLISION
// =========================================================


    canMove: function(
        entity,
        newX,
        newY
    ){



        let box =
        this.createBox(


            newX,


            newY,


            entity.width,


            entity.height



        );



        if(
            this.checkWallCollision(
                box
            )
        ){



            return false;



        }



        if(
            this.checkObjectCollision(
                box
            )
        ){



            return false;



        }



        if(
            this.checkNPCCollision(
                box,
                entity
            )
        ){



            return false;



        }



        return true;



    },



// =========================================================
// WALL COLLISION
// =========================================================


    checkWallCollision: function(
        box
    ){



        for(
            let tile of this.blockedTiles
        ){



            let tileBox =
            this.createBox(


                tile.x *
                this.tileSize,


                tile.y *
                this.tileSize,


                this.tileSize,


                this.tileSize



            );



            if(
                this.checkRectangleCollision(
                    box,
                    tileBox
                )
            ){



                return true;



            }



        }



        return false;



    },



// =========================================================
// OBJECT COLLISION
// =========================================================


    checkObjectCollision: function(
        box
    ){



        for(
            let object of this.objects
        ){



            if(
                !object.solid
            ){



                continue;



            }



            let objectBox =
            this.createBox(


                object.x,


                object.y,


                object.width,


                object.height



            );



            if(
                this.checkRectangleCollision(
                    box,
                    objectBox
                )
            ){



                return true;



            }



        }



        return false;



    },
// =========================================================
// NPC COLLISION
// =========================================================


    checkNPCCollision: function(
        box,
        ignoreEntity = null
    ){



        for(
            let npc of this.npcs
        ){



            if(
                npc === ignoreEntity
            ){



                continue;



            }



            if(
                npc.collision === false
            ){



                continue;



            }



            let npcBox =
            this.createBox(


                npc.x,


                npc.y,


                npc.width || 32,


                npc.height || 32



            );



            if(
                this.checkRectangleCollision(
                    box,
                    npcBox
                )
            ){



                return true;



            }



        }



        return false;



    },



// =========================================================
// FIND NPC NEAR PLAYER
// =========================================================


    getNearbyNPC: function(
        player,
        distance = 48
    ){



        for(
            let npc of this.npcs
        ){



            let dx =
            npc.x -
            player.x;



            let dy =
            npc.y -
            player.y;



            let range =
            Math.sqrt(
                dx * dx +
                dy * dy
            );



            if(
                range <= distance
            ){



                return npc;



            }



        }



        return null;



    },



// =========================================================
// INTERACTION RANGE CHECK
// =========================================================


    canInteract: function(
        player,
        object,
        distance = 64
    ){



        let dx =
        object.x -
        player.x;



        let dy =
        object.y -
        player.y;



        let range =
        Math.sqrt(
            dx * dx +
            dy * dy
        );



        return (
            range <= distance
        );



    },



// =========================================================
// ADD INTERACTION ZONE
// =========================================================


    addZone: function(
        zone
    ){



        this.zones.push(
            zone
        );



    },



// =========================================================
// CHECK ZONES
// =========================================================


    checkZones: function(
        entity
    ){



        let results = [];



        for(
            let zone of this.zones
        ){



            let zoneBox =
            this.createBox(


                zone.x,


                zone.y,


                zone.width,


                zone.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    zoneBox
                )
            ){



                results.push(
                    zone
                );



            }



        }



        return results;



    },



// =========================================================
// DOOR SYSTEM
// =========================================================


    addDoor: function(
        door
    ){



        this.doors.push(
            door
        );



    },



// =========================================================
// DOOR COLLISION CHECK
// =========================================================


    checkDoorCollision: function(
        box
    ){



        for(
            let door of this.doors
        ){



            if(
                door.open
            ){



                continue;



            }



            let doorBox =
            this.createBox(


                door.x,


                door.y,


                door.width,


                door.height



            );



            if(
                this.checkRectangleCollision(
                    box,
                    doorBox
                )
            ){



                return door;



            }



        }



        return null;



    },
// =========================================================
// ACT LOCKED COLLISION SYSTEM
// =========================================================


    currentAct: 1,



    setCurrentAct: function(
        act
    ){



        this.currentAct =
        act;



    },



// =========================================================
// CHECK ACT REQUIREMENT
// =========================================================


    checkActRequirement: function(
        requirement
    ){



        if(
            !requirement
        ){



            return true;



        }



        return (
            this.currentAct >=
            requirement
        );



    },



// =========================================================
// ACT LOCKED DOORS
// =========================================================


    checkLockedDoor: function(
        door
    ){



        if(
            !door.requiredAct
        ){



            return false;



        }



        if(
            this.currentAct <
            door.requiredAct
        ){



            return true;



        }



        return false;



    },



// =========================================================
// QUEST BASED BLOCKS
// =========================================================


    questFlags: {},



    setQuestFlag: function(
        flag,
        value
    ){



        this.questFlags[flag] =
        value;



    },



// =========================================================
// CHECK QUEST REQUIREMENT
// =========================================================


    checkQuestRequirement: function(
        requirement
    ){



        if(
            !requirement
        ){



            return true;



        }



        return (
            this.questFlags[requirement]
            === true
        );



    },



// =========================================================
// RESTRICTED AREA SYSTEM
// =========================================================


    restrictedAreas: [],



    addRestrictedArea: function(
        area
    ){



        this.restrictedAreas.push(
            area
        );



    },



// =========================================================
// CHECK RESTRICTED AREA
// =========================================================


    checkRestrictedArea: function(
        entity
    ){



        for(
            let area of this.restrictedAreas
        ){



            let box =
            this.createBox(


                area.x,


                area.y,


                area.width,


                area.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    box
                )
            ){



                if(
                    !this.checkActRequirement(
                        area.requiredAct
                    )
                ){



                    return {



                        blocked:
                        true,


                        reason:
                        "ACT_LOCKED"



                    };



                }



                if(
                    !this.checkQuestRequirement(
                        area.requiredQuest
                    )
                ){



                    return {



                        blocked:
                        true,


                        reason:
                        "QUEST_LOCKED"



                    };



                }



            }



        }



        return {



            blocked:
            false



        };



    },



// =========================================================
// COLLISION EVENTS
// =========================================================


    collisionEvents: {},



    registerCollisionEvent: function(
        id,
        callback
    ){



        this.collisionEvents[id] =
        callback;



    },



// =========================================================
// TRIGGER COLLISION EVENT
// =========================================================


    triggerCollisionEvent: function(
        id,
        data
    ){



        let event =
        this.collisionEvents[id];



        if(
            event
        ){



            event(
                data
            );



        }



    },



// =========================================================
// ENTITY COLLISION UPDATE
// =========================================================


    updateEntity: function(
        entity,
        newX,
        newY
    ){



        let movement = {



            x:
            newX,


            y:
            newY



        };



        if(
            this.canMove(
                entity,
                newX,
                newY
            )
        ){



            entity.x =
            movement.x;



            entity.y =
            movement.y;



            return true;



        }



        return false;



    },
// =========================================================
// FAKE 3D DEPTH COLLISION SYSTEM
// =========================================================


// Used for future perspective rendering.
// Entities with higher depth appear farther away.

    depthEnabled: true,



    depthLayers: [],



    addDepthLayer: function(
        layer
    ){



        this.depthLayers.push(
            layer
        );



    },



// =========================================================
// CHECK DEPTH COLLISION
// =========================================================


    checkDepthCollision: function(
        entity,
        target
    ){



        if(
            !this.depthEnabled
        ){



            return false;



        }



        let difference =
        Math.abs(
            entity.depth -
            target.depth
        );



        return (
            difference > 0.5
        );



    },



// =========================================================
// ELEVATION SYSTEM
// =========================================================


    elevations: {},



    setElevation: function(
        entityID,
        height
    ){



        this.elevations[entityID] =
        height;



    },



// =========================================================
// GET ELEVATION
// =========================================================


    getElevation: function(
        entityID
    ){



        return (
            this.elevations[entityID]
            || 0
        );



    },



// =========================================================
// STAIRS AND RAMPS
// =========================================================


    ramps: [],



    addRamp: function(
        ramp
    ){



        this.ramps.push(
            ramp
        );



    },



// =========================================================
// CHECK RAMP
// =========================================================


    checkRamp: function(
        entity
    ){



        for(
            let ramp of this.ramps
        ){



            let box =
            this.createBox(


                ramp.x,


                ramp.y,


                ramp.width,


                ramp.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    box
                )
            ){



                return ramp;



            }



        }



        return null;



    },



// =========================================================
// MAP TRANSITION COLLISION
// =========================================================


    transitions: [],



    addTransition: function(
        transition
    ){



        this.transitions.push(
            transition
        );



    },



// =========================================================
// CHECK MAP TRANSITIONS
// =========================================================


    checkTransition: function(
        entity
    ){



        for(
            let transition of this.transitions
        ){



            let box =
            this.createBox(


                transition.x,


                transition.y,


                transition.width,


                transition.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    box
                )
            ){



                return transition;



            }



        }



        return null;



    },



// =========================================================
// COLLISION DEBUG MODE
// =========================================================


    toggleDebug: function(){



        this.debugMode =
        !this.debugMode;



        console.log(

            "Collision Debug:",
            this.debugMode

        );



    },



// =========================================================
// DEBUG DRAW DATA
// =========================================================


    getDebugData: function(){



        return {



            tiles:
            this.blockedTiles,


            objects:
            this.objects,


            npcs:
            this.npcs,


            doors:
            this.doors,


            zones:
            this.zones,


            depth:
            this.depthLayers



        };



    },
// =========================================================
// COLLISION AUDIO SYSTEM
// =========================================================


    collisionSounds: {



        wall:
        "wall_hit",



        object:
        "object_bump",



        door:
        "locked_door",



        npc:
        "npc_bump",



        hazard:
        "danger_hit"



    },



// =========================================================
// SET COLLISION AUDIO
// =========================================================


    setCollisionSound: function(
        type,
        sound
    ){



        this.collisionSounds[type] =
        sound;



    },



// =========================================================
// PLAY COLLISION SOUND
// =========================================================


    playCollisionSound: function(
        type
    ){



        let sound =
        this.collisionSounds[type];



        if(
            sound &&
            typeof AudioManager !== "undefined"
        ){



            AudioManager.play(
                sound
            );



        }



    },



// =========================================================
// COLLISION EFFECT SYSTEM
// =========================================================


    collisionEffects: {},



    registerCollisionEffect: function(
        type,
        effect
    ){



        this.collisionEffects[type] =
        effect;



    },



// =========================================================
// TRIGGER COLLISION EFFECT
// =========================================================


    triggerCollisionEffect: function(
        type,
        position
    ){



        let effect =
        this.collisionEffects[type];



        if(
            effect &&
            typeof Effects !== "undefined"
        ){



            Effects.spawn(
                effect,
                position
            );



        }



    },



// =========================================================
// HAZARD SYSTEM
// =========================================================


    hazards: [],



    addHazard: function(
        hazard
    ){



        this.hazards.push(
            hazard
        );



    },



// =========================================================
// CHECK HAZARDS
// =========================================================


    checkHazards: function(
        entity
    ){



        let entityBox =
        this.createBox(


            entity.x,


            entity.y,


            entity.width,


            entity.height



        );



        for(
            let hazard of this.hazards
        ){



            let hazardBox =
            this.createBox(


                hazard.x,


                hazard.y,


                hazard.width,


                hazard.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    hazardBox
                )
            ){



                this.playCollisionSound(
                    "hazard"
                );



                return hazard;



            }



        }



        return null;



    },



// =========================================================
// FAKE WALL SYSTEM
// =========================================================


    fakeWalls: [],



    addFakeWall: function(
        wall
    ){



        this.fakeWalls.push(
            wall
        );



    },



// =========================================================
// CHECK FAKE WALL
// =========================================================


    checkFakeWall: function(
        entity
    ){



        for(
            let wall of this.fakeWalls
        ){



            let wallBox =
            this.createBox(


                wall.x,


                wall.y,


                wall.width,


                wall.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    wallBox
                )
            ){



                return wall;



            }



        }



        return null;



    },



// =========================================================
// GLITCH COLLISION SYSTEM
// =========================================================


    glitches: [],



    addGlitchZone: function(
        zone
    ){



        this.glitches.push(
            zone
        );



    },



// =========================================================
// CHECK GLITCH ZONES
// =========================================================


    checkGlitchZone: function(
        entity
    ){



        for(
            let glitch of this.glitches
        ){



            let box =
            this.createBox(


                glitch.x,


                glitch.y,


                glitch.width,


                glitch.height



            );



            let entityBox =
            this.createBox(


                entity.x,


                entity.y,


                entity.width,


                entity.height



            );



            if(
                this.checkRectangleCollision(
                    entityBox,
                    box
                )
            ){



                return glitch;



            }



        }



        return null;



    },
// =========================================================
// DYNAMIC COLLISION OBJECTS
// =========================================================


    dynamicObjects: [],



    addDynamicObject: function(
        object
    ){



        this.dynamicObjects.push(
            object
        );



    },



// =========================================================
// UPDATE DYNAMIC OBJECT
// =========================================================


    updateDynamicObject: function(
        id,
        data
    ){



        let object =
        this.dynamicObjects.find(
            item =>
            item.id === id
        );



        if(
            object
        ){



            Object.assign(
                object,
                data
            );



        }



    },



// =========================================================
// REMOVE DYNAMIC OBJECT
// =========================================================


    removeDynamicObject: function(
        id
    ){



        this.dynamicObjects =
        this.dynamicObjects.filter(
            object =>
            object.id !== id
        );



    },



// =========================================================
// MOVING COLLISION CHECK
// =========================================================


    checkDynamicCollision: function(
        box
    ){



        for(
            let object of this.dynamicObjects
        ){



            if(
                !object.solid
            ){



                continue;



            }



            let objectBox =
            this.createBox(


                object.x,


                object.y,


                object.width,


                object.height



            );



            if(
                this.checkRectangleCollision(
                    box,
                    objectBox
                )
            ){



                return object;



            }



        }



        return null;



    },



// =========================================================
// DESTRUCTIBLE OBJECT SYSTEM
// =========================================================


    destructibles: [],



    addDestructible: function(
        object
    ){



        this.destructibles.push(
            object
        );



    },



// =========================================================
// DAMAGE DESTRUCTIBLE
// =========================================================


    damageObject: function(
        id,
        amount
    ){



        let object =
        this.destructibles.find(
            item =>
            item.id === id
        );



        if(
            !object
        ){



            return;



        }



        object.health -=
        amount;



        if(
            object.health <= 0
        ){



            object.destroyed =
            true;



            this.triggerCollisionEvent(
                "OBJECT_DESTROYED",
                object
            );



        }



    },



// =========================================================
// SAVE COLLISION DATA
// =========================================================


    saveState: function(){



        return {



            currentAct:
            this.currentAct,


            questFlags:
            this.questFlags,


            destroyedObjects:
            this.destructibles.filter(
                object =>
                object.destroyed
            ).map(
                object =>
                object.id
            ),


            dynamicObjects:
            this.dynamicObjects



        };



    },



// =========================================================
// LOAD COLLISION DATA
// =========================================================


    loadState: function(
        data
    ){



        if(
            !data
        ){



            return;



        }



        this.currentAct =
        data.currentAct || 1;



        this.questFlags =
        data.questFlags || {};



        if(
            data.destroyedObjects
        ){



            this.destructibles.forEach(
                object => {



                    if(
                        data.destroyedObjects.includes(
                            object.id
                        )
                    ){



                        object.destroyed =
                        true;



                    }



                }
            );



        }



        if(
            data.dynamicObjects
        ){



            this.dynamicObjects =
            data.dynamicObjects;



        }



    },
// =========================================================
// COLLISION OPTIMIZATION SYSTEM
// =========================================================


    optimization: {



        enabled:
        true,



        maxChecks:
        1000,



        checksPerformed:
        0



    },



// =========================================================
// RESET COLLISION CHECK COUNTER
// =========================================================


    resetOptimizationCounter: function(){



        this.optimization.checksPerformed =
        0;



    },



// =========================================================
// REGISTER COLLISION CHECK
// =========================================================


    registerCheck: function(){



        this.optimization.checksPerformed++;



    },



// =========================================================
// OPTIMIZATION LIMIT CHECK
// =========================================================


    canPerformCheck: function(){



        if(
            !this.optimization.enabled
        ){



            return true;



        }



        return (
            this.optimization.checksPerformed
            <
            this.optimization.maxChecks
        );



    },



// =========================================================
// CLEAN INVALID OBJECTS
// =========================================================


    cleanup: function(){



        this.objects =
        this.objects.filter(
            object =>
            object != null
        );



        this.npcs =
        this.npcs.filter(
            npc =>
            npc != null
        );



        this.zones =
        this.zones.filter(
            zone =>
            zone != null
        );



        this.doors =
        this.doors.filter(
            door =>
            door != null
        );



    },



// =========================================================
// RESET SYSTEM
// =========================================================


    reset: function(){



        this.npcs =
        [];



        this.objects =
        [];



        this.zones =
        [];



        this.doors =
        [];



        this.blockedTiles =
        [];



        this.questFlags =
        {};



        this.dynamicObjects =
        [];



        this.destructibles =
        [];



        this.currentAct =
        1;



    },



// =========================================================
// COLLISION UPDATE LOOP
// =========================================================


    update: function(){



        this.resetOptimizationCounter();



        this.cleanup();



    },



// =========================================================
// GET SYSTEM STATUS
// =========================================================


    getStatus: function(){



        return {



            initialized:
            this.initialized,


            act:
            this.currentAct,


            npcCount:
            this.npcs.length,


            objectCount:
            this.objects.length,


            doorCount:
            this.doors.length,


            zoneCount:
            this.zones.length



        };



    },



// =========================================================
// EXPORT
// =========================================================


};



if(
    typeof module !== "undefined"
){



    module.exports =
    CollisionSystem;



}
// =========================================================
// BROWSER GLOBAL SUPPORT
// =========================================================


if(
    typeof window !== "undefined"
){



    window.CollisionSystem =
    CollisionSystem;



}



// =========================================================
// AUTO INITIALIZATION
// =========================================================


function initializeCollisionSystem(){



    if(
        CollisionSystem.initialized
    ){



        return;



    }



    CollisionSystem.initialize();



}



// =========================================================
// WAIT FOR GAME LOAD
// =========================================================


if(
    typeof window !== "undefined"
){



    window.addEventListener(
        "load",
        function(){



            initializeCollisionSystem();



        }
    );



}



// =========================================================
// COLLISION HELPER FUNCTIONS
// =========================================================


function createCollisionBox(
    x,
    y,
    width,
    height
){



    return CollisionSystem.createBox(
        x,
        y,
        width,
        height
    );



}



function checkCollision(
    first,
    second
){



    return CollisionSystem.checkRectangleCollision(
        first,
        second
    );



}



// =========================================================
// DEBUG COMMANDS
// =========================================================


const CollisionDebug = {



    enable: function(){



        CollisionSystem.debugMode =
        true;



        console.log(
            "Collision Debug Enabled"
        );



    },



    disable: function(){



        CollisionSystem.debugMode =
        false;



        console.log(
            "Collision Debug Disabled"
        );



    },



    status: function(){



        console.log(
            CollisionSystem.getStatus()
        );



    }



};



// =========================================================
// MAKE DEBUG AVAILABLE
// =========================================================


if(
    typeof window !== "undefined"
){



    window.CollisionDebug =
    CollisionDebug;



}



// =========================================================
// THE RIDGE SOCIETY COLLISION SYSTEM
// END OF FILE
// =========================================================
