/*
TO-DO
--------------------------------------------------------------------------------------
- Sort dropdown by pokedex number
- Show bonuses (evolution and shiny)
- Full websocket.io integration
- Evolution experience carry-over
- Multiple trainers lists
--------------------------------------------------------------------------------------
*/

// Websocket
// URL endpoint of websocket
const socket = new WebSocket('wss://qh051xlm46.execute-api.us-east-2.amazonaws.com/production');

socket.addEventListener('open', e => {
  console.log('WebSocket is connected');
})

socket.addEventListener('close', e => console.log('WebSocket is closed'));

socket.addEventListener('error', e => console.error('WebSocket is in error', e));

socket.addEventListener('message', e => {
  // console.log('WebSocket received a message:', e)
  console.log('Your answer is:', JSON.parse(e.data).message)
})

window.ask = function (msg) {
  const payload = {
    action: 'message',
    msg
  }
  socket.send(JSON.stringify(payload));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// arrays
const all = [];
const caught = [];
const evolutionRemove = [];
const caughtObjects = [];

// get elements
const selectPokemon = document.getElementById("selectPokemon");
const selectPokemonAddBtn = document.getElementById("add");
const selectPokemonRemove = document.getElementById("selectPokemonRemove");
const selectPokemonSubBtn = document.getElementById("sub");
const fullList = document.getElementById("fullList-ul");

// pokemon with initial values
let bulbasaur = {name:"Bulbasaur", pokedex:1, type:"grass", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let ivysaur = {name:"Ivysaur", pokedex:2, type:"grass", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let venusaur = {name:"Venusaur", pokedex:3, type:"grass", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let squirtle = {name:"Squirtle", pokedex:4, type:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let wartortle = {name:"Wartortle", pokedex:5, type:"water", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let blastoise = {name:"Blastoise", pokedex:6, type:"water", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let charmander = {name:"Charmander", pokedex:7, type:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};
let charmeleon = {name:"Charmeleon", pokedex:8, type:"water", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};
let charizard = {name:"Charizard", pokedex:9, type:"water", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};

function onPageLoad() {
    // push pokemon variable objects to all array
    populateAll();
    // populate dropdown with name attribute of all objects in all array
    populateDropdown();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function populateAll() {
    all.push(bulbasaur, ivysaur, venusaur, squirtle, wartortle, blastoise, charmander, charmeleon, charizard);
}

function populateDropdown() {
    // depopulate Add dropdown
    let i, L = selectPokemon.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectPokemon.remove(i);
    }

    // depopulate Sub dropdown
    let i2, L2 = selectPokemonRemove.options.length - 1;
    for(i2 = L2; i2 >= 0; i2--) {
       selectPokemonRemove.remove(i2);
    }

    // repopulate Add dropdown
    for (let i = 0; i < all.length; i++) {
        let opt = all[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectPokemon.appendChild(el);
    }

    // repopulate Sub dropdown
    for (let i = 0; i < caught.length; i++) {
        let opt = caught[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectPokemonRemove.appendChild(el);
    }
}

function checkEmptyArray() { 
    // if nothing in all array, hide add dropdown and button. otherwise, show them
    if (all.length == 0) {
        selectPokemon.setAttribute("class", "hideAddRemove");
        selectPokemonAddBtn.setAttribute("class", "hideAddRemove");
    } else {
        selectPokemon.setAttribute("class", "showAddRemove");
        selectPokemonAddBtn.setAttribute("class", "showAddRemove");
    }
    // if nothing in caught array, hide remove dropdown and button. otherwise, show them
    if (caught.length == 0) {
        selectPokemonRemove.setAttribute("class", "hideAddRemove");
        selectPokemonSubBtn.setAttribute("class", "hideAddRemove");
    } else {
        selectPokemonRemove.setAttribute("class", "showAddRemove");
        selectPokemonSubBtn.setAttribute("class", "showAddRemove");
    }
}

function addPokemon() {
    // get value of dropdown option
    let selectedPokemon = selectPokemon.value;

    // if selectedPokemon matches name in all array, add that object to caught array 
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            // shiny chance (1/100)
            let shinyChance = Math.floor(Math.random() * 101);
            if (shinyChance == 1) {
                all[i].shiny = 1;
            }
            caught.push(all[i]);
        }
    }

    // remove caught pokemon from all array
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            all.splice(i,1);
        }
    }
    
    // repopulate dropdown
    populateDropdown();
    // rebuild caught object array for captured pokemon
    buildCaughtObjects();
    buildCaughtObjects();
    // add caught pokemon to visible list
    addToFullList();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function removePokemon() {
    // get value of dropdown option
    let selectedPokemon = selectPokemonRemove.value;

    // if selectedPokemon matches name in caught array, add that object to all array 
    for (let i = 0; i < caught.length; i++) {
        if (caught[i].name == selectedPokemon) {
            all.push(caught[i]);

            // remove removed pokemon from the evolutionRemove array
            for (let i2 = 0; i2 < evolutionRemove.length; i2++) {
                console.log("i2 iteration: " + evolutionRemove[i2].name);
                // remove all stages of removed pokemon
                // two separate iterations required, as evolutionRemove length meets first iteration standard after the first pokemon is removed.
                if (caught[i].line == evolutionRemove[i2].line) {
                    evolutionRemove.splice(i2,1);
                    //console.log(evolutionCheck.length, i2);
                    for (let i3 = 0; i3 < evolutionRemove.length; i3++) {
                        //console.log("i3 iteration: " + evolutionRemove[i3].name);
                        if (caught[i].line == evolutionRemove[i3].line) {
                            evolutionRemove.splice(i3,1);
                        }
                    }
                }
            }
        }
    }

    // remove "all" pokemon from caught array
    for (let i = 0; i < caught.length; i++) {
        if (caught[i].name == selectedPokemon) {
            caught.splice(i,1);
        }
    }

    // repopulate dropdown
    populateDropdown();
    // rebuild caught object array for captured pokemon
    buildCaughtObjects();
    buildCaughtObjects();
    // add caught pokemon to visible list
    addToFullList();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function buildCaughtObjects() {
    // depopulate caughtObjects array
    caughtObjects.splice(0, caughtObjects.length);

    // repopulate caughtObjects array
    for (var i = 0; i < caught.length; i++) {
        // shiny check
        let shinyFlag = shinyCheck(caught[i]);
        // evolution check
        let evolutionFlag = evolutionCheck(caught[i]);
        // build object for every caught pokemon
        let obj = {};
        let name = caught[i].name;
        let level = caught[i].level;
        let base = caught[i].base;
        let exp = caught[i].exp;
        let shiny = caught[i].shiny;
        let evolve = caught[i].evolve;

        // update shiny value
        if (shinyFlag == 1) {
            shiny = 1;
            base = base + 3;
        }

        // carry over gained lvl, atk, and exp through evolution
        // pokemon is stage 2
        if (evolutionFlag == 2) {
            // inherit previous stage gained experience
            for (var i2 = 0; i2 < caught.length; i2++) {
                if (caught[i2].line == caught[i].line && caught[i2].stage == 1) {
                    base = base + caught[i2].basePlus;
                    exp = exp + caught[i2].expPlus;
                    level = level + caught[i2].levelPlus;
                }
            }
            // add evolution bonus to base attack
            base = base + 3;
            // update evolve value
            evolve = 1;
        }
        // pokemon is stage 3
        else if (evolutionFlag == 3) {
            // inherit previous stage gained experience
            for (var i3 = 0; i3 < caught.length; i3++) {
                if (caught[i3].line == caught[i].line && caught[i3].stage == 2) {
                    base = base + caught[i3].basePlus;
                    exp = exp + caught[i3].expPlus;
                    level = level + caught[i3].levelPlus;
                }
                if (caught[i3].line == caught[i].line && caught[i3].stage == 1) {
                    base = base + caught[i3].basePlus;
                    exp = exp + caught[i3].expPlus;
                    level = level + caught[i3].levelPlus;
                }
            }
            // add evolution bonus to base attack
            base = base + 5;
            // update evolve value
            evolve = 2;
        }

        obj.name = name;
        obj.sprite = "https://img.pokemondb.net/sprites/black-white/anim/normal/" + caught[i].name.toLowerCase() + ".gif";
        obj.stats =  " Lvl: " + level + " Atk: " + base + " Exp: " + exp;
        obj.evolve = evolve;
        obj.shiny = shiny;
        // push built object to caughtObjects array if the evolutionRemove array does not contain the current pokemon
        console.log(evolutionRemove);
        if (evolutionRemove.includes(caught[i]) === false) {
            caughtObjects.push(obj);
        }
    }
}

function shinyCheck(pkmn) {
    for (var i = 0; i < caught.length; i++) {
        if (caught[i].line == pkmn.line) {
            if (caught[i].shiny == 1) {
                return 1;
            }
        }
    }
}

function evolutionCheck(pkmn) {
    // first check for stage 3 pokemon, then stage 2, etc.
    let lineAmount = 0;
    if (pkmn.stage == 3) {
        for (i = 0; i < caught.length; i++) {
            if (caught[i].line == pkmn.line) {
                lineAmount++;
            }
        }
        if (lineAmount == 3) {
            // remove other pokemon in line from caught array
            for (var i = 0; i < caught.length; i++) {
                if (caught[i].line == pkmn.line && caught[i].stage != 3) {
                    // if pokemon does not yet exist in evolutionRemove array, add it
                    console.log("evolutionRemove: " + caught[i].name);
                    if (evolutionRemove.includes(caught[i]) === false) {
                        evolutionRemove.push(caught[i]);
                    }
                }
            }
            return 3;
        }
    }
    else if (pkmn.stage == 2) {
        for (i = 0; i < caught.length; i++) {
            if (caught[i].line == pkmn.line) {
                if (caught[i].stage == 1) {
                    // remove other pokemon in line from caught array
                    if (caught[i].line == pkmn.line && (caught[i].stage != 2 || caught[i].stage != 3)) {
                        // if pokemon does not yet exist in evolutionRemove array, add it
                        console.log("evolutionRemove: " + caught[i].name);
                        if (evolutionRemove.includes(caught[i]) === false) {
                            evolutionRemove.push(caught[i]);
                        }
                    }
                    return 2;
                }
            }
        }
    }
    else if (pkmn.stage == 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function addToFullList() {
    // depopulate full list
    fullList.innerHTML = "";

    // repopulate full list
    for (var i = 0; i < caughtObjects.length; i++) {
        // build a list item for every caughtObject
        let name = caughtObjects[i].name;
        let stats = caughtObjects[i].stats;
        // create and set attributes for li and ul (which goes inside li)
        let li = document.createElement("li");
        let ul = document.createElement("ul");
        li.setAttribute("class", "list-pokemon-li");
        li.setAttribute("id", name.toLowerCase() + "-list-pokemon-li")
        ul.setAttribute("class", "list-pokemon-li-ul");
        ul.setAttribute("id", name.toLowerCase() + "list-pokemon-li-ul")

        // call spriteStatComponent function
        let liSS = spriteStatComponent(caughtObjects[i]);
        // call experienceComponent function
        let liExp = experienceComponent(caughtObjects[i]);
        // call tradeComponent function
        let liT = tradeComponent(caughtObjects[i]);
        
        // spriteAndStatsLiUl = liExp < ul < li
        ul.appendChild(liSS);
        ul.appendChild(liExp);
        ul.appendChild(liT);
        li.appendChild(ul);
        // add completed list item to fullList array
        fullList.appendChild(li);

        // get input
        let inputIdName = (name).toLowerCase() + "-exp";
        let input = document.getElementById(inputIdName);
        // get button
        let addExpButtonIdName = (name).toLowerCase() + "-add-exp-button";
        let addExpButton = document.getElementById(addExpButtonIdName);
        let setLvlButtonIdName = (name).toLowerCase() + "-set-lvl-button";
        let setLvlButton = document.getElementById(setLvlButtonIdName);
        let setAtkButtonIdName = (name).toLowerCase() + "-set-atk-button";
        let setAtkButton = document.getElementById(setAtkButtonIdName);
        let setExpButtonIdName = (name).toLowerCase() + "-set-exp-button";
        let setExpButton = document.getElementById(setExpButtonIdName);
        // set +EXP button text
        addExpButton.innerHTML = "+EXP";
        setLvlButton.innerHTML = "LVL";
        setAtkButton.innerHTML = "ATK";
        setExpButton.innerHTML = "EXP";
    }
}

function spriteStatComponent(co) {
    // create and set attributes for sprite/stat li and ul (which goes inside li)
    let returnedLi = document.createElement("li");
    returnedLi.setAttribute("class", "ss-li-ul");
    let spriteAndStatsUl = document.createElement("ul");
    spriteAndStatsUl.setAttribute("class", "ss-ul");

    // create liSprite, liStats, and liExp
    let liSprite = document.createElement("li");
    let liStats = document.createElement("li");
    let liBonus = document.createElement("li");

    //set liBonus attributes
    liBonus.setAttribute("class", "li-bonus");
    liBonus.setAttribute("id", co.name.toLowerCase() + "-li-bonus");

    let img = document.createElement("img");
    // grab sprite from external site. normal or shiny depending on caughtObject's shiny value
    if (co.shiny == 1) {
        img.setAttribute("src", "https://img.pokemondb.net/sprites/black-white/anim/shiny/" + co.name.toLowerCase() + ".gif");
    } else {
        img.setAttribute("src", "https://img.pokemondb.net/sprites/black-white/anim/normal/" + co.name.toLowerCase() + ".gif");
    }
    // set img attributes
    img.setAttribute("class", "sprite");
    img.setAttribute("id", co.name.toLowerCase() + "-sprite");

    // create p element for statsText, set its textContent and add it to liStats (li element)
    let statsText = document.createElement("p");
    statsText.textContent = co.stats;
    liStats.appendChild(statsText);

    // set bonusTextContent
    let bonusTextContent = "";
    if (co.evolve == 1 || co.evolve == 2) {
        bonusTextContent = "Evolution";
    }
    if (co.shiny == 1) {
        bonusTextContent = "Shiny";
    }
    if ((co.evolve == 1 || co.evolve == 2) && co.shiny == 1) {
        bonusTextContent = "Evolution, Shiny";
    }
    if ((co.evolve !== 1 && co.evolve !== 2) && co.shiny !== 1) {
        bonusTextContent = "None";
    }

    // create p element for bonus
    let bonusText = document.createElement("p");
    //set bonusText attributes
    bonusText.setAttribute("class", "bonus");
    bonusText.setAttribute("id", co.name.toLowerCase() + "-bonus");
    // set textContent and append
    bonusText.textContent = "Bonus: " + bonusTextContent;
    liBonus.appendChild(bonusText);

    // img < liSprite = liStats < spriteAndStatsUl < returnedLi
    liSprite.appendChild(img);
    spriteAndStatsUl.appendChild(liSprite);
    spriteAndStatsUl.appendChild(liStats);
    spriteAndStatsUl.appendChild(liBonus);
    returnedLi.appendChild(spriteAndStatsUl);
    // return returnedLi to addToFullList()
    return returnedLi;
}

function experienceComponent(co) {
    // co = caughtObjects[i] from addToFullList()
    // create names to be used as id/class names
    let inputIdName = (co.name).toLowerCase() + "-input";
    let buttonIdName = (co.name).toLowerCase() + "-add-exp-button";
    let ulIdName = (co.name).toLowerCase() + "add-exp-li-ul";
    // create elements and set attributes
    let returnedLi = document.createElement("li");
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let btn = document.createElement("button");
    let inp = document.createElement("input");
    returnedLi.setAttribute("class", "exp-li");
    li1.setAttribute("class", "input-li");
    li2.setAttribute("class", "addExpBtn-li");
    btn.setAttribute("id", buttonIdName);
    btn.setAttribute("class", "addExpBtn");
    // when +EXP button is clicked, run addExp function, passing in co.name
    btn.setAttribute("onclick", `addExp("${co.name}")`);
    inp.setAttribute("type", "text");
    inp.setAttribute("id", inputIdName);
    inp.setAttribute("class", "inputElement");
    ul.setAttribute("id", ulIdName);
    ul.setAttribute("class", "exp-li-ul");
    // ((inp < li1) = (btn < li2)) < ul < returnedLi
    li1.appendChild(inp);
    li2.appendChild(btn);
    ul.appendChild(li1);
    ul.appendChild(li2);
    returnedLi.appendChild(ul);
    // return returnLi to addToFullList()
    return returnedLi;
}

function tradeComponent(co) {
    // co = caughtObjects[i] from addToFullList()
    // create elements and set attributes
    let returnedLi = document.createElement("li");
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let btn3 = document.createElement("button");
    returnedLi.setAttribute("class", "trade-li");
    li1.setAttribute("class", "setLvlBtn-li");
    li2.setAttribute("class", "setAtkBtn-li");
    li3.setAttribute("class", "setExpBtn-li");
    btn1.setAttribute("id", (co.name).toLowerCase() + "-set-lvl-button");
    btn1.setAttribute("class", "setLvlBtn");
    btn2.setAttribute("id", (co.name).toLowerCase() + "-set-atk-button");
    btn2.setAttribute("class", "setAtkBtn");
    btn3.setAttribute("id", (co.name).toLowerCase() + "-set-exp-button");
    btn3.setAttribute("class", "setExpBtn");
    // when LVL button is clicked, run setLvl function, passing in co.name
    btn1.setAttribute("onclick", `setLvl("${co.name}")`);
    // when ATK button is clicked, run setAtk function, passing in co.name
    btn2.setAttribute("onclick", `setAtk("${co.name}")`);
    // when EXP button is clicked, run setExp function, passing in co.name
    btn3.setAttribute("onclick", `setExp("${co.name}")`);
    ul.setAttribute("id", (co.name).toLowerCase() + "-trade-li-ul");
    ul.setAttribute("class", "trade-li-ul");
    // ((inp < li1) = (btn < li2)) < ul < returnedLi
    li1.appendChild(btn1);
    li2.appendChild(btn2);
    li3.appendChild(btn3);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    returnedLi.appendChild(ul);
    // return returnLi to addToFullList()
    return returnedLi;

}

function addExp(pkmn) {
    // pkmn = p.name from experience()
    // create text input for caught pokemon
    let input = document.getElementById(pkmn.toLowerCase() + "-input");
    // set amount to value of entered text in input
    let amount = input.value;
    // iterate through all items in caught array to find the pokemon with the correct name value
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            // add amount to the pokemon's experience value
            caught[i].exp += parseInt(amount);
        }
    }
    // check levels, rebuild caughtObjects, and repopulate full list
    checkLevel();
    buildCaughtObjects();
    buildCaughtObjects();
    addToFullList();
}

function setLvl(pkmn) {
    // pkmn = p.name from experience()
    // create text input for caught pokemon
    let input = document.getElementById(pkmn.toLowerCase() + "-input");
    // set amount to value of entered text in input
    let amount = input.value;
    // iterate through all items in caught array to find the pokemon with the correct name value
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            // set amount to the pokemon's level value
            caught[i].level = parseInt(amount);
        }
    }
    // check levels, rebuild caughtObjects, and repopulate full list
    checkLevel();
    buildCaughtObjects();
    buildCaughtObjects();
    addToFullList();
}

function setAtk(pkmn) {
    // pkmn = p.name from experience()
    // create text input for caught pokemon
    let input = document.getElementById(pkmn.toLowerCase() + "-input");
    // set amount to value of entered text in input
    let amount = input.value;
    // iterate through all items in caught array to find the pokemon with the correct name value
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            // set amount to the pokemon's base value
            caught[i].base = parseInt(amount);
        }
    }
    // check levels, rebuild caughtObjects, and repopulate full list
    checkLevel();
    buildCaughtObjects();
    buildCaughtObjects();
    addToFullList();
}

function setExp(pkmn) {
    // pkmn = p.name from experience()
    // create text input for caught pokemon
    let input = document.getElementById(pkmn.toLowerCase() + "-input");
    // set amount to value of entered text in input
    let amount = input.value;
    // iterate through all items in caught array to find the pokemon with the correct name value
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            // set amount to the pokemon's exp value
            caught[i].exp = parseInt(amount);
        }
    }
    // check levels, rebuild caughtObjects, and repopulate full list
    checkLevel();
    buildCaughtObjects();
    buildCaughtObjects();
    addToFullList();
}

function checkLevel() {
    // Check exp value of all pokemon in caught array in order to level up accordingly
    for (var i = 0; i < caught.length; i++) {
        let currentPkmn = caught[i];
        // Level < 10
        if (currentPkmn.level < 15) {
            if (currentPkmn.exp >= 10) {
                currentPkmn.exp -= 10;
                currentPkmn.level++;
                currentPkmn.levelPlus++;
                currentPkmn.base++;
                currentPkmn.basePlus++;
            }
        }
        // Level < 15
        if (currentPkmn.level < 15) {
            if (currentPkmn.exp >= 15) {
                currentPkmn.exp -= 15;
                currentPkmn.level++;
                currentPkmn.levelPlus++;
                currentPkmn.base++;
                currentPkmn.basePlus++;
            }
        }
        // Level < 20
        if (currentPkmn.level < 20) {
            if (currentPkmn.exp >= 20) {
                currentPkmn.exp -= 20;
                currentPkmn.level++;
                currentPkmn.levelPlus++;
                currentPkmn.base++;
                currentPkmn.basePlus++;
            }
        }
        // Level cap
        if (currentPkmn.level >= 20) {
            currentPkmn.exp = 0;
            currentPkmn.level = 20;
        }
    }
}