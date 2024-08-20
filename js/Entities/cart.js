import { getProductByID } from './product.js';
import { formatCurrency } from "../utils/global.js";
import { Now ,formatDate } from "../utils/date.js";
import { cartItems } from "../EntitiesData/cartData.js";


const cart =
{
  productId:'',
  quantity: 0,
  deliveryOptionId: ''
}
const formattedDate =()=> formatDate(Now, 'dddd, MMMM D');

export function renderCartItem() {
  let html = '';
  cartItems.forEach(item => {
    const product = getProductByID(item.productId);
    if (!product) {
      return;
    }
    html+= `
    <div class="js-cart-item cart-item-container" 
    data-cart-item-id="${item.productId}" data-testid="cart-item-container-${item.productId}" >

        <div class="delivery-date">
          Delivery date:
          <span class="js-delivery-date">
            ${formattedDate()}
          </span>
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${product.name}
            </div>

            <div class="product-price">
              $ ${formatCurrency(product.priceCents)}
            </div>

            

            <div class="js-quantity-container product-quantity" data-testid="quantity-container">
              Quantity: <span class="js-quantity-label quantity-label" data-testid="quantity-label">
                2
              </span>

              <input class="js-new-quantity-input new-quantity-input" type="number" value="2" data-testid="new-quantity-input">

              <span class="js-update-quantity-link update-quantity-link link-primary" data-testid="update-quantity-link">
                Update
              </span>

              <span class="js-save-quantity-link save-quantity-link link-primary" data-testid="save-quantity-link">
                Save
              </span>

              <span class="js-delete-quantity-link delete-quantity-link link-primary" data-testid="delete-quantity-link">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            
      <div class="js-delivery-option delivery-option" data-delivery-option-id="f297d333-a5c4-452f-840b-15a662257b3f" data-testid="delivery-option-f297d333-a5c4-452f-840b-15a662257b3f">

        <input class="js-delivery-option-input delivery-option-input" checked="" name="00f62f04-efb8-498a-bda4-20c7886841b5-delivery-option" type="radio" data-testid="delivery-option-input">

        <div>
          <div class="delivery-option-date">
            Thursday, August 29
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
    
      <div class="js-delivery-option delivery-option" data-delivery-option-id="6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156" data-testid="delivery-option-6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156">

        <input class="js-delivery-option-input delivery-option-input" name="00f62f04-efb8-498a-bda4-20c7886841b5-delivery-option" type="radio" data-testid="delivery-option-input">

        <div>
          <div class="delivery-option-date">
            Friday, August 23
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
    
      <div class="js-delivery-option delivery-option" data-delivery-option-id="178aa766-de75-4686-8442-038c1a027003" data-testid="delivery-option-178aa766-de75-4686-8442-038c1a027003">

        <input class="js-delivery-option-input delivery-option-input" name="00f62f04-efb8-498a-bda4-20c7886841b5-delivery-option" type="radio" data-testid="delivery-option-input">

        <div>
          <div class="delivery-option-date">
            Wednesday, August 21
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    
          </div>
        </div>
        </div>


`
document.querySelector(".js-cart-summary").innerHTML= html;
});


}