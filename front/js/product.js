

//faire une fonction pour l'url getId()
function getId(){
    let str = window.location.href;
    // str = ""
    let url = new URL(str);
    // url = "";
    let idProduct = url.searchParams.get("id");

    if(!idProduct || !url || !str){
        alert(errorMsg);
    }

    return idProduct;
}

function getProductsData(idProduct) {
    fetch(URL_BACKEND + idProduct)
    .then((res) => {
        return res.json();
    })
    .then(async function (resultatAPI) {
        let product = await resultatAPI;
        if (product){
            showProductsData(product);
        }
    })
    .catch((error) => {
        console.log(MSG_ERROR_API);
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



function addEnventForAddToCart(){
    const btnAddToCart = document.querySelector("#addToCart");
    if (btnAddToCart != null) 
    {
        btnAddToCart.addEventListener("click", addCart );
    }
}

//garder les valeurs en localStorage
function addCart(){

    const colorPicked = document.querySelector("#colors").value
    const quantityPicked = document.querySelector("#quantity").value

    //check si des données saisies
    if(!commandeValide(colorPicked,quantityPicked)) {
        return;
    }
    let datas=[];

    const data = {
        productId: getId(),
        color: colorPicked,
        quantity: Number(quantityPicked),
    };

    console.log(datas);
    datas=localStorage.getItem('products');
    
    if(datas == null || datas == [] || datas == "undefined"){
        localStorage.setItem("products", "[]");
        datas=JSON.parse(localStorage.getItem('products'));
    }
    else{
        datas=JSON.parse(localStorage.getItem('products'));
    }
    

    
    
    console.log(datas);

    // si localstorage vide
    if (datas == null || datas == [] || datas == undefined){
        datas=[];
        datas.push(data);
    } else {
        let index=findIndexOfDatas(datas,data);
        if(index=='false') {
            datas.push(data);
        } else {
            datas[index].quantity=Number(datas[index].quantity) + data.quantity;
        }
    }
    localStorage.setItem("products", JSON.stringify(datas));
    

    goCart();
    
}

function findIndexOfDatas(datas,data){
    for (let i=0; i<datas.length; i++) {
        if(datas[i].color==data.color && datas[i].productId==data.productId) {
            return i;
        }
    }
    return 'false';
}

function commandeValide(colorPicked, quantityPicked) {
    if (colorPicked == null || colorPicked == "" || quantityPicked == null || quantityPicked == 0) {
        AlertUser("Veuillez selectionner un coloris ainsi que la quantité souhaitée");
        return false;
    }
    return true;
}
function goCart() {
    window.location.href = "cart.html";
}

//function main()
function main()
{
    console.log(URL_BACKEND);
    getProductsData(getId());
    addEnventForAddToCart();

}

main();

//TO DO LIST 

//Ajouter fonction pour input à 100 produits max (keypress)
//Si les produits totaux dépasse 100 alors prévenir utilisateurs et revenir à 100 produits max (pour chaque produit individuellement ?)

//Page Cart.js
//récupérer tout les produits et les afficher

