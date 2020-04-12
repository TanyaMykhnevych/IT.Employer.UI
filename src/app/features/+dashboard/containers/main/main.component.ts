import {Component} from '@angular/core';
import { navItems } from '../../../../_nav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
