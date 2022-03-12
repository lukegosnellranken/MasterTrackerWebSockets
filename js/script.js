/*
TO-DO
--------------------------------------------------------------------------------------
- Aspect ratio of images
- Set atk bug
- Complete documentation
- Sort dropdown by pokedex number
- Searchable dropdown
- Full websocket.io integration
- Multiple trainers lists
- Eevee evolution check
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

// global variables
let btnShowHideGlobalClass = "btnHide";

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
let bulbasaur = {name:"Bulbasaur", pokedex:1, type1:"grass", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let ivysaur = {name:"Ivysaur", pokedex:2, type1:"grass", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let venusaur = {name:"Venusaur", pokedex:3, type1:"grass", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"bulbasaur", evolve:0, shiny:0, player: 0, remove: 0};
let squirtle = {name:"Squirtle", pokedex:4, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let wartortle = {name:"Wartortle", pokedex:5, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let blastoise = {name:"Blastoise", pokedex:6, type1:"water", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"squirtle", evolve:0, shiny:0, player: 0, remove: 0};
let charmander = {name:"Charmander", pokedex:7, type1:"fire", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};
let charmeleon = {name:"Charmeleon", pokedex:8, type1:"fire",type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};
let charizard = {name:"Charizard", pokedex:9, type1:"fire", type2:"flying", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"charmander", evolve:0, shiny:0, player: 0, remove: 0};
let caterpie = {name:"Caterpie", pokedex:10, type1:"bug", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"caterpie", evolve:0, shiny:0, player: 0, remove: 0};
let metapod = {name:"Metapod", pokedex:11, type1:"bug", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"caterpie", evolve:0, shiny:0, player: 0, remove: 0};
let butterfree = {name:"Butterfree", pokedex:12, type1:"bug", type2:"flying", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"caterpie", evolve:0, shiny:0, player: 0, remove: 0};
let weedle = {name:"Weedle", pokedex:13, type1:"bug", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"weedle", evolve:0, shiny:0, player: 0, remove: 0};
let kakuna = {name:"Kakuna", pokedex:14, type1:"bug", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"weedle", evolve:0, shiny:0, player: 0, remove: 0};
let beedrill = {name:"Beedrill", pokedex:15, type1:"bug", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"weedle", evolve:0, shiny:0, player: 0, remove: 0};
let pidgey = {name:"Pidgey", pokedex:16, type1:"normal", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"pidgey", evolve:0, shiny:0, player: 0, remove: 0};
let pidgeotto = {name:"Pidgeotto", pokedex:17, type1:"normal", type2:"flying", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"pidgey", evolve:0, shiny:0, player: 0, remove: 0};
let pidgeot = {name:"Pidgeot", pokedex:18, type1:"normal", type2:"flying", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"pidgey", evolve:0, shiny:0, player: 0, remove: 0};
let rattata = {name:"Rattata", pokedex:19, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"rattata", evolve:0, shiny:0, player: 0, remove: 0};
let raticate = {name:"Raticate", pokedex:20, type1:"normal", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"rattata", evolve:0, shiny:0, player: 0, remove: 0};
let spearow = {name:"Spearow", pokedex:21, type1:"normal", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"spearow", evolve:0, shiny:0, player: 0, remove: 0};
let fearow = {name:"Fearow", pokedex:22, type1:"normal", type2:"flying", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"spearow", evolve:0, shiny:0, player: 0, remove: 0};
let ekans = {name:"Ekans", pokedex:23, type1:"poison", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"ekans", evolve:0, shiny:0, player: 0, remove: 0};
let arbok = {name:"Arbok", pokedex:24, type1:"poison", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"ekans", evolve:0, shiny:0, player: 0, remove: 0};
let pikachu = {name:"Pikachu", pokedex:25, type1:"electric", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"pikachu", evolve:0, shiny:0, player: 0, remove: 0};
let raichu = {name:"Raichu", pokedex:26, type1:"electric", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"pikachu", evolve:0, shiny:0, player: 0, remove: 0};
let sandshrew = {name:"Sandshrew", pokedex:27, type1:"ground", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"sandshrew", evolve:0, shiny:0, player: 0, remove: 0};
let sandslash = {name:"Sandslash", pokedex:28, type1:"ground", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"sandshrew", evolve:0, shiny:0, player: 0, remove: 0};
let nidoranF = {name:"Nidoran-F", pokedex:29, type1:"poison", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"nidoran-f", evolve:0, shiny:0, player: 0, remove: 0};
let nidorina = {name:"Nidorina", pokedex:30, type1:"poison", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"nidoran-f", evolve:0, shiny:0, player: 0, remove: 0};
let nidoqueen = {name:"Nidoqueen", pokedex:31, type1:"poison", type2:"ground", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:3, line:"nidoran-f", evolve:0, shiny:0, player: 0, remove: 0};
let nidoranM = {name:"Nidoran-M", pokedex:32, type1:"poison", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"nidoran-m", evolve:0, shiny:0, player: 0, remove: 0};
let nidorino = {name:"Nidorino", pokedex:33, type1:"poison", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"nidoran-m", evolve:0, shiny:0, player: 0, remove: 0};
let nidoking = {name:"Nidoking", pokedex:34, type1:"poison", type2:"ground", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:3, line:"nidoran-m", evolve:0, shiny:0, player: 0, remove: 0};
let clefairy = {name:"Clefairy", pokedex:35, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"clefairy", evolve:0, shiny:0, player: 0, remove: 0};
let clefable = {name:"Clefable", pokedex:36, type1:"normal", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"clefairy", evolve:0, shiny:0, player: 0, remove: 0};
let vulpix = {name:"Vulpix", pokedex:37, type1:"fire", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"vulpix", evolve:0, shiny:0, player: 0, remove: 0};
let ninetales = {name:"Ninetales", pokedex:38, type1:"fire", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"vulpix", evolve:0, shiny:0, player: 0, remove: 0};
let jigglypuff = {name:"Jigglypuff", pokedex:39, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"jigglypuff", evolve:0, shiny:0, player: 0, remove: 0};
let wigglytuff = {name:"Wigglytuff", pokedex:40, type1:"normal", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"jigglypuff", evolve:0, shiny:0, player: 0, remove: 0};
let zubat = {name:"Zubat", pokedex:41, type1:"poison", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"zubat", evolve:0, shiny:0, player: 0, remove: 0};
let golbat = {name:"Golbat", pokedex:42, type1:"poison", type2:"flying", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"zubat", evolve:0, shiny:0, player: 0, remove: 0};
let oddish = {name:"Oddish", pokedex:43, type1:"grass", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"oddish", evolve:0, shiny:0, player: 0, remove: 0};
let gloom = {name:"Gloom", pokedex:44, type1:"grass", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"oddish", evolve:0, shiny:0, player: 0, remove: 0};
let vileplume = {name:"Vileplume", pokedex:45, type1:"grass", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"oddish", evolve:0, shiny:0, player: 0, remove: 0};
let paras = {name:"Paras", pokedex:46, type1:"bug", type2:"grass", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"paras", evolve:0, shiny:0, player: 0, remove: 0};
let parasect = {name:"Parasect", pokedex:47, type1:"bug", type2:"grass", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"paras", evolve:0, shiny:0, player: 0, remove: 0};
let venonat = {name:"Venonat", pokedex:48, type1:"bug", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:1, line:"venonat", evolve:0, shiny:0, player: 0, remove: 0};
let venomoth = {name:"Venomoth", pokedex:49, type1:"bug", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"venonat", evolve:0, shiny:0, player: 0, remove: 0};
let diglett = {name:"Diglett", pokedex:50, type1:"ground", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"diglett", evolve:0, shiny:0, player: 0, remove: 0};
let dugtrio = {name:"Dugtrio", pokedex:51, type1:"ground", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:2, line:"diglett", evolve:0, shiny:0, player: 0, remove: 0};
let meowth = {name:"Meowth", pokedex:52, type1:"normal", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"meowth", evolve:0, shiny:0, player: 0, remove: 0};
let persian = {name:"Persian", pokedex:53, type1:"normal", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:2, line:"meowth", evolve:0, shiny:0, player: 0, remove: 0};
let psyduck = {name:"Psyduck", pokedex:54, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"psyduck", evolve:0, shiny:0, player: 0, remove: 0};
let golduck = {name:"Golduck", pokedex:55, type1:"water", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:2, line:"psyduck", evolve:0, shiny:0, player: 0, remove: 0};
let mankey = {name:"Mankey", pokedex:56, type1:"fight", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"mankey", evolve:0, shiny:0, player: 0, remove: 0};
let primeape = {name:"Primeape", pokedex:57, type1:"fight", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:2, line:"mankey", evolve:0, shiny:0, player: 0, remove: 0};
let growlithe = {name:"Growlithe", pokedex:58, type1:"fire", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"growlithe", evolve:0, shiny:0, player: 0, remove: 0};
let arcanine = {name:"Arcanine", pokedex:59, type1:"fire", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:2, line:"growlithe", evolve:0, shiny:0, player: 0, remove: 0};
let poliwag = {name:"Poliwag", pokedex:60, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"poliwag", evolve:0, shiny:0, player: 0, remove: 0};
let poliwhirl = {name:"Poliwhirl", pokedex:61, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"poliwag", evolve:0, shiny:0, player: 0, remove: 0};
let poliwrath = {name:"Poliwrath", pokedex:62, type1:"water", type2:"fight", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"poliwag", evolve:0, shiny:0, player: 0, remove: 0};
let abra = {name:"Abra", pokedex:63, type1:"psychic", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"abra", evolve:0, shiny:0, player: 0, remove: 0};
let kadabra = {name:"Kadabra", pokedex:64, type1:"psychic", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"abra", evolve:0, shiny:0, player: 0, remove: 0};
let alakazam = {name:"Alakazam", pokedex:65, type1:"psychic", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"abra", evolve:0, shiny:0, player: 0, remove: 0};
let machop = {name:"Machop", pokedex:66, type1:"fight", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"machop", evolve:0, shiny:0, player: 0, remove: 0};
let machoke = {name:"Machoke", pokedex:67, type1:"fight", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"machop", evolve:0, shiny:0, player: 0, remove: 0};
let machamp = {name:"Machamp", pokedex:68, type1:"fight", type2:"none", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"machop", evolve:0, shiny:0, player: 0, remove: 0};
let bellsprout = {name:"Bellsprout", pokedex:69, type1:"grass", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"bellsprout", evolve:0, shiny:0, player: 0, remove: 0};
let weepinbell = {name:"Weepinbell", pokedex:70, type1:"grass", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"bellsprout", evolve:0, shiny:0, player: 0, remove: 0};
let victreebel = {name:"Victreebel", pokedex:71, type1:"grass", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"bellsprout", evolve:0, shiny:0, player: 0, remove: 0};
let tentacool = {name:"Tentacool", pokedex:72, type1:"water", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"tentacool", evolve:0, shiny:0, player: 0, remove: 0};
let tentacruel = {name:"Tentacruel", pokedex:73, type1:"water", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"tentacool", evolve:0, shiny:0, player: 0, remove: 0};
let geodude = {name:"Geodude", pokedex:74, type1:"rock", type2:"ground", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"geodude", evolve:0, shiny:0, player: 0, remove: 0};
let graveler = {name:"Graveler", pokedex:75, type1:"rock", type2:"ground", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"geodude", evolve:0, shiny:0, player: 0, remove: 0};
let golem = {name:"Golem", pokedex:76, type1:"rock", type2:"ground", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"geodude", evolve:0, shiny:0, player: 0, remove: 0};
let ponyta = {name:"Ponyta", pokedex:77, type1:"fire", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"ponyta", evolve:0, shiny:0, player: 0, remove: 0};
let rapidash = {name:"Rapidash", pokedex:78, type1:"fire", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"ponyta", evolve:0, shiny:0, player: 0, remove: 0};
let slowpoke = {name:"Slowpoke", pokedex:79, type1:"water", type2:"psychic", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"slowpoke", evolve:0, shiny:0, player: 0, remove: 0};
let slowbro = {name:"Slowbro", pokedex:80, type1:"water", type2:"psychic", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"slowpoke", evolve:0, shiny:0, player: 0, remove: 0};
let magnemite = {name:"Magnemite", pokedex:81, type1:"electric", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"magnemite", evolve:0, shiny:0, player: 0, remove: 0};
let magneton = {name:"Magneton", pokedex:82, type1:"electric", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"magnemite", evolve:0, shiny:0, player: 0, remove: 0};
let farfetchd = {name:"Farfetchd", pokedex:83, type1:"normal", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"farfetchd", evolve:0, shiny:0, player: 0, remove: 0};
let doduo = {name:"Doduo", pokedex:84, type1:"normal", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"doduo", evolve:0, shiny:0, player: 0, remove: 0};
let dodrio = {name:"Dodrio", pokedex:85, type1:"normal", type2:"flying", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"doduo", evolve:0, shiny:0, player: 0, remove: 0};
let seel = {name:"Seel", pokedex:86, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"seel", evolve:0, shiny:0, player: 0, remove: 0};
let dewgong = {name:"Dewgong", pokedex:87, type1:"water", type2:"ice", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"seel", evolve:0, shiny:0, player: 0, remove: 0};
let grimer = {name:"Grimer", pokedex:88, type1:"poison", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"grimer", evolve:0, shiny:0, player: 0, remove: 0};
let muk = {name:"Muk", pokedex:89, type1:"poison", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"grimer", evolve:0, shiny:0, player: 0, remove: 0};
let shellder = {name:"Shellder", pokedex:90, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"shellder", evolve:0, shiny:0, player: 0, remove: 0};
let cloyster = {name:"Cloyster", pokedex:91, type1:"water", type2:"ice", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"shellder", evolve:0, shiny:0, player: 0, remove: 0};
let gastly = {name:"Gastly", pokedex:92, type1:"ghost", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"gastly", evolve:0, shiny:0, player: 0, remove: 0};
let haunter = {name:"Haunter", pokedex:93, type1:"ghost", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"gastly", evolve:0, shiny:0, player: 0, remove: 0};
let gengar = {name:"Gengar", pokedex:94, type1:"ghost", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"gastly", evolve:0, shiny:0, player: 0, remove: 0};
let onix = {name:"Onix", pokedex:95, type1:"rock", type2:"ground", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"onix", evolve:0, shiny:0, player: 0, remove: 0};
let drowzee = {name:"Drowzee", pokedex:96, type1:"psychic", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"drowzee", evolve:0, shiny:0, player: 0, remove: 0};
let hypno = {name:"Hypno", pokedex:97, type1:"psychic", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"drowzee", evolve:0, shiny:0, player: 0, remove: 0};
let krabby = {name:"Krabby", pokedex:98, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"krabby", evolve:0, shiny:0, player: 0, remove: 0};
let kingler = {name:"Kingler", pokedex:99, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"krabby", evolve:0, shiny:0, player: 0, remove: 0};
let voltorb = {name:"Voltorb", pokedex:100, type1:"electric", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"voltorb", evolve:0, shiny:0, player: 0, remove: 0};
let electrode = {name:"Electrode", pokedex:101, type1:"electric", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"voltorb", evolve:0, shiny:0, player: 0, remove: 0};
let exeggcute = {name:"Exeggcute", pokedex:102, type1:"grass", type2:"psychic", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"exeggcute", evolve:0, shiny:0, player: 0, remove: 0};
let exeggutor = {name:"Exeggutor", pokedex:103, type1:"grass", type2:"psychic", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"exeggcute", evolve:0, shiny:0, player: 0, remove: 0};
let cubone = {name:"Cubone", pokedex:104, type1:"ground", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"cubone", evolve:0, shiny:0, player: 0, remove: 0};
let marowak = {name:"Marowak", pokedex:105, type1:"ground", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"cubone", evolve:0, shiny:0, player: 0, remove: 0};
let hitmonlee = {name:"Hitmonlee", pokedex:106, type1:"fight", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"hitmonlee", evolve:0, shiny:0, player: 0, remove: 0};
let hitmonchan = {name:"Hitmonchan", pokedex:107, type1:"fight", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:1, line:"hitmonchan", evolve:0, shiny:0, player: 0, remove: 0};
let lickitung = {name:"Lickitung", pokedex:108, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"lickitung", evolve:0, shiny:0, player: 0, remove: 0};
let koffing = {name:"Koffing", pokedex:109, type1:"poison", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"koffing", evolve:0, shiny:0, player: 0, remove: 0};
let weezing = {name:"Weezing", pokedex:110, type1:"poison", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"koffing", evolve:0, shiny:0, player: 0, remove: 0};
let rhyhorn = {name:"Rhyhorn", pokedex:111, type1:"ground", type2:"rock", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"rhyhorn", evolve:0, shiny:0, player: 0, remove: 0};
let rhydon = {name:"Rhydon", pokedex:112, type1:"ground", type2:"rock", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"rhyhorn", evolve:0, shiny:0, player: 0, remove: 0};
let chansey = {name:"Chansey", pokedex:113, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"chansey", evolve:0, shiny:0, player: 0, remove: 0};
let tangela = {name:"Tangela", pokedex:114, type1:"grass", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"tangela", evolve:0, shiny:0, player: 0, remove: 0};
let kangaskhan = {name:"Kangaskhan", pokedex:115, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"kangaskhan", evolve:0, shiny:0, player: 0, remove: 0};
let horsea = {name:"Horsea", pokedex:116, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"horsea", evolve:0, shiny:0, player: 0, remove: 0};
let seadra = {name:"Seadra", pokedex:117, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"horsea", evolve:0, shiny:0, player: 0, remove: 0};
let goldeen = {name:"Goldeen", pokedex:118, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"goldeen", evolve:0, shiny:0, player: 0, remove: 0};
let seaking = {name:"Seaking", pokedex:119, type1:"water", type2:"none", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"goldeen", evolve:0, shiny:0, player: 0, remove: 0};
let staryu = {name:"Staryu", pokedex:120, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"staryu", evolve:0, shiny:0, player: 0, remove: 0};
let starmie = {name:"Starmie", pokedex:121, type1:"water", type2:"psychic", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"staryu", evolve:0, shiny:0, player: 0, remove: 0};
let mrmime = {name:"Mr-Mime", pokedex:122, type1:"psychic", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"mrmime", evolve:0, shiny:0, player: 0, remove: 0};
let scyther = {name:"Scyther", pokedex:123, type1:"bug", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"scyther", evolve:0, shiny:0, player: 0, remove: 0};
let jynx = {name:"Jynx", pokedex:124, type1:"ice", type2:"psychic", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"jynx", evolve:0, shiny:0, player: 0, remove: 0};
let electabuzz = {name:"Electabuzz", pokedex:125, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"electabuzz", evolve:0, shiny:0, player: 0, remove: 0};
let magmar = {name:"Magmar", pokedex:126, type1:"fire", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"magmar", evolve:0, shiny:0, player: 0, remove: 0};
let pinsir = {name:"Pinsir", pokedex:127, type1:"bug", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"pinsir", evolve:0, shiny:0, player: 0, remove: 0};
let tauros = {name:"Tauros", pokedex:128, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"tauros", evolve:0, shiny:0, player: 0, remove: 0};
let magikarp = {name:"Magikarp", pokedex:129, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"magikarp", evolve:0, shiny:0, player: 0, remove: 0};
let gyarados = {name:"Gyarados", pokedex:130, type1:"water", type2:"flying", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"magikarp", evolve:0, shiny:0, player: 0, remove: 0};
let lapras = {name:"Lapras", pokedex:131, type1:"water", type2:"ice", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"lapras", evolve:0, shiny:0, player: 0, remove: 0};
let ditto = {name:"Ditto", pokedex:132, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"ditto", evolve:0, shiny:0, player: 0, remove: 0};
let eevee = {name:"Eevee", pokedex:133, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"eevee", evolve:0, shiny:0, player: 0, remove: 0};
let vaporeon = {name:"Vaporeon", pokedex:134, type1:"water", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"eevee", evolve:0, shiny:0, player: 0, remove: 0};
let jolteon = {name:"Jolteon", pokedex:135, type1:"electric", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"eevee", evolve:0, shiny:0, player: 0, remove: 0};
let flareon = {name:"Flareon", pokedex:136, type1:"fire", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"eevee", evolve:0, shiny:0, player: 0, remove: 0};
let porygon = {name:"Porygon", pokedex:137, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"porygon", evolve:0, shiny:0, player: 0, remove: 0};
let omanyte = {name:"Omanyte", pokedex:138, type1:"rock", type2:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"omanyte", evolve:0, shiny:0, player: 0, remove: 0};
let omastar = {name:"Omastar", pokedex:139, type1:"rock", type2:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"omanyte", evolve:0, shiny:0, player: 0, remove: 0};
let kabuto = {name:"Kabuto", pokedex:140, type1:"rock", type2:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"kabuto", evolve:0, shiny:0, player: 0, remove: 0};
let kabutops = {name:"Kabutops", pokedex:141, type1:"rock", type2:"water", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:2, line:"kabuto", evolve:0, shiny:0, player: 0, remove: 0};
let aerodactyl = {name:"Aerodactyl", pokedex:142, type1:"rock", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"lapras", evolve:0, shiny:0, player: 0, remove: 0};
let snorlax = {name:"Snorlax", pokedex:143, type1:"normal", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"snorlax", evolve:0, shiny:0, player: 0, remove: 0};
let articuno = {name:"Articuno", pokedex:144, type1:"ice", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"articuno", evolve:0, shiny:0, player: 0, remove: 0};
let zapdos = {name:"Zapdos", pokedex:145, type1:"electric", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"zapdos", evolve:0, shiny:0, player: 0, remove: 0};
let moltres = {name:"Moltres", pokedex:146, type1:"flying", type2:"flying", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"moltres", evolve:0, shiny:0, player: 0, remove: 0};
let dratini = {name:"Dratini", pokedex:147, type1:"ghost", type2:"poison", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"dratini", evolve:0, shiny:0, player: 0, remove: 0};
let dragonair = {name:"Dragonair", pokedex:148, type1:"ghost", type2:"poison", level:6, levelPlus:0, base:7, basePlus:0, exp:6, expPlus:0, stage:2, line:"dratini", evolve:0, shiny:0, player: 0, remove: 0};
let dragonite = {name:"Dragonite", pokedex:149, type1:"ghost", type2:"poison", level:8, levelPlus:0, base:9, basePlus:0, exp:8, expPlus:0, stage:3, line:"dratini", evolve:0, shiny:0, player: 0, remove: 0};
let mewtwo = {name:"Mewtwo", pokedex:150, type1:"psychic", type2:"none", level:4, levelPlus:0, base:5, basePlus:0, exp:4, expPlus:0, stage:1, line:"mewtwo", evolve:0, shiny:0, player: 0, remove: 0};


function onPageLoad() {
    // push pokemon variable objects to all array
    populateAll();
    // populate dropdown with name attribute of all objects in all array
    populateDropdown();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function populateAll() {
    all.push(bulbasaur, ivysaur, venusaur, squirtle, wartortle, blastoise, charmander, charmeleon, charizard, 
        caterpie, metapod, butterfree, weedle, kakuna, beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate,
        spearow, fearow, ekans, arbok, pikachu, raichu, sandshrew, sandslash, nidoranF, nidorina, nidoqueen,
        nidoranM, nidorino, nidoking, clefairy, clefable, vulpix, ninetales, jigglypuff, wigglytuff, zubat, golbat,
        oddish, gloom, vileplume, paras, parasect, venonat, venomoth, diglett, dugtrio, meowth, persian, psyduck, 
        golduck, mankey, primeape, growlithe, arcanine, poliwag, poliwhirl, poliwrath, abra, kadabra, alakazam,
        machop, machoke, machamp, bellsprout, weepinbell, victreebel, tentacool, tentacruel, geodude, graveler,
        golem, ponyta, rapidash, slowpoke, slowbro, magnemite, magneton, farfetchd, doduo, dodrio, seel,
        dewgong, grimer, muk, shellder, cloyster, gastly, haunter, gengar, onix, drowzee, hypno, krabby, kingler,
        voltorb, electrode, exeggcute, exeggutor, cubone, marowak, hitmonlee, hitmonchan, lickitung, koffing,
        weezing, rhyhorn, rhydon, chansey, tangela, kangaskhan, horsea, seadra, goldeen, seaking, staryu, starmie,
        mrmime, scyther, jynx, electabuzz, magmar, pinsir, tauros, magikarp, gyarados, lapras, ditto, eevee,
        vaporeon, jolteon, flareon, porygon, omanyte, omastar, kabuto, kabutops, aerodactyl, snorlax, articuno,
        zapdos, moltres, dratini, dragonair, dragonite, mewtwo);
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
        obj.stats =  "Lvl: " + level + " Atk: " + base + " Exp: " + exp;
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
        let liSetStats = setStatsComponent(caughtObjects[i]);
        
        // spriteAndStatsLiUl = liExp < ul < li
        ul.appendChild(liSS);
        ul.appendChild(liExp);
        ul.appendChild(liSetStats);
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

    //set liStats attributes
    liStats.setAttribute("class", "li-stats");
    liStats.setAttribute("id", co.name.toLowerCase() + "-li-stats");

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

function setStatsComponent(co) {
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
    returnedLi.setAttribute("class", `setStats-li ${btnShowHideGlobalClass}`);
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
    ul.setAttribute("id", (co.name).toLowerCase() + "-setStats-li-ul");
    ul.setAttribute("class", "setStats-li-ul");
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
    console.log(parseInt(amount));
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

function hideShowSetStats() {
    let btnHideShowSetStats = document.getElementById('hideShowSetStats');

    if (btnShowHideGlobalClass == "btnHide") {
        btnShowHideGlobalClass = "btnShow";
        btnHideShowSetStats.innerHTML = "Hide Set Stats";
    }
    else if (btnShowHideGlobalClass == "btnShow") {
        btnShowHideGlobalClass = "btnHide";
        btnHideShowSetStats.innerHTML = "Show Set Stats";
    }

    // rebuild caught object array for captured pokemon
    buildCaughtObjects();
    buildCaughtObjects();
    // add caught pokemon to visible list
    addToFullList();
    // check for empty all/remove arrays
    checkEmptyArray();
}