import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  {path: "blog", component: BlogComponent},
  {path: "projects", component: ProjectsComponent},
  {path: "", component: HomeComponent},
  {path: "works", component: WorksComponent},
  {path: "project/:id", component: ProjectComponent, },
  {path: "article/:id", component: ArticleComponent, },
  {path: "job/:id", component: JobComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
