export interface Product {
  "brand": string;
  "category": string;
  "countInStock": number;
  "createdAt": string;
  "description": string;
  "id": number;
  "images": ImageProduct [];
  "name": string;
  "numOfReviews": number;
  "price": number;
  "rating":  string;
  "updatedAt": string;
}

export interface ImageProduct{
  "img": Images
}

export interface Images{
  "id": number;
  "url": string;
  "type": string
}
