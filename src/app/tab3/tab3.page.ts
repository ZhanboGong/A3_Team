import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  items: Item[] = [];
  newItem: Item = {
    item_id: 0,
    item_name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: 'In Stock',
    featured_item: 0,
    special_note: ''
  };
  sidebarView: 'overview' | 'modify' | 'add' = 'overview';

  constructor(private inventoryService: InventoryService) { }
  ngOnInit(): void {
    this.getItems();
  }
  getItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  addNewItem() {
    const validationMessage = this.inventoryService.dataValidation(this.newItem, this.items);
    if (validationMessage) {
      // Add promot tips
      // this.message = validationMessage;
      return;
    }
    this.inventoryService.addRecord(this.newItem).subscribe({
      next: () => {
        this.getItems();
        this.newItem = {
          item_id: 0,
          item_name: '',
          category: 'Electronics',
          quantity: 0,
          price: 0,
          supplier_name: '',
          stock_status: 'In Stock',
          featured_item: 0,
          special_note: ''
        };
      },
      error: (error: any) => {
        console.error('Error adding item:', error);
      }
    });
  }

  // 这里需要添加删除提示
  deleteItem(name: string) {
    this.inventoryService.deleteItem(name).subscribe({
      next: () => {
        this.getItems();
      },
      error: (error: any) => {
        console.error('Error deleting item:', error);
      }
    });
  }

  switchView(selectedView: 'overview' | 'modify' | 'add') {
    this.sidebarView = selectedView;
    if (selectedView === 'overview' || selectedView === 'modify') {
      this.getItems();
    }
  }
}
