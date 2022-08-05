//fonction qui permet d'afficher en console les tableaux de chaque produits
//et alerte le dev si un problème
function showProducts() {
    console.table(Products);
    for (let product of Products){
        if (!showProduct(product)) {
            alertDev();
            exit;
        }
    }
}

//fonction principale de script.js permettant de contrôler et afficher les données récupérer pour chaque produit
function showProduct(product,url) {
    console.table(product);
    //contrôle si le produit et son url sont vides
    if (product === null || product.length === 0) {
        console.log('showProduct [product] : les données passées en paramètres sont vides');
        return false;
    }
    if (url === null || url === '') {
        console.log('showProduct [Url] : les données passées en paramètres sont vides');
        return false;
    }

    // déclaration de variable
    let productId = 'product.html?id=';
    let img;
    let article;
    let a;
    let h3;
    let pDesc;
    
    //mise en place de l'HTML dans la page 
    img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altTxt);
    
    article = document.createElement('article');
    
    a = document.createElement('a');
    a.setAttribute('href', productId + product._id);

    h3 = document.createElement("h3");
    h3.setAttribute('class', 'productName');
    h3.innerHTML = product.name;

    pDesc = document.createElement("p");
    pDesc.setAttribute('class', 'productDescription');
    pDesc.innerHTML = product.description;

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(pDesc);
    a.appendChild(article);
    
    document.getElementById('items').appendChild(a);
    
    //valeur retournée
    return true;
}

//fonction main pour appeler les fonctions nécessaires depuis fonction.js
function main()
{
    getProducts(URL_BACKEND);
}

main();