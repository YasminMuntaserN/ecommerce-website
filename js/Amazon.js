import { products } from './EntitiesData/productData.js';

import { formatCurrency } from "./utils/global.js";

import {AddToCart } from "./Entities/cart.js";

import { renderCartItem } from './Entities/cart.js';
function htmlCompleteHtml(){
  return `<div class="product-quantity-container">
      <select class="js-quantity-selector" data-testid="quantity-selector">
        <option selected="" value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    

    <div class="product-spacer"></div>

    <div class="js-added-to-cart-message added-to-cart-message" >
    </div> 

    <button class="js-add-to-cart-button
      add-to-cart-button button-primary" data-testid="add-to-cart-button">
      Add to Cart
    </button>`;
}

function generateHTMLToDisplayProducts()
{
  let html = "";

  products.forEach(product => {
    html += 
    `
      <div class="js-product-container product-container" 
      data-product-id=${product.id}
      data-testid="product-container-${product.id}">
      <div class="product-image-container">
      <img class="js-product-image product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="imgs/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>
     ${htmlCompleteHtml()}
 </div>
    `
  });
  return html;
}

function DisplayProductsInMain(){
  document.querySelector(".js-products-grid").innerHTML=generateHTMLToDisplayProducts();
}

export function AddToCartInCheckOut(){
  document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
    button.addEventListener("click",()=>{
      const productId =button.dataset.productId;
      AddToCart(productId);
      console.log("done");
    });
  });
}
function main(){
  DisplayProductsInMain();
  AddToCartInCheckOut();
}
main();