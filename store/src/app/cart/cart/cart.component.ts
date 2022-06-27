import { Component, OnInit} from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Cart } from '../../shared/cart';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/data.service';
import { Material } from '../../shared/material';
import { CartData } from '../../shared/cartData';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart: Cart[] = [];
  materials: Material[] = [];
  cartData: CartData[] = [];
  cookieValue: string = "";
  pageSize: number = 14;
  orderId: number;
  showButton: boolean = false;

  constructor(private cartService: CartService, private titleService: Title, private dataService: DataService,
    private authService: AuthService) {
    titleService.setTitle("Cart");
  }

  ngOnInit() {
    this.cookieValue = this.cartService.getCookies();
    this.cartService.getCartById(this.cookieValue).subscribe(cart => {
      this.cart = cart;
      this.dataService.getMaterials().subscribe(materials => {
        this.materials = materials;
        this.cartData = this.cartService.getCartData(cart, materials);
      });
    });
    if (this.authService.username != "") {
      this.showButton = true;
    }
  }

  // очищение корзины
  onClearCartClicked() {
    if (this.cartData.length > 0) {
      this.cartService.EmptyCart(this.cookieValue).subscribe(
        () => console.log(`cart with cookieValue = ${this.cookieValue} is deleted`),
        (err) => console.log(err)
      );
      this.cartData = [];
      notify("Your shopping cart was successflly cleared!");
    }
    else {
      notify("Your shopping cart is empty!");
    }
  }

  onCreateOrderClicked() {
    if (this.cartData.length == 0) {
      notify("Add items before creating an order!");
    }
    else {
      this.cartService.CreateOrder(this.cookieValue, this.authService.username).subscribe(orderId => {
        this.orderId = orderId;
      });
      this.cartData = [];
      this.setData();
      notify("Your order was successfully processed!");
    }
  }

  setData() {
    this.dataService.orderId = this.orderId;
  }

  // изменение количества в таблице
  onQuantityChanged(newData, value, currentRowData) {
    newData.quantity = value;
    newData.total = currentRowData.vPrice * value;
  }

  // запрос к базе с изменением количества или удалением строки
  removeFromCart(vNameBuildingMaterial, quantity) {
    let materialId = this.cartService.getMaterialIdByNameBuildingMaterial(this.materials, vNameBuildingMaterial);
    this.cartService.removeFromCart(this.cookieValue, materialId, quantity).subscribe(
      () => console.log(`material with id = ${materialId} is deleted from database`),
      (err) => console.log(err)
    );
  }

  // изменение количества в базе
  onRowUpdated(e) {
    this.removeFromCart(e.data.vNameBuildingMaterial, e.data.quantity);
  }

  // удаление строки
  onRowRemoved(e) {
    this.removeFromCart(e.data.vNameBuildingMaterial, 0);
    notify(`BuildingMaterial '${e.data.vNameBuildingMaterial}' was successflly deleted!`);
  }

}

