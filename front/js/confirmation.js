function confirmationOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    return orderId
}

function setOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

const orderId = confirmationOrderId()
setOrderId(orderId)