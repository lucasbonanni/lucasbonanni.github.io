import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { SocialComponent } from './components/social/social.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { AboutMeComponent } from './pages/about-me/about-me.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    SocialComponent,
    AboutMeComponent,
  ],
  imports: [
    BrowserModule,
    NgxGoogleAnalyticsModule.forRoot('UA-162938324-1'),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
