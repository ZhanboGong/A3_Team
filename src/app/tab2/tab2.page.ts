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

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getItems();
  }

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

}
