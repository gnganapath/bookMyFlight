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
  originCtrl = new FormControl('',[Validators.required]);
  destCtrl = new FormControl('',[Validators.required]);
  dateCtrl = new FormControl('',[Validators.required]);
  passgenCtrl = new FormControl('',[Validators.required]);

  myOptions: INgxMyDpOptions = { 
             dateFormat: 'dd/mm/yyyy',
             };

            model: any = { date: { year: 2013, month: 1, day: 1 } };


  constructor(private appservice: AppserviceService) { 
    
      this.appservice.searchFlight(this.jnry).subscribe( (data:any) =>{
      console.log(data);
      this.searchResult = data;
      this.searchResult.forEach(element => {
        var newObj = element;
        
          if(element.origin == 'PNQ'){
          Object.assign(newObj, { ori:'PUNE'  });
          }
          if(element.destination == 'DEL'){
          Object.assign(newObj, { dest:'DELHI'  });
          }
        
        if(element.departure != ' ')
        {
          let j =  element.jouryDate = element.departure.slice(0,9);
          let jt = element.jouryDatetime = element.departure.slice(10,15);
          console.log(j,jt)
        }
        if(element.arrival != '')
        {
          return (element.arriveDate = element.arrival.slice(0,9)) && (element.arriveDatetime = element.arrival.slice(10,15))
        }
      });

      console.log('key added / modifed data', this.searchResult)
    });

    
   }

   jnry = { origin:'pnq', destination:'del'};
   searchFlight(){

   let ori = this.originCtrl.value;
   let dest = this.destCtrl.value;
   let jdate = this.dateCtrl.value;
   let pass = this.passgenCtrl.value;

    this.originCtrl.setValue(ori.toString().toUpperCase());
    this.destCtrl.setValue(dest.toString().toUpperCase()); 

   this.searchResult.forEach(element => {
     let o = element.ori.toString().toUpperCase(); let d = element.dest.toString().toUpperCase()
    console.log(o,d)
     if(o == ori.toString().toUpperCase() &&  d == dest.toString().toUpperCase()  ){
      console.log(element)
     }
   });

   }

  ngOnInit() {
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
}

  

}
