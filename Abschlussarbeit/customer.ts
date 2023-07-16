namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    export class Customer extends Moveable {
        private speedX: number;
        private speedY: number;
        private id: number;
        private mood: CustomerMood;
        public status: CustomerStatus;
        private rating: number;
        private frameCount: number;
        private mouthOpen: boolean;
        private myIcecream: DisplayIcecream;
        public selected: boolean;
        private myQueuePos: number;
        private mySeatPos: number;
        private wasServed: boolean;
        private tooExpensive: boolean;

        public constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _id: number, _myIcecream: DisplayIcecream, _tooExpensive: boolean = false, _scaling: number = 1, _mood: CustomerMood = CustomerMood.Good, _status: CustomerStatus = CustomerStatus.Arriving, _rating: number = 10, _frameCount: number = -20, _mouthOpen: boolean = false, _selected: boolean = false, _myQueuePos: number = -3, _mySeatPos: number = -1, _wasServed: boolean = false) {
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

        public draw(): void {
            // scales customer depending on screen position
            this.scaling = (this.posY * canvasH) * 0.0000014;

            let customerR: number = canvasW * 0.065;
            customerR *= this.scaling;

            if (customerR > 100) {
                customerR = 100;
            }

            this.drawFace(customerR);

            this.doAction(customerR);

            this.checkMood();
        }

        // draws face depending on mood
        private drawFace(_customerR: number): void {
            crc2.save();
            crc2.translate(this.posX, this.posY);

            // head
            crc2.beginPath();
            crc2.fillStyle = getMoodColor(this.mood);
            // change outline color if selected
            if (this.selected && this.status == CustomerStatus.AskingForIcecream) {
                crc2.strokeStyle = outlineSelectedColor;
            } else {
                crc2.strokeStyle = outlineCustomerColor;
            }
            crc2.lineWidth = _customerR * 0.05;
            crc2.arc(_customerR, -_customerR, _customerR, 0, 2 * Math.PI);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            // eyes
            let eyeWLeft: number = _customerR * 0.6;
            let eyeWRight: number = _customerR * 1.4;
            let eyeH: number = -(_customerR * 1.25);
            let eyeR: number = _customerR * 0.12;

            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.arc(eyeWLeft, eyeH, eyeR, 0, 2 * Math.PI);
            crc2.arc(eyeWRight,eyeH, eyeR, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

            // mouth
            let mouthW: number = -(_customerR * 0.6);

            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.lineWidth = eyeR * 0.8;

            if (!this.mouthOpen) {
                if (this.status == CustomerStatus.Eating || this.status == CustomerStatus.WaitingInside) {
                    this.mouthOpen = true;
                }

                switch (this.mood) {
                    case CustomerMood.Bad: // frowning
                        let frownCurve: number = -(_customerR * 0.7);
                        mouthW *= 0.8;
                        
                        crc2.moveTo(eyeWLeft, mouthW);
                        crc2.bezierCurveTo(eyeWLeft, frownCurve, eyeWRight, frownCurve, eyeWRight, mouthW);
                        
                        break;
                    case CustomerMood.Okay: // neutral
                        crc2.moveTo(eyeWLeft, mouthW);
                        crc2.lineTo(eyeWRight, mouthW);
                        break;
                    case CustomerMood.Good: // smiling
                        let smileCurve: number = -(_customerR * 0.4);
                        mouthW *= 1.1;
                        
                        crc2.moveTo(eyeWLeft, mouthW);
                        crc2.bezierCurveTo(eyeWLeft, smileCurve, eyeWRight, smileCurve, eyeWRight, mouthW);
                        
                        break;
                }
            } else { // eating simulator
                this.mouthOpen = false;
                crc2.arc(_customerR, mouthW * 0.9, eyeR * 1.7, 0, 2 * Math.PI);
            }
            

            crc2.stroke();
            crc2.closePath();

            crc2.restore();
        }

        // draws speech bubble with icecream
        public drawSpeechbubble(): void {
            let speechR: number = canvasW * 0.065
            speechR *= this.scaling;

            if (speechR > 100) {
                speechR = 100;
            }

            crc2.save();
            crc2.translate(this.posX, this.posY);

            // change outline color if selected
            let strokeColor: string = outlineCustomerColor;

            if (this.selected && this.status == CustomerStatus.AskingForIcecream) {
                strokeColor = outlineSelectedColor;
            }

            // draw bubble
            crc2.beginPath();
            crc2.fillStyle = speechBubbleColor;
            crc2.strokeStyle = strokeColor;
            crc2.lineWidth = speechR * 0.05;
            crc2.ellipse(-(speechR), -(speechR * 3), speechR * 1.4, speechR, Math.PI, 0, 2 * Math.PI);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            // draw connecting arrow
            crc2.beginPath();
            crc2.fillStyle = speechBubbleColor;
            crc2.strokeStyle = strokeColor;
            crc2.lineWidth = speechR * 0.05;
            crc2.moveTo(-(speechR * 0.3), -(speechR * 2.15));
            crc2.lineTo(speechR * 0.2, -(speechR * 1.8));
            crc2.lineTo(speechR * 0.1, -(speechR * 2.4));
            crc2.fill()
            crc2.stroke();
            crc2.closePath();

            crc2.restore();

            // drawing requested icecream
            this.myIcecream.changePos(this.posX - speechR * 1.3, this.posY -(speechR * 2.6));
            this.myIcecream.draw();
        }

        // do action depending on status
        private doAction(_customerR: number): void {
            switch (this.status) {
                case CustomerStatus.Arriving:
                    this.arrive();

                    this.checkShopStatus();
                    break;
                case CustomerStatus.WaitingOutside:
                    // checks if queue is free every 20 frames
                    if (this.frameCount % 20 == 0) {
                        if (!this.checkQueue() && this.frameCount < -10) {
                            this.frameCount = 200;
                        } else if (this.speedY < 0) { // fix speed if pacing upwards
                            this.speedY = -this.speedY;
                        }
                    } else if (this.frameCount < 0) {
                        this.updateStatus(CustomerStatus.Reviewing);
                    }

                    this.paceOutside();

                    this.checkShopStatus();
                    break;
                case CustomerStatus.GoingToQueue:
                    this.frameCount = -20;
                    this.goToQueue();

                    this.checkShopStatus();
                    break;
                case CustomerStatus.AskingForIcecream:
                    this.updateRating(-0.0225);

                    this.checkShopStatus();
                    break;
                case CustomerStatus.WaitingInside:
                    // drawing icecream in hand
                    this.myIcecream.changePos(this.posX + _customerR * 1.3, this.posY);
                    this.myIcecream.draw();

                    //console.log(this.id, this.frameCount);

                    // checks if queue is free every 20 frames
                    if (this.frameCount % 20 == 0) {
                        if (!this.checkSeats()) {

                        } else {
                            waitingPosTaken[this.myQueuePos] = -1;
                            this.myQueuePos = -1;
                            this.wasServed = true;
                            this.updateStatus(CustomerStatus.GoingToSeat);
                        }
                    }

                    // eat toppings by frame count inside (still losing rating if not seated)
                    if (this.frameCount < 0) {
                        this.frameCount = 140;

                        if (this.wasServed === true) {
                            // when fully eaten, update status (leave)
                            if (this.myIcecream.eatTopping()) {
                                waitingPosTaken[this.myQueuePos] = -1;
                                this.myQueuePos = -1;
                                this.updateStatus(CustomerStatus.Leaving);
                            }
                        }

                        this.wasServed = true;
                    }

                    this.frameCount--;
                    this.updateRating(-0.005);

                    this.checkShopStatus();
                    break;
                case CustomerStatus.GoingToSeat:
                    // drawing icecream in hand
                    this.myIcecream.changePos(this.posX + _customerR * 1.3, this.posY);
                    this.myIcecream.draw();

                    this.goToSeat();
                    break;
                case CustomerStatus.Eating:
                    // draw icecream on table, left right depending on seat pos
                    if (this.mySeatPos % 2) {
                        this.myIcecream.changePos(this.posX - _customerR * 1.2, canvasH * 0.495);
                        this.myIcecream.draw();
                    } else {
                        this.myIcecream.changePos(this.posX + _customerR * 2.2, canvasH * 0.495);
                        this.myIcecream.draw();
                    }

                    this.frameCount--;

                    // eat toppings by frame count
                    if (this.frameCount < 0) {
                        let upperLimit: number = 120;
                        let lowerLimit: number = 90;

                        if (!shopOpen) {
                            upperLimit *= 0.5;
                            lowerLimit *= 0.5;
                        }

                        this.frameCount = getRandomNumber(upperLimit, lowerLimit);

                        // when fully eaten, update status (leave)
                        if (this.myIcecream.eatTopping()) {
                            seatTaken[this.mySeatPos] = false;
                            this.updateStatus(CustomerStatus.Leaving);
                        }
                    }
                    break;
                case CustomerStatus.Leaving:
                    this.leaveShop();
                    break;
                case CustomerStatus.Reviewing:
                    this.exitScene();
                    break;
            }

            if (this.posY < seatPosY) {
                this.speedY = -this.speedY;

                if (this.speedY < 0) {
                    this.speedY = -this.speedY;
                }
            }
        }

        private arrive(): void {
            if (this.posX + this.speedX < waitOutsidePosX) {
                this.posX += this.speedX;
            } else if (this.checkQueue() && !this.tooExpensive) { // check if queue is available
                this.updateStatus(CustomerStatus.GoingToQueue); // go to queue
            } else if (!this.tooExpensive) { // if not, wait outside
                this.updateStatus(CustomerStatus.WaitingOutside);
            } else {
                // if in queue, leave queue
                if (this.myQueuePos >= 0) {
                    waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;
                }

                this.updateRating(-7.5);
                this.updateStatus(CustomerStatus.Reviewing);
            }
        }

        // go to queue position
        private goToQueue(): void {
            // move to X queue pos
            if (this.posX < waitingPosX[this.myQueuePos]) {
                this.posX += this.speedX;

            } else {
                this.posX = waitingPosX[this.myQueuePos];

                // move to Y queue pos
                if (this.posY < waitingPosY) {
                    this.posY += this.speedY;
                } else {
                    this.posY = waitingPosY
                }
            }

            // if at queue pos, update status
            if (this.posX == waitingPosX[this.myQueuePos] && this.posY == waitingPosY) {
                this.updateStatus(CustomerStatus.AskingForIcecream);
            }
        }

        // go to seat position
        private goToSeat(): void {
            // move to X seat pos
            if (this.posX < seatPosX[this.mySeatPos]) {
                this.posX += this.speedX;

                if (this.posX > seatPosX[this.mySeatPos]) {
                    this.posX = seatPosX[this.mySeatPos];
                }
            } else {
                this.posX -= this.speedX;

                if (this.posX < seatPosX[this.mySeatPos]) {
                    this.posX = seatPosX[this.mySeatPos];
                }
            }

            // move to Y seat pos
            if (this.posY > (horizon + canvasH * 0.025)) {
                this.posY -= this.speedY;
            } else if (this.posX == seatPosX[this.mySeatPos]) {
                if (this.posY > seatPosY) {
                    this.posY -= this.speedY;
                } else {
                    // if at seat pos, update status
                    this.posY = seatPosY;

                    this.frameCount = 20;
                    this.updateStatus(CustomerStatus.Eating);
                }
            }
        }

        // leave the shop
        private leaveShop(): void {
            if (this.posY < (horizon + canvasH * 0.05)) {
                this.posY += this.speedY;
            } else if (this.posX > waitOutsidePosX + (canvasW * 0.05)) {
                this.posX -= this.speedX;
            } else {
                // update status when outside
                this.updateStatus(CustomerStatus.Reviewing);
            }
        }

        // leaves the scene
        private exitScene(): void {
            if (getRandomBool()) {
                this.posY += this.speedY;
            }

            if (this.posX > spawnX) {
                this.posX -= this.speedX;
            } else {
                delete allCustomers[this.id]; // using splice caused weird side effects

                if (this.wasServed === true) {
                    if (this.rating < 1) {
                        this.rating = 1;
                    } else if (this.rating > 10) {
                        this.rating = 10;
                    }

                    myRatingTotal += this.rating;
                    myRatingCount++;

                    console.log("Customer left (Rating: " + Math.floor(this.rating * 10) / 10 +"/10)");
                } else if (!this.tooExpensive) {
                    console.log("Customer left (no rating)");
                } else {
                    console.log("Customer left (selection too expensive)");
                }
            }
        }

        // walks around outside and loses rating while queue is occupied
        private paceOutside(): void {
            if (this.posY < horizon + (canvasH * 0.025)) {
                this.speedY = -this.speedY;
            } else if (this.posY > waitingPosY) {
                this.speedY = -this.speedY;
            }

            this.posY += this.speedY;

            this.updateRating(-0.0175);
            this.frameCount--;
        }

        // tries to give icecream to customer
        public giveIcecream(_creamID: string): boolean {
            this.selected = false;
            waitingSelectedID = -2;

            if (_creamID == this.myIcecream.id && waffleCheck.checked === this.myIcecream.waffle) {
                //console.log("YES THAT'S IT");

                this.updateRating(0.5 + this.rating * 0.05);
                
                // update status
                if (this.checkSeats()) {
                    waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;
                    this.wasServed = true;
                    this.updateStatus(CustomerStatus.GoingToSeat);
                } else {
                    this.updateStatus(CustomerStatus.WaitingInside);
                }

                firstIcecream = false;
                correctIcecream = true;

                // update gain display
                moneyGainFrameCount = 12;
                myMoneyGain = this.myIcecream.cost;
                myMoneyCurrent += this.myIcecream.cost;
                
                return true;
            } else {
                this.updateRating(-3);

                firstIcecream = false;
                correctIcecream = false;
                //console.log("NO I DON'T WANT THAT");
            }

            return false;
        }

        // checks if a seat is free
        private checkSeats(): boolean {
            for (let i: number = 0; i < seatCount; i++) {
                if (seatTaken[i] != true) {
                    seatTaken[i] = true;

                    this.mySeatPos = i;

                    //console.log("SEAT FREE");
                    return true;
                }
            }

            //console.log("NO SEAT FREE");
            return false;
        }

        // checks if a queue spot if free (to ask for icecream)
        private checkQueue(): boolean {
            for (let i: number = 0; i < waitingPosCount; i++) {
                if (waitingPosTaken[i] < 0) {
                    waitingPosTaken[i] = this.id;

                    this.updateStatus(CustomerStatus.GoingToQueue);
                    this.myQueuePos = i;

                    //console.log("Queue available");
                    return true;
                }
            }

            //console.log("Queue NOT available");
            return false;
        }

        // update mood depending on inner rating
        private checkMood(): void {
            if (this.rating < 3) {
                this.mood = CustomerMood.Bad;
            } else if (this.rating < 6) {
                this.mood = CustomerMood.Okay;
            } else {
                this.mood = CustomerMood.Good;
            }
        }

        // leave if shop is closed
        private checkShopStatus(): void {
            if (!shopOpen) {
                this.status = CustomerStatus.Leaving;

                // if in queue, leave queue
                if (this.myQueuePos >= 0) {
                    waitingPosTaken[this.myQueuePos] = -1;
                    this.myQueuePos = -1;

                    this.updateRating(-4.2);
                    console.log("Kicked out");
                }
            }
        }

        // updates status
        private updateStatus(_newStatus: CustomerStatus): void {
            this.status = _newStatus;
        }

        // updates rating
        private updateRating(_change: number): void {
            this.rating += _change;
        }
    }
}