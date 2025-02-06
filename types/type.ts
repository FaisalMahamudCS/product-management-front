export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image_url: string;
  };
  
  export type CartItem = {
    productId: string;
    quantity: number;
  };
  