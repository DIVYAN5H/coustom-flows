let flowsCardsInfo = [];
let noOfFlow = 0;
fetch("../flows.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        flowsCardsInfo = data;
        noOfFlow = flowsCardsInfo.length;
        flowCardsFunc(data);
    })
    .catch(function (err) {
        console.log("error: " + err);
    });

let body = document.getElementsByTagName("body")[0];
let flowContainer = document.createElement("div");
flowContainer.classList.add("flowContiner");

let currentFlow = 0;

function flowCardsFunc(data) {
    data.forEach((cardDetail) => {
        // Taking target details and initializing
        let div = document.getElementById(cardDetail.id);
        var divWidth =
            div.clientWidth || div.offsetWidth || div.getBoundingClientRect().width;
        var divHeight =
            div.clientHeight ||
            div.offsetHeight ||
            div.getBoundingClientRect().height;
        var divTop = div.offsetTop;
        var divLeft = div.offsetLeft;
        let card = document.createElement("div");

        // Card structure
        card.innerHTML = `
        <div class='flowCardDesc'>${cardDetail.desc}</div>
        <button onClick='nextFlowStep()'>next</button>
        `;

        //Adding Card
        card.classList.add("flowCard");
        flowContainer.appendChild(card);
        body.appendChild(flowContainer);

        // Positioning Card
        switch (cardDetail.position) {
            case "down":
                card.style.top = `calc(${divTop}px + ${divHeight}px + 10px)`;
                card.style.left = `${divLeft}px`;
                card.classList.add('down')
                break;
            case "up":
                card.style.top = `calc(${divTop}px - ${card.offsetHeight}px - 10px)`;
                card.style.left = `${divLeft}px`;
                card.classList.add('up')
                break;
            case "left":
                card.style.top = `${divTop}px`;
                card.style.left = `calc(${divLeft}px - ${card.offsetWidth}px - 10px)`;
                card.classList.add('left')
                break;
            case "right":
                card.style.top = `${divTop}px`;
                card.style.left = `calc(${divLeft}px + ${divWidth}px + 10px)`;
                card.classList.add('right')
                break;

            default:
                break;
        }
    });
    displayCurrentCard();
}

function nextFlowStep() {
    currentFlow++;
    if (currentFlow < noOfFlow) {
        displayCurrentCard();
    } else if ((currentFlow = noOfFlow)) {
        let finish = document.createElement("div");
        finish.innerHTML = `
        <div class='flowCardDesc'>You are ready to go</div>
        <button onClick='body.removeChild(flowContainer)'>Finish</button>
        `;
        finish.classList.add("finishCard");
        finish.classList.add("flowCard");
        flowContainer.innerHTML = "";
        flowContainer.appendChild(finish);
    }
}

function displayCurrentCard() {
    let allCards = document.getElementsByClassName("flowCard");
    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        card.style.display = "none";
    }
    allCards[currentFlow].style.display = "flex";
}
