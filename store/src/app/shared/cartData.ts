export class CartData {
  vNameBuildingMaterial: string;
    vPrice: number;
    quantity: number;
    total: number;

    constructor(vNameBuildingMaterial: string, vPrice: number, quantity: number, total: number) {
        this.vNameBuildingMaterial = vNameBuildingMaterial;
        this.vPrice = vPrice;
        this.quantity = quantity;
        this.total = total;
    }
}
