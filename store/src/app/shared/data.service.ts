import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material';

@Injectable({
    providedIn: 'root'
})

export class DataService{

    private materialsUrl = 'http://localhost:5002/api/material';
    orderId: number;

    constructor(private http: HttpClient) { }

    getMaterials(): Observable<Material[]> {
        return this.http.get<Material[]>(this.materialsUrl);
    }

    getCatalog(materials: Material[]) {
        let countriesFilter: Array<string> = []
        for (let i = 0; i < materials.length; i++) {
            countriesFilter.push(materials[i].vCatalog);
        }
        countriesFilter.sort();
        countriesFilter = countriesFilter.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
                return elem;
            }
        })
        return countriesFilter;
    }

    getStyles(materials: Material[]) {
        let stylesFilter: Array<string> = [];
        for (let i=0; i < materials.length; i++) {
            let style = materials[i].vBrand;
            let rowArray: Array<string> = style.split(", ");
            for (let j = 0; j < rowArray.length; j++) {
                stylesFilter.push(rowArray[j]);
            }
        }
        stylesFilter.sort();
        stylesFilter = stylesFilter.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
                return elem;
            }
        })
        return stylesFilter;
    }
}
