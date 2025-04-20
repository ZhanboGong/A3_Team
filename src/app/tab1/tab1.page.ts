import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  items: Item[] = [];
  featuredCount = 0;
  categoryList = [
    { name: 'Electronics', count: 0, icon: 'hardware-chip' },
    { name: 'Furniture', count: 0, icon: 'bed' },
    { name: 'Clothing', count: 0, icon: 'shirt' },
    { name: 'Tools', count: 0, icon: 'build' },
    { name: 'Miscellaneous', count: 0, icon: 'cube' }
  ];
  helpModelStatu = false;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.items = items;
        this.updateStatistics();
      },
      error: (error) => console.error('Error:', error)
    });
  }

  private updateStatistics() {
    this.featuredCount = this.items.filter(item => item.featured_item === 1).length;
    this.categoryList.forEach(category => {
      category.count = this.items.filter(item => item.category === category.name).length;
    });
  }

  navigateToManage() {
    this.router.navigateByUrl('/tabs/tab3');
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