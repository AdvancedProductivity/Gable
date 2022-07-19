import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-api-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  method = ['GET', 'POST', 'DELETE', 'PUT'];
  activeLink = '';
  links: { name: string; isCursorIn: boolean; tag: string }[] = [{name: 'A', isCursorIn: false, tag: 'GET'}];
  constructor() { }

  ngOnInit(): void {
  }

  addLink(): void {
    const v = 'item_' + this.links.length;
    this.links.push({name: v, isCursorIn: false, tag: this.method[this.links.length % 4]});
    this.activeLink = v;
  }

  showLink(l: string) {
    if (!l) {
      return;
    }
    let have = false;
    this.links.forEach(item => {
      if (item.name === l) {
        have = true;
      }
    });
    if (!have) {
      this.links.push({name: l, isCursorIn: false, tag: this.method[this.links.length % 4]});
    }
    this.activeLink = l;
  }

  closeAllTabs(): void {
    this.links = [];
    this.activeLink = undefined;
  }

  close(name: string): void {
    console.log('zzq see close data', name);
    let index;
    this.links.forEach((item, i) => {
      if (item.name === name) {
        index = i;
      }
    });
    this.links = this.links.filter(item => item.name !== name);
    if (index !== -1 && this.links.length > 0) {
      if (name === this.activeLink) {
        this.activeLink = this.links[index - 1].name;
      }
    }
  }
}
