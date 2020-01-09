import { Component, OnInit } from '@angular/core';
import { SettingsService, VehicleCombinedDataModel } from '../../settings.service';
import { Vehicle } from 'src/app/models/Vehicle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/components/shared/services/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-vehicles.component.html',
  styleUrls: ['./settings-vehicles.component.css']
})
export class SettingsVehicleComponent implements OnInit {

  public vehicles:[Vehicle];
  public vehicleCounts:any;
  public vehicleCombinedData:VehicleCombinedDataModel;

  public savedFilters: FilterSettingsModel = {
    filter_vehicle: null
  };

  constructor(private settingsService:SettingsService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.settingsService.getVehicleCombinedData().subscribe((response)=>{
      this.vehicleCombinedData = response.data;
    })
    this.getVehicles();

  }

  public getVehicles()
  {
    let vehicleTypeRef = null;
    if(this.savedFilters.filter_vehicle)
    {
      vehicleTypeRef = this.savedFilters.filter_vehicle.ref;
    }
    this.settingsService.getVehicles(vehicleTypeRef).subscribe((response)=>{
      this.vehicles = response.data.vehicles
      this.vehicleCounts = response.data.vehicleCounts
    })
  }

  public filterSettingsByDropdown(filter: string, ref: string = null, name: string = null) {
    if(ref != null) {
      this.savedFilters[filter] = {
        ref: ref,
        name: name
      };
      if(this.savedFilters.filter_vehicle == null) {

      }
    } else {
      this.savedFilters[filter] = null;
    }
    console.log(this.savedFilters);
    this.getVehicles();
  }

  public editVehicle(vehicle:Vehicle = null)
  {
    this.modalService.showEditVehicleModalSubject.next(vehicle)
  }
  
  public deleteVehicle(vehicle:Vehicle = null)
  {
    if(confirm('Are you sure to delete this fetcher?')){
        this.settingsService.deleteVehicles(vehicle.ref).subscribe((response)=>{
          this.getVehicles();
        })
    }
  }

}

export interface FilterSettingsModel {
  filter_vehicle: {
    ref: string;
    name: string;
  };
}
