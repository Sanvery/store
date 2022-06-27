import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cart } from './cart';
import { Material } from './material';
import { CartData } from './cartData';
import { Order } from './order';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class CartService{

    private cartsUrl = 'http://localhost:5003/ShoppingCart';

    constructor(private http: HttpClient, private CookieService: CookieService) { }

    getCarts(): Observable<Cart[]> {
        console.log("receiving data from cart.service");
        return this.http.get<Cart[]>(this.cartsUrl);
    }

    getCartById(cartId: string): Observable<Cart[]>{
        return this.http.get<Cart[]>(`${this.cartsUrl}/${cartId}`);
    }

    getOrderByUsername(userName: string): Observable<Order[]>{
        return this.http.get<Order[]>(`${this.cartsUrl}/orders/${userName}`);
    }

    CreateOrder(cartId: string, userName: string): Observable<number> {
        const body = {cartId: cartId, userName: userName};
        return this.http.post<number>(`${this.cartsUrl}/postorder`, body).
        pipe(catchError(this.handleError));
    }

    addToCart(cartId: string, materialId: number): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${this.cartsUrl}/${cartId}/${materialId}`);
    }

    removeFromCart(cartId: string, materialId: number, quantity: number): Observable<Cart> {
        const body = {cartId: cartId, materialId: materialId, quantity: quantity};
        return this.http.post<Cart>(this.cartsUrl, body).
        pipe(catchError(this.handleError));
    }

    getMaterialIdByNameBuildingMaterial(materials: Material[], vNameBuildingMaterial: string): number {
        let materialId = -1;
        materials.forEach(element => {
            if (element.vNameBuildingMaterial == vNameBuildingMaterial)
            materialId = element.vId;
        });
        return materialId;
    }

    EmptyCart(cartId: string): Observable<void> {
        return this.http.delete<void>(`${this.cartsUrl}/${cartId}`).
        pipe(catchError(this.handleError));
    }

    getCookies() {
        let cookieValue = this.CookieService.get('cookie_cartId');
        if (!cookieValue) {
          cookieValue = this.createUUID();
          const dateNow = new Date();
          dateNow.setMinutes(dateNow.getMinutes() + 120);
          this.CookieService.set('cookie_cartId', cookieValue, dateNow);
        }
        return cookieValue;
    }

    createUUID() {
        var s = [];
        var hexDigits = "0123456789ABCDEF";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        var uuid = s.join("");

        return uuid;
    }


    getCartData(cart: Cart[], materials: Material[]) {
        let cartData: CartData[] = [];
        cart.forEach((item, index) => {
            materials.forEach((c) => {
                if (item.materialvId == c.vId) {
                    cartData.push(new CartData(c.vNameBuildingMaterial, c.vPrice, item.quantity, c.vPrice * item.quantity));
                }
            });
        });
        return cartData;
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
