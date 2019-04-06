import { DataServiceInterface } from "./DataServiceInterface";
import { HttpClient } from "@angular/common/http";
import { BaseEndPointService } from "../../services/base-end-point.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class GenericDataService implements DataServiceInterface
{
    constructor(private http: HttpClient){}

    url = 'url_not_set';

    insert(data: any) {
        return this.http.post(this.url, data);
    }    
    
    edit(id: any) {
        return this.http.get(this.url + `/${id}/edit`);
    }
    
    update(data: any, id: any) {
        return this.http.put(this.url + `/${id}`, data);
    }

    delete(id: any) {
        throw new Error("Method not implemented.");
    }
}