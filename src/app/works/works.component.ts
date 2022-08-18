import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../retrieve.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.sass']
})
export class WorksComponent implements OnInit {

  works: any = {}
  jobList: any[] = []

  constructor(
    private get: RetrieveService
  ) { }

  

  ngOnInit(): void {
    this.get.getCollection("works").subscribe((info: any) => {
      console.log("info", info)
      this.works = info
      this.jobList = Object.values(this.works)
      this.jobList = this.jobList.map(job => {
        job.data.categories = Object.keys(job.data.categories)
        return job
      })
      console.log({projects: this.works, projectList: this.jobList})
    })
  }

}
