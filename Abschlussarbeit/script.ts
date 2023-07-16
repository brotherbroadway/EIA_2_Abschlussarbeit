namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/

    // serving tab elements
    export let dropdownServe: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownserve");
    export let serveBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("servebutton");
    export let editServeBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("serveeditbutton");
    export let deleteServeBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("servedeletebutton");
    export let waffleCheck: HTMLInputElement = <HTMLInputElement>document.getElementById("wafflecheck");
    export let pricePreviewParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("pricepreview");
    export let priceProdPreviewParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("priceprodpreview");

    // creator tab elements
    let fullCreatorDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("creatorcontainer");
    export let creatorDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("creatordiv");
    export let createNewBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createnewbutton");
    export let titleField: HTMLInputElement = <HTMLInputElement>document.getElementById("creamtitle");
    export let addToppingBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addcreambutton");
    export let removeToppingBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("removecreambutton");
    export let dropdownToppingsArray: HTMLSelectElement[] = [];
    export let dropdownSauce: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownsauce");
    export let dropdownSprinkles: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownsprinkles");
    export let whippedCheck: HTMLInputElement = <HTMLInputElement>document.getElementById("whippedcheck");
    export let priceField: HTMLInputElement = <HTMLInputElement>document.getElementById("creatorprice");
    export let creatorProdParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("creatorpriceprod");
    export let submitIcecreamButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("creatorsubmitbutton");

    export let selectionContainerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("selectioncontainer");

    // for server data
    export let myUrl: string = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    export let savedCreams: FullIcecream[] = [];
    export let savedCreamsAmount: number = 0;

    // canvas elements
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.canvas.height = window.innerHeight * 0.95;
    crc2.canvas.width = window.innerWidth * 0.8;
    export let canvasH: number = crc2.canvas.height;
    export let canvasW: number = crc2.canvas.width;
    export let windowW: number = window.innerWidth;
    export let spawnX: number = -(canvasW * 0.12);
    let golden: number = 0.62;
    export let horizon: number = canvasH * golden;
    let backgroundData: ImageData;
    let animationInterval: any;

    // colors
    export let bowlColor: string = "rgb(246, 255, 179)";
    export let waffleColor: string = "rgb(202, 165, 83)";
    export let whippedColor: string = "rgb(255, 248, 229)";
    export let outlineColor: string = "rgba(255, 255, 255, 0.5)";
    export let speechBubbleColor: string = "rgb(204, 247, 255)";
    export let outlineCustomerColor: string = "black";
    export let outlineSelectedColor: string = "red";
    let instructionColor: string = "rgb(0, 255, 255)";

    // rating and money
    let myRatingCurrent: number = 0;
    export let myRatingTotal: number = 50;
    export let myRatingCount: number = 10;
    let removedDummyRatings: boolean = false;
    export let myMoneyCurrent: number = 100;
    export let myMoneyReduction: number = 10;
    export let myMoneyGain: number = 5;
    export let moneyReductionFrameCount: number = 0;
    export let moneyGainFrameCount: number = 0;

    // preview/create display icecreams
    export let previewServeIcecream: DisplayIcecream;
    export let creatingIcecream: DisplayIcecream;
    export let previewVisible: boolean = false;

    // customers & shop
    export let allCustomers: Customer[] = [];
    let customerCount: number;
    export let shopOpen: boolean = false;
    let firstOpen: boolean = true;
    let firstServe: boolean = true;
    export let firstIcecream: boolean = true;
    export let correctIcecream: boolean = true;
    let customerWaiting: boolean = false;
    let lastInstructionCount: number = 25;
    let framesSinceLastSpawn: number = 0;
    let frameSinceShopOpen: number = 0;

    // element bools and others
    export let createFormOpen: boolean = false;
    export let editingForm: boolean = false;
    export let formEmpty: boolean = true;
    export let sauceSelected: boolean = false;
    export let visibleToppings: number = 1;
    export let creatorIcecream: FullIcecream;
    export let currentSelectedPrice: number = 0;
    export let currentSelectedProdCost: number = 0;

    // for canvas positions
    export let waitingPosTaken: number[] = [-1, -1, -1, -1];
    export let waitingPosCount: number = waitingPosTaken.length;
    export let seatTaken: boolean[] = [false, false, false, false, false, false];
    export let seatCount: number = seatTaken.length;
    export let waitingPosX: number[] = [canvasW * 0.275, canvasW * 0.475, canvasW * 0.675, canvasW * 0.87];
    export let waitingPosY: number = canvasH * 0.9;
    let waitingPosSize: number = (canvasW * 0.065) * 2;
    export let waitingSelectedID: number = -2;
    export let waitOutsidePosX: number = -(canvasW * 0.005);
    export let seatPosX: number[] = [canvasW * 0.1375, canvasW * 0.3375, canvasW * 0.4175, canvasW * 0.6175, canvasW * 0.7075, canvasW * 0.9075];
    export let seatPosY: number = canvasH * 0.545;
    let signPosX: number = canvasW * 0.2;
    let signPosY: number = canvasH * 0.07;
    let signW: number = canvasW * 0.13;
    let signH: number = canvasH * 0.075;

    export enum CustomerStatus {
        Arriving,
        WaitingOutside,
        GoingToQueue,
        AskingForIcecream,
        WaitingInside,
        GoingToSeat,
        Eating,
        Leaving,
        Reviewing,
    }

    export enum CustomerMood {
        Bad,
        Okay,
        Good
    }

    window.addEventListener("load", handleLoad);

    async function handleLoad(): Promise<void> {
        drawEverything();
        
        await installListeners();
    }

    // handles drawn visuals
    function drawEverything(): void {
        // reset animation interval if one exists
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }

        // background
        drawBackground();

        // sun
        drawSun(canvasW * 0.05, canvasH * 0.15);

        // clouds
        let cloudAmount: number = getRandomNumber(canvasW * 0.0125, canvasW * 0.005);
        for (let i: number = 0; i < cloudAmount; i++) {
            drawCloud(canvasW * Math.random(), canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }

        // shop
        drawShop(canvasW * 0.125, horizon);

        // save background data
        backgroundData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        console.log("Finished drawing background");

        canvas.removeEventListener("click", clickCanvas);
        canvas.addEventListener("click", clickCanvas);

        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }

    // draws animated and foreground stuff
    function drawAnimated(): void {
        crc2.putImageData(backgroundData, 0, 0);

        // draws customers
        drawCustomers();

        // draws counter and wall (in front of customers)
        drawCounter();

        drawWall();

        // draw speech bubbles (if any are here)
        customerWaiting = false;
        
        for (let i: number = 0; i < waitingPosCount; i++) {
            if (waitingPosTaken[i] >= 0 && allCustomers[waitingPosTaken[i]].status == CustomerStatus.AskingForIcecream) {
                allCustomers[waitingPosTaken[i]].drawSpeechbubble();

                customerWaiting = true;
            }
        }

        // draws preview icecream
        if (previewVisible) {
            previewServeIcecream.draw();
        }

        // draws creator icecream
        if (createFormOpen) {
            creatingIcecream.draw();
        }

        // draws rating and bank value
        drawRatingBank();

        // draws clickable shop sign
        drawShopSign();

        // check draw instructions
        checkInstructions();
    }

    // draws customers
    function drawCustomers(): void {
        customerCount = 0;

        // draw all customers on screen
        allCustomers.forEach(function(e) {
            e.draw();
            customerCount++;
        })

        // spawn new one
        let spawnChance: number = 0.0125 * getSpendAmount();

        //console.log("Chance", Math.floor(spawnChance * 1000) / 10);

        if (shopOpen) {
            // always spawn one customer after first shop open
            if (frameSinceShopOpen < 0) {
                spawnNewCustomer();

                frameSinceShopOpen = 9001;
            } else {
                // check - if instructions aren't visible anymore,
                //       - spawn since last frame,
                //       - random spawn chance,
                //       - if there's any icecream even available,
                //       - and how many customers there are total
                if (lastInstructionCount < 20 && framesSinceLastSpawn < 0 && Math.random() < spawnChance && savedCreams.length > 0 && customerCount < 13) {
                    console.log("Spawned new customer");
                    spawnNewCustomer();
        
                    framesSinceLastSpawn = 20;
                }

                frameSinceShopOpen--;
            }
        }

        framesSinceLastSpawn--;

        //console.log(frameSinceShopOpen, framesSinceLastSpawn, lastInstructionCount);
    }

    // spawns new customer
    function spawnNewCustomer(): void {
        // get random spawn height, speed, icecream, waffle
        let randomH: number = getRandomNumber(canvasH * 0.875, horizon + canvasH * 0.05);
        let randomSpeed: number = getRandomNumber(canvasW * 0.015, canvasW * 0.01);
        let randomWaffle: number = getRandomNumber(2);

        // get what customer is willing to spend
        let willingToSpend: number[] = [];

        let moneyWillingToSpend: number = getSpendAmount();

        // add icecreams that cost less than what they're willing to spend to selection they choose from
        for (let i: number = 0; i < savedCreamsAmount; i++) {
            if (spendList[i] < moneyWillingToSpend) {
                willingToSpend.push(i);
            }
        }

        // check if they have icecreams within that selection to choose from
        let iceWillingToSpend: number = Math.floor(Math.random() * willingToSpend.length);
        let randomIcecream: DisplayIcecream;
        let tooExpensive: boolean = false;

        // get dummy icecream & set too expensive bool
        if (willingToSpend.length < 1) { 
            tooExpensive = true;
            randomIcecream = getDisplayIcecream(0, 0, false, 0, randomWaffle);
        } else {
            // get real icecream if there's one within pricerange available
            randomIcecream = getDisplayIcecream(0, 0, false, willingToSpend[iceWillingToSpend], randomWaffle);
        }

        //console.log("Money I'm Willing To Spend", moneyWillingToSpend, willingToSpend, tooExpensive);

        let newCustomer = new Customer(spawnX, randomH, randomSpeed, randomSpeed * 0.5, allCustomers.length, randomIcecream, tooExpensive);
        allCustomers.push(newCustomer);
    }

    // draws clickable shop sign
    function drawShopSign(): void {
        crc2.save();
        crc2.translate(signPosX, signPosY);

        let fontSize: number = canvasW * 0.04;
        let fontColor: string = "orange";
        let buttonColor: string = "red";
        let signText: string = "CLOSED";

        // changes if open
        if (shopOpen) {
            fontColor = "yellow";
            buttonColor = "rgb(0, 255, 0)";
            signText = "OPEN";
        }

        // rect with rounded corners
        crc2.beginPath();
        crc2.roundRect(0, 0, signW, signH, fontSize * 0.1);
        crc2.strokeStyle = "black";
        crc2.lineWidth = fontSize * 0.2;
        crc2.fillStyle = buttonColor;
        crc2.stroke();
        crc2.fill();
        crc2.closePath();

        // text
        crc2.fillStyle = fontColor;
        crc2.font = "bold " + (fontSize * 0.8) + "px Impact";
        crc2.textAlign = "center";
        crc2.fillText(signText, signW * 0.5, signH * 0.775);

        crc2.restore();
    }

    // draws rating and bank display
    function drawRatingBank(): void {
        crc2.save();
        crc2.translate(canvasW * 0.86, canvasH * 0.04);

        // draws & calculates rating with one decimal point
        if (!removedDummyRatings && myRatingCount > 20) {
            // has 10 dummy ratings by default, removes them when 10 actual customers left a rating
            myRatingCount -= 10;
            myRatingTotal -= 50;

            removedDummyRatings = true;
            console.log("Removed dummy ratings");
        } 

        myRatingCurrent = Math.floor((myRatingTotal / myRatingCount) * 10) / 10;

        let fontColor: string = getRatingColor(myRatingCurrent);
        let fontSize: number = canvasW * 0.025;
        let fontH: number = canvasH * 0.04;
        let ratingW: number = canvasW * 0.0225;

        crc2.fillStyle = fontColor;
        crc2.strokeStyle = "black";
        crc2.lineWidth = fontSize * 0.15;
        crc2.font = "bold " + (fontSize * 0.8) + "px Arial";
        crc2.textAlign = "center";
        crc2.strokeText("Rating", 0, 0);
        crc2.fillText("Rating", 0, 0);
        crc2.textAlign = "right";
        crc2.strokeText(myRatingCurrent + "/10", ratingW, fontH);
        crc2.fillText(myRatingCurrent + "/10", ratingW, fontH);

        // draws bank
        let bankW: number = canvasW * 0.1;

        // show money change
        if (moneyReductionFrameCount > 0) {
            let changeColor: string = "red";
            let changePrefix: string = "-";
            let moneyChange: number = myMoneyGain - myMoneyReduction;

            // show gain if there is any
            if (moneyGainFrameCount > 0 && moneyChange > 0) {
                changeColor = "rgb(0, 255, 0)";
                changePrefix = "+";
            } else {
                moneyChange = myMoneyReduction;
            }

            crc2.fillStyle = changeColor;
            crc2.strokeStyle = "black";
            crc2.lineWidth = fontSize * 0.15;
            crc2.font = "bold " + (fontSize * 0.8) + "px Arial";
            crc2.textAlign = "right";
            crc2.strokeText(changePrefix + "$" + moneyChange.toFixed(2), bankW + ratingW, fontH * 2);
            crc2.fillText(changePrefix + "$" + moneyChange.toFixed(2), bankW + ratingW, fontH * 2);
        }

        // reduce frames they're shown
        moneyReductionFrameCount--;
        moneyGainFrameCount--;

        // current money
        crc2.fillStyle = "white";
        crc2.strokeStyle = "black";
        crc2.lineWidth = fontSize * 0.15;
        crc2.font = "bold " + (fontSize * 0.8) + "px Arial";
        crc2.textAlign = "center";
        crc2.strokeText("Bank", bankW - (ratingW * 0.5), 0);
        crc2.fillText("Bank", bankW - (ratingW * 0.5), 0);
        crc2.textAlign = "right";
        crc2.strokeText("$" + myMoneyCurrent.toFixed(2), bankW + ratingW, fontH);
        crc2.fillText("$" + myMoneyCurrent.toFixed(2), bankW + ratingW, fontH);

        crc2.restore();
    }

    // checks if there's any instructions to draw
    function checkInstructions(): void {
        if (lastInstructionCount >= 0) {
            // first open text
            if (firstOpen) {
                let openText: string = "Click the sign to open the shop!";

                drawInstructions(openText);
            } else if (firstServe && customerWaiting) {
                // first customer serving text
                let serveText: string = "Click a customer's face to select them!";

                drawInstructions(serveText);
            } else if (firstIcecream && !firstServe && customerWaiting) {
                // first icecream serving text
                let iceText: string = "Now select the icecream they want";
                let iceText2: string = "from your list to serve them!";

                drawInstructions(iceText, iceText2);
            } else if (!firstIcecream && !firstServe) {
                // right/wrong serving text
                let correctText: string = "Nice one!";
                let correctText2: string = "Keep it up!";

                if (!correctIcecream) {
                    correctText = "That wasn't the right one!";
                    correctText2 = "Try again!";
                } else {
                    // count down last instruction display when correctly chosen
                    lastInstructionCount--;
                }

                drawInstructions(correctText, correctText2);
            }
        }
    }

    // draws instruction text
    function drawInstructions(_text: string, _text2: string = ""): void {
        crc2.save();
        crc2.translate(canvasW * 0.58, canvasH * 0.06);

        let fontSize: number = canvasW * 0.04;

        // text
        crc2.fillStyle = instructionColor;
        crc2.strokeStyle = "black";
        crc2.lineWidth = fontSize * 0.1;
        crc2.font = "bold " + (fontSize * 0.5) + "px Arial";
        crc2.textAlign = "center";
        crc2.strokeText(_text, 0, 0);
        crc2.fillText(_text, 0, 0);

        // second line of text (if there is one)
        if (_text2.length > 0) {
            crc2.strokeText(_text2, 0, canvasH * 0.035);
            crc2.fillText(_text2, 0, canvasH * 0.035);
        }

        crc2.restore();
    }

    // click canvas event
    function clickCanvas(_event: MouseEvent): void {
        let rect = canvas.getBoundingClientRect();
        let mouseX: number = _event.clientX - rect.x;
        let mouseY: number = _event.clientY - rect.y;

        //console.log("CLICKED CANVAS", mouseX, mouseY);

        // select customer at waiting pos
        if (mouseY < waitingPosY && mouseY > (waitingPosY - waitingPosSize)) {

            //console.log("X:", Math.floor(waitingPosX[0]), Math.floor(waitingPosX[0] + waitingPosSize), "Y:", Math.floor(waitingPosY), Math.floor(waitingPosY - waitingPosSize));

            // check at which waiting pos
            if (mouseX > waitingPosX[0] && mouseX < (waitingPosX[0] + waitingPosSize)) {
                selectCustomer(0);
            } else if (mouseX > waitingPosX[1] && mouseX < (waitingPosX[1] + waitingPosSize)) {
                selectCustomer(1);
            } else if (mouseX > waitingPosX[2] && mouseX < (waitingPosX[2] + waitingPosSize)) {
                selectCustomer(2);
            } else if (mouseX > waitingPosX[3] && mouseX < (waitingPosX[3] + waitingPosSize)) {
                selectCustomer(3);
            }
        } else { // unselect customer if clicked anywhere else
            if (waitingSelectedID >= 0) {
                console.log("Unselected Customer (by clicking anywhere)");
                allCustomers[waitingSelectedID].selected = false
    
                waitingSelectedID = -2;
            }
            if (mouseX > signPosX && mouseX < (signPosX + signW * 1.02) && mouseY > signPosY && mouseY < (signPosY + signH * 1.15)) {
                // click shop sign
                if (!shopOpen) {
                    console.log("Opened shop!");

                    shopOpen = true;
                    firstOpen = false;
                    frameSinceShopOpen = 10;
                    framesSinceLastSpawn = 50;

                    // hide creator div, edit, delete elements
                    fullCreatorDiv.setAttribute("style", "display: none");
                    editServeBttn.setAttribute("style", "display: none");
                    deleteServeBttn.setAttribute("style", "display: none");

                    selectionContainerDiv.setAttribute("style", "padding-top: 15%");

                    // close & reset create form if open
                    if (createFormOpen) {
                        resetCreatorFields();

                        creatorDiv.setAttribute("style", "display: none");
                        createNewBttn.innerHTML = "Create New";
            
                        createFormOpen = false;
                    }
                } else {
                    console.log("Closed shop!");

                    shopOpen = false;

                    // show creator div, edit, delete elements
                    fullCreatorDiv.setAttribute("style", "display: inline-block");
                    editServeBttn.setAttribute("style", "display: inline-block");
                    deleteServeBttn.setAttribute("style", "display: inline-block");

                    selectionContainerDiv.setAttribute("style", "padding-top: 6%");
                }
            }
        }
    }

    // selects customer at the spot (if there's one there)
    function selectCustomer(_waitPos: number): void {
        //console.log("CLICKED WAITING POS " + (_waitPos + 1));

        // get wait pos selected if it's occupied & correct status
        if (waitingPosTaken[_waitPos] >= 0 && waitingPosTaken[_waitPos] != waitingSelectedID
            && allCustomers[waitingPosTaken[_waitPos]].status == CustomerStatus.AskingForIcecream) {
                if (waitingSelectedID >= 0 && allCustomers[waitingSelectedID].selected === true) {
                    allCustomers[waitingSelectedID].selected = false;
                    console.log("Unselected previous Customer");
                }

                waitingSelectedID = waitingPosTaken[_waitPos];

                console.log("Selected a customer"); //console.log("Selected", waitingSelectedID);
                allCustomers[waitingSelectedID].selected = true;

                firstServe = false;
        } else if (waitingPosTaken[_waitPos] == waitingSelectedID && allCustomers[waitingPosTaken[_waitPos]].status == CustomerStatus.AskingForIcecream) { // unselect wait pos customer
            console.log("Unselected Customer (by direct click)");
            allCustomers[waitingSelectedID].selected = false;
            
            waitingSelectedID = -2;
        }
    }
    
    // draw background with golden ratio
    function drawBackground(): void {
        //console.log("Background");

        // adds background gradient with golden ratio
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, canvasW, canvasH);
    }

    // draws sun (can't use Vector (not found?))
    function drawSun(_posX: number, _posY: number): void {
        //console.log("Sun", _posX, _posY);

        // shine radius
        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        // adds shine gradient
        gradient.addColorStop(0, "HSLA(40, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 60%, 0)");

        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    // draws clouds
    function drawCloud(_posX: number, _posY: number, _sizeX: number, _sizeY: number): void {
        //console.log("Cloud", _posX, _posY, _sizeX, _sizeY);

        // generate particles
        let nParticles: number = _sizeX * 0.2;
        let radiusParticle: number = _sizeY * 0.6;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");

        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.fillStyle = gradient;

        // draw cloud particles within size
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let thisX: number = (Math.random() - 0.5) * _sizeX;
            let thisY: number = (Math.random() * _sizeY);
            crc2.translate(thisX, thisY);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }

    // draws the icecream shop
    function drawShop(_posX: number, _posY: number): void {
        // draw back wall
        drawBackwall(_posX, _posY);

        // draw ground
        crc2.beginPath();
        crc2.rect(_posX, _posY, canvasW - _posX, canvasH - _posY);
        let gradient: CanvasGradient = crc2.createLinearGradient(0, _posY, 0, canvasH);

        // add gradient to ground
        gradient.addColorStop(0, "rgb(198, 237, 251)");
        gradient.addColorStop(0.9, "rgb(230, 251, 255)");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.closePath();

        // draw chairs (from left to right)
        let chairY: number = _posY + (canvasH * 0.025);
        let chairLX1: number = canvasW * 0.125;
        let chairLX2: number = canvasW * 0.405;
        let chairLX3: number = canvasW * 0.695;

        drawChair(chairLX1, chairY, false);
        drawChair(canvasW * 0.42, chairY, true);
        drawChair(chairLX2, chairY, false);
        drawChair(canvasW * 0.71, chairY, true);
        drawChair(chairLX3, chairY, false);
        drawChair(canvasW * 1, chairY, true);

        chairY *= 0.99;
        let tableX: number = canvasW * 0.145;
        drawTable(chairLX1 + tableX, chairY);
        drawTable(chairLX2 + tableX, chairY);
        drawTable(chairLX3 + tableX, chairY);
    }

    // draws wall
    function drawWall(): void {
        crc2.beginPath();
        crc2.rect(canvasW * 0.125 - canvasW * 0.0075, 0, canvasW * 0.0075, canvasH);
        crc2.fillStyle = "rgb(121, 153, 164)";
        crc2.fill();
        crc2.closePath();
    }

    // draws counter
    function drawCounter(): void {
        crc2.beginPath();
        crc2.rect(canvasW * 0.125, canvasH * 0.875, canvasW, canvasH);
        crc2.fillStyle = "rgb(183, 211, 225)";
        crc2.fill();
        crc2.closePath();
    }

    // draws backwall
    function drawBackwall(_posX: number, _posY: number): void {
        crc2.beginPath();
        crc2.rect(_posX, 0, canvasW - _posX, canvasH);
        // Create a pattern, offscreen
        let patternCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
        let patternContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>patternCanvas.getContext("2d");

        // Give the pattern a width and height
        let patternSize: number = canvasW * 0.02;
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;

        // Give the pattern a background color and draw an arc
        patternContext.fillStyle = "rgb(214, 245, 255)";
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.arc(0, 0, patternSize, 0, 0.5 * Math.PI);
        patternContext.strokeStyle = "rgb(158, 231, 255)";
        patternContext.stroke();

        let pattern: CanvasPattern = <CanvasPattern>crc2.createPattern(patternCanvas, "repeat");
        crc2.fillStyle = pattern;
        crc2.fill();
        crc2.closePath();
    }

    // draw chair
    function drawChair(_posX: number, _posY: number, _right: boolean): void {
        //console.log("Chair", _posX, _posY);

        crc2.save();
        crc2.translate(_posX, _posY);

        let maxH: number = -(canvasH * 0.28);
        let backrestW: number = canvasW * 0.02;
        let maxW: number = canvasW * 0.09;
        let sitH: number = -(canvasH * 0.1);

        // right-facing
        if (_right) {
            backrestW = -backrestW;
            maxW = -maxW;
        }

        // chair drawing
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(maxW, 0);
        crc2.lineTo(maxW, sitH);
        crc2.lineTo(backrestW, sitH);
        crc2.lineTo(backrestW, maxH);
        crc2.lineTo(0, maxH);

        crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(171, 185, 191)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    // draw table
    function drawTable(_posX: number, _posY: number): void {
        //console.log("Table", _posX, _posY);

        crc2.save();
        crc2.translate(_posX, _posY);

        let footW: number = canvasW * 0.01;
        let footH: number = -(canvasH * 0.13);
        let topW: number = canvasW * 0.065;
        let topH: number = footH * 1.12;

        // table drawing
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(footW, 0);
        crc2.lineTo(footW, footH);
        crc2.lineTo(topW, footH);
        crc2.lineTo(topW, topH);
        crc2.lineTo(-topW + footW, topH);
        crc2.lineTo(-topW + footW, footH);
        crc2.lineTo(0, footH);

        crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(194, 204, 209)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    // gets random random, optional minimum
    export function getRandomNumber(_max: number, _min: number = 0): number {
        let difference: number = _max - _min;

        let num: number = Math.random();

        num = Math.floor(num * difference);

        num += _min;

        return num;
    }

    // get random true or false
    export function getRandomBool(): boolean {
        return Boolean(Math.round(Math.random()));
    }

    // get how much money customer is willing to spend
    function getSpendAmount(): number {
        let baseWilling: number = getRandomNumber(230, 170) / 100;
        let percentage: number = (myRatingCurrent / 10 - 0.5);

        // modifier below 0 is less strong
        if (percentage < 0) {
            return baseWilling * (1 + percentage * 0.75);
        } else {
            return baseWilling * (1 + percentage * 2);
        }
    }

    // gets an icecream topping (or sauce) color rgb code
    export function getIcecreamColor(_topping: CreamTypes, _sauce: boolean = false): string {
        let colorR: number = 0;
        let colorG: number = 0;
        let colorB: number = 0;
        let sauceBonus: number = 0;
        let color: string = "";

        // sauce is a bit darker
        if (_sauce) {
            sauceBonus = -30;
        }

        // get icecream rgb values
        switch (_topping) {
            case CreamTypes.Chocolate:
                colorR = 71;
                colorG = 38;
                colorB = 30;
                break;
            case CreamTypes.Vanilla:
                colorR = 235;
                colorG = 203;
                colorB = 159;
                break;
            case CreamTypes.Strawberry:
                colorR = 197;
                colorG = 31;
                colorB = 73;
                break;
            case CreamTypes.Blueberry:
                colorR = 78;
                colorG = 30;
                colorB = 2099;
                break;
            case CreamTypes.Banana:
                colorR = 219;
                colorG = 187;
                colorB = 31;
                break;
            case CreamTypes.Smurf:
                colorR = 30;
                colorG = 87;
                colorB = 255;
                break;
        }

        // add them with sauce brightness modifier together
        color = "rgb(" + (colorR + sauceBonus) + ", " + (colorG + sauceBonus) + ", " + (colorB + sauceBonus) + ")";

        //console.log("Color: " + color, CreamTypes[_topping], _sauce);

        return color;
    }

    // gets sprinkles color rgb code
    export function getSprinklesColor(_sprinkles: SprinklesType): string {
        let color: string = "";

        switch (_sprinkles) {
            case SprinklesType.None:
                break;
            case SprinklesType.Chocolate:
                color = "rgb(20, 4, 0)";
                break;
            case SprinklesType.Mint:
                color = "rgb(169, 236, 24)";
                break;
        }

        return color;
    }

    // gets customer mood color rgb code
    export function getMoodColor(_mood: CustomerMood): string {
        let color: string = "";

        switch (_mood) {
            case CustomerMood.Bad:
                color = "rgb(205, 10, 10)"; // red
                break;
            case CustomerMood.Okay:
                color = "rgb(219, 219, 0)"; // yellow
                break;
            case CustomerMood.Good:
                color = "rgb(52, 223, 52)"; // green
                break;
            default:
                // Error color (just in case)
                color = "rgb(200, 200, 200)"; // grey
                break;
        }

        return color;
    }

    // gets rating color rgb code
    export function getRatingColor(_rating: number): string {
        let color: string = "rgb(102, 0, 255)" // rating is 10 - purple

        if (_rating < 2) {
            color= "rgb(128, 0, 0)"; // rating less than 2 - darkred
        } else if (_rating < 4) {
            color = "rgb(204, 0, 0)"; // rating less than 4 - red
        } else if (_rating < 6) {
            color = "rgb(255, 102, 0)"; // rating less than 6 - orange
        } else if (_rating < 7) {
            color = "rgb(255, 234, 0)"; // rating less than 7 - yellow
        } else if (_rating < 8) {
            color = "rgb(16, 245, 0)"; // rating less than 8 - green
        } else if (_rating < 9) {
            color = "rgb(0, 245, 204)"; // rating less than 9 - lightblue
        } else if (_rating < 10) {
            color = "rgb(0, 118, 245)"; // rating more than 9 - darkblue
        }

        return color;
    }
}