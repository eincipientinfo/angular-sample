import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../teams/teams.service';
import { SettingsService, VehicleCombinedDataModel } from '../settings.service';
import { Vehicle } from 'src/app/models/Vehicle';
import { FilterSettingsModel } from './setting-vehicles/settings-vehicles.component';
import { ModalService } from 'src/app/components/shared/services/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
managersCount;
  public teamsCount: number = null;
  public vehicleCounts = null;
  public vehicles: Vehicle[];
  public vehicleCombinedData:VehicleCombinedDataModel;

  public savedFilters: FilterSettingsModel = {
    filter_vehicle: null
  };

  constructor(private teamsService: TeamsService,
    private settingsService: SettingsService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.settingsService.getVehicleCombinedData().subscribe((response)=>{
      this.vehicleCombinedData = response.data;
    })
    //this.getVehicles();
    this.getTeams();
this.getManagers()
  }

  public getTeams() {
    this.teamsService.getTeams()
      .subscribe((res) => {
        this.teamsCount = res.data.length;
      })
  }
  getManagers(){
    this.settingsService.getManagers().subscribe((response)=>{
this.managersCount = response.data.items.length
    })
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

}
