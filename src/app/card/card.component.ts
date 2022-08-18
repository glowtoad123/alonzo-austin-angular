import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string = ""
  @Input() client: string = ""
  @Input() description: string = ""
  @Input() content: string = ""
  @Input() date: string = ""
  @Input() rating: string = ""
  @Input() log: string = ""
  @Input() review: string = ""
  @Input() categories: string[] = []
  @Input() icon: string = ""
  @Input() url: string = ""
  @Input() source: string = ""
  @Input() id: string = ""
  @Input() type: string = ""

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

}
