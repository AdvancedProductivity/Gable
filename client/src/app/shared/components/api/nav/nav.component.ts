import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-api-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeLink = '';
  links: string[] = ['A'];
  constructor() { }

  ngOnInit(): void {
  }

  addLink(): void {
    const v = 'item_' + this.links.length;
    this.links.push(v);
    this.activeLink = v;
  }

  showLink(l: string) {
    if (!l) {
      return;
    }
    let have = false;
    this.links.forEach(item => {
      if (item === l) {
        have = true;
      }
    });
    if (!have) {
      this.links.push(l);
    }
    this.activeLink = l;
  }

  private closeAllTabs(): void {
    this.links = [];
    this.activeLink = undefined;
  }

  private close(name: string): void {
    const index = this.links.indexOf(name);
    this.links = this.links.filter(item => item !== name);
    if (index !== -1) {
      if (name === this.activeLink) {
        this.activeLink = this.links[index - 1];
      }
    }
  }
}
