const URL_BACKEND="http://localhost:3000/api/products/";
const errorMsg = "Une erreur est survenue, veuillez réessayer plus tard";
const MSG_ERROR_API="Erreur de la requête API";
let Products=[];

//fonction pour alerter l'utilisateur qu'un problème est survenu
function AlertUser(message)
{
    alert(message);
}

//fonction pour alerter le développeur qu'un problème est survenu
function alertDev(fonction, message)
{
    console.log(fonction + ' : ' + message);
}

//fonction de base récupérant les données de l'API, 
//mise en fonction général pour éviter une surcharge du code
async function getProducts(URL_BACKEND) {
    await fetch(URL_BACKEND, {
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
        Products=products;
        showProducts();
    });
}