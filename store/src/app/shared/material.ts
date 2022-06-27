export class Material {
    vId: number;
    vImage: string;
    vNameBuildingMaterial: string;
    vCatalog: string;
    vBrand: string;
    vPrice: number;

    constructor(vId: number, vImage: string, vNameBuildingMaterial: string, vCatalog: string,
      vBrand: string, vPrice: number) {
        this.vId = vId;
        this.vImage = vImage;
        this.vNameBuildingMaterial = vNameBuildingMaterial;
        this.vCatalog = vCatalog;
        this.vBrand = vBrand;
        this.vPrice = vPrice;
    }
}
