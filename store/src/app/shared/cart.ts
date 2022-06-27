export class Cart {
    recordId: number;
    cartId: string;
    materialvId: number;
    quantity: number;
    dateCreated: string;

    constructor(recordId: number, cartId: string, materialvId: number, quantity: number, dateCreated: string) {
        this.recordId = recordId;
        this.cartId = cartId;
        this.materialvId = materialvId;
        this.quantity = quantity;
        this.dateCreated = dateCreated;
    }
}
