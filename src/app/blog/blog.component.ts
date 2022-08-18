import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../retrieve.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  blog: any = {}
  articleList: any[] = []

  constructor(
    private get: RetrieveService
  ) { }

  getData() {
    this.get.getCollection("blogs").subscribe((info: any) => {
      console.log("info", info)
      this.blog = info
      this.articleList = Object.values(this.blog)
      console.log({projects: this.blog, projectList: this.articleList})
    })

  }

  ngOnInit(): void {
    this.getData()
  }

}
