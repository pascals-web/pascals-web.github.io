document.cookie.split(";").forEach(function(c) {
    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
});

function rollDice(diceElements, diceImages) {
    const finalResults = diceElements.map(() => Math.floor(Math.random() * 6));
    const intervalTime = 170;
    const rollTimes = 10;
    let currentRoll = 0;

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
            diceElements.forEach((dice, index) => {
                dice.src = diceImages[index][finalResults[index]];
            });

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

function rollSpecialDice(diceSet) {
    const diceSets = {
        meteors: [
            ['/images/meteors/direction/dice1.png', '/images/meteors/direction/dice2.png', '/images/meteors/direction/dice3.png', '/images/meteors/direction/dice4.png', '/images/meteors/direction/dice5.png', '/images/meteors/direction/dice6.png'],
            ['/images/meteors/strength/dice1.png', '/images/meteors/strength/dice2.png', '/images/meteors/strength/dice3.png', '/images/meteors/strength/dice4.png', '/images/meteors/strength/dice5.png', '/images/meteors/strength/dice6.png']
        ],
        lava: [
            ['/images/lava/dice1.png', '/images/lava/dice2.png', '/images/lava/dice3.png', '/images/lava/dice4.png', '/images/lava/dice5.png', '/images/lava/dice6.png'],
            ['/images/lava/dice1.png', '/images/lava/dice2.png', '/images/lava/dice3.png', '/images/lava/dice4.png', '/images/lava/dice5.png', '/images/lava/dice6.png']
        ]
    };

    const diceElements = document.querySelectorAll(`.dice-wrapper img[data-dice-set="${diceSet}"]`);

    rollDice(Array.from(diceElements), diceSets[diceSet]);
}

function handleExpansionChange() {
    document.querySelectorAll('.dice-checkbox').forEach(checkbox => {
        const diceSet = checkbox.getAttribute('data-dice-set');
        const diceContainer = document.querySelector(`#${diceSet}Dice`);
        const button = document.querySelector(`.${diceSet}-button`);

        if (checkbox.checked) {
            diceContainer.style.display = 'flex';
            button.style.display = 'inline-block';
        } else {
            diceContainer.style.display = 'none';
            button.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.roll-button').addEventListener('click', rollNormalDice);
    document.querySelector('.meteor-button').addEventListener('click', () => rollSpecialDice('meteors'));
    document.querySelector('.lava-button').addEventListener('click', () => rollSpecialDice('lava'));
    document.querySelectorAll('.dice-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleExpansionChange);
    });

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
                document.querySelectorAll('.accordion-content').forEach(function(content) {
                    content.style.maxHeight = null;
                });
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
