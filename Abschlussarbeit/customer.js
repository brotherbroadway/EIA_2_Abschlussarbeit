"use strict";
var EIA2SoSe23_Abschlussarbeit;
(function (EIA2SoSe23_Abschlussarbeit) {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    class Customer extends EIA2SoSe23_Abschlussarbeit.Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _id, _myIcecream, _tooExpensive, _scaling = 1, _mood = EIA2SoSe23_Abschlussarbeit.CustomerMood.Good, _status = EIA2SoSe23_Abschlussarbeit.CustomerStatus.Arriving, _rating = 10, _frameCount = -20, _mouthOpen = false, _selected = false, _myQueuePos = -3, _mySeatPos = -1, _wasServed = false) {
            super(_posX, _posY, _scaling);
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.id = _id;
            this.mood = _mood;
            this.status = _status;
            this.rating = _rating;
            this.frameCount = _frameCount;
            this.mouthOpen = _mouthOpen;
            this.myIcecream = _myIcecream;
            this.selected = _selected;
            this.myQueuePos = _myQueuePos;
            this.mySeatPos = _mySeatPos;
            this.wasServed = _wasServed;
            this.tooExpensive = _tooExpensive;
        }
        draw() {
            // scales customer depending on screen position
            this.scaling = (this.posY * EIA2SoSe23_Abschlussarbeit.canvasH) * 0.0000014;
            let customerR = EIA2SoSe23_Abschlussarbeit.canvasW * 0.065;
            customerR *= this.scaling;
            if (customerR > 100) {
                customerR = 100;
            }
            this.drawFace(customerR);
            this.doAction(customerR);
            this.checkMood();
        }
        // draws face depending on mood
        drawFace(_customerR) {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            // head
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.getMoodColor(this.mood);
            // change outline color if selected
            if (this.selected && this.status == EIA2SoSe23_Abschlussarbeit.CustomerStatus.AskingForIcecream) {
                EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = EIA2SoSe23_Abschlussarbeit.outlineSelectedColor;
            }
            else {
                EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = EIA2SoSe23_Abschlussarbeit.outlineCustomerColor;
            }
            EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = _customerR * 0.05;
            EIA2SoSe23_Abschlussarbeit.crc2.arc(_customerR, -_customerR, _customerR, 0, 2 * Math.PI);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.stroke();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            // eyes
            let eyeWLeft = _customerR * 0.6;
            let eyeWRight = _customerR * 1.4;
            let eyeH = -(_customerR * 1.25);
            let eyeR = _customerR * 0.12;
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "black";
            EIA2SoSe23_Abschlussarbeit.crc2.arc(eyeWLeft, eyeH, eyeR, 0, 2 * Math.PI);
            EIA2SoSe23_Abschlussarbeit.crc2.arc(eyeWRight, eyeH, eyeR, 0, 2 * Math.PI);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            // mouth
            let mouthW = -(_customerR * 0.6);
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = "black";
            EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = eyeR * 0.8;
            if (!this.mouthOpen) {
                if (this.status == EIA2SoSe23_Abschlussarbeit.CustomerStatus.Eating || this.status == EIA2SoSe23_Abschlussarbeit.CustomerStatus.WaitingInside) {
                    this.mouthOpen = true;
                }
                switch (this.mood) {
                    case EIA2SoSe23_Abschlussarbeit.CustomerMood.Bad: // frowning
                        let frownCurve = -(_customerR * 0.7);
                        mouthW *= 0.8;
                        EIA2SoSe23_Abschlussarbeit.crc2.moveTo(eyeWLeft, mouthW);
                        EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(eyeWLeft, frownCurve, eyeWRight, frownCurve, eyeWRight, mouthW);
                        break;
                    case EIA2SoSe23_Abschlussarbeit.CustomerMood.Okay: // neutral
                        EIA2SoSe23_Abschlussarbeit.crc2.moveTo(eyeWLeft, mouthW);
                        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(eyeWRight, mouthW);
                        break;
                    case EIA2SoSe23_Abschlussarbeit.CustomerMood.Good: // smiling
                        let smileCurve = -(_customerR * 0.4);
                        mouthW *= 1.1;
                        EIA2SoSe23_Abschlussarbeit.crc2.moveTo(eyeWLeft, mouthW);
                        EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(eyeWLeft, smileCurve, eyeWRight, smileCurve, eyeWRight, mouthW);
                        break;
                }
            }
            else { // eating simulator
                this.mouthOpen = false;
                EIA2SoSe23_Abschlussarbeit.crc2.arc(_customerR, mouthW * 0.9, eyeR * 1.7, 0, 2 * Math.PI);
            }
            EIA2SoSe23_Abschlussarbeit.crc2.stroke();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        // draws speech bubble with icecream
        drawSpeechbubble() {
            let speechR = EIA2SoSe23_Abschlussarbeit.canvasW * 0.065;
            speechR *= this.scaling;
            if (speechR > 100) {
                speechR = 100;
            }
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            // change outline color if selected
            let strokeColor = EIA2SoSe23_Abschlussarbeit.outlineCustomerColor;
            if (this.selected && this.status == EIA2SoSe23_Abschlussarbeit.CustomerStatus.AskingForIcecream) {
                strokeColor = EIA2SoSe23_Abschlussarbeit.outlineSelectedColor;
            }
            // draw bubble
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.speechBubbleColor;
            EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = strokeColor;
            EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = speechR * 0.05;
            EIA2SoSe23_Abschlussarbeit.crc2.ellipse(-(speechR), -(speechR * 3), speechR * 1.4, speechR, Math.PI, 0, 2 * Math.PI);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.stroke();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            // draw connecting arrow
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.speechBubbleColor;
            EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = strokeColor;
            EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = speechR * 0.05;
            EIA2SoSe23_Abschlussarbeit.crc2.moveTo(-(speechR * 0.3), -(speechR * 2.15));
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(speechR * 0.2, -(speechR * 1.8));
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(speechR * 0.1, -(speechR * 2.4));
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.stroke();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
            // drawing requested icecream
            this.myIcecream.changePos(this.posX - speechR * 1.3, this.posY - (speechR * 2.6));
            this.myIcecream.draw();
        }
        // do action depending on status
        doAction(_customerR) {
            switch (this.status) {
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.Arriving:
                    this.arrive();
                    this.checkShopStatus();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.WaitingOutside:
                    // checks if queue is free every 20 frames
                    if (this.frameCount % 20 == 0) {
                        if (!this.checkQueue() && this.frameCount < -10) {
                            this.frameCount = 200;
                        }
                        else if (this.speedY < 0) { // fix speed if pacing upwards
                            this.speedY = -this.speedY;
                        }
                    }
                    else if (this.frameCount < 0) {
                        this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Reviewing);
                    }
                    this.paceOutside();
                    this.checkShopStatus();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToQueue:
                    this.frameCount = -20;
                    this.goToQueue();
                    this.checkShopStatus();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.AskingForIcecream:
                    this.updateRating(-0.0225);
                    this.checkShopStatus();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.WaitingInside:
                    // drawing icecream in hand
                    this.myIcecream.changePos(this.posX + _customerR * 1.3, this.posY);
                    this.myIcecream.draw();
                    //console.log(this.id, this.frameCount);
                    // checks if queue is free every 20 frames
                    if (this.frameCount % 20 == 0) {
                        if (!this.checkSeats()) {
                        }
                        else {
                            EIA2SoSe23_Abschlussarbeit.waitingPosTaken[this.myQueuePos] = -1;
                            this.myQueuePos = -1;
                            this.wasServed = true;
                            this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToSeat);
                        }
                    }
                    // eat toppings by frame count inside (still losing rating if not seated)
                    if (this.frameCount < 0) {
                        this.frameCount = 140;
                        if (this.wasServed === true) {
                            // when fully eaten, update status (leave)
                            if (this.myIcecream.eatTopping()) {
                                EIA2SoSe23_Abschlussarbeit.waitingPosTaken[this.myQueuePos] = -1;
                                this.myQueuePos = -1;
                                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Leaving);
                            }
                        }
                        this.wasServed = true;
                    }
                    this.frameCount--;
                    this.updateRating(-0.005);
                    this.checkShopStatus();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToSeat:
                    // drawing icecream in hand
                    this.myIcecream.changePos(this.posX + _customerR * 1.3, this.posY);
                    this.myIcecream.draw();
                    this.goToSeat();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.Eating:
                    // draw icecream on table, left right depending on seat pos
                    if (this.mySeatPos % 2) {
                        this.myIcecream.changePos(this.posX - _customerR * 1.2, EIA2SoSe23_Abschlussarbeit.canvasH * 0.495);
                        this.myIcecream.draw();
                    }
                    else {
                        this.myIcecream.changePos(this.posX + _customerR * 2.2, EIA2SoSe23_Abschlussarbeit.canvasH * 0.495);
                        this.myIcecream.draw();
                    }
                    this.frameCount--;
                    // eat toppings by frame count
                    if (this.frameCount < 0) {
                        let upperLimit = 120;
                        let lowerLimit = 90;
                        if (!EIA2SoSe23_Abschlussarbeit.shopOpen) {
                            upperLimit *= 0.5;
                            lowerLimit *= 0.5;
                        }
                        this.frameCount = EIA2SoSe23_Abschlussarbeit.getRandomNumber(upperLimit, lowerLimit);
                        // when fully eaten, update status (leave)
                        if (this.myIcecream.eatTopping()) {
                            EIA2SoSe23_Abschlussarbeit.seatTaken[this.mySeatPos] = false;
                            this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Leaving);
                        }
                    }
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.Leaving:
                    this.leaveShop();
                    break;
                case EIA2SoSe23_Abschlussarbeit.CustomerStatus.Reviewing:
                    this.exitScene();
                    break;
            }
            if (this.posY < EIA2SoSe23_Abschlussarbeit.seatPosY) {
                this.speedY = -this.speedY;
                if (this.speedY < 0) {
                    this.speedY = -this.speedY;
                }
            }
        }
        arrive() {
            if (this.posX + this.speedX < EIA2SoSe23_Abschlussarbeit.waitOutsidePosX) {
                this.posX += this.speedX;
            }
            else if (this.checkQueue() && !this.tooExpensive) { // check if queue is available
                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToQueue); // go to queue
            }
            else if (!this.tooExpensive) { // if not, wait outside
                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.WaitingOutside);
            }
            else {
                // if in queue, leave queue
                if (this.myQueuePos >= 0) {
                    EIA2SoSe23_Abschlussarbeit.waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;
                }
                this.updateRating(-7.5);
                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Reviewing);
            }
        }
        // go to queue position
        goToQueue() {
            // move to X queue pos
            if (this.posX < EIA2SoSe23_Abschlussarbeit.waitingPosX[this.myQueuePos]) {
                this.posX += this.speedX;
            }
            else {
                this.posX = EIA2SoSe23_Abschlussarbeit.waitingPosX[this.myQueuePos];
                // move to Y queue pos
                if (this.posY < EIA2SoSe23_Abschlussarbeit.waitingPosY) {
                    this.posY += this.speedY;
                }
                else {
                    this.posY = EIA2SoSe23_Abschlussarbeit.waitingPosY;
                }
            }
            // if at queue pos, update status
            if (this.posX == EIA2SoSe23_Abschlussarbeit.waitingPosX[this.myQueuePos] && this.posY == EIA2SoSe23_Abschlussarbeit.waitingPosY) {
                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.AskingForIcecream);
            }
        }
        // go to seat position
        goToSeat() {
            // move to X seat pos
            if (this.posX < EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos]) {
                this.posX += this.speedX;
                if (this.posX > EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos]) {
                    this.posX = EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos];
                }
            }
            else {
                this.posX -= this.speedX;
                if (this.posX < EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos]) {
                    this.posX = EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos];
                }
            }
            // move to Y seat pos
            if (this.posY > (EIA2SoSe23_Abschlussarbeit.horizon + EIA2SoSe23_Abschlussarbeit.canvasH * 0.025)) {
                this.posY -= this.speedY;
            }
            else if (this.posX == EIA2SoSe23_Abschlussarbeit.seatPosX[this.mySeatPos]) {
                if (this.posY > EIA2SoSe23_Abschlussarbeit.seatPosY) {
                    this.posY -= this.speedY;
                }
                else {
                    // if at seat pos, update status
                    this.posY = EIA2SoSe23_Abschlussarbeit.seatPosY;
                    this.frameCount = 20;
                    this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Eating);
                }
            }
        }
        // leave the shop
        leaveShop() {
            if (this.posY < (EIA2SoSe23_Abschlussarbeit.horizon + EIA2SoSe23_Abschlussarbeit.canvasH * 0.05)) {
                this.posY += this.speedY;
            }
            else if (this.posX > EIA2SoSe23_Abschlussarbeit.waitOutsidePosX + (EIA2SoSe23_Abschlussarbeit.canvasW * 0.05)) {
                this.posX -= this.speedX;
            }
            else {
                // update status when outside
                this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.Reviewing);
            }
        }
        // leaves the scene
        exitScene() {
            if (EIA2SoSe23_Abschlussarbeit.getRandomBool()) {
                this.posY += this.speedY;
            }
            if (this.posX > EIA2SoSe23_Abschlussarbeit.spawnX) {
                this.posX -= this.speedX;
            }
            else {
                delete EIA2SoSe23_Abschlussarbeit.allCustomers[this.id]; // using splice caused weird side effects
                if (this.wasServed === true) {
                    if (this.rating < 1) {
                        this.rating = 1;
                    }
                    else if (this.rating > 10) {
                        this.rating = 10;
                    }
                    EIA2SoSe23_Abschlussarbeit.myRatingTotal += this.rating;
                    EIA2SoSe23_Abschlussarbeit.myRatingCount++;
                    console.log("Customer left (Rating: " + Math.floor(this.rating * 10) / 10 + "/10)");
                }
                else if (!this.tooExpensive) {
                    console.log("Customer left (no rating)");
                }
                else {
                    console.log("Customer left (selection too expensive)");
                }
            }
        }
        // walks around outside and loses rating while queue is occupied
        paceOutside() {
            if (this.posY < EIA2SoSe23_Abschlussarbeit.horizon + (EIA2SoSe23_Abschlussarbeit.canvasH * 0.025)) {
                this.speedY = -this.speedY;
            }
            else if (this.posY > EIA2SoSe23_Abschlussarbeit.waitingPosY) {
                this.speedY = -this.speedY;
            }
            this.posY += this.speedY;
            this.updateRating(-0.0175);
            this.frameCount--;
        }
        // tries to give icecream to customer
        giveIcecream(_creamID) {
            this.selected = false;
            EIA2SoSe23_Abschlussarbeit.waitingSelectedID = -2;
            if (_creamID == this.myIcecream.id && EIA2SoSe23_Abschlussarbeit.waffleCheck.checked === this.myIcecream.waffle) {
                console.log("Served correct icecream!");
                this.updateRating(0.5 + this.rating * 0.05);
                // update status
                if (this.checkSeats()) {
                    EIA2SoSe23_Abschlussarbeit.waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;
                    this.wasServed = true;
                    this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToSeat);
                }
                else {
                    this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.WaitingInside);
                }
                EIA2SoSe23_Abschlussarbeit.firstIcecream = false;
                EIA2SoSe23_Abschlussarbeit.correctIcecream = true;
                // update gain display
                EIA2SoSe23_Abschlussarbeit.moneyGainFrameCount = 12;
                EIA2SoSe23_Abschlussarbeit.myMoneyGain = this.myIcecream.cost;
                EIA2SoSe23_Abschlussarbeit.myMoneyCurrent += this.myIcecream.cost;
                return true;
            }
            else {
                this.updateRating(-3);
                EIA2SoSe23_Abschlussarbeit.firstIcecream = false;
                EIA2SoSe23_Abschlussarbeit.correctIcecream = false;
                console.log("Served WRONG icecream.");
            }
            return false;
        }
        // checks if a seat is free
        checkSeats() {
            for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.seatCount; i++) {
                if (EIA2SoSe23_Abschlussarbeit.seatTaken[i] != true) {
                    EIA2SoSe23_Abschlussarbeit.seatTaken[i] = true;
                    this.mySeatPos = i;
                    //console.log("SEAT FREE");
                    return true;
                }
            }
            //console.log("NO SEAT FREE");
            return false;
        }
        // checks if a queue spot if free (to ask for icecream)
        checkQueue() {
            for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.waitingPosCount; i++) {
                if (EIA2SoSe23_Abschlussarbeit.waitingPosTaken[i] < 0) {
                    EIA2SoSe23_Abschlussarbeit.waitingPosTaken[i] = this.id;
                    this.updateStatus(EIA2SoSe23_Abschlussarbeit.CustomerStatus.GoingToQueue);
                    this.myQueuePos = i;
                    //console.log("Queue available");
                    return true;
                }
            }
            //console.log("Queue NOT available");
            return false;
        }
        // update mood depending on inner rating
        checkMood() {
            if (this.rating < 3) {
                this.mood = EIA2SoSe23_Abschlussarbeit.CustomerMood.Bad;
            }
            else if (this.rating < 6) {
                this.mood = EIA2SoSe23_Abschlussarbeit.CustomerMood.Okay;
            }
            else {
                this.mood = EIA2SoSe23_Abschlussarbeit.CustomerMood.Good;
            }
        }
        // leave if shop is closed
        checkShopStatus() {
            if (!EIA2SoSe23_Abschlussarbeit.shopOpen) {
                this.status = EIA2SoSe23_Abschlussarbeit.CustomerStatus.Leaving;
                // if in queue, leave queue
                if (this.myQueuePos >= 0) {
                    EIA2SoSe23_Abschlussarbeit.waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;
                    this.updateRating(-4.2);
                    console.log("Kicked out");
                }
            }
        }
        // updates status
        updateStatus(_newStatus) {
            this.status = _newStatus;
        }
        // updates rating
        updateRating(_change) {
            this.rating += _change;
        }
    }
    EIA2SoSe23_Abschlussarbeit.Customer = Customer;
})(EIA2SoSe23_Abschlussarbeit || (EIA2SoSe23_Abschlussarbeit = {}));
//# sourceMappingURL=customer.js.map