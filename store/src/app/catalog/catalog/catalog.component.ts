import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Material } from '../../shared/material';
import { Cart } from '../../shared/cart';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../shared/cart.service';
import notify from 'devextreme/ui/notify';

@Pipe({
  name: 'highlight'
})

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, PipeTransform{

  loadingData: boolean = true;
  // список всех материалов
  materials: Material[] = [];
  // список отобранных материалов
  selectedMaterials: Material[];
  // страницы
  pageOfItems: Array<any>;
  // списки всех годов/стран/стилей для фильтров
  countriesFilter: string[] = [];
  stylesFilter: string[] = [];
  // списки отобранных годов/стран/стилей из фильтров
  selectedCountries: string[] = [];
  selectedStyles: string[] = [];
  // выводит количество отобранных материалов
  foundElementsCount: number = 0;
  // текст поиска
  searchText: string = "";
  // цены
  minPrice: number = 0;
  maxPrice: number = 0;
  cookieValue: string = "";
  cart: Cart[] = [];

  constructor(private dataService: DataService, private titleService: Title, private cartService: CartService) {
    titleService.setTitle("Catalog");
  }

  ngOnInit() {
    this.dataService.getMaterials().subscribe(materials => {
      this.materials = materials;
      this.selectedMaterials = this.materials;
      this.findFilterValues();
      this.foundElementsCount = this.selectedMaterials.length;
    });
    this.loadingData = false;
  }

  transform(text: string, search: string): any {
    return search ? text.replace(new RegExp(search, 'i'), `<span class="highlight">${search}</span>`) : text;
  }

  // заполнение фильтров
  findFilterValues() {
    this.countriesFilter = this.dataService.getCatalog(this.materials);
    this.stylesFilter = this.dataService.getStyles(this.materials);
  }

  // возвращает список отобранных песен по ценам
  pricesValueChanged() {
    let selectedMaterials: any[] = [];
    this.materials.forEach((item, index) => {
        if (item.vPrice >= this.minPrice && item.vPrice <= this.maxPrice) {
          selectedMaterials.push(item);
        }
    });
    return selectedMaterials;
  }

  // отбор по цене
  onValueChanged(e) {;
    this.minPrice = e.value[0];
    this.maxPrice = e.value[1];
    let selectedMaterials = this.getAllMaterials();
    this.foundElementsCount = selectedMaterials.length;
    this.selectedMaterials = selectedMaterials;
  }


  // возвращает список отобранных песен по странам
  countriesValueChanged() {
    if (this.selectedCountries.length == 0) {
      return this.materials;
    }
    let selectedMaterials: any[] = [];
    this.materials.forEach((item) => {
      this.selectedCountries.forEach((c) => {
        if (item.vCatalog == c) {
          selectedMaterials.push(item);
        }
      });
    });
    return selectedMaterials;
  }

  // возвращает список отобранных песен по стилям
  stylesValueChanged() {
    if (this.selectedStyles.length == 0) {
      return this.materials;
    }
    let selectedMaterials: any[] = [];
    let keepGoing = true;
    this.materials.forEach((item) => {
      keepGoing = true;
      // стили одной песни
      let rowArray: Array<string> = item.vBrand.split(", ");
      rowArray.forEach((r) => {
        this.selectedStyles.forEach((s) => {
          if(keepGoing) {
            if (r == s) {
              selectedMaterials.push(item);
              keepGoing = false;
            }
          }
        });
      });
    });
    return selectedMaterials;
  }

  // возвращает список отобранных песен по поиску
  searchValueChanged(val1) {
    let val = val1.toLowerCase();
    this.searchText = val;
    let selectedMaterials: any[] = [];
    this.materials.forEach((item, index) => {
      if (item.vCatalog.toLowerCase().indexOf(val) != -1 ||
      item.vImage.toLowerCase().indexOf(val) != -1 ||
      item.vNameBuildingMaterial.toLowerCase().indexOf(val) != -1 ||
      item.vBrand.toLowerCase().indexOf(val) != -1) {
        selectedMaterials.push(item);
      }
    });
    return selectedMaterials;
  }

  // поиск
  textBoxValueChange(e) {
    let allSelectedMaterials = this.getAllMaterials();
    this.foundElementsCount = allSelectedMaterials.length;
    this.selectedMaterials = allSelectedMaterials;
  }

  // применение всех фильтров
  getAllMaterials() {
    let selectedMaterialsByCountries: any[] = this.countriesValueChanged();
    let selectedMaterialsByStyles: any[] = this.stylesValueChanged();
    let selectedMaterialsBySearch: any[] = this.searchValueChanged(this.searchText);
    let selectedMaterialsByPrices: any[] = this.pricesValueChanged();
    let allSelectedMaterials = selectedMaterialsByCountries.filter(function(v) {
      return selectedMaterialsByStyles.indexOf(v) > -1;
    }).filter(function(v) {
      return selectedMaterialsBySearch.indexOf(v) > -1;
    }).filter(function(v) {
      return selectedMaterialsByPrices.indexOf(v) > -1;
    })
    return allSelectedMaterials;
  }

  // применение фильтров
  onApplyClicked() {
    let allSelectedMaterials = this.getAllMaterials();
    this.foundElementsCount = allSelectedMaterials.length;
    this.selectedMaterials = allSelectedMaterials;
  }

  onResetClicked() {
    this.selectedCountries = [];
    this.selectedStyles = [];
    this.searchText = "";
    this.selectedMaterials = this.materials;
    this.foundElementsCount = this.selectedMaterials.length;
  }

  onAddToCartClicked(material){
    this.cookieValue = this.cartService.getCookies();
    this.cartService.addToCart(this.cookieValue, material.vId).subscribe(cart => {
      this.cart = cart;
    });
    notify(`BuildingMaterial '${material.vNameBuildingMaterial}' was successflly added to cart!`);
  }

  // обновление количества страниц от количества песен
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    // скроллинг наверх
    scrollTo(0, 0);
  }
}
