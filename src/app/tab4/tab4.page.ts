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
  // The array of items obtained from the back end
  items: Item[] = [];
  // An array filtered based on the feature situation
  displayItems: Item[] = [];
  // help modal statu
  helpModelStatu = false;
  // Current rendering status of the item
  display: "featured" | "all" | "normal" = "featured";
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
        this.items = items;
        this.displayControl();
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  /**
   * Select the item displayed on the current page, if the display is "featured", then the featured item will be displayed, 
   * if the display is "all", then all items will be displayed
   * if the display is "normal", than the normal item will be displayed
   */
  displayControl() {
    if (this.display === "featured") {
      this.displayItems = this.items.filter(item => item.featured_item === 1);
    }
    else if (this.display === "normal") {
      this.displayItems = this.items.filter(item => item.featured_item === 0);
    }
    else {
      this.displayItems = this.items;
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
