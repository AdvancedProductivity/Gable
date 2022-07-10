import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataServiceImplService} from '../../core/services/impl/data-service-impl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor(private router: Router,
              private dataServiceImplService: DataServiceImplService) {
  }

  ngOnInit(): void {
  }

  addItem() {
    this.dataServiceImplService.addItem().subscribe((v) => {
      console.log('zzq see add data', v);
    });
  }

  clearItem() {
    this.dataServiceImplService.clearAll().subscribe((v) => {
      console.log('zzq see clear data', v);
    });
  }
}
