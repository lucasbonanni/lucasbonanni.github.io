import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lucas Bonanni';

  constructor(private meta: Meta){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.metaTagService.addTags([
    //   { name: 'keywords', content: 'Lucas Bonanni, Lucas, Bonanni, Development, c#' },
    //   { name: 'robots', content: 'index, follow' },
    //   { name: 'author', content: 'Lucas Bonanni' },
    //   { charset: 'UTF-8' }])
  }
}
