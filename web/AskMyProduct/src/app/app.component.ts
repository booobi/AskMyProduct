import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductsFacade } from './data/products.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet, MatSidenavModule,  NavigationComponent],
  providers: [ProductsFacade],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AskMyProduct';
}

