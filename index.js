// set the Name of the player
document.querySelector(".control-button span").onclick = function(){

    let yourName = prompt("What is your name?");

    if (yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = "Unknown";

    }else{

        document.querySelector(".name span").innerHTML = yourName;

    }

    // remove the start game button 
    document.querySelector(".control-button").remove();

}

let changeColorTheme = document.querySelector('.change-theme .one');

// change the theme of the game
changeColorTheme.addEventListener('click',blackTheme)

// Black theme
function blackTheme(){
    document.querySelector('.one div').classList.remove('white');
    document.querySelector('.one div').classList.add('blue');
    document.body.classList.add('body-black');
}


let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-block');

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

console.log(orderRange)

// add the order css propety to the blocks
blocks.forEach((block, index) =>{

    block.style.order = orderRange[index];

    // when click on every images
    block.addEventListener('click', function(){

        // trigger the flipBlock function
        flipBlock(block);

    })

})

// the shuffle function
function shuffle(Array){

    let current = Array.length,
    temp,
    random;

    while (current > 0){

        random = Math.floor(Math.random() * 20);

        current--;

        // current element in the case
        temp = Array[current];

        // current element equal random element  
        Array[current] = Array[random];

        // random element equal the element in the case
        Array[random] = temp;

    }

    return Array;

}

function flipBlock(selectedBlock){

    // add the is-flipped class to the image 
    selectedBlock.classList.add('is-flipped')

    // collect all the flipped card
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        console.log('how are you?');

        // stop clicking function
        stopClicking();

        // the checkMatchedBlocks function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

// the stopClicking function
function stopClicking(){

    // add the no-clicking class to the main container of images
    blocksContainer.classList.add('no-clicking');

    // set the time to return selecting the Image
    setTimeout(()=>{
        
        blocksContainer.classList.remove('no-clicking');

    },duration)

}

// the checkMatchedBlocks function
function checkMatchedBlocks(firstImage, secondImage){

    // the Number of wrong tries
    let triesElement = document.querySelector('.tries span');

    if (firstImage.dataset.technology === secondImage.dataset.technology){

        // remove the is-flipped class
        firstImage.classList.remove('is-flipped');
        secondImage.classList.remove('is-flipped');

        // add the is-flipped class
        firstImage.classList.add('has-match');
        secondImage.classList.add('has-match');

    }else{

        // increase the number of wrong tries
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;


        setTimeout(()=>{

            firstImage.classList.remove('is-flipped');
            secondImage.classList.remove('is-flipped');

        }, duration);

    }

}