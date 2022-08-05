//fonction permettant de récupérer l'id du produit sur lequel on a cliqué
function getId(){
    let str = window.location.href;
    let url = new URL(str);
    let idProduct = url.searchParams.get("id");
    if(!idProduct || !url || !str){
        alert(errorMsg);
    }

    return idProduct;
}
//on récupère ici les informations liées au produit concerné
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

//fonction principale de product.js permettant de (comme script.js) créer les champs HTML et y insérer les données concernées
function showProductsData(product){

    //déclarations
    let title;
    let img;
    let name;
    let price;
    let description;
    let colorLength = product.colors.length;

    //mise en place de l'HTML
    title = document.querySelector("title");
    title.innerHTML = product.name;

    img = document.createElement('img');
    document.querySelector(".item__img").appendChild(img);
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altTxt);

    name = document.getElementById('title');
    name.innerHTML = product.name;

    price = document.getElementById('price');
    price.innerHTML = product.price;

    description = document.getElementById('description');
    description.innerHTML = product.description;

    //boucle for pour l'affichage de toutes les couleurs du produit
    colors = document.getElementById('colors');
    colors.innerHTML = "";
    for (let i=0; i<colorLength; i++) {
        colors.innerHTML += "<option value=" + product.colors[i] + ">" + product.colors[i] + "</option>";
    }
}
//fonction qui capte un évenement click si le panier n'est pas vide
function addEnventForAddToCart(){
    const btnAddToCart = document.querySelector("#addToCart");
    if (btnAddToCart != null) 
    {
        btnAddToCart.addEventListener("click", addCart );
    }
}

//fonction qui ajoute au localStorage les valeurs du produit souhaitées par l'utilisateur (couleur, quantité, et ID)
function addCart(){

    const colorPicked = document.querySelector("#colors").value
    const quantityPicked = document.querySelector("#quantity").value

    //check si des données ont été saisies
    if(!commandeValide(colorPicked,quantityPicked)) {
        return;
    }
    let datas=[];

    //met ensemble les valeurs
    const data = {
        productId: getId(),
        color: colorPicked,
        quantity: Number(quantityPicked),
    };
    //vérifie si le produit est déjà dans le panier
    datas=localStorage.getItem('products');
    //si non, on crée la clé "products" dans le LocalStorage
    if(datas == null || datas == [] || datas == "undefined"){
        localStorage.setItem("products", "[]");
        datas=JSON.parse(localStorage.getItem('products'));
    }
    //si datas n'est pas vide, on récupère ce qu'il y a dedans
    else{
        datas=JSON.parse(localStorage.getItem('products'));
    }

    // si datas vide, on crée un tableau "datas" dans lequel on mets nos valeurs ensembles
    if (datas == null || datas == [] || datas == undefined){
        datas=[];
        datas.push(data);
    } 
    //sinon on additionne les quantités liées au bon produit
    else {
        let index=findIndexOfDatas(datas,data);
        if(index=='false') {
            datas.push(data);
        } else {
            datas[index].quantity=Number(datas[index].quantity) + data.quantity;
        }
    }
    //et on y insère les nouvelles valeurs
    localStorage.setItem("products", JSON.stringify(datas));
    //et on redirige vers le panier
    goCart();
    
}
//fonction de recherche de l'index correspondant afin de reconnaitre le produits à changer dans notre clé "products"
function findIndexOfDatas(datas,data){
    for (let i=0; i<datas.length; i++) {
        if(datas[i].color==data.color && datas[i].productId==data.productId) {
            return i;
        }
    }
    return 'false';
}
//fonction qui alerte si une couleur ou une quantité a été choisie 
function commandeValide(colorPicked, quantityPicked) {
    if (colorPicked == null || colorPicked == "" || quantityPicked == null || quantityPicked == 0) {
        AlertUser("Veuillez selectionner un coloris ainsi que la quantité souhaitée");
        return false;
    }
    return true;
}
//fonction de rédirection vers le panier
function goCart() {
    window.location.href = "cart.html";
}

//fonction main pour appeler les fonctions principales
function main()
{
    console.log(URL_BACKEND);
    getProductsData(getId());
    addEnventForAddToCart();

}

main();
