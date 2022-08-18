import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatCardModule} from "@angular/material/card"
import {MatChipsModule} from "@angular/material/chips";
import { CardComponent } from './card/card.component';
import { ToolbarComponent } from './toolbar/toolbar.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { WorksComponent } from './works/works.component';
import { ProjectComponent } from './project/project.component';
import { ArticleComponent } from './article/article.component';
import { JobComponent } from './job/job.component';
import { RetrieveService } from './retrieve.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ToolbarComponent,
    ProjectsComponent,
    HomeComponent,
    BlogComponent,
    WorksComponent,
    ProjectComponent,
    ArticleComponent,
    JobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  providers: [
    HttpClient,
    RetrieveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
