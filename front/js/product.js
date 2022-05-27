//faire une fonction pour l'url getId()
function getId(){
    let str = window.location.href;
    let url = new URL(str);
    let idProduct = url.searchParams.get("id");
    return idProduct;
}

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

let product;

function getProductsData(idProduct) {
    fetch("http://localhost:3000/api/products/" + getId(idProduct))
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
    let colorLength = product.colors.length;

    img = document.createElement('img');
    document.querySelector(".item__img").appendChild(img);
    img.setAttribute('src', product.imageUrl);

    name = document.getElementById('title');
    name.innerHTML = product.name;

    price = document.getElementById('price');
    price.innerHTML = product.price;

    description = document.getElementById('description');
    description.innerHTML = product.description;

    //faire boucle for
    colors = document.getElementById('colors');
    colors.innerHTML = "";
    for (let i=0; i<colorLength; i++) {
        colors.innerHTML += "<option value=" + product.colors[i] + ">" + product.colors[i] + "</option>";
    }
}

//function main()
function main()
{
    getProductsData();
}

main();