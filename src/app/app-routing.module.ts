import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  {path: "blog", component: BlogComponent},
  {path: "projects", component: ProjectsComponent},
  {path: "", component: HomeComponent},
  {path: "works", component: WorksComponent},
  {path: "project/:id", component: ProjectComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
