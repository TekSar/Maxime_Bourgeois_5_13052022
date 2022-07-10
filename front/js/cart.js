

function showProducts(productsBackend){
    let datas=JSON.parse(localStorage.getItem('products'));
    let productBackend;

    // si datas vide  on masque le formulaire + message à l'utilisateur
    if (datas == null || datas == []){
        var formulaire = document.querySelector(".cart__order");
        formulaire.style.display = "none";
    }
    else{
        for (let i=0; i<datas.length; i++){
            productBackend=getProductBackend(datas[i].productId,Products);
            showProduct(datas[i],productBackend);
            //calculTotal(datas[i],productBackend);
        }
        calculTotal(datas,Products);
        verifInputQuantity();
        modifyQtt(datas);
    }    
    // return datas;
}

function getProductBackend(productId,productsBackend){
    for (let i=0; i<productsBackend.length; i++){
        if(productsBackend[i]._id==productId){
            return productsBackend[i];
        }
    }
    return "TODO ERREUR A GERER";
}

function showProduct(productLocalStorage, productBackend){
    //html
    let article;
    let div_img;
    let div_content;
    let div_description;
    let div_setting;
    let div_quantity;
    let div_delete;
    let p_quantity;
    let p_delete;
    let img;
    let h2;
    let p_color;
    let p_price;
    let input;

    //valeurs
    let productColor=productLocalStorage.color;
    let productQuantity = productLocalStorage.quantity;
    

    article = document.createElement('article');
    document.querySelector("#cart__items" ).appendChild(article);
    article.setAttribute('class', 'cart__item' );
    article.setAttribute('data-id', productBackend._id);
    article.setAttribute('data-color', productQuantity);

    //Image

        div_img = document.createElement('div');
        article.appendChild(div_img);
        div_img.setAttribute('class', 'cart__item__img');

        img = document.createElement('img');
        div_img.appendChild(img);
        img.setAttribute('src', productBackend.imageUrl);
        img.setAttribute('alt', "Photographie d'un canapé");

    //content

        div_content = document.createElement('div');
        article.appendChild(div_content);
        div_content.setAttribute('class', 'cart__item__content');

        div_description = document.createElement('div');
        div_content.appendChild(div_description);
        div_description.setAttribute('class', 'cart__item__content__description');

        h2 = document.createElement('h2');
        div_description.appendChild(h2);
        h2.innerHTML = productBackend.name;

        p_color = document.createElement('p');
        div_description.appendChild(p_color);
        p_color.innerHTML = productColor;

        p_price = document.createElement('p');
        div_description.appendChild(p_price);
        p_price.innerHTML = productBackend.price + ',00 €';

    //settings

        div_setting = document.createElement('div');
        div_content.appendChild(div_setting);
        div_setting.setAttribute('class', 'cart__item__content__settings');

        div_quantity = document.createElement('div');
        div_setting.appendChild(div_quantity);
        div_quantity.setAttribute('class', 'cart__item__content__settings__quantity');

        p_quantity = document.createElement('p');
        div_quantity.appendChild(p_quantity);
        p_quantity.innerHTML = "Qté : " + productQuantity;

        input = document.createElement('input');
        div_quantity.appendChild(input);
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', productQuantity);

    //delete

        div_delete = document.createElement('div');
        div_setting.appendChild(div_delete);
        div_delete.setAttribute('class', 'cart__item__content__settings__delete');

        p_delete = document.createElement('p');
        div_delete.appendChild(p_delete);
        p_delete.setAttribute('class', 'deleteItem');
        p_delete.setAttribute('onClick', "supprimeProduct('"+ productLocalStorage.productId +"','" + productColor +"')");
        p_delete.innerHTML = "Supprimer";


}

function supprimeProduct(productId, color){
    let LSProduct=JSON.parse(localStorage.getItem('products'));
    let article_toDelete=document.querySelectorAll('.cart__item');
    for (let i=0; i<LSProduct.length; i++){
        if(LSProduct[i].productId == productId && LSProduct[i].color == color){
            LSProduct = LSProduct.filter( LSProduct => LSProduct.productId !== productId || LSProduct.color !== color );
            localStorage.setItem("products", JSON.stringify(LSProduct));
            alert("Ce produit a bien été supprimé du panier");
            // location.reload();
            for (let i=0; i<article_toDelete.length; i++){
                article_toDelete[i].remove();
            }
            showProducts();
        }
    }
}


