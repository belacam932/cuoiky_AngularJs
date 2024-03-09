import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  products:Product[]=[]
  ///lấy sản phẩm
  private URL=`http://localhost:3000/product`
  
  getProduct():Observable <Product[]>{
    return this.http.get<Product[]>(`${this.URL}`)
  }
  getproductId(id:number){
    // return this.products.find(item=>item.productId==id)
    return this.http.get<Product>(`${this.URL}/${id}`)
  }
  AddProduct(frmProduct:any):Observable <Product[]>{
    return this.http.post<Product[]>(`${this.URL}`,frmProduct)
    // let id=this.products.push(frmProduct)-1
    // this.products[id].imageUrl=fileImg
  }
  EditProduct(index:number){
    return this.products[index]
  }
  UpdateProduct(id:number,frmProduct:any):Observable<Product[]>{
    return this.http.put<Product[]>(`${this.URL}/${id}`,frmProduct)
    // this.products[id].productName=frmProduct.productName
    // this.products[id].description=frmProduct.description
    // this.products[id].price=frmProduct.price
    // this.products[id].imageUrl=fileImg
  }
  DeleteProduct(id:number){
    // console.log(this.products.splice(id,1));
    
    return this.http.delete<Product[]>(`${this.URL}/${id}`)
  }
}
