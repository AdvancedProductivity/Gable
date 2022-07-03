import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataServiceImplService} from '../../core/services/data-service-impl.service';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
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

    console.log(`email: ${this.email} password: ${this.password}`);
    alert(`Email: ${this.email} Password: ${this.password}`);
  }
}
