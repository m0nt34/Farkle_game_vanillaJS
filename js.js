const rollTheDice = document.querySelector(".buttons .roll"),
    bankButton = document.querySelector(".buttons .bankScore"),
    allImages = document.querySelectorAll(".table .dices i"),
    image1 = document.querySelector(".img1"),
    image2 = document.querySelector(".img2"),
    image3 = document.querySelector(".img3"),
    image4 = document.querySelector(".img4"),
    image5 = document.querySelector(".img5"),
    image6 = document.querySelector(".img6"),
    player1Score = document.querySelector(".pl1Score span"),
    player2Score = document.querySelector(".pl2Score span"),
    player1Bank = document.querySelector(".player1Wrapper .bank span"),
    player2Bank = document.querySelector(".player2Wrapper .bank span"),
    player1 = document.querySelector(".wrapper .player1Wrapper .player1"),
    player2 = document.querySelector(".wrapper .player2Wrapper .player2"),
    hotDiceShow = document.querySelector(".hotDiceScreen"),
    farkleScreen = document.querySelector(".farkleScreen");
var IntervalX;
let playerWhoIsPlayingNow,
    playerWhoIsPlayingNowBank,
    saveWhoIsPlayerWhoIsPlayingNowPlayer1 = 0,
    saveWhoIsPlayerWhoIsPlayingNowPlayer2 = 0,
    saveWhoIsPlayerWhoIsPlayingNowSwitch,
    saveMainCurentScore;
player1Bank.innerHTML = 0;
player2Bank.innerHTML = 0;
let differentDatasetValues = 0,
    firstRoll = true,
    hotDiceOutOfDices = false;
let sortValues = [6],
    canSelect,
    maxNumOfSort,
    minNumOfSort,
    savedI;
let countMatchesForScore, saveResultOfCountMatchesForScore;
(sortValues[0] = 0),
    (sortValues[1] = 0),
    (sortValues[2] = 0),
    (sortValues[3] = 0),
    (sortValues[4] = 0),
    (sortValues[5] = 0);
let playing = false,
    randomNum1,
    randomNum2,
    randomNum3,
    randomNum4,
    randomNum5,
    randomNum6;
