// import { renderCartItem,removeItemFromCart } from './Entities/cart.js';

// import{renderPaymentSummary} from './checkout/pa.js';

// import { AddToCartInCheckOut } from './Amazon.js';

import { cartItems } from "./data/products.js";
import { getProductByID } from './entities/product.js';
import {getDeliveryOptions} from '../EntitiesData/deliveryOptions.js'

export function calculateTotalProductPriceCents(){
  const totalPayments=0;
  cartItems.forEach(element => {
    const product =getProductByID(element.id);
    totalPayments+=product.priceCents * element.quantity;
    console.log(totalPayments);
  });
  return totalPayments;
}

export function renderPaymentSummary(){
  let productPriceCents =calculateTotalProductPriceCents();
  let shippingPriceCents=0;

  cartItems.forEach(element => {
    shippingPriceCents +=getDeliveryOptions(element.deliveryOptionId).priceCents;

    
  });
  console.log(shippingPriceCents);

}


// AddToCartInCheckOut();
renderCartItem();

// function Delete(){
  document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId =link.dataset.productId;
      removeItemFromCart(productId);
        console.log("done");
        let elementToDelete =document.querySelector(`.cart-item-container-${productId}`);
        elementToDelete.remove();
  });
});

// renderPaymentSummary();

