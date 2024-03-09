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
    imageUrl: new FormControl<string>('')
  })
  file:string=''
  IsAdd:number=1
  IsUpdate:number=0
  constructor(private prod: ProductService)
  {
    // this.prod.getProduct().subscribe( data =>{
    //   this.productList=data
    // })
    // console.log(this.productList);
    
	// this.productList=prod.getProduct();
  }
  ngOnInit(): void {
    this.formProduct.controls['imageUrl'].setValue('./assets/images')
    this.prod.getProduct().subscribe(data => {
      this.productList = data
    })
  }
  onChange(event:any){
    var str = event.target.files[0].name;
    this.file='./assets/images/' +str
  }
  Add(){
    this.formProduct.controls['imageUrl'].setValue(this.file)
    this.prod.AddProduct(this.formProduct.value).subscribe(res => {
      this.ngOnInit()
    })
    console.log(this.formProduct);
    // this.formProduct.controls.productId.setValue(this.prod.AutoId())
    // this.prod.AddProduct(this.formProduct.value,this.file)
  }
  id:any
  Edit(index:number){
    this.id=index
    this.formProduct.controls.productName.setValue(this.prod.EditProduct(index).productName)
    this.formProduct.controls.description.setValue(this.prod.EditProduct(index).description)
    this.formProduct.controls.price.setValue(this.prod.EditProduct(index).price)
    this.file=this.prod.EditProduct(index).imageUrl
  }
  Update() {
    this.formProduct.controls['imageUrl'].setValue(this.file)
      this.prod.UpdateProduct(this.id, this.formProduct.value).subscribe(res => {
        this.ngOnInit()
      })
    }
  // Update(){
  //   this.prod.UpdateProduct(this.id,this.formProduct.value,this.file)
  // }
  Delete(index:number){
    if(confirm('Are you sure to delete?'))
      this.prod.DeleteProduct(index)
  }
}
