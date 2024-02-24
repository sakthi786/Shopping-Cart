import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 // updateCart = new EventEmitter();

  updateCart = new Subject();

  constructor(public http: HttpClient, private userSer: UsersService) { }

  getAllcategories() {
     return this.http.get<any[]>('http://localhost:3000/getcategories');
  }

  getAllProducts() {
    return this.http.get<any[]>('http://localhost:3000/listproducts');
  }

  /*getMyCartItems() {
    return this.http.get<any[]>("http://localhost:3000/mycart", {
      headers: new HttpHeaders({
        'myauthtoken' : this.userSer.getMyAuthToken()
      })
    })
  }*/ 

  getMyCartItems() {
    return this.http.get<any[]>("http://localhost:3000/mycart");
  }

  addProducts(data: any) {
    return this.http.post<string>("http://localhost:3000/addproducts", data);
  }

  getProductsByCatwise(catId: number) {
    return this.http.get<any[]>("http://localhost:3000/getpdtcatwise/"+catId);
  }

  addToMycart(pdtId: number, pdtPrice: number) {
    return this.http.post<string>("http://localhost:3000/addtocart", {cartPdtId: pdtId, cartPdtPrice: pdtPrice});
  }

  getMyCartCount() {
    return this.http.get<number>("http://localhost:3000/cartcount");
  }

  updateMyCartItems(cartId: number, cartQty: number, pdtPrice: number) {
    return this.http.put<string>("http://localhost:3000/updatecart", {cartId, cartPdtQty: cartQty, pdtPrice});
  }

  removeMyCartItems(cartId: number) {
    return this.http.delete<string>("http://localhost:3000/removecart/"+cartId);
  }


}
