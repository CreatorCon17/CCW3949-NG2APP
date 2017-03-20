import { Component, OnInit } from '@angular/core';
import { MemeService } from '../services/meme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private memeService: MemeService
  ) { }

  ngOnInit() {
  }

}
