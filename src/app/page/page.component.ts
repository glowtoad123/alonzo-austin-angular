import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() title: string = ""
  @Input() description: string = ""
  @Input() log: string = ""
  @Input() date: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
