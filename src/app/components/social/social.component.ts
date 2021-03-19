import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {


  services =[
    {
      name:'linkedin',
      url: 'https://www.linkedin.com/in/',
      icon:'fab fa-linkedin-in',
      color: '007bb5'
    },
    {
      name:'Github',
      url: 'https://www.github.com/',
      icon:'fab fa-github',
      color: '333333'
    },
    {
      name:'mailto:',
      url: 'mailto:',
      icon:'fas fa-envelope',
      color: 'db4437'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
