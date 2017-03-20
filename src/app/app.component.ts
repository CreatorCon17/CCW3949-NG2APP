import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  branding = 'Meme Attachment Generator';

  constructor(
  ) { }

  ngOnInit() {
    document.title = this.branding;
  }
}
