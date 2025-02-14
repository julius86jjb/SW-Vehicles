import { Component, Input, computed, inject, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
    selector: 'sw-cart-item',
    imports: [DecimalPipe, FormsModule],
    templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  cartService = inject(CartService);

  // signal vs behaviorSubject:
  // 1. Simplify binding (No need to subscribe with async)
  // 2. Computed signals
  // 3. Improved change detection (zoneless future)

  // // Use a setter to emit whenever a new item is set
  // _item!: CartItem;
  // get item(): CartItem {
  //   return this._item;
  // }
  // // TODO: Skipped for migration because:
  // //  Accessor inputs cannot be migrated as they are too complex.
  // @Input() set item(item: CartItem) {
  //   this._item = item;
  //   this.cartItem.set(item);
  // }


  // Hard-coded quantity
  // These could instead come from an inventory system
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  // Cart item signal
  cartItem = input.required<CartItem>({
    alias: 'item'
  });

  // When the item changes, recalculate the extended price
  exPrice = computed(() =>
    this.cartItem().quantity * Number(this.cartItem().vehicle.cost_in_credits));

  onQuantitySelected(quantity: number): void {
    // Update the quantity in the item
    this.cartService.updateInCart(this.cartItem(), Number(quantity));
  }

  onRemove(): void {
    this.cartService.removeFromCart(this.cartItem());
  }
}
