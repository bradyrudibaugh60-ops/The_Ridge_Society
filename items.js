/* ==========================================================
   THE RIDGE SOCIETY
   ITEMS.JS
   VERSION 0.1 ALPHA
========================================================== */

"use strict";

/* ==========================================================
   ITEM DATABASE
========================================================== */

const ItemDatabase =
{

    items: []

};

/* ==========================================================
   REGISTER ITEM
========================================================== */

function registerItem(item)
{

    ItemDatabase.items.push(item);

}

/* ==========================================================
   FIND ITEM BY ID
========================================================== */

function getItemByID(id)
{

    return ItemDatabase.items.find(

        item =>

        item.id === id

    );

}

/* ==========================================================
   FIND ITEM BY NAME
========================================================== */

function getItemByName(name)
{

    return ItemDatabase.items.find(

        item =>

        item.name === name

    );

}

/* ==========================================================
   ITEM EXISTS
========================================================== */

function itemExists(id)
{

    return ItemDatabase.items.some(

        item =>

        item.id === id

    );

}

/* ==========================================================
   GET ALL ITEMS
========================================================== */

function getAllItems()
{

    return ItemDatabase.items;

}

/* ==========================================================
   ITEM TYPES
========================================================== */

const ItemTypes =
{

    WEAPON:
    "weapon",

    TOOL:
    "tool",

    KEY:
    "key",

    QUEST:
    "quest",

    CONSUMABLE:
    "consumable",

    MATERIAL:
    "material",

    DOCUMENT:
    "document",

    MISC:
    "misc"

};
/* ==========================================================
   CREATE ITEM
========================================================== */

function createItem(
id,
name,
description,
icon,
type,
weight,
value,
usable = false,
stackable = false,
maxStack = 1
)
{

    return {

        id,

        name,

        description,

        icon,

        type,

        weight,

        value,

        usable,

        stackable,

        maxStack

    };

}

/* ==========================================================
   REGISTER DEFAULT ITEMS
========================================================== */

registerItem(

    createItem(

        "knife",

        "Knife",

        "A sharp hunting knife.",

        "assets/icons/knife.png",

        ItemTypes.WEAPON,

        2,

        50,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "lantern",

        "Lantern",

        "Lights the darkness.",

        "assets/icons/lantern.png",

        ItemTypes.TOOL,

        3,

        40,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "map",

        "Old Map",

        "A worn map of The Ridge.",

        "assets/icons/map.png",

        ItemTypes.TOOL,

        1,

        20,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "compass",

        "Compass",

        "Always points north.",

        "assets/icons/compass.png",

        ItemTypes.TOOL,

        1,

        25,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "rope",

        "Rope",

        "Strong climbing rope.",

        "assets/icons/rope.png",

        ItemTypes.TOOL,

        4,

        35,

        true,

        false,

        1

    )

);
/* ==========================================================
   ADDITIONAL DEFAULT ITEMS
========================================================== */

registerItem(

    createItem(

        "crystal",

        "Purple Crystal",

        "A strange crystal that hums with an unnatural energy.",

        "assets/icons/crystal.png",

        ItemTypes.MATERIAL,

        1,

        120,

        false,

        false,

        1

    )

);

registerItem(

    createItem(

        "coin",

        "Ancient Coin",

        "An old ceremonial coin bearing the Order's symbol.",

        "assets/icons/coin.png",

        ItemTypes.MISC,

        0.1,

        15,

        false,

        true,

        99

    )

);

registerItem(

    createItem(

        "prayer_book",

        "Prayer Book",

        "Contains rituals practiced by the Order.",

        "assets/icons/prayer_book.png",

        ItemTypes.DOCUMENT,

        1,

        80,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "church_key",

        "Church Key",

        "Unlocks the front entrance of the church.",

        "assets/icons/church_key.png",

        ItemTypes.KEY,

        0.2,

        0,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "ritual_dagger",

        "Ritual Dagger",

        "A ceremonial blade stained with dried blood.",

        "assets/icons/ritual_dagger.png",

        ItemTypes.WEAPON,

        2,

        250,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "first_aid_kit",

        "First Aid Kit",

        "Restores a portion of your health.",

        "assets/icons/first_aid_kit.png",

        ItemTypes.CONSUMABLE,

        2,

        90,

        true,

        true,

        5

    )

);

registerItem(

    createItem(

        "strange_note",

        "Strange Note",

        "Someone has written: 'The mountain watches.'",

        "assets/icons/note.png",

        ItemTypes.DOCUMENT,

        0.1,

        0,

        true,

        false,

        1

    )

);

registerItem(

    createItem(

        "church_basement_key",

        "Basement Key",

        "Opens the locked door beneath the church.",

        "assets/icons/basement_key.png",

        ItemTypes.KEY,

        0.2,

        0,

        true,

        false,

        1

    )

);
/* ==========================================================
   FILTER ITEMS BY TYPE
========================================================== */

function getItemsByType(type)
{

    return ItemDatabase.items.filter(

        item =>

        item.type === type

    );

}

/* ==========================================================
   GET RANDOM ITEM
========================================================== */

function getRandomItem()
{

    return ItemDatabase.items[

        Math.floor(

            Math.random() *

            ItemDatabase.items.length

        )

    ];

}

/* ==========================================================
   VALIDATE ITEM
========================================================== */

function validateItem(item)
{

    if(

        !item.id ||

        !item.name ||

        !item.type

    )
    {

        return false;

    }

    return true;

}

/* ==========================================================
   REMOVE ITEM
========================================================== */

function unregisterItem(id)
{

    ItemDatabase.items =

    ItemDatabase.items.filter(

        item =>

        item.id !== id

    );

}

/* ==========================================================
   TOTAL ITEM COUNT
========================================================== */

function getItemCount()
{

    return ItemDatabase.items.length;

}

/* ==========================================================
   DEBUG ITEM LIST
========================================================== */

function printItemDatabase()
{

    console.table(

        ItemDatabase.items

    );

}

/* ==========================================================
   INITIALIZATION
========================================================== */

console.log(

    "Items Loaded:",

    getItemCount()

);

/* ==========================================================
   ITEMS.JS COMPLETE
   VERSION 0.1 ALPHA
========================================================== */
