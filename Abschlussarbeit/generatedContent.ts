namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    // different icecream types
    export enum CreamTypes {
        Chocolate,
        Vanilla,
        Strawberry,
        Blueberry,
        Banana,
        Smurf
    }

    // icecream production cost
    export let creamValue: number[] = [1.4, 1, 1.2, 0.6, 0.9, 1.6];

    // sauce production cost
    export let sauceValue: number[] = [0.7, 0.5, 0.6, 0.3, 0.65, 0.75];

    // sprinkle types
    export enum SprinklesType {
        None,
        Chocolate,
        Mint
    }

    // sprinkle production cost
    export let sprinkleValue: number[] = [0, 0.5, 0.75];

    // whipped cream production cost
    export let whippedValue: number = 0.5;

    // waffle cost (half is production cost)
    export let waffleValue: number = 0.3;

    export interface FullIcecream {
        title: string;
        price: number;
        toppings: string; // CreamTypes[]
        toppingsAmount: number;
        sauce: number;
        hasSauce: boolean;
        sprinklesType: number;
        whippedCream: boolean;
        id: string;
    }

    // list of price divided by prod cost for customers to reference
    export let spendList: number[] = [];

    var taskTest;

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    // installs listeners
    export async function installListeners(): Promise<void> {
        dropdownToppingsArray.push(<HTMLSelectElement>document.getElementById("dropdowncream0"));
        dropdownToppingsArray.push(<HTMLSelectElement>document.getElementById("dropdowncream1"));
        dropdownToppingsArray.push(<HTMLSelectElement>document.getElementById("dropdowncream2"));
        creatorDiv.setAttribute("style", "display: none");

        for (let i: number = 0; i < dropdownToppingsArray.length; i++) {
            //setSelectedIndex(dropdownToppingsArray[i], 0);
            if (i > 0) {
                dropdownToppingsArray[i].setAttribute("style", "display: none");
            }

            // install toppings dropdown event listener here (cuz it's more convenient than having 2nd for-loop)
            dropdownToppingsArray[i].addEventListener("change", selectToppingChange);
        }

        removeToppingBttn.disabled = true;
        addToppingBttn.disabled = true;
        //removeToppingBttn.setAttribute("style", "display: none");

        // install event listeners (for serving tab)
        serveBttn.addEventListener("click", clickServeButton);
        editServeBttn.addEventListener("click", clickEditServeButton);
        deleteServeBttn.addEventListener("click", clickDeleteServeButton);
        dropdownServe.addEventListener("change", serveSelectionChange);
        waffleCheck.addEventListener("change", serveSelectionChange);

        // install event listeners (for creation tab)
        createNewBttn.addEventListener("click", clickCreateNewButton);
        addToppingBttn.addEventListener("click", clickAddToppingButton);
        removeToppingBttn.addEventListener("click", clickRemoveToppingButton);
        submitIcecreamButton.addEventListener("click", clickSubmitButton);
        dropdownSauce.addEventListener("change", selectSauceChange);
        dropdownSprinkles.addEventListener("change", selectSprinklesChange);
        whippedCheck.addEventListener("change", selectWhippedChange);

        // generate content
        await generateContent();
    }

    // gets server content
    async function generateContent(): Promise<void> {
        let responseTest: Response = await fetch(myUrl + "command=show");
        let taskResponseTest: string = await responseTest.text();
        //console.log("Server says: " + taskResponseTest);
        taskTest = JSON.parse(taskResponseTest);
        let taskTestlist: string[] = taskTest["data"];
        let taskTestBool: boolean = false;

        //console.log(taskTestlist);

        // finding correct collection
        for (let i: number = 0; i < taskTestlist.length; i++) {
            if (taskTestlist[i] == "Icecreams")
            {
                taskTestBool = true;
                console.log("Found Icecreams Collection");
            }
        }

        // creating new Icecreams Collection if none was found
        if (!taskTestBool) {
            console.log("Icecreams Collection NOT found, creating new one...");
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "create");
            query.set("collection", "Icecreams")
            await fetch(myUrl + query.toString());
            console.log("Icecreams Collection created!");

            /*createSample();
            createSample();
            createSample();*/
        } else {
            console.log("Getting saved Icecreams...");

            await getSavedCreams();

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
    }

    // delete saved cream from server
    async function deleteSavedCream(_index: number): Promise<void> {
        console.log("Deleting cream...");

        // remove cream from server
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Icecreams");
        query.set("id", savedCreams[_index].id);
        console.log(query.toString());
        await fetch(myUrl + query.toString());
        
        console.log("Deleted cream successfully!");

        await getSavedCreams(true);
    }

    // gets saved creams from server
    async function getSavedCreams(_removal: boolean = false): Promise<void> {
        let responseQuery: URLSearchParams = new URLSearchParams();
        responseQuery.set("command", "find");
        responseQuery.set("collection", "Icecreams");
        let responseServe: Response = await fetch(myUrl + responseQuery.toString());
        let taskResponseServe: string = await responseServe.text();

        savedCreams = [];
        let serverTasks = JSON.parse(taskResponseServe)["data"];

        for (let i: number = 0; i < Object.keys(serverTasks).length; i++) {
            savedCreams.push(serverTasks[Object.keys(serverTasks)[i]]);
            savedCreams[i].id = Object.keys(serverTasks)[i];
        }

        savedCreamsAmount = savedCreams.length;

        //console.log("Toppings of Icecream#" + savedCreams[0].nameID + ": ");
        console.log("Saved Creams Amount: " + savedCreamsAmount);

        //console.log("Server Icecreams: ");
        //console.log(serverTasks);

        console.log("Saved Icecreams", savedCreams);

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
    }

    // updates spending reference list for customers
    function updateSpendList(): void {
        spendList = [];

        for (let i: number = 0; i < savedCreamsAmount; i++) {
            let thisPrice: number = JSON.parse("" + savedCreams[i].price);
            let thisProdCost: number = getProductionCost(savedCreams[i]);
            let thisSpendAmount: number = Math.floor(thisPrice / thisProdCost * 100) / 100;

            spendList.push(thisSpendAmount);
        }

        console.log("Spend List", spendList);
    }

    // updates dropdown serve menu
    function updateDropdownServe(_remove: boolean = false): void {
        // removes all options, and readds prompt when an icecream has been removed
        if (_remove) {
            dropdownServe.innerHTML = "";
            dropdownServe.innerHTML += '<option value="" disabled selected hidden>Select an Icecream</option>';
            console.log("Serve dropdown reset");
        }

        // gets all names of saved icecreams
        for (let i: number = 0; i < savedCreamsAmount; i++) {
            let creamOption: string = savedCreams[i].title;
            //console.log("Option#" + i + ": " + creamOption);
            let optionElement: HTMLOptionElement = <HTMLOptionElement>document.createElement("option");
            optionElement.textContent = creamOption;
            optionElement.value = creamOption;
            dropdownServe.appendChild(optionElement);
        }

        //dropdownServe.selectedIndex = 0;
        //pricePreviewParagraph.innerHTML = "";
        setSelectedIndex(dropdownServe, 0);
    }

    // checks if a new icecream has to be previewed
    export function getDisplayIcecream(_posX: number, _posY: number, _creating: boolean, _displayID: number = -1, _waffling: number = -1): DisplayIcecream {
        let prepIcecream: FullIcecream;

        let theseToppings: CreamTypes[];

        let colorToppings: string[] = [];

        let colorSauce: string = "";
        let havingSauce: boolean = false;

        let colorSprinkles: string = "";

        let hasWhipped: boolean = false;

        // get waffle bool
        let hasWaffle: boolean = false;

        switch (_waffling) {
            case -1:
                hasWaffle = waffleCheck.checked;
                break;
            case 0:
                break;
            case 1:
                hasWaffle = true;
                break;
        }

        let thisPrice: number = 0;

        let thisID: string = "";
        
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
        } else {
            prepIcecream = JSON.parse(JSON.stringify(savedCreams[_displayID]));

            //console.log("prepcream:", prepIcecream.title);

            // get toppin colors
            theseToppings = JSON.parse(prepIcecream.toppings);

            for (let i: number = 0; i < prepIcecream.toppingsAmount; i++) {
                let topColor: string = getIcecreamColor(theseToppings[i]);
                colorToppings.push(topColor);
            }

            // get sauce color
            havingSauce = JSON.parse("" + prepIcecream.hasSauce);

            //console.log("HasSauce", havingSauce);
            if (havingSauce === true) {
                let thisSauce: CreamTypes = JSON.parse("" + prepIcecream.sauce);
                colorSauce = getIcecreamColor(thisSauce, true);
            }

            // get sprinkles color
            colorSprinkles = getSprinklesColor(JSON.parse("" + prepIcecream.sprinklesType));

            // get whipped bool
            hasWhipped = JSON.parse("" + prepIcecream.whippedCream);

            // get price
            thisPrice = JSON.parse("" + prepIcecream.price);

            // get id
            thisID = prepIcecream.id;
        }

        let thisDisplayIcecream = new DisplayIcecream(_posX, _posY,
            colorToppings, colorSauce, colorSprinkles, hasWhipped, hasWaffle, thisPrice, thisID);

        //console.log("DisplayIcecream:", prepIcecream.title, colorToppings, colorSauce, colorSprinkles, hasWhipped, hasWaffle, thisPrice, thisID);  

        return thisDisplayIcecream;
    }

    // update selected index while triggering change event
    function setSelectedIndex(_el: HTMLSelectElement, _index: number){
        _el.selectedIndex = _index;
        _el.dispatchEvent(new Event('change', { bubbles: true }));

        //console.log("Set index of " + _el + " to " + _index);
    }

    // always show two decimals of number
    function displayTwoDecimals(_num: number): string {
        return (Math.round(_num * 100) / 100).toFixed(2);
    }

    // triggers when served selection is changed
    function serveSelectionChange(): void {        
        let creamIndex: number = dropdownServe.selectedIndex - 1;

        //console.log(creamIndex);

        // remove paragraphs when nothing is selected
        if (creamIndex < 0) {
            previewVisible = false;

            currentSelectedPrice = 0;
            currentSelectedProdCost = 0;
            pricePreviewParagraph.innerHTML = "";
            priceProdPreviewParagraph.innerHTML = "";

        } else { // update price & production values when something is selected
            previewVisible = true;

            if (previewServeIcecream != null && waffleCheck.checked != previewServeIcecream.waffle && savedCreams[creamIndex].id == previewServeIcecream.id) {
                //console.log("Waffle change");
                previewServeIcecream.waffle = waffleCheck.checked;
            } else {
                //console.log("Index", creamIndex, "Cream:", savedCreams[creamIndex].title);
                previewServeIcecream = getDisplayIcecream(canvasW * 0.5, canvasH * 0.95, false, creamIndex);
            }

            // updating price value

            //console.log(savedCreams[creamIndex].price);
            currentSelectedPrice = parseFloat("" + savedCreams[creamIndex].price);
            if (waffleCheck.checked) {
                //console.log(waffleCheck.checked, currentSelectedPrice, waffleValue);
                currentSelectedPrice += waffleValue;
            }
            pricePreviewParagraph.innerHTML = "+ $" + displayTwoDecimals(currentSelectedPrice);

            // updating prod value
            currentSelectedProdCost = getProductionCost(savedCreams[creamIndex]);
            priceProdPreviewParagraph.innerHTML = "- $" + displayTwoDecimals(currentSelectedProdCost);
        }
    }

    // calculate production cost
    function getProductionCost(_selectedCream: FullIcecream, _serving: boolean = true): number {
        let prodCost: number = 0;

        // icecream toppings
        if (_selectedCream.toppings != "") {
            let toppins: CreamTypes[] = JSON.parse(_selectedCream.toppings);

            for (let i: number = 0; i < toppins.length; i++) {
                //console.log(CreamTypes[toppins[i]], i, creamValue[toppins[i]]);
                prodCost += creamValue[toppins[i]];
                //console.log("ToppingProd:", prodCost);
            }
        }

        // sauce
        if (JSON.parse("" + _selectedCream.hasSauce)=== true) {
            prodCost += sauceValue[_selectedCream.sauce];
            //console.log("SauceProd:", prodCost);
        }

        // sprinkles
        prodCost += sprinkleValue[_selectedCream.sprinklesType];
        //console.log("SprinkleProd:", prodCost);

        // waffle
        if (_serving && waffleCheck.checked) {
            prodCost += waffleValue * 0.5;
            //console.log("WaffleProd:", prodCost);
        }

        // whipped cream
        //console.log("WHIPPED VALUE: ", _selectedCream.whippedCream);

        // just checking for if (_selectedCream.whippedCream) doesn't check for its boolean value
        if (_selectedCream.whippedCream == true) {
            prodCost += whippedValue;
            //console.log("WhippedProd:", prodCost);
        }

        // ease rounding errors
        prodCost = Math.round(prodCost * 100) / 100;

        return prodCost;
    }

    // click create new button
    function clickCreateNewButton(_event: Event): void {
        // reset creator icecream
        creatorIcecream = {
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
        if (!createFormOpen) {
            creatorDiv.setAttribute("style", "display: inline");
            createNewBttn.innerHTML = "Reset";
            createNewBttn.setAttribute("style", "margin-bottom: 10px");

            selectionContainerDiv.setAttribute("style", "padding-top: 2%");

            creatingIcecream = getDisplayIcecream(canvasW * 0.7, canvasH * 0.95, true);

            createFormOpen = true;
        } else if (!formEmpty || titleField.value != "" || priceField.value != "") { // empty create form and close it
            resetCreatorFields();
        } else { // close create form if nothing is filled
            creatorDiv.setAttribute("style", "display: none");
            createNewBttn.innerHTML = "Create New";

            selectionContainerDiv.setAttribute("style", "padding-top: 10%");

            createFormOpen = false;
        }
    }

    // resets creator fields
    export function resetCreatorFields(): void {
        submitIcecreamButton.innerHTML = "Add Icecream";

        titleField.value = "";

        for (let i: number = 0; i < dropdownToppingsArray.length; i++) {
            setSelectedIndex(dropdownToppingsArray[i], 0);

            if (i > 0) {
                dropdownToppingsArray[i].setAttribute("style", "display: none");

                addToppingBttn.disabled = true;

                removeToppingBttn.disabled = true;

                visibleToppings = 1;
            }
        }

        setSelectedIndex(dropdownSauce, 0);

        setSelectedIndex(dropdownSprinkles, 0);

        whippedCheck.checked = false;

        if (creatingIcecream != null) {
            creatingIcecream.changeWhipped(false);
        }

        priceField.value = "";

        editingForm = false;

        updateProductionCost(false);

        formEmpty = true;
    }

    // click submit icecream button
    async function clickSubmitButton(_event: Event): Promise<void> {
        // if filled out
        if (titleField.value != "" &&
        creatorIcecream.toppingsAmount > 0 &&
        creatorIcecream.toppings != "" &&
        creatorIcecream.sauce >= 0 &&
        creatorIcecream.sprinklesType >= 0 &&
        priceField.value != "") {

            creatorIcecream.title = titleField.value;
            creatorIcecream.price = parseFloat(parseFloat(priceField.value).toFixed(2));

            let formData: FormData = new FormData();

            formData.append("title", creatorIcecream.title);
            formData.append("price", "" + creatorIcecream.price);
            formData.append("toppings", creatorIcecream.toppings);
            formData.append("toppingsAmount", "" + creatorIcecream.toppingsAmount);
            formData.append("sauce", "" + creatorIcecream.sauce);
            formData.append("hasSauce", "" + creatorIcecream.hasSauce);
            formData.append("sprinklesType", "" + creatorIcecream.sprinklesType);
            formData.append("whippedCream", "" + creatorIcecream.whippedCream);
            formData.append("id", "" + creatorIcecream.id);

            let query = new URLSearchParams();

            // if adding new one or editing
            
            if (!editingForm) {
                query.set("command", "insert");
                query.set("collection", "Icecreams");
            } else {
                query.set("command", "update");
                query.set("collection", "Icecreams");
                query.set("id", "" + creatorIcecream.id);
            }
            
            let json: FormDataJSON = {};
            
            // convert formData into url-useable format
            for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

            query.set("data", "" + JSON.stringify(json));
            //console.log("QUERY: ", query.toString() + " - FORMDATA: ", JSON.stringify(json));

            creatorDiv.setAttribute("style", "display: none");
            createNewBttn.innerHTML = "Create New";

            selectionContainerDiv.setAttribute("style", "padding-top: 10%");

            createFormOpen = false;

            resetCreatorFields();

            await fetch(myUrl + query.toString());

            console.log("Added new Icecream!");
            
            await getSavedCreams(true);
        } else {
            alert("Please select all aspects for your icecream first!");
        }
    }

    // change dropdown selection of toppings
    function selectToppingChange(_event: Event): void {
        let icecreamTops: string = "[";
        let toppingCount: number = 0;

        for (let i: number = 0; i < dropdownToppingsArray.length; i++) {
            let thisIndex: number = dropdownToppingsArray[i].selectedIndex;

            if (thisIndex > 0) {
                icecreamTops += thisIndex - 1 + "";
                toppingCount++;

                if (i + 1 < visibleToppings) {
                    if (dropdownToppingsArray[i + 1].selectedIndex != 0) {
                        icecreamTops += ", ";
                    }
                }
            }
        }

        // can only add if a topping is selected
        if (dropdownToppingsArray[visibleToppings - 1].selectedIndex != 0 && visibleToppings < 3) {
            addToppingBttn.disabled = false;
        }

        icecreamTops += "]";

        //console.log("IcecreamTops: ", icecreamTops, toppingCount);

        creatorIcecream.toppings = icecreamTops;
        creatorIcecream.toppingsAmount = toppingCount;

        // update creator preview
        let theseToppings: CreamTypes[] = JSON.parse(creatorIcecream.toppings);
        let newToppings: string [] = [];

        for (let i: number = 0; i < creatorIcecream.toppingsAmount; i++) {
            let topColor: string = getIcecreamColor(theseToppings[i]);
            newToppings.push(topColor);
        }

        creatingIcecream.changeToppings(newToppings);

        // update prod cost
        updateProductionCost();

        formEmpty = false;
    }

    // change sauce dropdown selection
    function selectSauceChange(_event: Event): void {
        if (dropdownSauce.selectedIndex > 1) {
            creatorIcecream.hasSauce = true;

            creatorIcecream.sauce = dropdownSauce.selectedIndex - 2;
        } else {
            creatorIcecream.hasSauce = false;
        }

        // update creating preview
        let newSauce: string = "";
        if (JSON.parse("" + creatorIcecream.hasSauce) === true) {
            let thisSauce: CreamTypes = JSON.parse("" + creatorIcecream.sauce);
            newSauce = getIcecreamColor(thisSauce, true);
        }

        creatingIcecream.changeSauce(newSauce);

        // update prod cost
        updateProductionCost();

        formEmpty = false;
    }

    // change sprinkles dropdown selection
    function selectSprinklesChange(_event: Event): void {
        if (dropdownSprinkles.selectedIndex > 0) {
            creatorIcecream.sprinklesType = dropdownSprinkles.selectedIndex - 1;
        } else {
            creatorIcecream.sprinklesType = 0;
        }

        // update creating preview
        let newSprinkles: string = getSprinklesColor(JSON.parse("" + creatorIcecream.sprinklesType));

        creatingIcecream.changeSprinkles(newSprinkles);

        // update prod cost
        updateProductionCost();

        formEmpty = false;
    }

    // change whipped cream check
    function selectWhippedChange(_event: Event): void {
        //console.log("WHIP CHECK:", whippedCheck.checked);

        if (whippedCheck.checked) {
            creatorIcecream.whippedCream = true;
            creatingIcecream.changeWhipped(true);
        } else {
            creatorIcecream.whippedCream = false;
            creatingIcecream.changeWhipped(false);
        }
        
        updateProductionCost();

        formEmpty = false;
    }

    // update creator production cost
    function updateProductionCost(_show: boolean = true): void {
        if (_show) {
            let creatorProdCost: number = getProductionCost(creatorIcecream, false);
            creatorProdParagraph.innerHTML = "Cost: $" + displayTwoDecimals(creatorProdCost);
        } else {
            creatorProdParagraph.innerHTML = "";
        }
    }

    // click add another topping button
    function clickAddToppingButton(): void {
        addToppingBttn.disabled = true;

        dropdownToppingsArray[visibleToppings].setAttribute("style", "display: inline");

        // adjust padding of entire div
        let topPadding: number = 0;
        
        switch (visibleToppings) {
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

        selectionContainerDiv.setAttribute("style", "padding-top: " + topPadding + "%");

        removeToppingBttn.disabled = false;

        //removeToppingBttn.setAttribute("style", "display: inline");

        visibleToppings++;

        if (visibleToppings > 2) {
            addToppingBttn.disabled = true;
            //addToppingBttn.setAttribute("style", "display: none");
        }

        //console.log("Visible Toppings: ", visibleToppings);
    }

    // click remove topping button
    function clickRemoveToppingButton(_event: Event): void {
        visibleToppings--;

        dropdownToppingsArray[visibleToppings].setAttribute("style", "display: none");
        
        // adjust padding of entire div
        let topPadding: number = 0;
        
        switch (visibleToppings) {
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

        selectionContainerDiv.setAttribute("style", "padding-top: " + topPadding + "%");

        setSelectedIndex(dropdownToppingsArray[visibleToppings], 0);

        addToppingBttn.disabled = false;

        //addToppingBttn.setAttribute("style", "display: inline");

        if (visibleToppings < 2) {
            removeToppingBttn.disabled = true;
            //removeToppingBttn.setAttribute("style", "display: none");
        }

        //console.log("Visible Toppings: ", visibleToppings);
    }

    // click preview serve button
    function clickServeButton(_event: Event): void {
        console.log("Click Serve Button ID:", dropdownServe.selectedIndex, "Waffle?:", waffleCheck.checked);

        if (dropdownServe.selectedIndex != 0 && waitingSelectedID >= 0) {
            // remove money from bank
            moneyReductionFrameCount = 12;
            myMoneyReduction = currentSelectedProdCost;
            myMoneyCurrent -= currentSelectedProdCost;

            // give it to customer
            allCustomers[waitingSelectedID].giveIcecream(savedCreams[(dropdownServe.selectedIndex - 1)].id);

            setSelectedIndex(dropdownServe, 0);

            //waffleCheck.checked = false;

            // closes create form
            if (createFormOpen) {
                creatorDiv.setAttribute("style", "display: none");
                createNewBttn.innerHTML = "Create New";
                createNewBttn.setAttribute("style", "margin-bottom: 0px");

                selectionContainerDiv.setAttribute("style", "padding-top: 10%");

                createFormOpen = false;

                resetCreatorFields();
            }
        } else if (waitingSelectedID >= 0) {
            alert("Select an Icecream to serve first!");
        } else {
            alert("Select a customer to serve first!");
        }
    }

    // clik edit serve button
    function clickEditServeButton(_event: Event): void {

        console.log("Click Edit Button ID:", dropdownServe.selectedIndex);

        // only edit if an icecream is selected
        if (dropdownServe.selectedIndex > 0) {
            creatorIcecream = {
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

            let editID: number = dropdownServe.selectedIndex - 1;
            
            // update creating icecream
            creatingIcecream = getDisplayIcecream(canvasW * 0.7, canvasH * 0.95, true, editID);

            resetCreatorFields();

            submitIcecreamButton.innerHTML = "Edit Icecream";

            creatorIcecream = JSON.parse(JSON.stringify(savedCreams[editID]));
            //console.log(savedCreams[editID].toppings);

            console.log("Editing Icecream:");
            console.log(creatorIcecream);

            titleField.value = creatorIcecream.title;

            let toppingCount: number = Math.floor(creatorIcecream.toppingsAmount);

            let theseToppings: CreamTypes[] = JSON.parse(creatorIcecream.toppings);

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

            for (let i: number = 0; i < toppingCount; i++) {
                //dropdownToppingsArray[i].selectedIndex = parseInt("" + theseToppings[i]) + 1;
                setSelectedIndex(dropdownToppingsArray[i], parseInt("" + theseToppings[i]) + 1);
            }

            //console.log(creatorIcecream.sauce);

            // set sauce
            if (JSON.parse("" + creatorIcecream.hasSauce) === true) {
                setSelectedIndex(dropdownSauce, parseInt("" + creatorIcecream.sauce) + 2);
            } else {
                setSelectedIndex(dropdownSauce, 0);
            }

            setSelectedIndex(dropdownSprinkles, parseInt("" + creatorIcecream.sprinklesType) + 1);

            priceField.value = "" +  creatorIcecream.price;

            whippedCheck.checked = JSON.parse("" + creatorIcecream.whippedCream.valueOf()); // doesn't recognize it as a bool if not parsed
            creatingIcecream.changeWhipped(whippedCheck.checked);
    
            // open create form in edit mode
            creatorDiv.setAttribute("style", "display: inline");
            createNewBttn.innerHTML = "Reset";
            createNewBttn.setAttribute("style", "margin-bottom: 10px");

            //selectionContainerDiv.setAttribute("style", "padding-top: 2%");
    
            editingForm = true;
            createFormOpen = true;

            updateDropdownServe(true);
        } else {
            alert("Select an Icecream to edit first!");
        }        
    }

    // click delete serve button
    async function clickDeleteServeButton(_event: Event): Promise<void> {
        console.log("Click Delete Button ID:", dropdownServe.selectedIndex);
        
        // if placeholder isn't selected
        if (dropdownServe.selectedIndex > 0) {
            let savedCreamName: string = savedCreams[dropdownServe.selectedIndex - 1].title;

            // confirm deletion
            if (confirm("This will remove " + savedCreamName + " from your selection! Are you sure you want to continue?")) {
                await deleteSavedCream(dropdownServe.selectedIndex - 1);

                console.log("Successfully deleted " + savedCreamName);
            }
        } else { // prompt to select a valid icecream
            alert("Select an Icecream to delete first!");
        }
        
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
}