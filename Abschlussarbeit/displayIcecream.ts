namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    export class DisplayIcecream extends Moveable {
        private toppingColors: string[];
        private sauceColor: string;
        private sprinklesColor: string;
        private whipped: boolean;
        public waffle: boolean;
        public cost: number;
        public id: string;

        public constructor(_posX: number, _posY: number, _toppingColors: string[],
            _sauceColor: string, _sprinklesColor: string, _whipped: boolean,
            _waffle: boolean, _cost: number, _id: string, _scaling: number = 1) {
                super(_posX, _posY, _scaling);

                this.toppingColors = _toppingColors;
                this.sauceColor = _sauceColor;
                this.sprinklesColor = _sprinklesColor;
                this.whipped = _whipped;
                this.waffle = _waffle;
                this.cost = _cost;
                this.id = _id;
        }

        public draw(): void {
            // scales icecream depending on screen position
            this.scaling = (this.posY * canvasH) * 0.0000014;

            if (canvasW > 1000) {
                this.scaling = 0.6;
            }

            // draws whipped cream
            if (this.whipped) {
                this.drawWhipped();
            }

            // draws toppings and sauces (from last to first)
            let toppingAmount: number = this.toppingColors.length;

            for (let i: number = toppingAmount - 1; i > -1; i--) {
                this.drawToppingSauceSprinkles(i);
            }

            // draws waffle or bowl
            if (this.waffle) {
                this.drawWaffle();
            } else {
                this.drawBowl();
            }
        }

        // draws the bowl
        private drawBowl(): void {
            crc2.save();
            crc2.translate(this.posX, this.posY);
            
            //console.log(this.scaling);
            let standW: number = canvasW * 0.05;
            let standH: number = -(canvasH * 0.02);
            let handleW: number = canvasW * 0.01;
            let handleH: number = -(canvasH * 0.03);
            let cupH: number = standH - canvasH * 0.04;
            
            standW *= this.scaling;
            standH *= this.scaling;
            handleW *= this.scaling;
            handleH *= this.scaling;
            cupH *= this.scaling;
            
            crc2.beginPath();
            crc2.fillStyle = bowlColor;
            crc2.lineWidth = 2;
            crc2.moveTo(0, 0);
            crc2.lineTo(standW, 0);
            crc2.bezierCurveTo(standW, standH, 0, standH, 0, 0);
            crc2.rect(standW * 0.4, 0, handleW, handleH);
            crc2.moveTo(0, cupH);
            crc2.lineTo(standW, cupH);
            crc2.bezierCurveTo(standW, standH, 0, standH, 0, cupH);
            crc2.fill();
            crc2.closePath();

            crc2.restore();
        }

        // draws the waffle
        private drawWaffle(): void {
            crc2.save();
            crc2.translate(this.posX, this.posY);

            let standW: number = (canvasW * 0.05);
            let waffleH: number = canvasH * 0.02;
            let cupH: number = -(canvasH * 0.02) - canvasH * 0.04;

            standW *= this.scaling;
            waffleH *= this.scaling;
            cupH *= this.scaling;

            crc2.beginPath();
            crc2.fillStyle = waffleColor;
            crc2.moveTo(standW * 0.5, waffleH);
            crc2.lineTo(0, cupH);
            crc2.lineTo(standW, cupH);
            crc2.fill();
            crc2.closePath();

            crc2.restore();
        }

        // draws toppings and sauces
        private drawToppingSauceSprinkles(_toppingNum: number): void {
            crc2.save();
            crc2.translate(this.posX, this.posY);

            let cupW: number = 0;
            let cupH: number = 0;
            let creamR: number = 0;

            let sauceH: number = 0;
            let sauceR: number = 0;
            let sauceStart: number = 0;
            let sauceEnd: number = 0;

            let sprinkleLength: number = 0;

            // getting topping position depending on which it is
            switch (_toppingNum) {
                case 0:
                    cupW = canvasW * 0.018;
                    cupH = -(canvasH * 0.065);
                    creamR = canvasW * 0.017;

                    sauceH = -(canvasH * 0.075);
                    sauceR = -(canvasH * 0.1);
                    sauceStart = canvasW * 0.002;
                    sauceEnd = canvasW * 0.034;

                    sprinkleLength = canvasW * 0.008;
                    break;
                case 1:
                    cupW = canvasW * 0.033;
                    cupH = -(canvasH * 0.064);
                    creamR = canvasW * 0.015;

                    sauceH = -(canvasH * 0.068);
                    sauceR = -(canvasH * 0.1);
                    sauceStart = canvasW * 0.02;
                    sauceEnd = canvasW * 0.048;

                    sprinkleLength = canvasW * 0.007;
                    break;
                case 2:
                    cupW = canvasW * 0.025;
                    cupH = -(canvasH * 0.084);
                    creamR = canvasW * 0.014;

                    sauceH = -(canvasH * 0.098);
                    sauceR = -(canvasH * 0.112);
                    sauceStart = canvasW * 0.014;
                    sauceEnd = canvasW * 0.037;

                    sprinkleLength = canvasW * 0.0065;
                    break;
            }

            // cream scaling
            cupW *= this.scaling;
            cupH *= this.scaling;
            creamR *= this.scaling;

            // drawing topping
            crc2.beginPath();
            crc2.fillStyle = this.toppingColors[_toppingNum];
            crc2.strokeStyle = outlineColor;
            crc2.arc(cupW, cupH, creamR, 0, 2 * Math.PI);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            if (this.sauceColor != "") {
                // sauce scaling
                sauceH *= this.scaling;
                sauceR *= this.scaling;
                sauceStart *= this.scaling;
                sauceEnd *= this.scaling;

                // drawing sauce
                crc2.beginPath();
                crc2.moveTo(sauceStart, sauceH);
                crc2.bezierCurveTo(sauceStart, sauceR, sauceEnd, sauceR, sauceEnd, sauceH);
                crc2.bezierCurveTo(sauceStart * 0.3, sauceR * 0.7, sauceEnd * 0.9, sauceR * 0.9, sauceStart, sauceH);
                crc2.fillStyle = this.sauceColor;
                crc2.strokeStyle = outlineColor;
                crc2.fill();
                crc2.stroke();
                crc2.closePath();
            }

            // drawing sprinkles (if they exist)
            if (this.sprinklesColor != "") {
                sprinkleLength *= this.scaling;

                crc2.beginPath();
                crc2.moveTo(cupW, cupH);
                crc2.lineTo(cupW - sprinkleLength, cupH - sprinkleLength * 0.5);

                crc2.moveTo(cupW + sprinkleLength, cupH - sprinkleLength);
                crc2.lineTo(cupW + sprinkleLength * 1.8, cupH - sprinkleLength * 1.8);

                crc2.moveTo(cupW - sprinkleLength * 1.5, cupH - sprinkleLength * 1.5);
                crc2.lineTo(cupW - sprinkleLength * 1.9, cupH - sprinkleLength * 0.6);

                crc2.moveTo(cupW + sprinkleLength * 0.2, cupH - sprinkleLength * 1.7);
                crc2.lineTo(cupW - sprinkleLength * 0.7, cupH - sprinkleLength * 1.3);

                crc2.moveTo(cupW + sprinkleLength, cupH + sprinkleLength * 0.3);
                crc2.lineTo(cupW + sprinkleLength * 1.8, cupH);

                crc2.strokeStyle = this.sprinklesColor;
                crc2.lineWidth = sprinkleLength * 0.3;
                crc2.stroke();
                crc2.closePath();
            }

            crc2.restore();
        }

        // draws whipped cream
        private drawWhipped(): void {
            crc2.save();
            crc2.translate(this.posX, this.posY);

            let cupW: number = canvasW * 0.01;
            let cupH: number = -(canvasH * 0.06);
            let whipLength: number = canvasW * 0.045;

            // scaling
            cupW *= this.scaling;
            cupH *= this.scaling;
            whipLength *= this.scaling;

            // drawing
            crc2.beginPath();
            crc2.moveTo(cupW, cupH);
            crc2.bezierCurveTo(cupW * 0.6, cupH - whipLength * 0.6, cupW * 2, cupH - whipLength * 0.6, cupW * 1.8, cupH - whipLength);
            crc2.bezierCurveTo(cupW * 2, cupH - whipLength, cupW * 4.5, cupH - whipLength * 0.6, cupW * 4, cupH);
            crc2.fillStyle = whippedColor;
            crc2.fill();
            crc2.closePath();

            crc2.restore();
        }

        // removes a topping (by eating it), eats whipped cream first (duh)
        public eatTopping(): boolean {
            if (this.whipped) {
                this.whipped = false;
            } else {
                this.toppingColors.pop();
            }

            if (this.toppingColors.length < 1) {
                return true;
            } else {
                return false;
            }
        }

        // changes current toppings (for creating)
        public changeToppings(_newToppings: string[]): void {
            //console.log("Changed toppings");
            this.toppingColors = _newToppings;
        }

        // changes current toppings (for creating)
        public changeSauce(_newSauce: string): void {
            //console.log("Changed toppings");
            this.sauceColor = _newSauce;
        }

        // changes current toppings (for creating)
        public changeSprinkles(_newSprinkles: string): void {
            //console.log("Changed toppings");
            this.sprinklesColor = _newSprinkles;
        }

        // changes current toppings (for creating)
        public changeWhipped(_newWhip: boolean): void {
            //console.log("Changed toppings");
            this.whipped = _newWhip;
        }

        // changes position (for customer carrying/eating)
        public changePos(_posX: number, _posY: number): void {
            this.posX = _posX;
            this.posY = _posY;
        }
    }
}