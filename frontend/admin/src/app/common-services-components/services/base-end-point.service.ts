import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseEndPointService {
  
  static isApp: boolean = false;

  constructor() { }


  static getBaseEndPoint() : string
  {
    let corsUrl = 'https://cors-anywhere.herokuapp.com/';

    // LOCAL URL
    // let url = 'http://localhost/rms2/backend/public';

    // EMULATOR URL
    //let url = 'http://10.0.2.2/rms2/backend/public'
    
    // REMOTE URL
    let url = 'http://instafood.khantandoorionline.co.uk/public';

    return this.isApp ? corsUrl + url : url;
    
  }

  static getClientInfo()
  {
    return {
      id: '2',
      secret: 'yI5CznhniNMPX4uwVjonty4ESd5rhFROYc9N5CL8'
    };
  }
}
