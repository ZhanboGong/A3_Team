// This Page is about search
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  items: Item[] = [];
  allItems: Item[] = [];
  // Search terms entered in the search bar
  searchTerm: any;
  // Used to control the Help Modal display state
  helpModelStatu = false;
  // The status after the search is either with results or empty
  searchStatu: "normal" | "empty" = "normal";

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    // Get all the item information when the tab page is initialized
    this.getItems();
  }

  /**
   * Get all the item information from the back-end API and assign it to the items and allItems arrays
   */
  getItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.allItems = items;
        this.items = items;
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  /**
   * Based on the content of searchTerm, search in the name of items. 
   * If relevant content is Found, render it to this page. If there are No search Results, switch to the current searchStatu and render the default "No Results Found" prompt. 
   * Meanwhile, if the search fails, the local array will be called for the search.
   */
  searchItems() {
    this.switchSearchStatu("normal");
    if (this.searchTerm) {
      this.inventoryService.getItemByName(this.searchTerm).subscribe({
        next: (items: Item[]) => {
          if (items && items.length > 0) {
            this.items = items;
          } else {
            this.items = this.allItems.filter((item: Item) =>
              item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            if (this.items.length === 0) {
              this.switchSearchStatu("empty");
            }
          }
        },
        error: (error: any) => {
          console.error('Error searching items:', error);
          this.items = this.allItems.filter((item: Item) =>
            item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase())

          );
          if (this.items.length === 0) {
            this.switchSearchStatu("empty");
          }
        }
      });
    } else {
      this.items = this.allItems;
    }
  }

  /**
   * modal control: Set help modal's display state to true(open)
   */
  openHelpModel() {
    this.helpModelStatu = true;
    console.log("Manage Page Help open");
  }

  /**
   * modal control: Set help modal's display state to false(close)
   */
  closeHelpModel() {
    this.helpModelStatu = false;
    console.log("Manage Page Help close");
  }

  /**
   * Switch the value of searchStatu based on the search results. When the search result is empty, searchStatu is "empty", and when the search result is not empty, searchStatu is "normal".
   * @param searchStatu It depends on the search result. When the search result is empty, searchStatu is "empty", and when the search result is not empty, searchStatu is "normal".
   */
  switchSearchStatu(searchStatu: "normal" | "empty") {
    this.searchStatu = searchStatu;
    console.log("The search statu is changed to " + searchStatu);
  }

}
