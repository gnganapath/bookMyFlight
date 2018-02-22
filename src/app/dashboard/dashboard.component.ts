import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, NgForm, Validator, Validators } from '@angular/forms';
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchResult;
  origin; destination;
  constructor(private appservice: AppserviceService) {

   }
   jnry = { origin:'pnq', destination:'del'};
   searchFlight(){
    this.appservice.searchFlight(this.jnry).subscribe( (data:any) =>{
      console.log(data);
      this.searchResult = data;

    });
   }

  ngOnInit() {
  }

}
