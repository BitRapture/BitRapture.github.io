const gallerySrc = {
  content : [
    { name : "This Website", desc :
    "Coded from scratch using HTML, CSS and JavaScript. This was made for an assignment however I plan on keeping this updated \
    to use as a portfolio and to experiment further with web demos. I created a main page template and proceeded to splice it up \
    into segments, this allows for static page generation through a build script; automating the process of adding main page elements to \
    each page. The majority of the webpages are dynamically generated within itself using JavaScript, this is so I can easily add and/or remove \
    any content via a JavaScript Object variable that is included in the head tags.",
    image : "media/projects/website.png", link : "https://github.com/BitRapture/BitRapture.github.io", linkdesc : "Check out the repo"  },

    { name : "MM Texturepack Creator",
    desc : "Coded in C++ with the use of the wxWidgets library.I follow a game called Mechanic Miner closely on Steam. In the game's directory contains two resource files. One of them \
    contains all the media used within the game (mainly sound files and texture atlases), and the other contains a series of memory offsets \
    that point to the resources so that the game can load them in. I realised that the offsets can be manipulated to point to new resources \
    which allows for texture packs.",
    image : "media/projects/texturepackCreator.png", link : "https://github.com/BitRapture/MechanicMiner-Mod-Tool", linkdesc : "Check out the repo"  },

    { name : "olcGameJam The Great Machine",
    desc : "Coded in C++ with the use of the olcPixelGameEngine library. This was my first C++ entry to a game jam. The theme was \
    'The Great Machine', unfortunately I didn't have enough time to properly create a game however I was pleased with what I accomplished. \
    I created the start of a top down shooter; I managed to make the levels procedurally generated as well as implementing shadow casting. \
    I came 89th out of 108 entries.",
    image : "media/projects/theGreatMachine.png", link : "https://bitrapture.itch.io/just-another-cog", linkdesc : "Check out the game page"  },

    { name : "GM48 Small World",
    desc : "Created in GameMaker Studio using GameMaker Language. This was my last GameMaker game jam entry I did before switching to \
    using straight up C++. The theme was 'A Small World'; I tackled this jam by creating a small horror game, the character you play as \
    must collect power cells that are scattered on a small planet. A creature chases the player every now and then, gradually becoming \
    more frequent as more power cells are collected. I was extremely pleased with the result of this game jam as I managed to reach every \
    goal I set myself, including adding shaders to make the atmosphere more tense. I came 11th out of 69 entries.",
    image : "media/projects/gm48SmallWorld.gif", link : "https://gm48.net/game/1591/inhabited", linkdesc : "Check out the game entry"  },

    { name : "GM48 Collect!",
    desc : "Created in GameMaker Studio using GameMaker Language. The theme for this game jam was 'Collect!'. I decided to make a top down shooter \
    where the player would take on jobs cleaning up basements. I wasn't able to fully develop this game, there were a couple things I wanted to add \
    such as procedurally generated levels as well as a proper achievable goal. I made some really scuffed music in this one using a pocket synthesizer. \
    I came 33rd out of 68.",
    image : "media/projects/gm48Collect.gif", link : "https://gm48.net/game/1504/super-basement-cleaner", linkdesc : "Check out the game entry"  },

    { name : "GM48 No Death State",
    desc : "Created in GameMaker Studio using GameMaker Language. This was my first ever GameMaker game jam entry. I did not manage my time at all \
    but it gave me such a good lesson on how to do so for future jams. The theme was 'No Death State'. I created a platformer where the player had to \
    collect all the coins in the world to win, I made a mechanic that when the player dies they respawn in an alternate version of the world. Coins are \
    scattered throughout both of these worlds which requires the player to die in specific spots to reach new areas. A lot of bugs were in this game, as \
    well as little quality control; I ran out of time to playtest the game thouroughly. I came 25th out of 60.",
    image : "media/projects/gm48NoDeathState.png", link : "https://gm48.net/game/1284/larry-the-other-end", linkdesc : "Check out the game entry"  },

    { name : "(Unfinished) Safe Space",
    desc : "Created in GameMaker Studio using GameMaker Language. I really wanted to try and create a text based game so I made a start of one in \
    GameMaker (which makes it not a truthful text game as it's not played in a CLI). It is essentially a top down survival game. I created quite a few \
    features even though it's in an unfinished state. The game's levels are procedurally generated, it uses biome templates to construct world chunks. \
    I implemented crafting, an inventory, farming, fishing, building, and mining. The game also features a saving/loading system which uses JSON and INI files.",
    image : "media/projects/safeSpace.png", link : "https://bitrapture.itch.io/safespace", linkdesc : "Check out the game page"  }

  ]
};
