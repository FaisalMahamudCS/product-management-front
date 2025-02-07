export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image_url: string;
  };
  
  
export type CartItem = {

  _id: string;

  name: string;

  price: number;

  quantity: number;

};

  
  export interface Category{
      
name:string;
_id:string;
  }

  export interface  User{
 

    _id:string;
    name:string;
    email:string;
    role:string;
  }