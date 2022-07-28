import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-developing',
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.scss']
})
export class DevelopingComponent implements OnInit {
  @Input()
  link: string;
  constructor(private snackBar: MatSnackBar,
              private trans: TranslateService) { }

  ngOnInit(): void {
  }

  onComeOnClick(): void {
    this.trans.get(['MESSAGE.THANKS_FOR_COME_ON','MESSAGE.I_KNOW']).subscribe(res => {
      this.snackBar.open(res['MESSAGE.THANKS_FOR_COME_ON'], res['MESSAGE.I_KNOW']);
    });
  }

  onLearnMoreClick(): void {
    window.open(this.link);
  }
}
