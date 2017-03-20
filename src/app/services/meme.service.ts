import { Injectable } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
import { HttpClient } from './http-client.service';
import 'rxjs/Rx';


@Injectable()
export class MemeService {

  memes: string[];
  generators: any[] = [];

  constructor(
    private http: HttpClient
  ) { 
    this.get();
    this.getGenerators();
  }

  getGenerators() {
    this.http.get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=').subscribe((res) => {
      let generators = res.json().result;
      for (var i=0; i < generators.length; i++){
        this.generators.push({
          id: generators[i].generatorID,
          url: generators[i].imageUrl,
          name: generators[i].displayName
        });
      }
      console.log(this.generators);
    });
  };

  create(generatorId,text0,text1){
    return this.http.get("http://version1.api.memegenerator.net/Instance_Create?username=ngroveknow17&password=know17!&languageCode=en&generatorID=" + generatorId + "&text0=" + text0 + "&text1=" + text1);
  };


  attach(table,sys_id,file_name,url){

    return this.http.post('/api/x_60972_memegen/attach',{
      url: url,
      table: table,
      record: sys_id,
      filename: file_name
    });

  };


  get() {
    this.http.get("/api/now/v1/table/x_60972_memegen_store").subscribe((res) => {
      let memes = res.json().result;
      this.memes = memes.map((a) => a.url);
    },err => console.log("No memes found"));
  };

  save(url,text0,text1,generator){
    this.memes.push(url);
    return this.http.post("/api/now/v1/table/x_60972_memegen_store",{ url: url, text0: text0, text1: text1, generator: generator });
  };

}
