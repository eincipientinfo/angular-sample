import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SettingsVehicleComponent } from './sections/setting-vehicles/settings-vehicles.component';
import { SettingsVehicleTypesComponent } from './sections/setting-vehicles/sections/settings-vehicle-types/settings-vehicle-types.component';
import { EditVehicleTypeModalComponent } from './modals/edit-vehicle-type-modal/edit-vehicle-type-modal.component';
import { EditVehicleModalComponent } from './modals/edit-vehicle-modal/edit-vehicle-modal.component';
import { SettingsPreferencesComponent } from './sections/settings-preferences/settings-preferences.component';
import { SettingsAutoAllocationComponent } from './sections/settings-auto-allocation/settings-auto-allocation.component';
import { SettingsGeofenceComponent } from './sections/settings-geofence/settings-geofence.component';
import { SettingsComponent } from './sections/settings.component';
import { AutoAllocationSimulationModalComponent } from './sections/settings-auto-allocation/auto-allocation-simulation-modal/auto-allocation-simulation-modal.component';
import { SettingsGeofenceEditModalComponent } from './sections/settings-geofence/modals/settings-geofence-edit-modal/settings-geofence-edit-modal.component';


const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'vehicles', component: SettingsVehicleComponent },
  { path: 'preferences', component: SettingsPreferencesComponent },
  { path: 'templates', loadChildren: './sections/settings-template/settings-template.module#SettingsTemplateModule' },
  { path: 'geofence', component: SettingsGeofenceComponent },
  { path: 'allocation', component: SettingsAutoAllocationComponent },
  { path: 'teams', loadChildren: '../teams/teams.module#TeamsModule' },
  { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule'},
  { path: 'manager', loadChildren: './sections/settings-manager/settings-manager.module#SettingsManagerModule' },
  { path: 'manager/:ref', loadChildren: './sections/settings-manager/settings-manager.module#SettingsManagerModule' },
  { path: 'vehicles/types', component: SettingsVehicleTypesComponent }
]

@NgModule({
  declarations: [
    SettingsVehicleComponent,
    SettingsVehicleTypesComponent,
    EditVehicleTypeModalComponent,
    EditVehicleModalComponent,
    SettingsPreferencesComponent,
    SettingsAutoAllocationComponent,
    SettingsGeofenceComponent,
    SettingsComponent,
    AutoAllocationSimulationModalComponent,
    SettingsGeofenceEditModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class SettingsModule { }