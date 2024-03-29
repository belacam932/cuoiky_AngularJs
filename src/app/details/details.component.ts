import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Cart } from '../cart';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productDetail: Product | undefined
  cartList: Cart[] = []
  InStock: number = 0
  constructor( 
    private router: ActivatedRoute,
    private prod: ProductService,
    private cartService: CartService) {
    this.cartList = cartService.getCartAll()
   
  }
  ngOnInit(): void {
    let id = this.router.snapshot.params['id']
    this.prod.getproductId(id).subscribe(data =>{
      this.productDetail=data
      this.InStock = this.productDetail.inStock!
    })
  }
  
  Add() {
    this.cartService.addCart(this.productDetail?.id!, this.productDetail)
    this.InStock = this.cartService.getInStock(this.productDetail?.id!)!
  }
  //không vấn đề
  ItemCount() { return this.cartService.totalItems() }
  ItemSum() { return this.cartService.Total() }
  Remove(index: number) {
    this.InStock = this.cartService.getInStock(this.productDetail?.id!)!
    this.cartService.RemoveCart(index)
  }
  DeleteAll() { this.cartService.DeleteAllCart() }
}
