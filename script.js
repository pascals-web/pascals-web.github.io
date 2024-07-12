function rollDice(diceElements, diceImages) {
    const finalResults = diceElements.map(() => Math.floor(Math.random() * 6));
    const intervalTime = Math.random() * (200 - 100) + 100; // Random time between 60ms and 200ms
    const rollTimes = Math.floor(Math.random() * 9) + 2; // Random number between 2 and 10
    let currentRoll = 0;

    const intervalId = setInterval(() => {
        diceElements.forEach((dice, index) => {
            const randomFace = Math.floor(Math.random() * 6);
            dice.src = diceImages[index][randomFace];
        });

        currentRoll++;
        if (currentRoll >= rollTimes) {
            clearInterval(intervalId);
            // Set final results
            diceElements.forEach((dice, index) => {
                dice.src = diceImages[index][finalResults[index]];
            });
        }
    }, intervalTime);
}

function rollNormalDice() {
    const diceImagesBase = [
        'images/BaseDice/dice1.png',
        'images/BaseDice/dice2.png',
        'images/BaseDice/dice3.png',
        'images/BaseDice/dice4.png',
        'images/BaseDice/dice5.png',
        'images/BaseDice/dice6.png'
    ];
    const diceImagesSpecial = [
        'images/BaseDiceSpecial/dice1.png',
        'images/BaseDiceSpecial/dice2.png',
        'images/BaseDiceSpecial/dice3.png',
        'images/BaseDiceSpecial/dice4.png',
        'images/BaseDiceSpecial/dice5.png',
        'images/BaseDiceSpecial/dice6.png'
    ];

    const diceElements = [
        document.getElementById('dice1'),
        document.getElementById('dice2'),
        document.getElementById('dice3'),
        document.getElementById('dice4')
    ];

    const diceImages = [diceImagesBase, diceImagesBase, diceImagesBase, diceImagesSpecial];

    rollDice(diceElements, diceImages);
}

function rollMeteorDice() {
    const diceImagesMeteorDirection = [
        'images/meteors/direction/Dice1.png',
        'images/meteors/direction/Dice2.png',
        'images/meteors/direction/Dice3.png',
        'images/meteors/direction/Dice4.png',
        'images/meteors/direction/Dice5.png',
        'images/meteors/direction/Dice6.png'
    ];
    const diceImagesMeteorStrength = [
        'images/meteors/strength/Dice1.png',
        'images/meteors/strength/Dice2.png',
        'images/meteors/strength/Dice3.png',
        'images/meteors/strength/Dice4.png',
        'images/meteors/strength/Dice5.png',
        'images/meteors/strength/Dice6.png'
    ];

    const diceElements = [
        document.getElementById('dice5'),
        document.getElementById('dice6')
    ];

    const diceImages = [diceImagesMeteorDirection, diceImagesMeteorStrength];

    rollDice(diceElements, diceImages);
}

function handleExpansionChange() {
    const expansionSelect = document.getElementById('expansionSelect');
    const meteorDice = document.getElementById('meteorDice');
    const meteorButton = document.querySelector('.meteor-button');

    if (expansionSelect.value === 'meteors') {
        meteorDice.style.display = 'flex';
        meteorButton.style.display = 'inline-block';
    } else {
        meteorDice.style.display = 'none';
        meteorButton.style.display = 'none';
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.roll-button').addEventListener('click', rollNormalDice);
    document.querySelector('.meteor-button').addEventListener('click', rollMeteorDice);
    document.getElementById('expansionSelect').addEventListener('change', handleExpansionChange);
});