/**
 * Interface representing the specifications of a product.
 * 
 * Example:
 * ```json
 * {
 *   "processor": "Intel i7",
 *   "ram": "16GB",
 *   "storage": "512GB SSD"
 * }
 * ```
 */
interface Specs {
    [key: string]: string;
}

/**
 * Interface representing a product.
 * 
 * Example:
 * ```json
 * {
 *   "id": 1,
 *   "name": "High-Performance Laptop",
 *   "brand": "TechTron",
 *   "category": "Electronics",
 *   "image": "https://picsum.photos/300/300.jpg",
 *   "specifications": {
 *     "processor": "Intel i7",
 *     "ram": "16GB",
 *     "storage": "512GB SSD"
 *   }
 * }
 * ```
 */
export interface Product {
    /**
     * Unique identifier for the product.
     */
    id: number;

    /**
     * Name of the product.
     */
    name: string;

    /**
     * Brand of the product.
     */
    brand: string;

    /**
     * Category to which the product belongs.
     */
    category: string;

    /**
     * URL of the product's image.
     */
    image: string;

    /**
     * Specifications of the product.
     * This is an object where the keys are specification names and the values are their corresponding details.
     */
    specifications: Specs;
}

/**
 * Interface representing a wishlist.
 * 
 * Example:
 * ```json
 * {
 *   "id": 2,
 *   "name": "Audio Gear",
 *   "products": [6, 7, 8, 9, 10]
 * }
 * ```
 */
export interface Wishlist {
    /**
     * Unique identifier for the wishlist.
     * Can be null if not assigned.
     */
    id: number | null;

    /**
     * Name of the wishlist.
     */
    name: string;

    /**
     * Array of product IDs that are part of the wishlist.
     * Can be null if there are no products.
     */
    products: Array<number> | null;
}
