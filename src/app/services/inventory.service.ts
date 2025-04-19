import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "../models/item.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    // Assessment server endpoint
    private url = 'https://prog2005.it.scu.edu.au/ArtGalley/';

    constructor(private http: HttpClient) {
    }


    /**
     * Gets all records from the back-end API
     * @returns 
     */
    getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url);
    }

    /**
     * Look for records by name
     * @param name The name of the item that needs to be getted
     * @returns 
     */
    getItemByName(name: string): Observable<Item[]> {
        return this.http.get<Item[]>(this.url + name);
    }

    /**
     * Add new Item
     * @param item The name of the item that needs to be added
     * @returns 
     */
    addRecord(item: Item): Observable<Item> {
        return this.http.post<Item>(this.url, item);
    }

    /**
     * Through name update item
     * @param name The name of the item that needs to be updated
     * @param item The updated item
     * @returns 
     */
    updateItem(name: string, item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.url}${name}`, item);
    }

    /**
     * Through name delete item
     * @param name The name of the item that needs to be deleted
     * @returns 
     */
    deleteItem(name: string): Observable<any> {
        return this.http.delete(`${this.url}${name}`);
    }

    // Used for data validation in the case of additions, updates, etc
    // 还需要添加name不为数字的验证，必须为text
    dataValidation(newItem: Item, allItems: Item[]): string | null {
        // Verify that the Item ID is an integer
        if (typeof newItem.item_id !== 'number') {
            console.error('Validation Error: item_id must be a number.');
            return "Item ID Must be a Number!";
        }

        // Verify that the Item Name cannot be Empty
        if (!newItem.item_name || newItem.item_name.trim() === "") {
            console.error("Validation Error: item_name cannot be empty.");
            return "Item Name cannot be Empty!";
        }

        // Verify that the Supplier Name cannot be Empty
        if (!newItem.supplier_name || newItem.supplier_name.trim() === "") {
            console.error("Validation Error: supplier_name cannot be Empty!");
            return "Supplier Name cannot be Empty!";
        }

        // Verify that the Radio Input cannot be empty
        if (newItem.category === null || newItem.stock_status === null || newItem.featured_item === null) {
            console.error("Validation Error: Radio Input cannot be Empty");
            return "Radio Input cannot be Empty!";
        }

        // Verify that the Item Price must be a positive integer
        if (newItem.price < 0 || !(newItem.price % 1 === 0)) {
            console.error("Validation Error: price must be a positive integer.");
            return "Item Price must be a positive integer!";
        }

        // Verify that the Item Quantity must be a positive integer
        if (newItem.quantity < 0 || !(newItem.quantity % 1 === 0)) {
            console.error("Validation Error: quantity must be a positive integer.");
            return "Item Quantity must be a positive integer!";
        }

        // Verify that the Item ID must be Unique
        if (allItems.some(item => item.item_id === newItem.item_id)) {
            console.error('Validation Error: item_id must be unique.');
            return "Item ID Must be Unique!";
        }

        // Verify that the Item Name must be Unique
        if (allItems.some(item => item.item_name === newItem.item_name)) {
            console.error("Validation Error: item_name must be unique");
            return "Item Name Must be Unique!";
        }

        return null;
    }


}