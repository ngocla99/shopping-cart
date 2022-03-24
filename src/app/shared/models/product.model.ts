export interface productDetail {
    id: number;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    rating: string;
    numOfReviews: number;
    countInStock: string;
    createdAt: string;
    updatedAt: string;
    images?: itemImage[];
    imageUrls?: string[];
}

export interface itemImage {
    id: number;
    url: string;
    type: string;
}

export interface Reviews {
    total: number;
    result: [];
    totalPages: number;
    currentPage: number;
}

export interface ReviewDetail {
    content: string;
    rating: number;
    userId: number;
    productId: number;
}

export interface productCreate {
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    rating: number;
    countInStock: number;
    imageUrls: string[];
}

export interface productUpdate {
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    rating: number;
    countInStock: number;
}

export interface commentCreate {
    content: string;
    rating: number;
    userId: number;
    productId: number;
}

export interface columnField {
    name: string;
    value: string;
    custom: boolean;
}