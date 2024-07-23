// Define the Product interface to type the Wishlist objects
export interface Product {
    id: number,
    name: string,
    brand: string,
    category: string,
    image: string,
    specifications: object | null
};

// Define the Wishlist interface to type the Wishlist objects
export interface Wishlist {
    id: number | null,
    name: string,
    Wishlists: Array<number> | null
};

