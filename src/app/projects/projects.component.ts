import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {RetrieveService} from "../retrieve.service"

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  projects: any = {}
  projectList: any[] = []

  constructor(
    private get: RetrieveService
  ) { 
    /* setInterval(this.getData(), 1) */

  }

  getData(): any {
    return this.get.getCollection("projects").subscribe((info: any) => {
      console.log("info", info)
      this.projects = info
      this.projectList = Object.values(this.projects)
      console.log({projects: this.projects, projectList: this.projectList})
    })
  }

  ngOnInit(): void {
    this.getData()
  }

}
