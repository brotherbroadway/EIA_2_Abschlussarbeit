"use strict";
var EIA2SoSe23_Abschlussarbeit;
(function (EIA2SoSe23_Abschlussarbeit) {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 15.07.2023
Quellen: -
*/
    class DisplayIcecream extends EIA2SoSe23_Abschlussarbeit.Moveable {
        constructor(_posX, _posY, _toppingColors, _sauceColor, _sprinklesColor, _whipped, _waffle, _cost, _id, _scaling = 1) {
            super(_posX, _posY, _scaling);
            this.toppingColors = _toppingColors;
            this.sauceColor = _sauceColor;
            this.sprinklesColor = _sprinklesColor;
            this.whipped = _whipped;
            this.waffle = _waffle;
            this.cost = _cost;
            this.id = _id;
        }
        draw() {
            // scales icecream depending on screen position
            this.scaling = (this.posY * EIA2SoSe23_Abschlussarbeit.canvasH) * 0.0000014;
            if (EIA2SoSe23_Abschlussarbeit.canvasW > 1000) {
                this.scaling = 0.6;
            }
            // draws whipped cream
            if (this.whipped) {
                this.drawWhipped();
            }
            // draws toppings and sauces (from last to first)
            let toppingAmount = this.toppingColors.length;
            for (let i = toppingAmount - 1; i > -1; i--) {
                this.drawToppingSauceSprinkles(i);
            }
            // draws waffle or bowl
            if (this.waffle) {
                this.drawWaffle();
            }
            else {
                this.drawBowl();
            }
        }
        // draws the bowl
        drawBowl() {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            //console.log(this.scaling);
            let standW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.05;
            let standH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.02);
            let handleW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.01;
            let handleH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.03);
            let cupH = standH - EIA2SoSe23_Abschlussarbeit.canvasH * 0.04;
            standW *= this.scaling;
            standH *= this.scaling;
            handleW *= this.scaling;
            handleH *= this.scaling;
            cupH *= this.scaling;
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.bowlColor;
            EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = 2;
            EIA2SoSe23_Abschlussarbeit.crc2.moveTo(0, 0);
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(standW, 0);
            EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(standW, standH, 0, standH, 0, 0);
            EIA2SoSe23_Abschlussarbeit.crc2.rect(standW * 0.4, 0, handleW, handleH);
            EIA2SoSe23_Abschlussarbeit.crc2.moveTo(0, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(standW, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(standW, standH, 0, standH, 0, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        // draws the waffle
        drawWaffle() {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            let standW = (EIA2SoSe23_Abschlussarbeit.canvasW * 0.05);
            let waffleH = EIA2SoSe23_Abschlussarbeit.canvasH * 0.02;
            let cupH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.02) - EIA2SoSe23_Abschlussarbeit.canvasH * 0.04;
            standW *= this.scaling;
            waffleH *= this.scaling;
            cupH *= this.scaling;
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.waffleColor;
            EIA2SoSe23_Abschlussarbeit.crc2.moveTo(standW * 0.5, waffleH);
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(0, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.lineTo(standW, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        // draws toppings and sauces
        drawToppingSauceSprinkles(_toppingNum) {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            let cupW = 0;
            let cupH = 0;
            let creamR = 0;
            let sauceH = 0;
            let sauceR = 0;
            let sauceStart = 0;
            let sauceEnd = 0;
            let sprinkleLength = 0;
            // getting topping position depending on which it is
            switch (_toppingNum) {
                case 0:
                    cupW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.018;
                    cupH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.065);
                    creamR = EIA2SoSe23_Abschlussarbeit.canvasW * 0.017;
                    sauceH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.075);
                    sauceR = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.1);
                    sauceStart = EIA2SoSe23_Abschlussarbeit.canvasW * 0.002;
                    sauceEnd = EIA2SoSe23_Abschlussarbeit.canvasW * 0.034;
                    sprinkleLength = EIA2SoSe23_Abschlussarbeit.canvasW * 0.008;
                    break;
                case 1:
                    cupW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.033;
                    cupH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.064);
                    creamR = EIA2SoSe23_Abschlussarbeit.canvasW * 0.015;
                    sauceH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.068);
                    sauceR = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.1);
                    sauceStart = EIA2SoSe23_Abschlussarbeit.canvasW * 0.02;
                    sauceEnd = EIA2SoSe23_Abschlussarbeit.canvasW * 0.048;
                    sprinkleLength = EIA2SoSe23_Abschlussarbeit.canvasW * 0.007;
                    break;
                case 2:
                    cupW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.025;
                    cupH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.084);
                    creamR = EIA2SoSe23_Abschlussarbeit.canvasW * 0.014;
                    sauceH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.098);
                    sauceR = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.112);
                    sauceStart = EIA2SoSe23_Abschlussarbeit.canvasW * 0.014;
                    sauceEnd = EIA2SoSe23_Abschlussarbeit.canvasW * 0.037;
                    sprinkleLength = EIA2SoSe23_Abschlussarbeit.canvasW * 0.0065;
                    break;
            }
            // cream scaling
            cupW *= this.scaling;
            cupH *= this.scaling;
            creamR *= this.scaling;
            // drawing topping
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = this.toppingColors[_toppingNum];
            EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = EIA2SoSe23_Abschlussarbeit.outlineColor;
            EIA2SoSe23_Abschlussarbeit.crc2.arc(cupW, cupH, creamR, 0, 2 * Math.PI);
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.stroke();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            if (this.sauceColor != "") {
                // sauce scaling
                sauceH *= this.scaling;
                sauceR *= this.scaling;
                sauceStart *= this.scaling;
                sauceEnd *= this.scaling;
                // drawing sauce
                EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(sauceStart, sauceH);
                EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(sauceStart, sauceR, sauceEnd, sauceR, sauceEnd, sauceH);
                EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(sauceStart * 0.3, sauceR * 0.7, sauceEnd * 0.9, sauceR * 0.9, sauceStart, sauceH);
                EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = this.sauceColor;
                EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = EIA2SoSe23_Abschlussarbeit.outlineColor;
                EIA2SoSe23_Abschlussarbeit.crc2.fill();
                EIA2SoSe23_Abschlussarbeit.crc2.stroke();
                EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            }
            // drawing sprinkles (if they exist)
            if (this.sprinklesColor != "") {
                sprinkleLength *= this.scaling;
                EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW, cupH);
                EIA2SoSe23_Abschlussarbeit.crc2.lineTo(cupW - sprinkleLength, cupH - sprinkleLength * 0.5);
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW + sprinkleLength, cupH - sprinkleLength);
                EIA2SoSe23_Abschlussarbeit.crc2.lineTo(cupW + sprinkleLength * 1.8, cupH - sprinkleLength * 1.8);
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW - sprinkleLength * 1.5, cupH - sprinkleLength * 1.5);
                EIA2SoSe23_Abschlussarbeit.crc2.lineTo(cupW - sprinkleLength * 1.9, cupH - sprinkleLength * 0.6);
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW + sprinkleLength * 0.2, cupH - sprinkleLength * 1.7);
                EIA2SoSe23_Abschlussarbeit.crc2.lineTo(cupW - sprinkleLength * 0.7, cupH - sprinkleLength * 1.3);
                EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW + sprinkleLength, cupH + sprinkleLength * 0.3);
                EIA2SoSe23_Abschlussarbeit.crc2.lineTo(cupW + sprinkleLength * 1.8, cupH);
                EIA2SoSe23_Abschlussarbeit.crc2.strokeStyle = this.sprinklesColor;
                EIA2SoSe23_Abschlussarbeit.crc2.lineWidth = sprinkleLength * 0.3;
                EIA2SoSe23_Abschlussarbeit.crc2.stroke();
                EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            }
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        // draws whipped cream
        drawWhipped() {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            EIA2SoSe23_Abschlussarbeit.crc2.translate(this.posX, this.posY);
            let cupW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.01;
            let cupH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.06);
            let whipLength = EIA2SoSe23_Abschlussarbeit.canvasW * 0.045;
            // scaling
            cupW *= this.scaling;
            cupH *= this.scaling;
            whipLength *= this.scaling;
            // drawing
            EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
            EIA2SoSe23_Abschlussarbeit.crc2.moveTo(cupW, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(cupW * 0.6, cupH - whipLength * 0.6, cupW * 2, cupH - whipLength * 0.6, cupW * 1.8, cupH - whipLength);
            EIA2SoSe23_Abschlussarbeit.crc2.bezierCurveTo(cupW * 2, cupH - whipLength, cupW * 4.5, cupH - whipLength * 0.6, cupW * 4, cupH);
            EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = EIA2SoSe23_Abschlussarbeit.whippedColor;
            EIA2SoSe23_Abschlussarbeit.crc2.fill();
            EIA2SoSe23_Abschlussarbeit.crc2.closePath();
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        // removes a topping (by eating it), eats whipped cream first (duh)
        eatTopping() {
            if (this.whipped) {
                this.whipped = false;
            }
            else {
                this.toppingColors.pop();
            }
            if (this.toppingColors.length < 1) {
                return true;
            }
            else {
                return false;
            }
        }
        // changes current toppings (for creating)
        changeToppings(_newToppings) {
            //console.log("Changed toppings");
            this.toppingColors = _newToppings;
        }
        // changes current toppings (for creating)
        changeSauce(_newSauce) {
            //console.log("Changed toppings");
            this.sauceColor = _newSauce;
        }
        // changes current toppings (for creating)
        changeSprinkles(_newSprinkles) {
            //console.log("Changed toppings");
            this.sprinklesColor = _newSprinkles;
        }
        // changes current toppings (for creating)
        changeWhipped(_newWhip) {
            //console.log("Changed toppings");
            this.whipped = _newWhip;
        }
        // changes position (for customer carrying/eating)
        changePos(_posX, _posY) {
            this.posX = _posX;
            this.posY = _posY;
        }
    }
    EIA2SoSe23_Abschlussarbeit.DisplayIcecream = DisplayIcecream;
})(EIA2SoSe23_Abschlussarbeit || (EIA2SoSe23_Abschlussarbeit = {}));
//# sourceMappingURL=displayIcecream.js.map