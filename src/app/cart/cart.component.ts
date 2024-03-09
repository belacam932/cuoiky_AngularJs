import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  productDetail: Product | undefined
  cartList: Cart[] = []
  InStock: number = 0
  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private router1: Router,
    private cartService: CartService,
    private authService: AuthService
    ) {
    this.cartList = cartService.getCartAll()
  }
  ngOnInit(): void {
    let id = this.router.snapshot.params['id']
    // this.productDetail = this.productService.getproductId(id)
    this.InStock = this.productDetail?.inStock!
  }
  Add() {
    if (this.authService.isAuthenticated) {
      this.cartService.addCart(this.productDetail?.id!, this.productDetail);
      this.InStock = this.cartService.getInStock(this.productDetail?.id!)!;
    } else {
      this.router1.navigate(['login']);
      alert('Vui lòng đăng nhập để đặt hàng');
    }
  }
  ItemCount() {
    return this.cartService.totalItems()
  }
  ItemSum() {
    return this.cartService.Total()
  }
  Remove(index: number) {
    this.cartService.RemoveCart(index)
  }
  DeleteAll() {
    this.cartService.DeleteAllCart()
  }
}