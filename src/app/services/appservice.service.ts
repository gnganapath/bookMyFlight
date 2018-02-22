import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { WebUrls } from '../urlconfig'
@Injectable()
export class AppserviceService {

  searchUrl = WebUrls.searchFlightAPI;
  constructor(private http: Http) { 

  }
  searchFlight(data){
    let header:any={headers : {'Content-Type': 'application/json','Accept': 'application/json'}} ;
    console.log(this.searchUrl)
    //return this.http.post(this.searchUrl, data, header)     // Make Real API data use POST with origin, destination
    return this.http.get(this.searchUrl, header)              // for Mock API data using GET
                    .map(res => res.json())
                    .catch(this.handleError)
  }

 
   private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
