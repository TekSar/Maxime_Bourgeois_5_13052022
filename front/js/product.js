let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
//faire une fonction pour l'url getId()

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getProductsData();

let product;

function getProductsData() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    
    .then(async function (resultatAPI) {
        product = await resultatAPI;
        console.table(product);
        if (product){
            showProductsData(product);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}

function showProductsData(product){

    let img;
    let name;
    let price;
    let description;

    img = document.createElement('img');
    document.querySelector(".item__img").appendChild(img);
    img.setAttribute('src', product.imageUrl);

    name = document.getElementById('title');
    name.innerHTML = product.name;

    price = document.getElementById('price');
    price.innerHTML = product.price;

    description = document.getElementById('description');
    description.innerHTML = product.description;

    colors = document.getElementById('colors');
    colors.innerHTML = "<option value=" + product.colors[0] + ">" + product.colors[0] + "</option>" 
    + "<option value=" + product.colors[1] + ">" + product.colors[1] + "</option>";
    //faire une boucle for i
    
}

//function main()