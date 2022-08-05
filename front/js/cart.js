//fonction de récupération des produits depuis le localstorage
function showProducts(productsBackend){
    let datas=JSON.parse(localStorage.getItem('products'));
    let productBackend;

    // si datas vide on masque le formulaire + message à l'utilisateur
    if (datas == null || datas == []){
        var formulaire = document.querySelector(".cart__order");
        formulaire.style.display = "none";
    }
    else{
        for (let i=0; i<datas.length; i++){
            productBackend=getProductBackend(datas[i].productId,Products);
            showProduct(datas[i],productBackend);
        }
        calculTotal(datas,Products);
        verifInputQuantity();
        modifyQtt(datas);
    }
}
//fonction utile à la précédente, récupérant l'ID pour tout les produits
function getProductBackend(productId,productsBackend){
    for (let i=0; i<productsBackend.length; i++){
        if(productsBackend[i]._id==productId){
            return productsBackend[i];
        }
    }
    return "TODO ERREUR A GERER";
}
//fonction d'affichage des articles dans le panier, similairement aux autres pages
function showProduct(productLocalStorage, productBackend){
    //déclaration
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

    //declaration couleur et quantité depuis le localstorage
    let productColor=productLocalStorage.color;
    let productQuantity = productLocalStorage.quantity;
    
    //mise en place de l'intégration des valeurs et création des balises
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
//fonction qui supprime un produit du panier au click du bouton supprimer
function supprimeProduct(productId, color){
    let LSProduct=JSON.parse(localStorage.getItem('products'));
    let article_toDelete=document.querySelectorAll('.cart__item');
    for (let i=0; i<LSProduct.length; i++){
        if(LSProduct[i].productId == productId && LSProduct[i].color == color){
            LSProduct = LSProduct.filter( LSProduct => LSProduct.productId !== productId || LSProduct.color !== color );
            localStorage.setItem("products", JSON.stringify(LSProduct));
            alert("Ce produit a bien été supprimé du panier");
            for (let i=0; i<article_toDelete.length; i++){
                article_toDelete[i].remove();
            }
            showProducts();
        }
    }
}
//fonction qui calcul le prix et la quantité total des produits
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
//fonction qui vérifie si la quantité produit ne dépasse pas le seuil
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
//fonction qui modifie la quantité depuis le panier
function modifyQtt(productsLocalStorage) {
    let qttModif = document.querySelectorAll(".itemQuantity");
    
    for (let i = 0; i < qttModif.length; i++){
        qttModif[i].addEventListener("change" , (event) => {
            event.preventDefault();
            
            let qttModifValue = qttModif[i].value;
            let productIdModif = productsLocalStorage[i].productId;
            let colorModif = productsLocalStorage[i].color;
            
            const resultFind = productsLocalStorage.find((el) => el.productId == productIdModif && el.color == colorModif);
            
            resultFind.quantity = qttModifValue;
            productsLocalStorage[i].quantity = resultFind.quantity;

            localStorage.setItem("products", JSON.stringify(productsLocalStorage));
            // refresh rapide
            window.location.reload();
            
        })
    }
}

//fonction principale permettant d'envoyer les valeurs vérifiés de formulaire
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

    // alert('je suis passé');

    const contact = makeFormContact();

    localStorage.setItem("confirmation", JSON.stringify(contact));


    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: localStorage.getItem('confirmation'),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        window.location.href = "./confirmation.html?orderId=" + data.orderId;
    })

}
//fonction qui récupéère et stock les valeurs du formulaire
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
//fonction qui vérifie si les valeurs des inputs ne sont pas vides
function formVerif() {
    const form = document.querySelector(".cart__order__form");
    const inputs = form.querySelectorAll("input");
    // fonction appelée forcément, donc faire simple boucle forEach
    for(let i=0; i<inputs.length; i++){
        console.log("test1");
        if(inputs[i].value == null || inputs[i].value == ""){
            inputs[i].closest("div.cart__order__form__question").getElementsByTagName("p")[0].innerHTML = "Merci de remplir tous les champs";
            // alert("Merci de remplir tous les champs")
            console.log("test2");
            return true;
        }
    }
    return false;
}
//fonctions qui vérifie les différents (indiqué dans le nom de la fonction)
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
    const email = document.querySelector("#email").value
    const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
    if (regexMail.test(email) === false) {
        document.querySelector("#emailErrorMsg").innerHTML = "Merci d'entrer un email valide";
        return true
    }
    return false
}
//fonction qui récupère les id des produits
function idsProducts() {
    const LSProduct=JSON.parse(localStorage.getItem('products'));
    let ids = []
    for (let i = 0; i < LSProduct.length; i++) {
        let id = LSProduct[i].productId;
        ids.push(id)
    }
    return ids
}
//fonction main de la page
function main()
{
    getProducts(URL_BACKEND);

    const orderButton = document.querySelector("#order");
    orderButton.addEventListener("click", (e) => sendForm(e));
}

main();