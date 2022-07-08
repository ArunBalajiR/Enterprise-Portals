import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  states: any = {
    "01": "Andhra Pradesh",
    "02": "Arunachal Pradesh",
    "03": "Assam",
    "04": "Bihar",
    "05": "Goa",
    "06": "Gujarat",
    "07": "Haryana",
    "08": "Himachal Pradesh",
    "09": "Jammu and Kashmir",
    "10": "Karnataka",
    "11": "Kerala",
    "12": "Madhya Pradesh",
    "13": "Maharashtra",
    "14": "Manipur",
    "15": "Meghalaya",
    "16": "Mizoram",
    "17": "Nagaland",
    "18": "Orissa",
    "19": "Punjab",
    "20": "Rajasthan",
    "21": "Sikkim",
    "22": "Tamil Nadu",
    "23": "Tripura",
    "24": "Uttar Pradesh",
    "25": "West Bengal",
    "26": "Andaman and Nico.Is.",
    "27": "Chandigarh",
    "28": "Dadra and Nagar Hav.",
    "29": "Daman and Diu",
    "30": "Delhi",
    "31": "Lakshadweep",
    "32": "Puducherry",
    "33": "Chhattisgarh",
    "34": "Jharkhand",
    "35": "Uttarakhand",
  }

  koartACType:any={
    "M" : "Material",
    "D" : "Customer",
    "K" : "Vendor",
    "A" : "Asset",
    "S" : "G/L"

  };
  constructor() { }

  getRegion(num: any): string {
    return this.states[num];
  }

  getACType(koart: any):string{
    return this.koartACType[koart];
  }

}


