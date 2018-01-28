import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$; // define the observable

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    // initialize observable; await the result from promise
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
