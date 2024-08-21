import { renderCartItem,removeItemFromCart } from './Entities/cart.js';

// import { AddToCartInCheckOut } from './Amazon.js';

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


