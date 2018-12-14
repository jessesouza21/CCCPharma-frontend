const $produtos = document.querySelector(".products-container");

let produtoEx = [{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0.4}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 1,"name": "Higiene Pessoal","discount": 0}}];

let currentProducts = [{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 1,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0.4}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}},
{"id": 2,"name": "Perfume","producer": "KY","barcode": "100002","price": 52.59,"available": false,"category": {"id": 2,"name": "Higiene Pessoal","discount": 0}}];

/* init home */

(function(){
    populateHome();
    filterProducts();
})();

function update(){
    filterProducts();
    populateHome();
}

function filterProducts(){
    let $messageNotFound = document.querySelector("#not-found-message");
    $messageNotFound.classList.remove("desaparecer");

    let filteredProducts = [];
    let indexCategory = document.getElementById("input-categoria").selectedIndex;

    produtoEx.forEach(product =>
        {
            if(product.category.id == indexCategory || indexCategory == 0){
                filteredProducts.push(product);
            }
        });

    currentProducts = filteredProducts;

    if(currentProducts.length > 0){
        $messageNotFound.classList.add("desaparecer");
    }
}

function redirectRouter(url){
    this.window.location.href= url;
}


function populateHome(){

    while ($produtos.firstChild) {
        $produtos.removeChild($produtos.firstChild);
    }
    currentProducts.forEach(element => {
        let $product = document.createElement("div");
        
        let discountPrice = calculateDiscount(element.price, element.category.discount);

        if(element.category.discount > 0){
            $product.innerHTML = `
                <div class="desconto"> -${element.category.discount * 100}%</div>
                <img class="imagem-produto" src="img/${element.category.id}.jpg">
                <p class="nome">${element.name}</p>
                <p><spam class="preco-antigo">De: R$ ${element.price} </spam>
                <spam class="preco-atual">Por: R$${discountPrice}</spam></p>
                <div class="escolha" onclick = "redirectRouter('index.html')">Selecionar</div>
            `
        }else{
            $product.innerHTML = `
                <img class="imagem-produto" src="img/${element.category.id}.jpg">
                <p class="nome">${element.name}</p>
                <p class="preco-antigo"></p>
                <p class="preco-atual">R$ ${element.price}</p>
                <div class="escolha" onclick = "redirectRouter('index.html')">Selecionar</div>
            `
        }
        $product.classList.add("produto");
        $produtos.appendChild($product);
    });
};

function calculateDiscount(price,discount){
    return (price - (price * discount)).toFixed(2);
}

// {
//     "id": 3,
//     "amount": 10,
//     "expiration": "01-01-2018",
//     "product": {
//         "id": 2,
//         "name": "Perfume",
//         "producer": "KY",
//         "barcode": "100002",
//         "price": 52.59,
//         "available": false,
//         "category": {
//             "id": 2,
//             "name": "Higiene Pessoal",
//             "discount": 0
//         }
//     }
// }{
//     "id": 3,
//     "amount": 10,
//     "expiration": "01-01-2018",
//     "product": {
//         "id": 2,
//         "name": "Perfume",
//         "producer": "KY",
//         "barcode": "100002",
//         "price": 52.59,
//         "available": false,
//         "category": {
//             "id": 2,
//             "name": "Higiene Pessoal",
//             "discount": 0
//         }
//     }
// }