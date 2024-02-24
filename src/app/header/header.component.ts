import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;

  constructor(public userSer: UsersService, public router: Router, private pdtSer: ProductsService) {

  }

  ngOnInit(): void {
      this.pdtSer.updateCart.subscribe({
        next: (data?: any) => {
          console.log('emitted data ', data);
        this.getCartCount();
        }
      });

      this.getCartCount();
  }

  doLogout() {
    this.cartCount = 0;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getCartCount() {
    this.pdtSer.getMyCartCount().subscribe({
      next: (data: number) => {
        this.cartCount = data;
      }
    })
  }


}
