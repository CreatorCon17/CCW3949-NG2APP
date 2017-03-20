import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '../services/http-client.service';
import { MemeService } from '../services/meme.service';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.css']
})
export class AttachComponent implements OnInit, OnDestroy {

  sub: any;
  meme: string;
  table: string = '';
  record: string = '';
  fileName: string = '';
  records: any[];

  constructor(
    private memeService: MemeService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.meme = params['url'];
      });
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  };

  attach(){
    this.memeService.attach(this.table,this.record,this.fileName,this.meme).subscribe((res) => {
      this.table = '';
      this.record = '';
    });
  }


  getRecords(){
    this.http.get('/api/now/v1/table/' + this.table + "?sysparm_query=active=true^ORDERBYDESCnumber").subscribe((res) => {
      this.records = res.json().result;
    });
  }

}
