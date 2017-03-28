import { Injectable } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
import { HttpClient } from './http-client.service';
import 'rxjs/Rx';


@Injectable()
export class MemeService {

  memes: string[] = [];
  generators: any[] = [];
  memeurl: string = "https://nathangrove.com/memes/";

  constructor(
    private http: HttpClient
  ) { 
    this.get();
    this.getGenerators();
  }

  getGenerators() {
    this.http.get(this.memeurl + '/backgrounds.php').subscribe((res) => {
      let generators = res.json();
      for (var i=0; i < generators.length; i++){
        this.generators.push({
          filename: generators[i].filename,
          url: generators[i].url,
          name: generators[i].name
        });
      }
      console.log(this.generators);
    });
  };

  create(generatorId,text0,text1){
    return this.http.get(this.memeurl + "/create.php?background=" + generatorId + "&text0=" + text0 + "&text1=" + text1);
  };


  attach(table,sys_id,file_name,url){

    return this.http.post('/api/x_60972_ccw3949/attach_meme',{
      url: url,
      table: table,
      record: sys_id,
      filename: file_name
    });

  };


  get() {
    this.http.get("/api/now/v1/table/x_60972_ccw3949_meme_store").subscribe((res) => {
      let memes = res.json().result;
      this.memes = memes.map((a) => a.url);
    },err => console.log("No memes found"));
  };

  save(url,text0,text1,generator){
    this.memes.push(url);
    return this.http.post("/api/now/v1/table/x_60972_ccw3949_meme_store",{ url: url, text0: text0, text1: text1, generator: generator });
  };

}
