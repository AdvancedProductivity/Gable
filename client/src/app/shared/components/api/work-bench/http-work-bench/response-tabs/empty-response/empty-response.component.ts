import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-response',
  templateUrl: './empty-response.component.html',
  styleUrls: ['./empty-response.component.scss']
})
export class EmptyResponseComponent implements OnInit {
  @Input()
  header: string;
  @Input()
  tip: string;
  constructor() { }

  ngOnInit(): void {
  }

}
