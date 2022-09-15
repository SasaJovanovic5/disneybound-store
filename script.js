var basket = new Array();

function validate() {
    const name = document.forms["myForm"]["name"].value;
    const lastName = document.forms["myForm"]["lastName"].value;

    const pass = document.forms["myForm"]["pass"].value;
    const pass1 = document.forms["myForm"]["pass1"].value;
    if (name == "") {
        alert("Please enter name");
        return false;
    }

    if (lastName == "") {
        alert("Please enter last name");
        return false;
    }

    if (pass == "" || pass1 == "") {
        alert("Please enter password");
        return false;
    } else {
        if (pass != pass1) {
            alert("The passwords do not match");
            return false;
        }
    }

    return true;
}

function add(item, price, amount, percent) {
    basket = JSON.parse(localStorage.getItem("basket"));

    if (basket == null) {
        basket = new Array();
    }

    const product = new Object();
    product.id = generateId();
    product.item = item;
    product.price = price;
    product.amount = amount;
    product.percent = percent;

    basket.push(product);

    console.log(basket);

    localStorage.setItem("basket", JSON.stringify(basket));
}

function generateId() {
    const newId = basket.length + 1;

    return newId;
}

function generateBasket() {
    basket = JSON.parse(localStorage.getItem("basket"));

    if (basket == null) {
        basket = new Array();
    }

    //Create a HTML Table element.
    const table = document.createElement("TABLE");
    const attribute = document.createAttribute("class");        // Create a "class" attribute
    attribute.value = "table table-bordered table-striped table-dark table-hover";  // Set the value of the class attribute
    table.setAttributeNode(attribute);

    //Add the header row.
    var row = table.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Item";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Price";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Amount";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Percent";
    row.appendChild(headerCell);

    //Add the data rows.
    for (var i = 0; i < basket.length; i++) {
        row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.innerHTML = basket[i].item;

        cell = row.insertCell(-1);
        cell.innerHTML = basket[i].price + "€";

        cell = row.insertCell(-1);
        cell.innerHTML = basket[i].amount;

        cell = row.insertCell(-1);
        cell.innerHTML = basket[i].percent + "\%";
    }

    const dvTable = document.getElementById("table");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function clearBasket() {
    localStorage.clear();
    generateBasket();
}

function generateItems() {
    
    //Create a HTML Table element.
    const table = document.createElement("TABLE");
    const attribute = document.createAttribute("class");        // Create a "class" attribute
    attribute.value = "table table-bordered table-striped table-dark table-hover";  // Set the value of the class attribute
    table.setAttributeNode(attribute);

    //Add the header row.
    var row = table.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Item";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Description";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Price";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Stock";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Image";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "";
    row.appendChild(headerCell);

    // preberemo XML in kot rezultat dobimo polje izdelkov
    const items = preberiXML("xml/SeznamArtiklov.xml");

    //Add the data rows.
    for (var i = 0; i < items.length; i++) {
        const item = items[i];

        row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.innerHTML = item.item;

        cell = row.insertCell(-1);
        cell.innerHTML = item.description;

        cell = row.insertCell(-1);
        cell.innerHTML = item.price + "€";

        cell = row.insertCell(-1);
        cell.innerHTML = item.amount;

        cell = row.insertCell(-1);
        cell.innerHTML = "<img src=" + item.src + " width=\"100px\" height=\"100px\" />";

        cell = row.insertCell(-1);
        cell.innerHTML = "<button onclick=asdd('"+item.item+"',"+item.price+","+
                            1 + "," + item.percent +")>Dodaj v košarico</button>";
    }

    const dvTable = document.getElementById("tableSpec");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function preberiXML(path) {
    const items = new Array();

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", path, false);
    xmlhttp.send();

    const xmlDoc = xmlhttp.responseXML;
    
    const itemNodes = xmlDoc.getElementsByTagName("Item");

    for (item of itemNodes) {
        const itemObj = new Object();
        itemObj.id = item.getAttribute('id');
        itemObj.src = item.getAttribute('src');

        //console.log(artikel.childNodes);

        itemObj.item = item.childNodes[1].textContent;
        itemObj.description = item.childNodes[3].textContent;
        itemObj.price = item.childNodes[5].textContent;
        itemObj.amount = item.childNodes[7].textContent;
        itemObj.percent = item.childNodes[9].textContent;

        items.push(itemObj);
    }

    return items;
}