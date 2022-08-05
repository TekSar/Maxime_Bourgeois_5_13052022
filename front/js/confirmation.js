function getOrderId(){
    let str = window.location.href;
    let url = new URL(str);
    let orderId = url.searchParams.get("orderId");
    if(!orderId || !url || !str){
        alert(errorMsg);
    }

    let orderIdElement = document.getElementById("orderId");
    orderIdElement.innerHTML = orderId;
}
getOrderId();

//fonction qui récupère les information envoyées depuis la page panier
// function getForm() {
//     fetch("http://localhost:3000/api/products/order", {
//         method: "POST",
//         body: localStorage.getItem('confirmation'),
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         }
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         const orderId = data.orderId;
//         let orderIdElement = document.getElementById("orderId");
//         orderIdElement.innerHTML = orderId;
//     })
// }
// getForm();