import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "../models/item.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    // Assessment server endpoint
    private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

    constructor(private http: HttpClient) {
    }

    dataValidation(item: Item): string | null {

        return "";
    }
}