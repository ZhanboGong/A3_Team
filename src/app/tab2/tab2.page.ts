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
  searchTerm: any;
  helpModelStatu = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
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
   * 
   */
  searchItems() {
    if (this.searchTerm) {
      this.inventoryService.getItemByName(this.searchTerm).subscribe({
        next: (items: Item[]) => {
          if (items && items.length > 0) {
            this.items = items;
          } else {
            this.items = this.allItems.filter((item: Item) =>
              item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
          }
        },
        error: (error: any) => {
          console.error('Error searching items:', error);
          this.items = this.allItems.filter((item: Item) =>
            item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
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

}
