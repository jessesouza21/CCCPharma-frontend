const url = "https://cccpharma-api-jjlm.herokuapp.com/orders";

function orders() {
    return fetch(url).then(r => r.json());
}

function infoOrders() {
    const newUrl = url + "/info";
    return fetch(newUrl).then(r => r.json());
}

/*
Formato: 
    orderForm: [{"quantity": 10, "product": {...}}]
*/
function addOrder(orderForm) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderForm)
    }

    return fetch(url, config).then(r => r.json());
}

function removeOrder(orderId){
    const removeUrl = url + "/" + orderId;
    const config = {
        method: 'DELETE'
    };
    try{
        fetch(removeUrl, config);
        return "ok";
    }catch(e){
        return "erro de rede";
    }
}

export { orders, infoOrders , addOrder, removeOrder };