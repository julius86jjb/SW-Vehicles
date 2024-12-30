import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.interface';

@Component({
    selector: 'sw-vehicle-list',
    imports: [NgClass],
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  // Component signals

  // Not catching errors:
  vehicles = signal<Vehicle[]>([])

  // Catching errors:
  // vehicles = computed(() => {
  //   try {
  //     return this.vehicleService.vehicles();
  //   } catch (e) {
  //     this.errorMessage = typeof e === 'string'? e : 'Error';
  //     return [];
  //   }
  // });


  selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
