const cards = document.querySelectorAll(".card");
const time = document.querySelector(".time span b");
const flips = document.querySelector(".flips span b");
const refreshBtn =document.querySelector(".details button");

let matchedCard = 0;
let cardOne, cardTwo,progress;
let disableDeck = false;
let isPlaying = false;
let startTime = 20;
let endTime = 0;
let flipCount = 0;

// adding the time to the timer
function timer(){
    
        startTime--;
        time.textContent = `${startTime}`;
        if(startTime == endTime){
         return clearInterval(progress);
        }
     
}

function flipCard(e) {
    clickedCard = e.target;
    //Timer should be initiated once
    if(!isPlaying) {
        isPlaying = true;
        progress = setInterval(timer,1000);
    }

    if (clickedCard !== cardOne && !disableDeck && startTime>0) {//to stop the flipCard function in 0s condition startTime>0
        clickedCard.classList.add("flip");
        flipCount++;//Counting the number of flips
        flips.textContent = `${flipCount}`;// Adding the number of flips
        if (!cardOne) {
            //return the cardOne value to the clicked card
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
            matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){
    if(img1 == img2){
        //if two cards are matched
        matchedCard++;//increment matchedCard by 1
        if(matchedCard == 6){
            return clearInterval(progress);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    
    //if two cards are not matched
    setTimeout(()=>{
        //adding shake class to both cards after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
    },400);

    setTimeout(()=>{
        //removing both shake and flip classes from both card after 1.2seconds
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; //Setting both card value to blank
    disableDeck = false;
    },1200);
}

function shuffleCard(){
    matchCard = 0;
    cardOne = cardTwo = "";
    flipCount = 0;
    flips.textContent = flipCount;
    startTime = 20;
    time.textContent = startTime;
    clearInterval(progress);
    disableDeck = isPlaying = false;
    let arr =[1,2,3,4,5,6,1,2,3,4,5,6]
    arr.sort(() => Math.random() > 0.5 ? 1 :-1); //sorting array item randomly
    //removing flip class from all cards and passing random image to each card
    cards.forEach((card,index) => {
        card.classList.remove("flip")
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}



shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {//adding click event to all cards
    card.addEventListener("click", flipCard);
});