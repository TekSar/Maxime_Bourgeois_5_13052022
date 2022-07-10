const URL_BACKEND="http://localhost:3000/api/products/";
const errorMsg = "Une erreur est survenue, veuillez réessayer plus tard";
const MSG_ERROR_API="Erreur de la requête API";
let Products=[];


function AlertUser(message)
{
    alert(message);
}

function alertDev(fonction, message)
{
    console.log(fonction + ' : ' + message);
}

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
        Products=products;
        showProducts ();
    });
}