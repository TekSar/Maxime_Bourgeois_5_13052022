async function getProducts(url) {
    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
    .then((resultatAPI )=>
    {
        if(resultatAPI.status ==200) {
            return resultatAPI.json();
        }
    })
    .then ((products) => {
        showProducts (products);
    });
}

function showProducts(products) {
    console.table(products);

    let url="http://google/"

    for (let product of products){
        if (!showProduct(product)) {
            //afficher message erreur
            exit;
        }
    }
}

function showProduct(product,url) {


    //contrôle
    if (product === null || product.length === 0) {
        console.log('showProduct [product] : les données passées en paramètres sont vides');
        return false;
    }

    if (url === null || url === '') {
        console.log('showProduct [Url] : les données passées en paramètres sont vides');
        return false;
    }

    let productId = 'product.html?id=';
    // déclaration de variable
    let img;
    let article;
    let a;
    let h3;
    let pDesc;


    //assignation

    //traitement

    
    img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    
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


function main()
{
    console.log('entré dans main');
    let url="http://localhost:3000/api/" + "products/";
    console.log(url);

    getProducts(url);

    
}

main();