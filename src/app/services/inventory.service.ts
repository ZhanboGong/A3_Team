import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "../models/item.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    // Assessment server endpoint
    private url = 'https://prog2005.it.scu.edu.au/ArtGalley';

    constructor(private http: HttpClient) {
    }

    // Data Validation(To be development)
    dataValidation() {

    }

    // Gets all records in the url
    getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url);
    }

    // Look for records by name
    getItemByName(name: string): Observable<Item[]> {
        return this.http.get<Item[]>(this.url + name);
    }

    // Add new Item
    addRecord(item: Item): Observable<Item> {
        return this.http.post<Item>(this.url, item);
    }

    // Through name update item
    updateItem(name: string, item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.url}${name}`, item);
    }

    // Through name delete item
    deleteItem(name: string): Observable<any> {
        return this.http.delete(`${this.url}${name}`);
    }

}