// Defining database properties
export interface Item {
    // Item ID: Unique, AutoIncrement, Integer
    item_id: number;
    // Item Name: varchar, unique
    item_name: string;
    // Category: enum
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
    // Quantity: integer
    quantity: number;
    // Price: integer
    price: number;
    // Supplier Name: varchar
    supplier_name: string;
    // Stock Status: enum
    stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    // Featured Item: int(0/1)
    featured_item: 0 | 1;
    // Special Note: varchar, no requir
    special_note?: string;
}