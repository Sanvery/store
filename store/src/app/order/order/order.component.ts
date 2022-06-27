import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/auth.service';
import { Order } from '../../shared/order';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  orders: Order[] = [];
  username: string = "";
  showGrid: boolean = false;
  text: string = "Войдите в свою учетную запись, чтобы просмотреть историю заказов.";

  constructor(private titleService: Title, private authService: AuthService,
    private cartService: CartService) {
    titleService.setTitle("Orders");
    }

  ngOnInit(){
    this.username = this.authService.username;
    this.cartService.getOrderByUsername(this.username).subscribe(orders => {
      this.orders = orders;
    });
    console.log("n", this.authService.username, "n");
    if (this.authService.username != "") {
      this.showGrid = true;
      this.text = "Завершенные заказы";
    }
  }

  // цвет для последнего заказа
  onCellPrepared(e) {
    if (e.rowType == "data" && e.rowIndex == 0) {
      e.rowElement.style.backgroundColor = '#006699';
      e.rowElement.style.color = '#f0f8ff';
    }
  }
}
