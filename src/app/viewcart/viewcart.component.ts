import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  cartProducts: any[] = [];

  cartFinalPrice = 0;

  msg: string;

  constructor(private pdtSer: ProductsService, private router: Router) {

  }

  ngOnInit(): void {
      this.pdtSer.getMyCartItems().subscribe({
        next: (data: any[]) => {

          console.log(data);
          this.cartProducts = data;

          for(let cartData of this.cartProducts) {
            this.cartFinalPrice += cartData['cartPdtPrice'];
          }

        }, error: (error: any) =>{
          console.log(error);

          if(error.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl("/login");
          }
        }
      })
  }

  updateCart(cartId: number, cartQty: number, pdtPrice: number) {
    this.pdtSer.updateMyCartItems(cartId, cartQty, pdtPrice).subscribe({
      next: (data: string) => {
        this.msg = data;

        let index = this.cartProducts.findIndex((obj) => {
          return obj._id === cartId;
        });

        this.cartProducts[index].cartPdtPrice = cartQty*pdtPrice;
        this.cartProducts[index].cartPdtQty = cartQty;

        this.cartFinalPrice = 0;
        for(let cartData of this.cartProducts) {
          this.cartFinalPrice += cartData['cartPdtPrice'];
        }


      }, error: (error: any) => {
        this.msg = "Something went wrong";
      }
    })
  }

  removeCart(cartId: number) {
    this.pdtSer.removeMyCartItems(cartId).subscribe({
      next: (data: string) => {
        this.msg = data;

        this.pdtSer.updateCart.next('test');

        this.cartProducts = this.cartProducts.filter((obj) => {
          return obj._id != cartId;
        });

        this.cartFinalPrice = 0;
        for(let cartData of this.cartProducts) {
          this.cartFinalPrice += cartData['cartPdtPrice'];
        }

      }, error: (error: any) => {
        this.msg = "Something went wrong";
      }
    })
  }

}
