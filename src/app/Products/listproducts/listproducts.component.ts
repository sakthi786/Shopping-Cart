import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {

  isLoading = true;

  msg: string;

  products: any[] = [];

  constructor(private pdtSer: ProductsService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log('ListproductsComponent instance creatd');

    this.activeRoute.params.subscribe({
      next: (param: Params) => {
        console.log('param', param);
        if(param["catid"]) {
          this.getProductsCatwise(Number(param["catid"]));
        } else {
          this.getAllProducts();
        }
       
      }
    })

     
  }

  getProductsCatwise(catId: number) {
    this.isLoading = true;
    this.pdtSer.getProductsByCatwise(catId).subscribe({
      next: (data: any[]) => {

        console.log(data);
        this.products = data;
        this.isLoading = false;
      }, error: (error: any) => {

        console.log(error);

      }
    });
  }

  getAllProducts() {
    this.pdtSer.getAllProducts().subscribe({
      next: (data: any[]) => {

        console.log(data);
        this.products = data;
        this.isLoading = false;
      }, error: (error: any) => {

        console.log(error);

      }
    });
  }

  addToCart(pdtId: number, pdtPrice: number) {
   

    this.pdtSer.addToMycart(pdtId, pdtPrice).subscribe({
      next: (data: string) => {

        console.log(data);
        this.msg = data;
        this.pdtSer.updateCart.next('test');

      }, error: (error: any) => {

        console.log(error);
        this.msg = "Something went wrong!";

      }
    });
  }

}