let set3, fourOfKind, fiveOfKind, sixOfKind, straight, threePairs, twoPairs;
let imgaes = [
    "uil uil-dice-one",
    "uil uil-dice-two",
    "uil uil-dice-three",
    "uil uil-dice-four",
    "uil uil-dice-five",
    "uil uil-dice-six",
];
const disableDices = () => {
    allImages.forEach((img) => {
        img.style.pointerEvents = "none";
        img.style.display = "block";
    });
};
disableDices();
const rollDices = () => {
    if (player1.classList.contains("active")) {
        playerWhoIsPlayingNow = player1Score;
        playerWhoIsPlayingNowBank = player1Bank;
        saveWhoIsPlayerWhoIsPlayingNowSwitch =
            saveWhoIsPlayerWhoIsPlayingNowPlayer1;
    } else if (player2.classList.contains("active")) {
        playerWhoIsPlayingNow = player2Score;
        playerWhoIsPlayingNowBank = player2Bank;
        saveWhoIsPlayerWhoIsPlayingNowSwitch =
            saveWhoIsPlayerWhoIsPlayingNowPlayer2;
    }
    saveWhoIsPlayerWhoIsPlayingNowSwitch = playerWhoIsPlayingNow.innerHTML;
    //console.log(saveWhoIsPlayerWhoIsPlayingNowSwitch,playerWhoIsPlayingNow.innerHTML);
    saveMainCurentScore = saveWhoIsPlayerWhoIsPlayingNowSwitch;

    playing = true;
    offRoll();
    offBank();
    allImages.forEach((img) => {
        if (img.classList.contains("selected")) {
            img.style.display = "none";
        }
    });
    IntervalX = setInterval(() => {
        randomNum1 = Math.floor(Math.random() * 6);
        randomNum2 = Math.floor(Math.random() * 6);
        randomNum3 = Math.floor(Math.random() * 6);
        randomNum4 = Math.floor(Math.random() * 6);
        randomNum5 = Math.floor(Math.random() * 6);
        randomNum6 = Math.floor(Math.random() * 6);
        image1.setAttribute("class", imgaes[randomNum1]);
        image2.setAttribute("class", imgaes[randomNum2]);
        image3.setAttribute("class", imgaes[randomNum3]);
        image4.setAttribute("class", imgaes[randomNum4]);
        image5.setAttribute("class", imgaes[randomNum5]);
        image6.setAttribute("class", imgaes[randomNum6]);
        image1.dataset.value = randomNum1 + 1;
        image2.dataset.value = randomNum2 + 1;
        image3.dataset.value = randomNum3 + 1;
        image4.dataset.value = randomNum4 + 1;
        image5.dataset.value = randomNum5 + 1;
        image6.dataset.value = randomNum6 + 1;
    }, 60);

    setTimeout(() => {
        clearInterval(IntervalX);

        //console.log(randomNum1,randomNum2,randomNum3,randomNum4,randomNum5,randomNum6);

        differentDatasetValues = 0;
        allImages.forEach((img) => {
            if (img.style.display == "none") {
                firstRoll = false;
                differentDatasetValues++;
                img.dataset.value = 0 - differentDatasetValues;
            }
        });
        hotDiceOutOfDices = true;
        allImages.forEach((img) => {
            img.style.pointerEvents = "all";
            if (img.style.display == "block") {
                hotDiceOutOfDices = false;
            }
        });
        if (hotDiceOutOfDices) {
            hotDice();
        }
        combinations();
        //console.log(farkle());
        if (!farkle() && !hotDiceOutOfDices) {
            farkleLose();
        }
    }, 1200);
};
const changePlayersTurn = () => {
    if (player1.classList.contains("active")) {
        player1.classList.remove("active");
        player2.classList.add("active");
    } else if (player2.classList.contains("active")) {
        player2.classList.remove("active");
        player1.classList.add("active");
    }
};
const selectPart = (e) => {
    if (
        (e.target.dataset.value == 5 ||
            e.target.dataset.value == 1 ||
            e.target.dataset.value == canSelect) &&
        playing
    ) {
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected");
        } else {
            e.target.classList.add("selected");
        }
        for (let i = 0; i < 6; i++) {
            if (allImages[i].classList.contains("selected")) {
                if (
                    e.target.dataset.value == canSelect &&
                    canSelect != 5 &&
                    canSelect != 1
                ) {
                    let countSel = 0;
                    allImages.forEach((img) => {
                        if (img.classList.contains("selected")) {
                            countSel++;
                        }
                    });
                    if (countSel >= 3) {
                        onBank();
                        onRoll();
                    } else {
                        offBank();
                        offRoll();
                    }
                } else {
                    onBank();
                    onRoll();
                }
                break;
            } else {
                offBank();
                offRoll();
            }
        }
        countMatchesForScore = 0;
        saveResultOfCountMatchesForScore = 0;
        if (player1.classList.contains("active")) {
            playerWhoIsPlayingNow = player1Score;
            playerWhoIsPlayingNowBank = player1Bank;
            saveWhoIsPlayerWhoIsPlayingNowSwitch =
                saveWhoIsPlayerWhoIsPlayingNowPlayer1;
        } else if (player2.classList.contains("active")) {
            playerWhoIsPlayingNow = player2Score;
            playerWhoIsPlayingNowBank = player2Bank;
            saveWhoIsPlayerWhoIsPlayingNowSwitch =
                saveWhoIsPlayerWhoIsPlayingNowPlayer2;
        }
        playerWhoIsPlayingNow.innerHTML = saveMainCurentScore;

        allImages.forEach((imgs) => {
            if (imgs.classList.contains("selected")) {
                if (imgs.dataset.value == canSelect) {
                    countMatchesForScore++;
                }
                //console.log(countMatchesForScore);
                if (imgs.dataset.value == 5) {
                    playerWhoIsPlayingNow.innerHTML =
                        parseInt(playerWhoIsPlayingNow.innerHTML) + 50 * 1;
                } else if (imgs.dataset.value == 1) {
                    playerWhoIsPlayingNow.innerHTML =
                        parseInt(playerWhoIsPlayingNow.innerHTML) + 100 * 1;
                }
                if (
                    countMatchesForScore == 3 &&
                    canSelect != 1 &&
                    saveResultOfCountMatchesForScore != countMatchesForScore
                ) {
                    playerWhoIsPlayingNow.innerHTML =
                        parseInt(playerWhoIsPlayingNow.innerHTML) +
                        canSelect * 100;
                    if (canSelect == 5) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) - 150 * 1;
                    }
                } else if (
                    countMatchesForScore == 4 &&
                    saveResultOfCountMatchesForScore != countMatchesForScore
                ) {
                    playerWhoIsPlayingNow.innerHTML =
                        parseInt(playerWhoIsPlayingNow.innerHTML) + 1 * 1000;
                    if (canSelect == 5) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) - 550 * 1;
                    } else if (canSelect == 1) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) - 400 * 1;
                    } else if (
                        canSelect == 2 ||
                        canSelect == 3 ||
                        canSelect == 4 ||
                        canSelect == 6
                    ) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) -
                            100 * canSelect;
                    }
                } else if (
                    countMatchesForScore == 5 &&
                    saveResultOfCountMatchesForScore != countMatchesForScore
                ) {
                    playerWhoIsPlayingNow.innerHTML =
                        parseInt(playerWhoIsPlayingNow.innerHTML) + 1 * 2000;
                    if (canSelect == 5) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) -
                            1050 * 1;
                    } else if (canSelect == 1) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) -
                            1100 * 1;
                    } else if (
                        canSelect == 2 ||
                        canSelect == 3 ||
                        canSelect == 4 ||
                        canSelect == 6
                    ) {
                        playerWhoIsPlayingNow.innerHTML =
                            parseInt(playerWhoIsPlayingNow.innerHTML) -
                            1 * 1000 * 1;
                    }
                }
                saveResultOfCountMatchesForScore = countMatchesForScore;
                //console.log(countMatchesForScore);
            }
        });
    }
    saveWhoIsPlayerWhoIsPlayingNowSwitch = playerWhoIsPlayingNow.innerHTML;
    //console.log(saveWhoIsPlayerWhoIsPlayingNowSwitch,playerWhoIsPlayingNow.innerHTML)
};
function combinations() {
    //es mere unda wavshalo
    if (player1.classList.contains("active")) {
        playerWhoIsPlayingNow = player1Score;
        playerWhoIsPlayingNowBank = player1Bank;
        saveWhoIsPlayerWhoIsPlayingNowSwitch =
            saveWhoIsPlayerWhoIsPlayingNowPlayer1;
    } else if (player2.classList.contains("active")) {
        playerWhoIsPlayingNow = player2Score;
        playerWhoIsPlayingNowBank = player2Bank;
        saveWhoIsPlayerWhoIsPlayingNowSwitch =
            saveWhoIsPlayerWhoIsPlayingNowPlayer2;
    }

    // playerWhoIsPlayingNowBank.innerHTML = parseInt(playerWhoIsPlayingNowBank.innerHTML) + parseInt(playerWhoIsPlayingNow.innerHTML);
    //playerWhoIsPlayingNow.innerHTML = 0;
    maxNumOfSort = 0;
    minNumOfSort = 1e9;
    for (let i = 0; i < 6; i++) {
        sortValues[allImages[i].dataset.value - 1]++;
    }
    //console.log("starts here:");
    for (let i = 0; i < 6; i++) {
        if (sortValues[i] >= 3) {
            canSelect = i + 1;
        }
        if (maxNumOfSort <= sortValues[i]) {
            maxNumOfSort = sortValues[i];
        }
        if (minNumOfSort >= sortValues[i] && sortValues[i] != 0) {
            minNumOfSort = sortValues[i];
        }
        // console.log(sortValues[i]+" ");
    }
    hotDiceCombinations();
    for (let i = 0; i < 6; i++) {
        sortValues[i] = 0;
    }
    //console.log(minNumOfSort);
}
const hotDiceCombinations = () => {
    if (maxNumOfSort == 6 && firstRoll) {
        playerWhoIsPlayingNow.innerHTML =
            parseInt(playerWhoIsPlayingNow.innerHTML) + 3000 * 1;
        hotDice();
    } else if (maxNumOfSort == 1 && firstRoll) {
        playerWhoIsPlayingNow.innerHTML =
            parseInt(playerWhoIsPlayingNow.innerHTML) + 1500 * 1;
        hotDice();
    } else if (maxNumOfSort == 2 && minNumOfSort != 1 && firstRoll) {
        playerWhoIsPlayingNow.innerHTML =
            parseInt(playerWhoIsPlayingNow.innerHTML) + 1500 * 1;
        hotDice();
    } else if (
        maxNumOfSort == 4 &&
        minNumOfSort != 1 &&
        sortValues[0] != 3 &&
        sortValues[1] != 3 &&
        sortValues[2] != 3 &&
        sortValues[3] != 3 &&
        sortValues[4] != 3 &&
        sortValues[5] != 3 &&
        firstRoll
    ) {
        playerWhoIsPlayingNow.innerHTML =
            parseInt(playerWhoIsPlayingNow.innerHTML) + 1500 * 1;
        hotDice();
    } else if (
        maxNumOfSort == 3 &&
        minNumOfSort != 1 &&
        sortValues[0] != 2 &&
        sortValues[1] != 2 &&
        sortValues[2] != 2 &&
        sortValues[3] != 2 &&
        sortValues[4] != 2 &&
        sortValues[5] != 2 &&
        firstRoll
    ) {
        playerWhoIsPlayingNow.innerHTML =
            parseInt(playerWhoIsPlayingNow.innerHTML) + 2500 * 1;
        hotDice();
    }
};
const offBank = () => {
    bankButton.style.pointerEvents = "none";
    bankButton.style.opacity = 0.5;
};
const onBank = () => {
    bankButton.style.pointerEvents = "all";
    bankButton.style.opacity = 1;
};
const offRoll = () => {
    rollTheDice.style.pointerEvents = "none";
    rollTheDice.style.opacity = 0.5;
};
const onRoll = () => {
    rollTheDice.style.pointerEvents = "all";
    rollTheDice.style.opacity = 1;
};

