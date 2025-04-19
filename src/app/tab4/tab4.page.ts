import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';
import { AlertButton, AlertController } from '@ionic/angular';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  standalone: false,
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  items: Item[] = [];
  displayItems: Item[] = [];
  helpModelStatu = false;
  display: "featured" | "all" = "featured";
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.displayControl();
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  // 选择所display的item
  displayControl() {
    if (this.display === "featured") {
      this.displayItems = this.items.filter(item => item.featured_item === 1);
    }
    else {
      this.displayItems = this.items;
    }
  }

  openHelpModel() {
    this.helpModelStatu = true;
    console.log("Manage Page Help open");
  }

  closeHelpModel() {
    this.helpModelStatu = false;
    console.log("Manage Page Help close");
  }

}
