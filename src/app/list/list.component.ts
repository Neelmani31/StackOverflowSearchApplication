import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './../services/data-service.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  query:any;
  list:any;

  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.query= this.route.snapshot.queryParamMap.get('query');
    this.dataService.getQuestions(this.query).subscribe(res=>{
      this.list=res.items;
    })

  }

}
