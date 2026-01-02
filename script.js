const template = document.getElementById('clock-template');
const digitContainers = [];


for (let d = 0; d < 6; d++) {
    const container = document.getElementById(`digit-${d}`);
    digitContainers.push(container);
    
    for (let i = 0; i < 24; i++) {
        container.appendChild(template.content.cloneNode(true));
    }
}

const angles = {
    "┌": [0, 90],
    "┐": [90, 180],
    "┘": [180, 270],
    "└": [0, 270],
    "-": [0, 180],
    "|": [90, 270],
    " ": [135, 135]
};

const SHAPES = {
    "4": ["┌","┐","┌","┐","|","|","|","|","|","└","┘","|","└","-","┐","|"," "," ","|","|"," "," ","└","┘"],
    "0": ["┌","-","-","┐","|","┌","┐","|","|","|","|","|","|","|","|","|","|","└","┘","|","└","-","-","┘"],
    "1": [" "," ","┌","┐"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","└","┘"],
    "2": ["┌","-","-","┐","└","-","┐","|","┌","-","┘","|","|","┌","-","┘","|","└","-","┐","└","-","-","┘"],
    "3": ["┌","-","-","┐","└","-","┐","|","┌","-","┘","|","└","-","┐","|","┌","-","┘","|","└","-","-","┘"],
    "5": ["┌","-","-","┐","|","┌","-","┘","|","└","-","┐","└","-","┐","|","┌","-","┘","|","└","-","-","┘"],
    "6": ["┌","-","-","┐","|","┌","-","┘","|","└","-","┐","|","┌","┐","|","|","└","┘","|","└","-","-","┘"],
    "7": ["┌","-","-","┐","└","-","┐","|"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","└","┘"],
    "8": ["┌","-","-","┐","|","┌","┐","|","|","└","┘","|","|","┌","┐","|","|","└","┘","|","└","-","-","┘"],
    "9": ["┌","-","-","┐","|","┌","┐","|","|","└","┘","|","└","-","┐","|","┌","-","┘","|","└","-","-","┘"]
};


function updateDigit(container, num) {
    const clocks = container.querySelectorAll('.clock');
    const shape = SHAPES[num] || SHAPES["0"];

    shape.forEach((symbol, index) => {
        const hands = clocks[index].querySelectorAll('.hand');
        const [angle1, angle2] = angles[symbol] || angles[" "];
        hands[0].style.rotate = `${angle1}deg`;
        hands[1].style.rotate = `${angle2}deg`;
    });
}


function tick() {
    const time = new Date().toLocaleTimeString("en-US", {
        hour12: true, 
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const digits = time.replace(/\D/g, "").slice(0, 6).split("");

    digits.forEach((num, i) => {
        updateDigit(digitContainers[i], num);
    });
}

tick();
setInterval(tick, 1000);