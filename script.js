WORDS = "Lips Caterpillar Ants Rainbow Jellyfish Cupcake Seashell Grass Island Coat Bee Eye Lion Car Bus Swimming Pool Boy Knee Bathroom Ball Jacket Flag Ocean Snowflake Football Grapes Bumblebee Music Book Lemon Dragon Dream Eyes Balloon Triangle Sunglasses Zebra Feet Ant Bed Rocket River Candle Float Smile Alligator Bunny Plant Snake Bird Duck Kitten Earth Starfish Ear Monkey Lollipop Sun Branch Blanket Orange Carrot Cube Dinosaur Hippo Candy Jail Cow Drum Hamburger Hat Light Inchworm Snail Cat Shirt Nose Alive Person Jar Tail Motorcycle Whale Zigzag Suitcase Backpack Feather Line Mitten Woman Robot Cheese Chimney Comb Egg Worm Zoo Pizza Fly Pen Coin Apple Baseball Oval Skateboard Frog Spoon Horse Beach Slide Ladybug Mickey Mouse Window Rabbit Helicopter Desk Head Leg Crayon Clock Socks Pants Boat Diamond Bug Ears Box Face Night Square Pie Bear Finger Banana Mouth Nail Cherry Bike Broom Fire Sea Beak Baby Bowl Popsicle Lamp Blocks Bark Elephant Spider Bunk Bed Rock Purse Leaf Ship Spider Web Shoe Kite Mountains Moon Table Rain Sheep Curl Daisy Snowman Train Legs Swing Mountain Cup Truck Flower Glasses Crab Owl Bug Ring Love Lizard Door Heart Button Giraffe Chicken Chair Bridge Key Neck Ghost Computer Bow Bread Corn Ice Cream Cone Water Angel Fork Bone Candy Roof Underwear Ice Cream Drum Spider Shoe Smile Cup Hat Bird Kite Snowman Doll Trash Can Skateboard Sleep Sad Butterfly Cupcake Elephant Ocean Book Egg House Dog Ball Star Shirt Cookie Fish Grapes Socks TV Bed Phone Airplane Nose Eyes Apple Sun Sandwich Cherry Bubble Moon Snow".split(" ")



// get random word function
function getWord(){
    return  WORDS[Math.floor(Math.random() * WORDS.length)];  
}


// set word defenition function on page
WORD_DEF_URL="https://api.dictionaryapi.dev/api/v2/entries/en/"

function setDef(word){
    axios.get(WORD_DEF_URL+word)
    .then(response => {
        document.getElementById("word-defenition").innerHTML=response.data[0].meanings[0].definitions.slice(0,2).map(item => item.definition).join(", ");
    
    })}


// convert api given word into "_" list and update the word ingame
function update_hidden_word(game_word,array){
    let result = [];
    for (let i = 0; i < Array.from(game_word).length; i++) {
        letter = Array.from(game_word)[i].toLowerCase();
        if(array.indexOf(letter) != -1){
            result.push(letter);
        }else{
            result.push("_");
        }}
    result[0]=result[0].toUpperCase();
    document.getElementById("hidden-word").innerHTML = result.join("    ");
}


// update snowman acording to fails number.
function update_snowman(fails){
    const snowman = document.getElementById("snowman");
    if (1 < parseInt(fails) & parseInt(fails) <=10){
        snowman.src=`/static/${parseInt(fails)}.png`;
    }else if (parseInt(fails)==11){
        snowman.src="/static/snowman.png";
    }else{
        snowman.src="";
    }
}

// check game functions
function check_game_status(compare, fails){
    if (compare.indexOf("_") == -1){
        return "You Won!";
    }else if (fails > 11){
        return "You Lost";
    }
}

// end game functions
function end_game(status){
    document.getElementById("result-window").style.display="block";
    document.getElementById("keyboard-div").style.display="none";
    document.getElementById("result").innerHTML=status;
}


// main game
function startGame(){
    document.getElementById("menu").style.display="none";
    document.getElementById("main-game").style.display="block";
    document.getElementById("result-window").style.display="none";
    document.getElementById('keyboard-div').innerHTML='';
    document.getElementById("keyboard-div").style.display="inline-block";
    let userGuess = new Array;
    let fails = 0;
    update_snowman(fails);
    let game_word = getWord();
    setDef(game_word);
    update_hidden_word(game_word,userGuess);
    let compare = document.getElementById("hidden-word").innerHTML;
    const keyboardDiv = document.getElementById("keyboard-div");
    let letters = "abcdefghijklmnopqrstuvwxyz";
    for (let index = 0; index < letters.length; index++) {
        let button = document.createElement("button");
        button.innerHTML=letters[index];
        button.className="key-button";
        button.addEventListener("click",()=>{
            button.disabled=true;
            userGuess.push(button.innerHTML);
            update_hidden_word(game_word,userGuess);
            if (compare == document.getElementById("hidden-word").innerHTML){
                fails+=1;
            }
            compare = document.getElementById("hidden-word").innerHTML;
            if (check_game_status(compare,fails)) {
                end_game(check_game_status(compare,fails));
            }
            update_snowman(fails);
            console.log({'Current Word':game_word,'User Gusess':userGuess,'fails':fails});
        })
        keyboardDiv.appendChild(button);
    }
}



// start-button Event
document.getElementById("start-button").addEventListener("click",()=>{
    startGame()
})

// restart-icon event
document.getElementById("restart-icon").addEventListener("click",()=>{
    startGame()
})
