import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  disableSkills = true;
  skillTypes  = [ {
    title: "",
    skills: [{
      name:'',
      percentage: 0,
      color: 'success'
    }]
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
