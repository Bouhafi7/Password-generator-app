let bar = document.querySelector('.bar');
let range = document.querySelector('.range');
let passLength = document.querySelector('.length');

const rangeValue = () => {
    passLength.innerText = range.value;
    bar.style.width = `${passLength.innerText * 5}%`;
}

range.addEventListener('input', rangeValue);
rangeValue();

let uppCheck = document.querySelector('.uppercase-checkbox');
let lowCheck = document.querySelector('.lowercase-checkbox');
let numCheck = document.querySelector('.numbers-checkbox');
let symbCheck = document.querySelector('.symbols-checkbox');
let generate = document.querySelector('.generate');

const charactersSets = {
    uppercase: ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 26],
    lowercase: ['abcdefghijklmnopqrstuvwxyz', 26],
    numbers: ['1234567890', 10],
    symbols: ['#$%()!?@&^', 10]
};


let boxes = document.querySelectorAll("input[type='checkbox']");
let password = document.querySelector('.password');
let bars = document.querySelectorAll('.bars');
let state = document.querySelector('.state');


const resetBars = () => {
    bars.forEach(bar => {
        bar.style.backgroundColor = 'transparent';
        bar.style.borderColor = '#FFF';
    });
}

const calcStrength = (charStrength) => {
    let strength = Math.floor(passLength.innerText * Math.log2(charStrength));
    styleBras(strength);
};


const styleBras = (strength) => {
    resetBars();
    if(strength < 25) {
        bars[0].style.backgroundColor = 'hsl(0, 91%, 63%)';
        bars[0].style.borderColor = 'hsl(0, 91%, 63%)';
        state.innerText = 'too weak';
    } else if (strength >= 25 && strength < 50) {
        bars[0].style.backgroundColor = 'hsl(13, 95%, 66%)';
        bars[0].style.borderColor = 'hsl(13, 95%, 66%)';
        bars[1].style.backgroundColor = 'hsl(13, 95%, 66%)';
        bars[1].style.borderColor = 'hsl(13, 95%, 66%)';
        state.innerText = 'weak';
    } else if (strength >= 50 && strength < 75) {
        bars[0].style.backgroundColor = 'hsl(42, 91%, 68%)';
        bars[0].style.borderColor = 'hsl(42, 91%, 68%)';
        bars[1].style.backgroundColor = 'hsl(42, 91%, 68%)';
        bars[1].style.borderColor = 'hsl(42, 91%, 68%)';
        bars[2].style.backgroundColor = 'hsl(42, 91%, 68%)';
        bars[2].style.borderColor = 'hsl(42, 91%, 68%)';
        state.innerText = 'medium';
    } else {
        bars.forEach(bar => {
            bar.style.backgroundColor = 'hsl(127, 100%, 82%)';
            bar.style.borderColor = 'hsl(127, 100%, 82%)';
            state.innerText = 'strong';
        });
    }
}

const generatePassword = () => {
    let includeSets = [];
    let charStrength = 0;
    let randomPass = '';

    boxes.forEach(box => {
        if (box.checked) {
            password.style.color = '#FFF';
            includeSets.push(charactersSets[box.value][0]);
            charStrength += charactersSets[box.value][1];
        }
    });

    if (includeSets) {
        for (let i = 0; i < passLength.innerText; i++) {
            let randSetIndex = Math.floor(Math.random() * includeSets.length);
            let randSet = includeSets[randSetIndex];
            
            let randCharIndex = Math.floor(Math.random() * randSet.length);
            let randChar = randSet[randCharIndex];
            
            randomPass += randChar;
        }
    }
    calcStrength(charStrength);
    password.innerText = randomPass;
};

generate.addEventListener('click', generatePassword);