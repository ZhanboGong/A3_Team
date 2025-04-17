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
  // 被选中的进行增删操作的item
  checkedItem: Item | null = null;
  // 被修改前的选中的Item
  lastItem: Item | null = null;
  // 视图选项
  sidebarView: 'overview' | 'modify' | 'add' = 'overview';
  // 侧边Menu的状态
  sideMenuStatu = false;
  // update modal statu
  updateModelStatu = false;

  constructor(private inventoryService: InventoryService, private alertController: AlertController) { }
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

  selectItem(item: Item) {
    this.checkedItem = { ...item };
    this.lastItem = this.checkedItem;
    this.openUpdateModel();

  }

  // 这里需要添加删除提示,同时不能删除Laptop
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

  // 这里可能有一些bug，需要test
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

  openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open();
      this.sideMenuStatu = true;
    }
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
      this.sideMenuStatu = false;
    }
  }

  // 用于切换该页面的视图
  switchView(selectedView: 'overview' | 'modify' | 'add') {
    this.sidebarView = selectedView;
    if (selectedView === 'overview' || selectedView === 'modify') {
      this.getItems();
    }
  }

  // 模态窗口
  openUpdateModel() {
    if (this.checkedItem) {
      this.updateModelStatu = true;
    }
    console.log(this.checkedItem);
  }

  closeUpdateModel() {
    this.checkedItem = null;
    this.updateModelStatu = false;
  }

  // 删除弹窗提示
  async deletePrompt(name: string) {
    const alert = await this.alertController.create({
      header: "Deletion Confirmation",
      message: "Make sure to delete item " + name,
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

  // 提示弹窗
  async validationMessage(message: string) {
    const alert = await this.alertController.create({
      header: "Validation Message",
      message: message,
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
