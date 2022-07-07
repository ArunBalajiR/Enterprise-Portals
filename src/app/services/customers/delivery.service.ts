import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
 

  public isLoading:boolean = false;

  constructor(private http:HttpClient) { }



}
