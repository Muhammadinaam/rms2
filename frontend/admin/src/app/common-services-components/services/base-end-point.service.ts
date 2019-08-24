import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseEndPointService {

  constructor() { }

  static getBaseEndPoint()
  {
    //return 'http://localhost/rms2/backend/public';
    return 'https://cors-anywhere.herokuapp.com/http://instafood.devzonesolutions.com/public';
  }

  static getClientInfo()
  {
    return {
      id: '2',
      secret: 'yI5CznhniNMPX4uwVjonty4ESd5rhFROYc9N5CL8'
    };
  }
}
