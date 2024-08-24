import { cartItems } from "../EntitiesData/cartData";
import { getProductByID } from './product.js';
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