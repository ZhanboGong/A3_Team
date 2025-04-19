import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';
import { AlertButton, AlertController } from '@ionic/angular';
import { IonButton } from '@ionic/angular';

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
    stock_status: 'In stock',
    featured_item: 0,
    special_note: ''
  };
  // The checkeded item to add or delete
  checkedItem: Item | null = null;
  // The checkeded Item before the modification
  lastItem: Item | null = null;
  // Side Menu view options
  sidebarView: 'overview' | 'modify' | 'add' = 'overview';
  // The state of the side Menu
  sideMenuStatu = false;
  // update modal statu
  updateModelStatu = false;
  // help modal statu
  helpModelStatu = false;

  constructor(private inventoryService: InventoryService, private alertController: AlertController) { }
  ngOnInit(): void {
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
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  /**
   * Before submitting the Add, the data input in the Add form should be verified.
   * If the verification fails, the method validationMessage in the Ts file should be called to pop up an asynchronous verification message popup window and display the verification error information to the user. 
   * If the verification succeeds, the new item is added and newItem is initialized
   * @returns 
   */
  addNewItem() {
    const validationMessage = this.inventoryService.dataValidation(this.newItem, this.items);
    if (validationMessage) {
      this.validationMessage(validationMessage);
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
          stock_status: 'In stock',
          featured_item: 0,
          special_note: ''
        };
      },
      error: (error: any) => {
        console.error('Error adding item:', error);
      }
    });
  }

  /**
   * The selected Item is assigned to checkedItem for rendering on top of the update form. 
   * lastItem keeps track of the checkedItem before it was modified. 
   * Open update modal(update form) after assignment
   * @param item  The Item that was clicked on the Update button (selected for update)
   */
  selectItem(item: Item) {
    this.checkedItem = { ...item };
    this.lastItem = this.checkedItem;
    this.openUpdateModel();
  }

  /**
   * Look for the item by name and delete it
   * @param name The name of the Item to remove
   */
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

  /**
   * 
   * @returns 
   */
  updateItem() {
    if (this.checkedItem && this.lastItem) {
      const updateMessage = this.inventoryService.dataValidation(this.checkedItem, this.items);
      if (this.lastItem.item_id === this.checkedItem.item_id) {
        // 这两个验证跳过可能得分开来
        if (updateMessage && updateMessage !== "Item ID Must be Unique!" && updateMessage !== "Item Name Must be Unique!") {
          this.validationMessage(updateMessage);
          return;
        }
      }
      else {
        if (updateMessage) {
          this.validationMessage(updateMessage);
          return;
        }
      }

      this.inventoryService.updateItem(this.lastItem.item_name, this.checkedItem).subscribe({
        next: () => {
          this.getItems();
          this.closeUpdateModel();
        },
        error: (error: any) => {
          console.error("Error Updating Item: ", error)
          this.validationMessage("Update failed, please check whether the data is correct.")
        }
      });
    }
  }

  /**
   * Get the ion-menu element from the page and open it, updating the current Menu state (sideMenuStatu) to true
   */
  openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open();
      this.sideMenuStatu = true;
    }
  }

  /**
   * Gets the ion-menu element from the page and closes it, updating the current Menu state (sideMenuStatu) to false
   */
  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
      this.sideMenuStatu = false;
    }
  }

  /**
   * Toggle the current view state.If you change to overview or modify, which needs to display the item, import the item again
   * @param selectedView View state of the current page
   */
  switchView(selectedView: 'overview' | 'modify' | 'add') {
    this.sidebarView = selectedView;
    if (selectedView === 'overview' || selectedView === 'modify') {
      this.getItems();
    }
  }

  /**
   * modal control: Set update modal's display state to true(open)
   */
  openUpdateModel() {
    if (this.checkedItem) {
      this.updateModelStatu = true;
    }
    console.log(this.checkedItem);
  }

  /**
   * modal control: Set update modal's display state to false(close)
   */
  closeUpdateModel() {
    this.checkedItem = null;
    this.updateModelStatu = false;
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
   * Delete Confirmation popup
   * @param name The name of the Item that should be deleted
   */
  async deletePrompt(name: string) {
    // Creating a popover
    const alert = await this.alertController.create({
      header: "Deletion Confirmation",// popup header
      message: "Make sure to delete item " + name,// popup message
      // button: Cancel & Conform(deleteItem())
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: 'secondary',
          handler: () => {
            console.log("The deletion of " + name + " is cancelled.");
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.deleteItem(name);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * validation message popup
   * @param message A validation alert returned after validation
   */
  async validationMessage(message: string) {
    // Create a validation message popup
    const alert = await this.alertController.create({
      header: "Validation Message",// header
      message: message,// validation message
      buttons: [
        {
          text: "Close",
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

}
