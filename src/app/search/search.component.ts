import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public state = 'inactive';
  constructor() { }

  ngOnInit() { }

  btnClick() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

}
