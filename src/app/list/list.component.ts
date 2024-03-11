import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() productList: Product[]=[]
  formProduct=new FormGroup({
    productName: new FormControl<string>(''),
    price: new FormControl<number>(0),
    description: new FormControl<string>(''),
    imageUrl: new FormControl<string>(''),
    inStock: new FormControl<number>(10)
  })
  file: string = ''
  IsAdd: number = 1
  IsUpdate: number = 0
  constructor(private prod: ProductService) {
    this.prod.getProduct().subscribe(data => {
      this.productList = data
    })
  }
  ngOnInit(): void {
    this.formProduct.controls['imageUrl'].setValue('./assets/Products')
    this.prod.getProduct().subscribe(data => {
      this.productList = data
    });
  }
  onChange(event: any) {
    var str = event.target.files[0].name;
    this.file = './assets/Products/' + str
  }
  Add() {
    this.formProduct.controls['imageUrl'].setValue(this.file)
    this.prod.AddProduct(this.formProduct.value).subscribe(res => {
      this.ngOnInit()
    })
  }
  id:any
  Edit(index: number) {
    this.id = this.productList[index].id
    this.formProduct.controls['productName'].setValue(this.productList[index].productName)
    this.formProduct.controls['description'].setValue(this.productList[index].description)
    this.formProduct.controls['imageUrl'].setValue(this.productList[index].imageUrl)
    this.formProduct.controls['price'].setValue(this.productList[index].price)
    this.file = this.productList[index].imageUrl
  }
  Update() {
    this.formProduct.controls['imageUrl'].setValue(this.file)
    this.prod.UpdateProduct(this.id, this.formProduct.value).subscribe(res => {
      this.ngOnInit()
    })
  }
  Delete(index: number) {
    this.id = this.productList[index].id
    if(confirm('Are you sure to delete?'))
    this.prod.DeleteProduct(this.id).subscribe(res => {
      this.ngOnInit()
    })
  }
}
