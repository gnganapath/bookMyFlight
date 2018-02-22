import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, NgForm, Validator, Validators } from '@angular/forms';
import { AppserviceService } from '../services/appservice.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchResult;
  origin; destination;

  myOptions: INgxMyDpOptions = { 
             dateFormat: 'dd/mm/yyyy',
             };

            model: any = { date: { year: 2013, month: 1, day: 1 } };


  constructor(private appservice: AppserviceService) {  }

   jnry = { origin:'pnq', destination:'del'};
   searchFlight(){
    this.appservice.searchFlight(this.jnry).subscribe( (data:any) =>{
      console.log(data);
      this.searchResult = data;

    });
   }

  ngOnInit() {
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
}

}
