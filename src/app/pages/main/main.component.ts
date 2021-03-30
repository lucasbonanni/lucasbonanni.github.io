import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  site = {
    author:{
      image:'assets/img/20191115_115126.png'
    },
    title:'great!',
    description:'I turn coffee '
  }
  constructor() { }

  ngOnInit(): void {
  }

}
