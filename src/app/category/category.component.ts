import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];

  constructor(public pdtSer: ProductsService) {

  }

  ngOnInit(): void {
      this.pdtSer.getAllcategories().subscribe({
        next: (data: any[])=>{
          console.log('success data', data);
          this.categories = data;
        }, 
        error: (error: any) =>{
          alert('Couldnt fetch categories');
          console.log('error ', error);
        },
        complete: ()=>{
          console.log('Completed');
        }
      });
  }
}
