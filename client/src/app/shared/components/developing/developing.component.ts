import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {AnalysisService} from "../../../core/services/analysis.service";

@Component({
  selector: 'app-developing',
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.scss']
})
export class DevelopingComponent implements OnInit {
  @Input() link: string;
  @Input() location: string;
  constructor(
    private snackBar: MatSnackBar,
    private analysisService: AnalysisService,
    private trans: TranslateService
  ) { }

  ngOnInit(): void {
  }

  onComeOnClick(): void {
    this.analysisService.comeOn(this.location).then(r => {});
    this.trans.get(['MESSAGE.THANKS_FOR_COME_ON','MESSAGE.I_KNOW']).subscribe(res => {
      this.snackBar.open(res['MESSAGE.THANKS_FOR_COME_ON'], res['MESSAGE.I_KNOW'], {
        duration: 5 * 1000,
      });
    });
  }

  onLearnMoreClick(): void {
    window.open(this.link);
  }
}
