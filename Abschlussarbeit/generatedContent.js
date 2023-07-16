"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var EIA2SoSe23_Abschlussarbeit;
(function (EIA2SoSe23_Abschlussarbeit) {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    // different icecream types
    let CreamTypes;
    (function (CreamTypes) {
        CreamTypes[CreamTypes["Chocolate"] = 0] = "Chocolate";
        CreamTypes[CreamTypes["Vanilla"] = 1] = "Vanilla";
        CreamTypes[CreamTypes["Strawberry"] = 2] = "Strawberry";
        CreamTypes[CreamTypes["Blueberry"] = 3] = "Blueberry";
        CreamTypes[CreamTypes["Banana"] = 4] = "Banana";
        CreamTypes[CreamTypes["Smurf"] = 5] = "Smurf";
    })(CreamTypes = EIA2SoSe23_Abschlussarbeit.CreamTypes || (EIA2SoSe23_Abschlussarbeit.CreamTypes = {}));
    // icecream production cost
    EIA2SoSe23_Abschlussarbeit.creamValue = [1.4, 1, 1.2, 0.6, 0.9, 1.6];
    // sauce production cost
    EIA2SoSe23_Abschlussarbeit.sauceValue = [0.7, 0.5, 0.6, 0.3, 0.65, 0.75];
    // sprinkle types
    let SprinklesType;
    (function (SprinklesType) {
        SprinklesType[SprinklesType["None"] = 0] = "None";
        SprinklesType[SprinklesType["Chocolate"] = 1] = "Chocolate";
        SprinklesType[SprinklesType["Mint"] = 2] = "Mint";
    })(SprinklesType = EIA2SoSe23_Abschlussarbeit.SprinklesType || (EIA2SoSe23_Abschlussarbeit.SprinklesType = {}));
    // sprinkle production cost
    EIA2SoSe23_Abschlussarbeit.sprinkleValue = [0, 0.5, 0.75];
    // whipped cream production cost
    EIA2SoSe23_Abschlussarbeit.whippedValue = 0.5;
    // waffle cost (half is production cost)
    EIA2SoSe23_Abschlussarbeit.waffleValue = 0.3;
    // list of price divided by prod cost for customers to reference
    EIA2SoSe23_Abschlussarbeit.spendList = [];
    var taskTest;
    // installs listeners
    function installListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.push(document.getElementById("dropdowncream0"));
            EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.push(document.getElementById("dropdowncream1"));
            EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.push(document.getElementById("dropdowncream2"));
            EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: none");
            for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.length; i++) {
                //setSelectedIndex(dropdownToppingsArray[i], 0);
                if (i > 0) {
                    EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i].setAttribute("style", "display: none");
                }
                // install toppings dropdown event listener here (cuz it's more convenient than having 2nd for-loop)
                EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i].addEventListener("change", selectToppingChange);
            }
            EIA2SoSe23_Abschlussarbeit.removeToppingBttn.disabled = true;
            EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = true;
            //removeToppingBttn.setAttribute("style", "display: none");
            // install event listeners (for serving tab)
            EIA2SoSe23_Abschlussarbeit.serveBttn.addEventListener("click", clickServeButton);
            EIA2SoSe23_Abschlussarbeit.editServeBttn.addEventListener("click", clickEditServeButton);
            EIA2SoSe23_Abschlussarbeit.deleteServeBttn.addEventListener("click", clickDeleteServeButton);
            EIA2SoSe23_Abschlussarbeit.dropdownServe.addEventListener("change", serveSelectionChange);
            EIA2SoSe23_Abschlussarbeit.waffleCheck.addEventListener("change", serveSelectionChange);
            // install event listeners (for creation tab)
            EIA2SoSe23_Abschlussarbeit.createNewBttn.addEventListener("click", clickCreateNewButton);
            EIA2SoSe23_Abschlussarbeit.addToppingBttn.addEventListener("click", clickAddToppingButton);
            EIA2SoSe23_Abschlussarbeit.removeToppingBttn.addEventListener("click", clickRemoveToppingButton);
            EIA2SoSe23_Abschlussarbeit.submitIcecreamButton.addEventListener("click", clickSubmitButton);
            EIA2SoSe23_Abschlussarbeit.dropdownSauce.addEventListener("change", selectSauceChange);
            EIA2SoSe23_Abschlussarbeit.dropdownSprinkles.addEventListener("change", selectSprinklesChange);
            EIA2SoSe23_Abschlussarbeit.whippedCheck.addEventListener("change", selectWhippedChange);
            // generate content
            yield generateContent();
        });
    }
    EIA2SoSe23_Abschlussarbeit.installListeners = installListeners;
    // gets server content
    function generateContent() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseTest = yield fetch(EIA2SoSe23_Abschlussarbeit.myUrl + "command=show");
            let taskResponseTest = yield responseTest.text();
            //console.log("Server says: " + taskResponseTest);
            taskTest = JSON.parse(taskResponseTest);
            let taskTestlist = taskTest["data"];
            let taskTestBool = false;
            //console.log(taskTestlist);
            // finding correct collection
            for (let i = 0; i < taskTestlist.length; i++) {
                if (taskTestlist[i] == "Icecreams") {
                    taskTestBool = true;
                    console.log("Found Icecreams Collection");
                }
            }
            // creating new Icecreams Collection if none was found
            if (!taskTestBool) {
                console.log("Icecreams Collection NOT found, creating new one...");
                let query = new URLSearchParams();
                query.set("command", "create");
                query.set("collection", "Icecreams");
                yield fetch(EIA2SoSe23_Abschlussarbeit.myUrl + query.toString());
                console.log("Icecreams Collection created!");
                /*createSample();
                createSample();
                createSample();*/
            }
            else {
                console.log("Getting saved Icecreams...");
                yield getSavedCreams();
                console.log("Got saved Icecreams!");
                // Drop collection
                /*console.log("Dropping Icecreams collection...");
                let query: URLSearchParams = new URLSearchParams();
                query.set("command", "drop");
                query.set("collection", "Icecreams")
                await fetch(myUrl + query.toString());
                console.log("Icecreams Collection dropped!");*/
                //console.log("Testing preview");
                //previewServeIcecream = getDisplayIcecream(canvasW * 0.5, canvasH * 0.95, false, dropdownServe.selectedIndex + 2);
            }
        });
    }
    // delete saved cream from server
    function deleteSavedCream(_index) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Deleting cream...");
            // remove cream from server
            let query = new URLSearchParams();
            query.set("command", "delete");
            query.set("collection", "Icecreams");
            query.set("id", EIA2SoSe23_Abschlussarbeit.savedCreams[_index].id);
            console.log(query.toString());
            yield fetch(EIA2SoSe23_Abschlussarbeit.myUrl + query.toString());
            console.log("Deleted cream successfully!");
            yield getSavedCreams(true);
        });
    }
    // gets saved creams from server
    function getSavedCreams(_removal = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseQuery = new URLSearchParams();
            responseQuery.set("command", "find");
            responseQuery.set("collection", "Icecreams");
            let responseServe = yield fetch(EIA2SoSe23_Abschlussarbeit.myUrl + responseQuery.toString());
            let taskResponseServe = yield responseServe.text();
            EIA2SoSe23_Abschlussarbeit.savedCreams = [];
            let serverTasks = JSON.parse(taskResponseServe)["data"];
            for (let i = 0; i < Object.keys(serverTasks).length; i++) {
                EIA2SoSe23_Abschlussarbeit.savedCreams.push(serverTasks[Object.keys(serverTasks)[i]]);
                EIA2SoSe23_Abschlussarbeit.savedCreams[i].id = Object.keys(serverTasks)[i];
            }
            EIA2SoSe23_Abschlussarbeit.savedCreamsAmount = EIA2SoSe23_Abschlussarbeit.savedCreams.length;
            //console.log("Toppings of Icecream#" + savedCreams[0].nameID + ": ");
            console.log("Saved Creams Amount: " + EIA2SoSe23_Abschlussarbeit.savedCreamsAmount);
            //console.log("Server Icecreams: ");
            //console.log(serverTasks);
            console.log("Saved Icecreams", EIA2SoSe23_Abschlussarbeit.savedCreams);
            updateDropdownServe(_removal);
            updateSpendList();
            /*
            //console.log(savedCreams[1].id);
    
            let sampleToppings: CreamTypes[] = JSON.parse(savedCreams[0].toppings);
    
            console.log("Name of Icecream#" + savedCreamsAmount + ": " + savedCreams[savedCreamsAmount - 1].title);
    
            for (let i: number = 0; i < sampleToppings.length; i++) {
                console.log("Topping#" + i + ": " + CreamTypes[sampleToppings[i]]);
            }
            */
        });
    }
    // updates spending reference list for customers
    function updateSpendList() {
        EIA2SoSe23_Abschlussarbeit.spendList = [];
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.savedCreamsAmount; i++) {
            let thisPrice = JSON.parse("" + EIA2SoSe23_Abschlussarbeit.savedCreams[i].price);
            let thisProdCost = getProductionCost(EIA2SoSe23_Abschlussarbeit.savedCreams[i]);
            let thisSpendAmount = Math.floor(thisPrice / thisProdCost * 100) / 100;
            EIA2SoSe23_Abschlussarbeit.spendList.push(thisSpendAmount);
        }
        console.log("Spend List", EIA2SoSe23_Abschlussarbeit.spendList);
    }
    // updates dropdown serve menu
    function updateDropdownServe(_remove = false) {
        // removes all options, and readds prompt when an icecream has been removed
        if (_remove) {
            EIA2SoSe23_Abschlussarbeit.dropdownServe.innerHTML = "";
            EIA2SoSe23_Abschlussarbeit.dropdownServe.innerHTML += '<option value="" disabled selected hidden>Select an Icecream</option>';
            console.log("Serve dropdown reset");
        }
        // gets all names of saved icecreams
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.savedCreamsAmount; i++) {
            let creamOption = EIA2SoSe23_Abschlussarbeit.savedCreams[i].title;
            //console.log("Option#" + i + ": " + creamOption);
            let optionElement = document.createElement("option");
            optionElement.textContent = creamOption;
            optionElement.value = creamOption;
            EIA2SoSe23_Abschlussarbeit.dropdownServe.appendChild(optionElement);
        }
        //dropdownServe.selectedIndex = 0;
        //pricePreviewParagraph.innerHTML = "";
        setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownServe, 0);
    }
    // checks if a new icecream has to be previewed
    function getDisplayIcecream(_posX, _posY, _creating, _displayID = -1, _waffling = -1) {
        let prepIcecream;
        let theseToppings;
        let colorToppings = [];
        let colorSauce = "";
        let havingSauce = false;
        let colorSprinkles = "";
        let hasWhipped = false;
        // get waffle bool
        let hasWaffle = false;
        switch (_waffling) {
            case -1:
                hasWaffle = EIA2SoSe23_Abschlussarbeit.waffleCheck.checked;
                break;
            case 0:
                break;
            case 1:
                hasWaffle = true;
                break;
        }
        let thisPrice = 0;
        let thisID = "";
        if (_creating) {
            prepIcecream = {
                title: "",
                price: 0,
                toppings: "",
                toppingsAmount: 0,
                sauce: 0,
                hasSauce: false,
                sprinklesType: 0,
                whippedCream: false,
                id: ""
            };
        }
        else {
            prepIcecream = JSON.parse(JSON.stringify(EIA2SoSe23_Abschlussarbeit.savedCreams[_displayID]));
            //console.log("prepcream:", prepIcecream.title);
            // get toppin colors
            theseToppings = JSON.parse(prepIcecream.toppings);
            for (let i = 0; i < prepIcecream.toppingsAmount; i++) {
                let topColor = EIA2SoSe23_Abschlussarbeit.getIcecreamColor(theseToppings[i]);
                colorToppings.push(topColor);
            }
            // get sauce color
            havingSauce = JSON.parse("" + prepIcecream.hasSauce);
            //console.log("HasSauce", havingSauce);
            if (havingSauce === true) {
                let thisSauce = JSON.parse("" + prepIcecream.sauce);
                colorSauce = EIA2SoSe23_Abschlussarbeit.getIcecreamColor(thisSauce, true);
            }
            // get sprinkles color
            colorSprinkles = EIA2SoSe23_Abschlussarbeit.getSprinklesColor(JSON.parse("" + prepIcecream.sprinklesType));
            // get whipped bool
            hasWhipped = JSON.parse("" + prepIcecream.whippedCream);
            // get price
            thisPrice = JSON.parse("" + prepIcecream.price);
            // get id
            thisID = prepIcecream.id;
        }
        let thisDisplayIcecream = new EIA2SoSe23_Abschlussarbeit.DisplayIcecream(_posX, _posY, colorToppings, colorSauce, colorSprinkles, hasWhipped, hasWaffle, thisPrice, thisID);
        //console.log("DisplayIcecream:", prepIcecream.title, colorToppings, colorSauce, colorSprinkles, hasWhipped, hasWaffle, thisPrice, thisID);  
        return thisDisplayIcecream;
    }
    EIA2SoSe23_Abschlussarbeit.getDisplayIcecream = getDisplayIcecream;
    // update selected index while triggering change event
    function setSelectedIndex(_el, _index) {
        _el.selectedIndex = _index;
        _el.dispatchEvent(new Event('change', { bubbles: true }));
        //console.log("Set index of " + _el + " to " + _index);
    }
    // always show two decimals of number
    function displayTwoDecimals(_num) {
        return (Math.round(_num * 100) / 100).toFixed(2);
    }
    // triggers when served selection is changed
    function serveSelectionChange() {
        let creamIndex = EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex - 1;
        //console.log(creamIndex);
        // remove paragraphs when nothing is selected
        if (creamIndex < 0) {
            EIA2SoSe23_Abschlussarbeit.previewVisible = false;
            EIA2SoSe23_Abschlussarbeit.currentSelectedPrice = 0;
            EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost = 0;
            EIA2SoSe23_Abschlussarbeit.pricePreviewParagraph.innerHTML = "";
            EIA2SoSe23_Abschlussarbeit.priceProdPreviewParagraph.innerHTML = "";
        }
        else { // update price & production values when something is selected
            EIA2SoSe23_Abschlussarbeit.previewVisible = true;
            if (EIA2SoSe23_Abschlussarbeit.previewServeIcecream != null && EIA2SoSe23_Abschlussarbeit.waffleCheck.checked != EIA2SoSe23_Abschlussarbeit.previewServeIcecream.waffle && EIA2SoSe23_Abschlussarbeit.savedCreams[creamIndex].id == EIA2SoSe23_Abschlussarbeit.previewServeIcecream.id) {
                //console.log("Waffle change");
                EIA2SoSe23_Abschlussarbeit.previewServeIcecream.waffle = EIA2SoSe23_Abschlussarbeit.waffleCheck.checked;
            }
            else {
                //console.log("Index", creamIndex, "Cream:", savedCreams[creamIndex].title);
                EIA2SoSe23_Abschlussarbeit.previewServeIcecream = getDisplayIcecream(EIA2SoSe23_Abschlussarbeit.canvasW * 0.5, EIA2SoSe23_Abschlussarbeit.canvasH * 0.95, false, creamIndex);
            }
            // updating price value
            //console.log(savedCreams[creamIndex].price);
            EIA2SoSe23_Abschlussarbeit.currentSelectedPrice = parseFloat("" + EIA2SoSe23_Abschlussarbeit.savedCreams[creamIndex].price);
            if (EIA2SoSe23_Abschlussarbeit.waffleCheck.checked) {
                //console.log(waffleCheck.checked, currentSelectedPrice, waffleValue);
                EIA2SoSe23_Abschlussarbeit.currentSelectedPrice += EIA2SoSe23_Abschlussarbeit.waffleValue;
            }
            EIA2SoSe23_Abschlussarbeit.pricePreviewParagraph.innerHTML = "+ $" + displayTwoDecimals(EIA2SoSe23_Abschlussarbeit.currentSelectedPrice);
            // updating prod value
            EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost = getProductionCost(EIA2SoSe23_Abschlussarbeit.savedCreams[creamIndex]);
            EIA2SoSe23_Abschlussarbeit.priceProdPreviewParagraph.innerHTML = "- $" + displayTwoDecimals(EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost);
        }
    }
    // calculate production cost
    function getProductionCost(_selectedCream, _serving = true) {
        let prodCost = 0;
        // icecream toppings
        if (_selectedCream.toppings != "") {
            let toppins = JSON.parse(_selectedCream.toppings);
            for (let i = 0; i < toppins.length; i++) {
                //console.log(CreamTypes[toppins[i]], i, creamValue[toppins[i]]);
                prodCost += EIA2SoSe23_Abschlussarbeit.creamValue[toppins[i]];
                //console.log("ToppingProd:", prodCost);
            }
        }
        // sauce
        if (JSON.parse("" + _selectedCream.hasSauce) === true) {
            prodCost += EIA2SoSe23_Abschlussarbeit.sauceValue[_selectedCream.sauce];
            //console.log("SauceProd:", prodCost);
        }
        // sprinkles
        prodCost += EIA2SoSe23_Abschlussarbeit.sprinkleValue[_selectedCream.sprinklesType];
        //console.log("SprinkleProd:", prodCost);
        // waffle
        if (_serving && EIA2SoSe23_Abschlussarbeit.waffleCheck.checked) {
            prodCost += EIA2SoSe23_Abschlussarbeit.waffleValue * 0.5;
            //console.log("WaffleProd:", prodCost);
        }
        // whipped cream
        //console.log("WHIPPED VALUE: ", _selectedCream.whippedCream);
        // just checking for if (_selectedCream.whippedCream) doesn't check for its boolean value
        if (_selectedCream.whippedCream == true) {
            prodCost += EIA2SoSe23_Abschlussarbeit.whippedValue;
            //console.log("WhippedProd:", prodCost);
        }
        // ease rounding errors
        prodCost = Math.round(prodCost * 100) / 100;
        return prodCost;
    }
    // click create new button
    function clickCreateNewButton(_event) {
        // reset creator icecream
        EIA2SoSe23_Abschlussarbeit.creatorIcecream = {
            title: "",
            price: 0,
            toppings: "",
            toppingsAmount: 0,
            sauce: 0,
            hasSauce: false,
            sprinklesType: 0,
            whippedCream: false,
            id: ""
        };
        // open create form
        if (!EIA2SoSe23_Abschlussarbeit.createFormOpen) {
            EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: inline");
            EIA2SoSe23_Abschlussarbeit.createNewBttn.innerHTML = "Reset";
            EIA2SoSe23_Abschlussarbeit.createNewBttn.setAttribute("style", "margin-bottom: 10px");
            EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: 2%");
            EIA2SoSe23_Abschlussarbeit.creatingIcecream = getDisplayIcecream(EIA2SoSe23_Abschlussarbeit.canvasW * 0.7, EIA2SoSe23_Abschlussarbeit.canvasH * 0.95, true);
            EIA2SoSe23_Abschlussarbeit.createFormOpen = true;
        }
        else if (!EIA2SoSe23_Abschlussarbeit.formEmpty || EIA2SoSe23_Abschlussarbeit.titleField.value != "" || EIA2SoSe23_Abschlussarbeit.priceField.value != "") { // empty create form and close it
            resetCreatorFields();
        }
        else { // close create form if nothing is filled
            EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: none");
            EIA2SoSe23_Abschlussarbeit.createNewBttn.innerHTML = "Create New";
            EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: 10%");
            EIA2SoSe23_Abschlussarbeit.createFormOpen = false;
        }
    }
    // resets creator fields
    function resetCreatorFields() {
        EIA2SoSe23_Abschlussarbeit.submitIcecreamButton.innerHTML = "Add Icecream";
        EIA2SoSe23_Abschlussarbeit.titleField.value = "";
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.length; i++) {
            setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i], 0);
            if (i > 0) {
                EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i].setAttribute("style", "display: none");
                EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = true;
                EIA2SoSe23_Abschlussarbeit.removeToppingBttn.disabled = true;
                EIA2SoSe23_Abschlussarbeit.visibleToppings = 1;
            }
        }
        setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownSauce, 0);
        setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownSprinkles, 0);
        EIA2SoSe23_Abschlussarbeit.whippedCheck.checked = false;
        if (EIA2SoSe23_Abschlussarbeit.creatingIcecream != null) {
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeWhipped(false);
        }
        EIA2SoSe23_Abschlussarbeit.priceField.value = "";
        EIA2SoSe23_Abschlussarbeit.editingForm = false;
        updateProductionCost(false);
        EIA2SoSe23_Abschlussarbeit.formEmpty = true;
    }
    EIA2SoSe23_Abschlussarbeit.resetCreatorFields = resetCreatorFields;
    // click submit icecream button
    function clickSubmitButton(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            // if filled out
            if (EIA2SoSe23_Abschlussarbeit.titleField.value != "" &&
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppingsAmount > 0 &&
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppings != "" &&
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.sauce >= 0 &&
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType >= 0 &&
                EIA2SoSe23_Abschlussarbeit.priceField.value != "") {
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.title = EIA2SoSe23_Abschlussarbeit.titleField.value;
                EIA2SoSe23_Abschlussarbeit.creatorIcecream.price = parseFloat(parseFloat(EIA2SoSe23_Abschlussarbeit.priceField.value).toFixed(2));
                let formData = new FormData();
                formData.append("title", EIA2SoSe23_Abschlussarbeit.creatorIcecream.title);
                formData.append("price", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.price);
                formData.append("toppings", EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppings);
                formData.append("toppingsAmount", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppingsAmount);
                formData.append("sauce", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sauce);
                formData.append("hasSauce", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.hasSauce);
                formData.append("sprinklesType", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType);
                formData.append("whippedCream", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.whippedCream);
                formData.append("id", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.id);
                let query = new URLSearchParams();
                // if adding new one or editing
                if (!EIA2SoSe23_Abschlussarbeit.editingForm) {
                    query.set("command", "insert");
                    query.set("collection", "Icecreams");
                }
                else {
                    query.set("command", "update");
                    query.set("collection", "Icecreams");
                    query.set("id", "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.id);
                }
                let json = {};
                // convert formData into url-useable format
                for (let key of formData.keys())
                    if (!json[key]) {
                        let values = formData.getAll(key);
                        json[key] = values.length > 1 ? values : values[0];
                    }
                query.set("data", "" + JSON.stringify(json));
                //console.log("QUERY: ", query.toString() + " - FORMDATA: ", JSON.stringify(json));
                EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: none");
                EIA2SoSe23_Abschlussarbeit.createNewBttn.innerHTML = "Create New";
                EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: 10%");
                EIA2SoSe23_Abschlussarbeit.createFormOpen = false;
                resetCreatorFields();
                yield fetch(EIA2SoSe23_Abschlussarbeit.myUrl + query.toString());
                console.log("Added new Icecream!");
                yield getSavedCreams(true);
            }
            else {
                alert("Please select all aspects for your icecream first!");
            }
        });
    }
    // change dropdown selection of toppings
    function selectToppingChange(_event) {
        let icecreamTops = "[";
        let toppingCount = 0;
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray.length; i++) {
            let thisIndex = EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i].selectedIndex;
            if (thisIndex > 0) {
                icecreamTops += thisIndex - 1 + "";
                toppingCount++;
                if (i + 1 < EIA2SoSe23_Abschlussarbeit.visibleToppings) {
                    if (EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i + 1].selectedIndex != 0) {
                        icecreamTops += ", ";
                    }
                }
            }
        }
        // can only add if a topping is selected
        if (EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[EIA2SoSe23_Abschlussarbeit.visibleToppings - 1].selectedIndex != 0 && EIA2SoSe23_Abschlussarbeit.visibleToppings < 3) {
            EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = false;
        }
        icecreamTops += "]";
        //console.log("IcecreamTops: ", icecreamTops, toppingCount);
        EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppings = icecreamTops;
        EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppingsAmount = toppingCount;
        // update creator preview
        let theseToppings = JSON.parse(EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppings);
        let newToppings = [];
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppingsAmount; i++) {
            let topColor = EIA2SoSe23_Abschlussarbeit.getIcecreamColor(theseToppings[i]);
            newToppings.push(topColor);
        }
        EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeToppings(newToppings);
        // update prod cost
        updateProductionCost();
        EIA2SoSe23_Abschlussarbeit.formEmpty = false;
    }
    // change sauce dropdown selection
    function selectSauceChange(_event) {
        if (EIA2SoSe23_Abschlussarbeit.dropdownSauce.selectedIndex > 1) {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.hasSauce = true;
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.sauce = EIA2SoSe23_Abschlussarbeit.dropdownSauce.selectedIndex - 2;
        }
        else {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.hasSauce = false;
        }
        // update creating preview
        let newSauce = "";
        if (JSON.parse("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.hasSauce) === true) {
            let thisSauce = JSON.parse("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sauce);
            newSauce = EIA2SoSe23_Abschlussarbeit.getIcecreamColor(thisSauce, true);
        }
        EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeSauce(newSauce);
        // update prod cost
        updateProductionCost();
        EIA2SoSe23_Abschlussarbeit.formEmpty = false;
    }
    // change sprinkles dropdown selection
    function selectSprinklesChange(_event) {
        if (EIA2SoSe23_Abschlussarbeit.dropdownSprinkles.selectedIndex > 0) {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType = EIA2SoSe23_Abschlussarbeit.dropdownSprinkles.selectedIndex - 1;
        }
        else {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType = 0;
        }
        // update creating preview
        let newSprinkles = EIA2SoSe23_Abschlussarbeit.getSprinklesColor(JSON.parse("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType));
        EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeSprinkles(newSprinkles);
        // update prod cost
        updateProductionCost();
        EIA2SoSe23_Abschlussarbeit.formEmpty = false;
    }
    // change whipped cream check
    function selectWhippedChange(_event) {
        //console.log("WHIP CHECK:", whippedCheck.checked);
        if (EIA2SoSe23_Abschlussarbeit.whippedCheck.checked) {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.whippedCream = true;
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeWhipped(true);
        }
        else {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream.whippedCream = false;
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeWhipped(false);
        }
        updateProductionCost();
        EIA2SoSe23_Abschlussarbeit.formEmpty = false;
    }
    // update creator production cost
    function updateProductionCost(_show = true) {
        if (_show) {
            let creatorProdCost = getProductionCost(EIA2SoSe23_Abschlussarbeit.creatorIcecream, false);
            EIA2SoSe23_Abschlussarbeit.creatorProdParagraph.innerHTML = "Cost: $" + displayTwoDecimals(creatorProdCost);
        }
        else {
            EIA2SoSe23_Abschlussarbeit.creatorProdParagraph.innerHTML = "";
        }
    }
    // click add another topping button
    function clickAddToppingButton() {
        EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = true;
        EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[EIA2SoSe23_Abschlussarbeit.visibleToppings].setAttribute("style", "display: inline");
        // adjust padding of entire div
        let topPadding = 0;
        switch (EIA2SoSe23_Abschlussarbeit.visibleToppings) {
            case 1:
                topPadding = 1;
                break;
            case 2:
                topPadding = 0;
                break;
            case 3:
                topPadding = -1;
                break;
            default:
                break;
        }
        EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: " + topPadding + "%");
        EIA2SoSe23_Abschlussarbeit.removeToppingBttn.disabled = false;
        //removeToppingBttn.setAttribute("style", "display: inline");
        EIA2SoSe23_Abschlussarbeit.visibleToppings++;
        if (EIA2SoSe23_Abschlussarbeit.visibleToppings > 2) {
            EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = true;
            //addToppingBttn.setAttribute("style", "display: none");
        }
        //console.log("Visible Toppings: ", visibleToppings);
    }
    // click remove topping button
    function clickRemoveToppingButton(_event) {
        EIA2SoSe23_Abschlussarbeit.visibleToppings--;
        EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[EIA2SoSe23_Abschlussarbeit.visibleToppings].setAttribute("style", "display: none");
        // adjust padding of entire div
        let topPadding = 0;
        switch (EIA2SoSe23_Abschlussarbeit.visibleToppings) {
            case 1:
                topPadding = 1;
                break;
            case 2:
                topPadding = 0;
                break;
            case 3:
                topPadding = -1;
                break;
            default:
                break;
        }
        EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: " + topPadding + "%");
        setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[EIA2SoSe23_Abschlussarbeit.visibleToppings], 0);
        EIA2SoSe23_Abschlussarbeit.addToppingBttn.disabled = false;
        //addToppingBttn.setAttribute("style", "display: inline");
        if (EIA2SoSe23_Abschlussarbeit.visibleToppings < 2) {
            EIA2SoSe23_Abschlussarbeit.removeToppingBttn.disabled = true;
            //removeToppingBttn.setAttribute("style", "display: none");
        }
        //console.log("Visible Toppings: ", visibleToppings);
    }
    // click preview serve button
    function clickServeButton(_event) {
        //console.log("Click Serve Button ID:", dropdownServe.selectedIndex, "Waffle?:", waffleCheck.checked);
        if (EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex != 0 && EIA2SoSe23_Abschlussarbeit.waitingSelectedID >= 0) {
            // remove money from bank
            EIA2SoSe23_Abschlussarbeit.moneyReductionFrameCount = 12;
            EIA2SoSe23_Abschlussarbeit.myMoneyReduction = EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost;
            EIA2SoSe23_Abschlussarbeit.myMoneyCurrent -= EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost;
            // give it to customer
            EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].giveIcecream(EIA2SoSe23_Abschlussarbeit.savedCreams[(EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex - 1)].id);
            setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownServe, 0);
            //waffleCheck.checked = false;
            // closes create form
            if (EIA2SoSe23_Abschlussarbeit.createFormOpen) {
                EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: none");
                EIA2SoSe23_Abschlussarbeit.createNewBttn.innerHTML = "Create New";
                EIA2SoSe23_Abschlussarbeit.createNewBttn.setAttribute("style", "margin-bottom: 0px");
                EIA2SoSe23_Abschlussarbeit.selectionContainerDiv.setAttribute("style", "padding-top: 10%");
                EIA2SoSe23_Abschlussarbeit.createFormOpen = false;
                resetCreatorFields();
            }
        }
        else if (EIA2SoSe23_Abschlussarbeit.waitingSelectedID >= 0) {
            alert("Select an Icecream to serve first!");
        }
        else {
            alert("Select a customer to serve first!");
        }
    }
    // clik edit serve button
    function clickEditServeButton(_event) {
        console.log("Click Edit Button ID:", EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex);
        // only edit if an icecream is selected
        if (EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex > 0) {
            EIA2SoSe23_Abschlussarbeit.creatorIcecream = {
                title: "",
                price: 0,
                toppings: "",
                toppingsAmount: 0,
                sauce: 0,
                hasSauce: false,
                sprinklesType: 0,
                whippedCream: false,
                id: ""
            };
            let editID = EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex - 1;
            // update creating icecream
            EIA2SoSe23_Abschlussarbeit.creatingIcecream = getDisplayIcecream(EIA2SoSe23_Abschlussarbeit.canvasW * 0.7, EIA2SoSe23_Abschlussarbeit.canvasH * 0.95, true, editID);
            resetCreatorFields();
            EIA2SoSe23_Abschlussarbeit.submitIcecreamButton.innerHTML = "Edit Icecream";
            EIA2SoSe23_Abschlussarbeit.creatorIcecream = JSON.parse(JSON.stringify(EIA2SoSe23_Abschlussarbeit.savedCreams[editID]));
            //console.log(savedCreams[editID].toppings);
            console.log("Editing Icecream:");
            console.log(EIA2SoSe23_Abschlussarbeit.creatorIcecream);
            EIA2SoSe23_Abschlussarbeit.titleField.value = EIA2SoSe23_Abschlussarbeit.creatorIcecream.title;
            let toppingCount = Math.floor(EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppingsAmount);
            let theseToppings = JSON.parse(EIA2SoSe23_Abschlussarbeit.creatorIcecream.toppings);
            //console.log("These toppings:", theseToppings, toppingCount);
            // open additional topping options if edited icecream has more than one
            switch (toppingCount) {
                case 1:
                    //console.log("ONE TOPPING");
                    break;
                case 2:
                    //console.log("TWO TOPPINGS");
                    clickAddToppingButton();
                    break;
                case 3:
                    //console.log("THREE TOPPINGS");
                    clickAddToppingButton();
                    clickAddToppingButton();
                    break;
                default:
                //console.log("ERROR TOPPINGS");
            }
            for (let i = 0; i < toppingCount; i++) {
                //dropdownToppingsArray[i].selectedIndex = parseInt("" + theseToppings[i]) + 1;
                setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray[i], parseInt("" + theseToppings[i]) + 1);
            }
            //console.log(creatorIcecream.sauce);
            // set sauce
            if (JSON.parse("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.hasSauce) === true) {
                setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownSauce, parseInt("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sauce) + 2);
            }
            else {
                setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownSauce, 0);
            }
            setSelectedIndex(EIA2SoSe23_Abschlussarbeit.dropdownSprinkles, parseInt("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.sprinklesType) + 1);
            EIA2SoSe23_Abschlussarbeit.priceField.value = "" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.price;
            EIA2SoSe23_Abschlussarbeit.whippedCheck.checked = JSON.parse("" + EIA2SoSe23_Abschlussarbeit.creatorIcecream.whippedCream.valueOf()); // doesn't recognize it as a bool if not parsed
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.changeWhipped(EIA2SoSe23_Abschlussarbeit.whippedCheck.checked);
            // open create form in edit mode
            EIA2SoSe23_Abschlussarbeit.creatorDiv.setAttribute("style", "display: inline");
            EIA2SoSe23_Abschlussarbeit.createNewBttn.innerHTML = "Reset";
            EIA2SoSe23_Abschlussarbeit.createNewBttn.setAttribute("style", "margin-bottom: 10px");
            //selectionContainerDiv.setAttribute("style", "padding-top: 2%");
            EIA2SoSe23_Abschlussarbeit.editingForm = true;
            EIA2SoSe23_Abschlussarbeit.createFormOpen = true;
            updateDropdownServe(true);
        }
        else {
            alert("Select an Icecream to edit first!");
        }
    }
    // click delete serve button
    function clickDeleteServeButton(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Click Delete Button ID:", EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex);
            // if placeholder isn't selected
            if (EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex > 0) {
                let savedCreamName = EIA2SoSe23_Abschlussarbeit.savedCreams[EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex - 1].title;
                // confirm deletion
                if (confirm("This will remove " + savedCreamName + " from your selection! Are you sure you want to continue?")) {
                    yield deleteSavedCream(EIA2SoSe23_Abschlussarbeit.dropdownServe.selectedIndex - 1);
                    console.log("Successfully deleted " + savedCreamName);
                }
            }
            else { // prompt to select a valid icecream
                alert("Select an Icecream to delete first!");
            }
        });
    }
    // testing server connection
    /*async function createSample(): Promise<void> {

        let randomNumber: number = Math.floor(Math.random() * 100);

        let randomOneToThree: number = Math.floor(Math.random() * 2 + 1);
        let toppingsTxt: string = "[";
        for (let i: number = 0; i < randomOneToThree; i++) {
            toppingsTxt += Math.floor(Math.random() * creamValue.length) + "";

            if (i + 1 < randomOneToThree) {
                toppingsTxt += ", ";
            }
        }
        toppingsTxt += "]";

        let thisIcecream: FullIcecream = {
            title: "SampleItem" + randomNumber,
            price: Math.floor(Math.random() * 100) / 100,
            toppings: toppingsTxt,
            toppingsAmount: randomOneToThree,
            sauce: Math.floor(Math.random() * sauceValue.length),
            hasSauce: true,
            sprinklesType: 1,
            whippedCream: false,
            id: ""
        };

        let formData: FormData = new FormData();

        formData.append("title", thisIcecream.title);
        formData.append("price", "" + thisIcecream.price);
        formData.append("toppings", thisIcecream.toppings);
        formData.append("toppingsAmount", "" + thisIcecream.toppingsAmount);
        formData.append("sauce", "" + thisIcecream.sauce);
        formData.append("hasSauce", "" + thisIcecream.hasSauce);
        formData.append("sprinklesType", "" + thisIcecream.sprinklesType);
        formData.append("whippedCream", "" + thisIcecream.whippedCream);
        formData.append("id", "");

        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Icecreams");

        let json: FormDataJSON = {};
        
        // convert formData into url-useable format
        for (let key of formData.keys())
        if (!json[key]) {
            let values: FormDataEntryValue[] = formData.getAll(key);
            json[key] = values.length > 1 ? values : values[0];
        }

        query.set("data", "" + JSON.stringify(json));

        console.log("QUERY: " + query.toString() + "; FORMDATA: " + JSON.stringify(json));
        await fetch(myUrl + query.toString());

        console.log("Added new sample Icecream");
    }*/
})(EIA2SoSe23_Abschlussarbeit || (EIA2SoSe23_Abschlussarbeit = {}));
//# sourceMappingURL=generatedContent.js.map