const justBank = () => {
    allImages.forEach((img) => {
        img.classList.remove("selected");
        img.style.pointerEvents = "none";
        img.style.display = "block";
    });
    playerWhoIsPlayingNowBank.innerHTML =
        parseInt(playerWhoIsPlayingNowBank.innerHTML) +
        parseInt(playerWhoIsPlayingNow.innerHTML);
    rollTheDice.style.pointerEvents = "all";
    rollTheDice.style.opacity = 1;
    playerWhoIsPlayingNow.innerHTML = 0;
    firstRoll = true;
    changePlayersTurn();
    offBank();
};
const hotDice = () => {
    onBank();
    onRoll();
    allImages.forEach((img) => {
        img.style.display == "block";
    });
    disableDices();
    hotDiceShow.classList.add("show");
    setTimeout(() => {
        hotDiceShow.classList.remove("show");
    }, 2000);
};
const farkleScreenShow = () => {
    farkleScreen.classList.add("show");
    setTimeout(() => {
        farkleScreen.classList.remove("show");
    }, 3000);
};
let farkle = () => {
    let countSel = 0,
        therIsAFiveOrOne = false;
    allImages.forEach((img) => {
        if (img.dataset.value == canSelect) {
            countSel++;
        }
        if (img.dataset.value == 1 || img.dataset.value == 5) {
            therIsAFiveOrOne = true;
        }
    });
    if (therIsAFiveOrOne || countSel >= 3) {
        return true;
    } else {
        return false;
    }
};
const farkleLose = () => {
    saveWhoIsPlayerWhoIsPlayingNowSwitch = 0;
    playerWhoIsPlayingNow.innerHTML = 0 + saveWhoIsPlayerWhoIsPlayingNowSwitch;
    farkleScreenShow();
    offBank();
    setTimeout(() => {
        allImages.forEach((img) => {
            img.style.display = "block";
        });

        changePlayersTurn();
        onRoll();
        offBank();
    }, 3000);
};

offBank();
//combinations();
image1.addEventListener("click", selectPart);
image2.addEventListener("click", selectPart);
image3.addEventListener("click", selectPart);
image4.addEventListener("click", selectPart);
image5.addEventListener("click", selectPart);
image6.addEventListener("click", selectPart);
bankButton.addEventListener("click", justBank);
rollTheDice.addEventListener("click", rollDices);
