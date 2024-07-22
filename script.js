document.cookie.split(";").forEach(function(c) {
    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
});

function rollDice(diceElements, diceImages) {
    const finalResults = diceElements.map(() => Math.floor(Math.random() * 6));
    const intervalTime = 170; //Math.random() * (200 - 150) + 150; // Random time between 100ms and 200ms
    const rollTimes = 10; //Math.floor(Math.random() * 9) + 4; // Random number between 2 and 10
    let currentRoll = 0;

    // Start wiggle animation
    diceElements.forEach(dice => {
        dice.parentElement.classList.add('wiggling');
    });

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

            // Stop wiggle animation after 2 seconds
            setTimeout(() => {
                diceElements.forEach(dice => {
                    dice.parentElement.classList.remove('wiggling');
                });
            }, 600);
        }
    }, intervalTime);
}

function rollNormalDice() {
    const diceImagesBase = [
        '/images/BaseDice/dice1.png',
        '/images/BaseDice/dice2.png',
        '/images/BaseDice/dice3.png',
        '/images/BaseDice/dice4.png',
        '/images/BaseDice/dice5.png',
        '/images/BaseDice/dice6.png'
    ];
    const diceImagesSpecial = [
        '/images/BaseDiceSpecial/dice1.png',
        '/images/BaseDiceSpecial/dice2.png',
        '/images/BaseDiceSpecial/dice3.png',
        '/images/BaseDiceSpecial/dice4.png',
        '/images/BaseDiceSpecial/dice5.png',
        '/images/BaseDiceSpecial/dice6.png'
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
        '/images/meteors/direction/dice1.png',
        '/images/meteors/direction/dice2.png',
        '/images/meteors/direction/dice3.png',
        '/images/meteors/direction/dice4.png',
        '/images/meteors/direction/dice5.png',
        '/images/meteors/direction/dice6.png'
    ];
    const diceImagesMeteorStrength = [
        '/images/meteors/strength/dice1.png',
        '/images/meteors/strength/dice2.png',
        '/images/meteors/strength/dice3.png',
        '/images/meteors/strength/dice4.png',
        '/images/meteors/strength/dice5.png',
        '/images/meteors/strength/dice6.png'
    ];

    const diceElements = [
        document.getElementById('dice5'),
        document.getElementById('dice6')
    ];

    const diceImages = [diceImagesMeteorDirection, diceImagesMeteorStrength];

    rollDice(diceElements, diceImages);
}

function handleExpansionChange() {
    const meteorCheckbox = document.getElementById('meteorCheckbox');
    const meteorDice = document.getElementById('meteorDice');
    const meteorButton = document.querySelector('.meteor-button');

    if (meteorCheckbox.checked) {
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
    document.getElementById('meteorCheckbox').addEventListener('change', handleExpansionChange);
    
    // Call handleExpansionChange initially to set the correct state
    handleExpansionChange();
});

document.addEventListener('DOMContentLoaded', function() {
    var accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                // Close all open accordions
                document.querySelectorAll('.accordion-content').forEach(function(content) {
                    content.style.maxHeight = null;
                });
                // Open the clicked accordion
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
