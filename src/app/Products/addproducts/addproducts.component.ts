import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  categories : any[] = [];

  msg : string;

  selectedImg: any;

  constructor(private pdtSer: ProductsService) {

  }

  ngOnInit() {
    this.pdtSer.getAllcategories().subscribe({
      next: (data:any[])=>{

        console.log(data);

        this.categories = data;

      }, error: (error:any)=>{

        console.log(error);

      }
    });
  }

  selectImage(event: any) {
   // console.log(event);
    this.selectedImg = event.target.files[0];
  }

  createProducts(form:NgForm) {
    console.log(form.value);

    var fd = new FormData();

    fd.append('pdtCatId', form.value.catId);
    fd.append('pdtName', form.value.pdtName);
    fd.append('pdtPrice', form.value.pdtPrice);
    fd.append('pdtDesc', form.value.pdtDesc);

    fd.append('pdtImg', this.selectedImg);

      this.pdtSer.addProducts(fd).subscribe({
        next: (data: string) => {

          console.log(data);
          this.msg = data;
          form.reset();
        }, error: (error: any) => {

          console.log(error);

        }
      });

  }

}
