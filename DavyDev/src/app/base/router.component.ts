import { Component } from '@angular/core';

@Component({
  selector: 'router-bar',
  template: `<nav>
  <table>
    <tr>
       <td><a routerLink="/home" routerLinkActive="activeLink">Home</a></td>
       <td><a routerLink="/auth" routerLinkActive="activeLink">Login</a></td>
    </tr>
  </table>
</nav>`,
  styleUrls: ['./base.component.css']
})

export class RouterComponent {
     
}
 