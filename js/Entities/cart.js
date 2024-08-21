import { getProductByID } from './product.js';
import { formatCurrency } from "../utils/global.js";
import { Now ,formatDate } from "../utils/date.js";
import { cartItems ,setCartItems,saveToStorage } from "../EntitiesData/cartData.js";


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
    <div class="js-cart-item cart-item-container-${item.productId}" >

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

              <span class="js-delete-quantity-link delete-quantity-link link-primary"
                data-product-id=${item.productId}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            
      <div class="js-delivery-option delivery-option"> 

        <input class="js-delivery-option-input delivery-option-input" name="delivery-option-${item.productId}" type="radio" data-testid="delivery-option-input">

        <div>
          <div class="delivery-option-date">
            Thursday, August 29
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
    
      <div class="js-delivery-option delivery-option" >

        <input class="js-delivery-option-input delivery-option-input" name="delivery-option-${item.productId}"" type="radio" data-testid="delivery-option-input">

        <div>
          <div class="delivery-option-date">
            Friday, August 23
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
    
      <div class="js-delivery-option delivery-option" >

        <input class="js-delivery-option-input delivery-option-input" name="delivery-option-${item.productId}" type="radio" data-testid="delivery-option-input">

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

function productExsisAlreadyAdded(productId) {
  let product =null;
  cartItems.forEach(item => {
      if(item.productId === productId) product= item;
  });
  return product;
}

function PreviousQuantity(productId) {
  let quantity =1;
  let item =productExsisAlreadyAdded(productId);

  if(item)quantity+=item.quantity;  

  return quantity;
}

export function AddToCart(productID){
  const product = getProductByID(productID);
      if (!product) {
        return;
      }
      cartItems.push(
        {
          productId:product.productId,
          quantity:PreviousQuantity(product.productId),
          deliveryOptionId: '3'
        }
      );
      console.log(product);

      setCartItems(cartItems);
      saveToStorage(cartItems);
      renderCartItem();

      document.querySelector(".js-cart-quantity").innerHTML=getItemQuantityItems();

      document.querySelector(".cart-quantity").innerHTML=getItemQuantityItems();
      addedMessage(productID);
}

// Initialize the timeout storage object
const addedMessageTimeouts = {};

function addedMessage(productId) {
  // Check if there's a previous timeout for this product. If there is, we should stop it.
  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  // Update the message content
  const messageElement = document.querySelector(`.added-to-cart-message-${productId}`);
  messageElement.innerHTML = '<img src="../../imgs/icons/checkmark.png"> Added ';

  // Add the class to make the message visible
  messageElement.classList.add('added-to-cart-visible');

  // Set a new timeout to remove the 'added-to-cart-visible' class after 2000 milliseconds (2 seconds)
  const timeoutId = setTimeout(() => {
    messageElement.classList.remove('added-to-cart-visible');
  }, 2000);

  // Save the timeoutId for this product so we can stop it later if needed.
  addedMessageTimeouts[productId] = timeoutId;
}

export function removeItemFromCart(productId)
{
  // let newcartItems = cartItems.filter((item) => item.id !== productId); // This will create a new array excluding the productId
  let newcartItems = [];
  cartItems.forEach((item) => {
    if (item.productId !== productId) 
      newcartItems.push(item);
  });
  setCartItems(newcartItems);
  saveToStorage(cartItems);
}

export function getItemQuantityItems(){
  let total=0;
  cartItems.forEach(element => {
    total+=PreviousQuantity(element.quantity);
  });
  return total;
}