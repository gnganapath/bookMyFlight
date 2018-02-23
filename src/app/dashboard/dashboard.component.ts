import { Component, OnInit,HostListener, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, NgForm, Validator, Validators } from '@angular/forms';
import { AppserviceService } from '../services/appservice.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { trigger, state, style, animate, transition,query, stagger,keyframes } from '@angular/animations';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('explainerAnim',[
      transition('* => *',[
        query('.formAnim',style({opacity: 0, transform: 'translateX(-40px)'})),
        query('.formAnim',stagger('300ms',[
          animate('700ms 1.2s ease-out', style({opacity:1,transform:'translateX(0)'}))
        ]))
      ])
    ]),
    trigger('explainerAnim1',[
      transition('* => *',[
        query('.imgAnim',style({opacity: 0, transform: 'translateX(300px)'})),
        query('.imgAnim',stagger('300ms',[
          animate('900ms 1.2s ease-in', style({opacity:1,transform:'translateX(0)'}))
        ]))
      ])
    ]),
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateY(100%)"
      })),
      transition('show => hide', animate('1200ms ease-out')),
      transition('hide => show', animate('1200ms ease-in'))
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

  private d = new Date();
  private currentDate = this.d.getDate();

  myOptions: INgxMyDpOptions = {  dateFormat: 'dd/mm/yyyy', };
  myOptions1: INgxMyDpOptions = {  dateFormat: 'dd/mm/yyyy', };

  model1: any = { date: { year: 2018, month: 2, day: 1 } };

  

  public myDatePickerOptions: IMyDpOptions = {    
    dateFormat: 'dd/mm/yyyy',
    disableUntil: { year: 2018, month: 2, day: this.currentDate-1 } 

};

public returnMydate: any ='';
public journeyMydate: any ;

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
  showImgDiv = true;
  state = 'hide'


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
          let jt = element.jouryDatetime = element.departure.slice(11,16);
          Object.assign(newObj, { deptTime: jt });
          //console.log(j,'depart data ---time ->',jt)
        }
        if(element.arrival != '')
        {
          let a = element.arriveDate = element.arrival.slice(0,10);
          Object.assign(newObj, { arrvDate:a  });
          let at = element.arriveDatetime = element.arrival.slice(11,16)
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
    this.showImgDiv = false;
    this.state = 'show';

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
            
            var  datearray  = jdate.formatted.split("/");
            var jconvertdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
            let rdate = this.retunCtrl.value;
            var jarry = rdate.formatted.split('/');
            this.ReturnDate = rdate.formatted;
            
            console.log(start,end,deptD,'inside retrun start,end depid', dest.toString().toUpperCase(),ori.toString().toUpperCase())
            if(start == dest.toString().toUpperCase() && end == ori.toString().toUpperCase()  && deptD == rdate.formatted){
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
