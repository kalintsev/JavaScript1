'use strict';

const openBasketBtn = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketValEl = document.getElementsByClassName('basketVal');


const ProdArr = [
    ['Product 0', 52.22],
    ['Product 1', 32.12],
    ['Product 2', 82.87],
    ['Product 3', 22.39],
    ['Product 4', 92.99],
    ['Product 5', 12.55]
];

let bask = [];
let ProdIndex = [0, 0, 0, 0, 0, 0];
let price = 0;
let ProdCol = 0;
let productRow = '';


function addEventListenersForAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
}

function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);
}


function addProductIntoBasket(productId) {
    basketCounterEl.textContent++;
    ProdIndex[productId]++;
    bask.splice(0, bask.length);
    price = 0;
    ProdCol = 0;


    for (let i = 0; i < ProdIndex.length; i++) {
        if (ProdIndex[i] > 0) {
            bask.push([ProdArr[i][0], ProdArr[i][1], ProdArr[i][1] * ProdIndex[i], ProdIndex[i]]);
            price += ProdArr[i][1] * ProdIndex[i];
            ProdCol += ProdIndex[i];
        }
    }
    renderNewProductInBasket();
}


openBasketBtn.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});

function renderNewProductInBasket() {
    productRow = '';
    for (let i = 0; i < bask.length; i++) {
        productRow = productRow + `
        <div class="basketVal basketRow">
            <div>${bask[i][0]}</div>
            <div>${bask[i][3]} шт.</div>
            <div>$${bask[i][1]}</div>
            <div>${bask[i][2].toFixed(2)}</div>
        </div>
    `;
    }

    while (basketValEl[0]) {
        basketValEl[0].parentNode.removeChild(basketValEl[0]);
    }

    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);

    basketTotalValueEl.textContent = price.toFixed(2);
}

addEventListenersForAddToCartButtons();