function calculTotal(productsLocalStorage, productsBackend){
    let quantiteTotal = 0;
    let prixTotal = 0;
    let productBackEnd;

    for (let i=0; i<productsLocalStorage.length; i++){
        quantiteTotal = quantiteTotal + Number(productsLocalStorage[i].quantity);
        
        productBackEnd= getProductBackend(productsLocalStorage[i].productId,productsBackend);
        prixTotal = prixTotal + (productsLocalStorage[i].quantity * productBackEnd.price) ;
    }

    totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = quantiteTotal;

    totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = prixTotal;
    
}

function verifInputQuantity(){
    let LSProduct=JSON.parse(localStorage.getItem('products'));
    for (let i=0; i<LSProduct.length; i++){
        if(LSProduct[i].quantity > 100){
            alert("Quantité maximum dépassé, la quantité à été réduite à 100 exemplaires.");
            LSProduct[i].quantity = 100;
            localStorage.setItem("products", JSON.stringify(LSProduct));
            location.reload();
        }
    }
}


function modifyQtt(productsLocalStorage) {
    let qttModif = document.querySelectorAll(".itemQuantity");
    
    for (let i = 0; i < qttModif.length; i++){
        qttModif[i].addEventListener("change" , (event) => {
            event.preventDefault();
            
            let qttModifValue = qttModif[i].value;
            let productIdModif = productsLocalStorage[i].productId;
            
            const resultFind = productsLocalStorage.find((el) => el.productId == productIdModif);
            
            resultFind.quantity = qttModifValue;
            productsLocalStorage[i].quantity = resultFind.quantity;

            localStorage.setItem("products", JSON.stringify(productsLocalStorage));
            // refresh rapide
            window.location.reload();
            
        })
    }
}


const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => sendForm(e));

function sendForm(e) {
    e.preventDefault()
    let productQuantity = document.querySelectorAll(".itemQuantity");
    if (productQuantity.length === 0) {
        alert("Votre panier est vide ! ")
        return;
    }

    if (formVerif()) return;
    if (firstNameVerif()) return;
    if (lastNameVerif()) return;
    if (addressVerif()) return;
    if (cityVerif()) return;
    if (emailVerif()) return;

    const contact = makeFormContact()
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId;
            window.location.href = "./confirmation.html" + "?orderId=" + orderId;
        })
}

function makeFormContact() {
    const form = document.querySelector(".cart__order__form");
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const contact = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: idsProducts(),
    }
    return contact;
}

function formVerif() {
    const form = document.querySelector(".cart__order__form");
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        if (input.value === "") {
            input.closest("div.cart__order__form__question").getElementsByTagName("p")[0].innerHTML = "Merci de remplir tous les champs";
            // alert("Merci de remplir tous les champs")

            return true;
        }
        return false;
    })
}

function firstNameVerif() {
    const firstName = document.querySelector("#firstName").value;
    const regexFirstName = /^([^0-9]*)$/;
    if (regexFirstName.test(firstName) === false) {
        document.querySelector("#firstNameErrorMsg").innerHTML = "Merci d'entrer un prénom valide";
        return true;
    }
    return false;
}

function lastNameVerif() {
    const lastName = document.querySelector("#lastName").value;
    const regexlastName = /^([^0-9]*)$/;
    if (regexlastName.test(lastName) === false) {
        document.querySelector("#lastNameErrorMsg").innerHTML = "Merci d'entrer un nom valide";
        return true;
    }
    return false;
}

function addressVerif(){
    const address = document.querySelector("#address").value;
    return false;
}

function cityVerif() {
    const city = document.querySelector("#city").value;
    const regexCity = /^([^0-9]*)$/;
    if (regexCity.test(city) === false) {
        document.querySelector("#cityErrorMsg").innerHTML = "Merci d'entrer une ville valide";
        return true;
    }
    return false;
}

function emailVerif() {
    const email = document.querySelector("#email").value;
    const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    if (regexMail.test(email) === false) {
        document.querySelector("#emailErrorMsg").innerHTML = "Merci d'entrer un email valide";
        return true;
    }
    return false;
}

function idsProducts() {
    const quantityProducts = localStorage.length
    const ids = []
    for (let i = 0; i < quantityProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}

function main()
{
    getProducts(URL_BACKEND);
}

main();