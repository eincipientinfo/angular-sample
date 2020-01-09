import { Component, OnInit } from '@angular/core';
import { AbstractModalComponent } from 'src/app/components/shared/base-classes/abstract-modal-component';
import { ModalService } from 'src/app/components/shared/services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/Vehicle';
import { SettingsService, VehicleCombinedDataModel } from '../../settings.service';
import { SettingsVehicleComponent } from 'src/app/components/screens/settings/sections/setting-vehicles/settings-vehicles.component';

@Component({
  selector: 'app-edit-vehicle-modal',
  templateUrl: './edit-vehicle-modal.component.html',
  styleUrls: ['./edit-vehicle-modal.component.css']
})
export class EditVehicleModalComponent extends AbstractModalComponent implements OnInit {

  public form: FormGroup = null;
  public selectedVehicle: Vehicle = null;
  public vehicleCombinedData:VehicleCombinedDataModel;

  constructor(private modalService: ModalService, private settingsService:SettingsService, private settingsVehicleComponent:SettingsVehicleComponent) {
    super();
  }

  ngOnInit() {
    this.settingsService.getVehicleCombinedData().subscribe((response)=>{
      this.vehicleCombinedData = response.data;
    })
    this.subscriptions.push(
      this.modalService.showEditVehicleModalSubject
        .subscribe((res) => {
          this.selectedVehicle = res;
          this.openModal();
          this.initForm();
        })
    );
  }

  initForm() {
      console.log("this.selectedVehicle ",this.selectedVehicle);
    this.form = new FormGroup({
      model: new FormControl(this.selectedVehicle != null ? this.selectedVehicle.model : '', [Validators.required]),
      registration: new FormControl(this.selectedVehicle != null ? this.selectedVehicle.registration : '', [Validators.required]),
      colour: new FormControl(this.selectedVehicle != null ? this.selectedVehicle.colour : '', [Validators.required]),
      co2_emissions: new FormControl(this.selectedVehicle != null ? this.selectedVehicle.co2_emissions : '', [Validators.required]),
      fuel_type: new FormControl(this.selectedVehicle != null && this.selectedVehicle.fuel_type != null ? this.selectedVehicle.fuel_type.ref : '', [Validators.required]),
      vehicle_type: new FormControl(this.selectedVehicle != null && this.selectedVehicle.type != null ? this.selectedVehicle.type.ref : '', [Validators.required]),
      vehicle_ref: new FormControl(this.selectedVehicle != null ? this.selectedVehicle.ref : ''),
      mode: new FormControl(this.selectedVehicle != null ? 'Edit' : 'Add'),
    });
  }

  public submitForm()
  {
      document.querySelector('form').classList.add('was-validated')
      if (this.form.valid) {
        var post = this.form.value;
        post.vehicle_type_ref = post.vehicle_type;
        
        if(post.mode == 'Add'){
            this.settingsService.createVehicle(this.form.value).subscribe((response) => {
              this.settingsVehicleComponent.getVehicles();
              this.closeModal();
            });
        }
        if(post.mode == 'Edit'){
           this.settingsService.updateVehicle(this.form.value,post.vehicle_ref).subscribe((response) => {
              this.settingsVehicleComponent.getVehicles();
              this.closeModal();
            }); 
        }
      }
  }
}
