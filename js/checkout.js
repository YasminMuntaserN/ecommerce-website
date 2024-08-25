import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// import './data/cart-class.js';

export default function renderCheckout() {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

renderCheckout();