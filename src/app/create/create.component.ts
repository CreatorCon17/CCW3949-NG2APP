import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemeService } from '../services/meme.service';
import { Meme } from '../classes/meme';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  meme: Meme;
  task: any;

  constructor(
    private memeService: MemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.meme = new Meme();
  }

  create() {
    this.memeService.create(this.meme.generator,this.meme.text0,this.meme.text1).subscribe((response) => {
      this.meme.url = response.json().result.instanceImageUrl;
    });
  }

  setPreview(){
    this.meme.preview = this.memeService.generators.find((a)=> a.id == this.meme.generator).url;
  }

  attach(){
    this.memeService.save(this.meme.url,this.meme.text0,this.meme.text1,this.meme.generator).subscribe((res) => {
      this.router.navigate(['/attach'],{ queryParams: { url: this.meme.url } });
    });
  }

  save() {
    console.log(this.meme);
    this.memeService.save(this.meme.url,this.meme.text0,this.meme.text1,this.meme.generator).subscribe((res) => {
      this.meme = new Meme();
    });
  }
}
