import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// quickly take 1 item from observable but don't unsubscribe
// (no new values emitted):
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
      this.categories$ = categoryService.getCategories();

      this.id = this.route.snapshot.paramMap.get('id');
      // no need to unsubscribe because of take operator
      if (this.id) this.productService
        .getProduct(this.id)
        .take(1)
        .subscribe(p => this.product = p);
   }

   save(product) {
     if (this.id) this.productService.update(this.id, product);
     else this.productService.create(product);

     this.router.navigate(['/admin/products']);
   }

   delete() {
     if (!confirm('Are you sure you want to delete this product?')) return;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
   }
   
  ngOnInit() {
  }

}