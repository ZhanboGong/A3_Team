import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  items: Item[] = [];
  featuredCount: number = 0; // Featured 数量属性

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.featuredCount = this.calculateFeaturedCount(); // 计算Featured数量
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  //计算Featured 数量
  private calculateFeaturedCount(): number {
    return this.items.filter(item => item.featured_item === 1).length;
  }
}