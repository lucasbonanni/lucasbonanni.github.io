import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MainComponent } from './pages/main/main.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'about-me', component: AboutMeComponent},
  {path:'projects', component: ProjectsComponent},
  {path:'blog', component: BlogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
