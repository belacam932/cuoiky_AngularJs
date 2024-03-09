import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[]=[]
  filterProductHome:Product[]=[]
  productService : ProductService = inject(ProductService)
  constructor(){
    this.productService.getProduct().subscribe(data =>{
       this.products =data
       this.filterProductHome=this.products;
       console.log(this.filterProductHome);
       
     })
   }
  searching: string="";
  filterResults(){
    if(!this.searching){
      this.filterProductHome=this.products;
    }
    this.filterProductHome=this.products.filter(
      list => 
        list?.productName.toLowerCase().includes(this.searching.toLowerCase())
      
    )
    
  }
}
