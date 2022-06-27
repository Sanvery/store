export class Order {
    //check field names
    orderId: number;
    userName: string;
    orderDate: string;
    totalPrice: number;

    constructor(orderId: number, userName: string, orderDate: string, totalPrice: number) {
        this.orderId = orderId;
        this.userName = userName;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
    }
}