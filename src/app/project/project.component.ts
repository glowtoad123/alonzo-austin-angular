import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { RetrieveService } from '../retrieve.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  project: any
  id: string | undefined | null = ""

  constructor(
    private get: RetrieveService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get("id")

    if(typeof this.id === "string") {
      this.project = this.get.getDocument("projects", this.id).subscribe(document => {
        console.log("document", document)
        this.project = document
      })
    }
    console.log("this.id", this.id)
    console.log("this.project", this.project)
  }

}
