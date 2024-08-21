export let cartItems =
JSON.parse(localStorage.getItem('cartItems'))??
  [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  }
];

export function setCartItems(newCartItems) {
  cartItems = newCartItems;
}

export const saveToStorage=()=>localStorage.setItem('cartItems', JSON.stringify(cartItems));
