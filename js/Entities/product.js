import { products } from '../EntitiesData/productData.js';

export const product = {
  id: '',               
  image: '',               
  name: '',      
  rating: {
    stars: 0,
    count: 0,
  },    
  priceCents: 0  
};

export function getProductByID(productID) {
  let p =null;
  products.forEach(product => {
    if(product.id === productID){
      p=product;
      console.log("Founded");
  };
  });
  return p;
}
