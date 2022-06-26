import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DataServiceImplService} from '../core/services/data-service-impl.service';
import '../../assets/login-animation.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';
  email: string;
  password: string;

  constructor(private router: Router,
              private dataServiceImplService: DataServiceImplService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    (window as any).loginInitialize();
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

  login() {

    console.log(`email: ${this.email} password: ${this.password}`)
    alert(`Email: ${this.email} Password: ${this.password}`)
  }
}
