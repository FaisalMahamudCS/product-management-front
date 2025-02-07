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
    product: Product;
    _id: string;
    name?: string;
    quantity?: number;
    price?: number;
  };

  export interface Category{
      
    name:string;
    _id:string;
  }

  export interface  Order{
    _id:string;
    userId:string;
    items:CartItem[];
    totalPrice:number;
    status:string;
    createdAt:string;
    updatedAt:string;
  }
  