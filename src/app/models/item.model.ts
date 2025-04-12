export interface Item {
    item_id: number;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
    supplier_name: string;
    stock_status: string;
    featured_item: number;
    special_note?: string;
}