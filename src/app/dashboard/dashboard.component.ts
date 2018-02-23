import { Component, OnInit,HostListener, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, NgForm, Validator, Validators } from '@angular/forms';
import { AppserviceService } from '../services/appservice.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('1200ms ease-out')),
      transition('hide => show', animate('1200ms ease-in'))
    ]),
    trigger('scrollAnimation1', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(100%)"
      })),
      transition('show => hide', animate('1200ms ease-out')),
      transition('hide => show', animate('1200ms ease-in'))
    ]),
    trigger('scrollAnimation2', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateY(100%)"
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('1500ms ease-in'))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  flightResult;
  searchResult =[];
  retrunResult = [];
  originplace; destinationplace;
  originCtrl = new FormControl('',[Validators.required]);
  destCtrl = new FormControl('',[Validators.required]);
  dateCtrl = new FormControl('',[Validators.required]);
  retunCtrl = new FormControl('',[Validators.required]);
  passgenCtrl = new FormControl('',[Validators.required]);

  myOptions: INgxMyDpOptions = {  dateFormat: 'dd/mm/yyyy', };
  myOptions1: INgxMyDpOptions = {  dateFormat: 'dd/mm/yyyy', };

  model: any = { date: { year: 2018, month: 2, day: 1 } };

  Origin; Destination;
  DepartDate; ReturnDate;
  JflightCharge; 
  JflightCode;  JflightFromTo;
  JDepartTimes; JArriveTimes;
  RflightCode; RflightFromTo;
  RDepartTimes; RArriveTimes;
  showFlightResult = false;
  showNOFlightResult = false;
  isOneWay = true;
  oneWayTrip = true;
  returnTrip = false;


  constructor(private appservice: AppserviceService, public el: ElementRef) { 
    
      this.appservice.searchFlight(this.jnry).subscribe( (data:any) =>{
     // console.log(data);
      this.flightResult = data;
      this.flightResult.forEach(element => {
        var newObj = element;
        
          if(element.origin == 'PNQ'){
          Object.assign(newObj, { ori:'PUNE'  });
          }
          if(element.destination == 'DEL'){
          Object.assign(newObj, { dest:'DELHI'  });
          }
          if(element.origin == 'DEL'){
            Object.assign(newObj, { ori:'DELHI'  });
            }
            if(element.destination == 'PNQ'){
            Object.assign(newObj, { dest:'PUNE'  });
            }
            
        
        if(element.departure != '')
        {
          let j =  element.jouryDate = element.departure.slice(0,10);
          Object.assign(newObj, { deptDate:j  });
          let jt = element.jouryDatetime = element.departure.slice(11,15);
          Object.assign(newObj, { deptTime: jt });
          //console.log(j,'depart data ---time ->',jt)
        }
        if(element.arrival != '')
        {
          let a = element.arriveDate = element.arrival.slice(0,10);
          Object.assign(newObj, { arrvDate:a  });
          let at = element.arriveDatetime = element.arrival.slice(11,15)
          Object.assign(newObj, { arrvTime:at  });
          //console.log(a,'arrive data ---time ->',at)
        }
      });

      console.log('key added / modifed data', this.flightResult)
    });

    
   }

   jnry = { origin:'pnq', destination:'del'};
   searchFlight(){
    this.searchResult = [];
    let ori = this.originCtrl.value; 
    let dest = this.destCtrl.value; 
    let jdate = this.dateCtrl.value;
    let pass = this.passgenCtrl.value;


    this.originCtrl.setValue(ori.toString().toUpperCase());
    this.destCtrl.setValue(dest.toString().toUpperCase()); 
    

      this.flightResult.forEach(element => {        
          var start = element.ori.toString().toUpperCase();          
          var end = element.dest.toString().toUpperCase();          
          var deptD = element.deptDate;         

          if(start == ori.toString().toUpperCase() &&  end == dest.toString().toUpperCase() && deptD == jdate.formatted ){
            //console.log(element);
            this.Origin = start;
            this.Destination = end;
            this.DepartDate = deptD;         
            this.searchResult.push(element)
          }
          if(this.returnTrip){
            let rdate = this.retunCtrl.setValue('28/02/2018');
            console.log(start,end,deptD,'inside retrun start,end depid', dest.toString().toUpperCase(),ori.toString().toUpperCase())
            if(start == dest.toString().toUpperCase() && end == ori.toString().toUpperCase()  && deptD != rdate){
             this.searchResult.forEach(e => { 
              var newObj = e;
              Object.assign(newObj, { rairlineCode:element.airlineCode  });
              Object.assign(newObj, { rflightNumber:element.flightNumber });
              Object.assign(newObj, { rjouryDatetime:element.jouryDatetime  });
              Object.assign(newObj, { rarriveDatetime:element.arriveDatetime  });
            })
            //this.searchResult['rairlineCode'] = element.airlineCode
          }
      }
      });

      this.searchResult.sort(function(a, b) {
        return a.jouryDatetime - b.jouryDatetime;
    });

      console.log(this.searchResult, " display result",this.searchResult.length)
      if(this.searchResult.length > 0 ){ 
        this.showFlightResult = true;
        this.showNOFlightResult = false
      }
      else{
        this.showFlightResult = false;
        this.showNOFlightResult = true;
      }
      }

  ngOnInit() {
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
}
state ='hide';
@HostListener('window:beforeunload', ['$event'])
checkScroll() {
  const componentPosition = this.el.nativeElement.offsetTop
  const scrollPosition = window.pageYOffset

  if (scrollPosition >= componentPosition) {
    this.state = 'show'
  } 
  // else {
  //   this.state = 'hide'
  // }

}
TripType(opt){
  this.isOneWay = !this.isOneWay;
  this.showFlightResult = false;
  if(opt == 1){
    this.oneWayTrip =true;
    this.returnTrip = false;
  }
  else{
    this.oneWayTrip =false;
    this.returnTrip = true;
  }
}
BookThisFlight(flight){
 console.log(flight) 
}

  

}
