import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants';
import { HttpAuthService } from '../../shared/services/http-auth.service';
import { GenericResponse } from 'src/app/models/GenericResponse';
import { min } from 'moment';
import { VehicleType } from 'src/app/models/VehicleType';
import { FuelType } from 'src/app/models/FuelType';
import { Observable } from 'rxjs';
import {SavedFetcherAllocationTest} from "../../../models/FetcherModel";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
template: any;
geofenceNotificationTypes = [];
geofenceTemplateTypes = [];
  private SERVER_URL = Constants.SERVER_URL;
  public initialDataForSchedule: Observable<VehicleCombinedDataResponseModel>;

  constructor(private httpClient: HttpAuthService) { }

  public getVehicleCombinedData() {
    if (this.initialDataForSchedule == null) {
      const response = this.httpClient.get<VehicleCombinedDataResponseModel>(`${Constants.SERVER_URL}/data/vehicle-combined`); // was using Schedule data
      return this.initialDataForSchedule = response;
    } else {
      console.log('served from cache');
      return this.initialDataForSchedule;
    }
  }

  // public (){ //this was missing its function name
  //   return this.httpClient.get<VehicleCombinedDataResponseModel>(this.SERVER_URL+"/data/vehicle-combined");

  // }

  public getTypes() {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + '/vehicles/types');
  }

  public getVehicles(vehicleTypeRef) {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/vehicles${vehicleTypeRef ? '/filter-vehicle-type/' + vehicleTypeRef : ''}`);
  }

  public createVehicle(post) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + `/vehicles`, post);

  }

  public updateVehicle(post, vehicleTypeRef) {
    return this.httpClient.patch<GenericResponse>(this.SERVER_URL + `/vehicles/${vehicleTypeRef ? vehicleTypeRef : ''}`, post);

  }

  public deleteVehicles(vehicleTypeRef) {
    return this.httpClient.delete<GenericResponse>(this.SERVER_URL + `/vehicles/${vehicleTypeRef ? vehicleTypeRef : ''}`);
  }

  public updateTypeMinPrice(ref: string, minPrice: string) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + `/vehicleType/${ref}`, {min_price: minPrice});

  }
  public getTemplates() {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/templates`);
  }

  getTemplate(ref) {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/templates/${ref}`);
  }

  public updateTemplate(ref: string, template) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + `/templates/${ref}`, template).toPromise();
  }

  public deleteTemplate(ref: string) {
    return this.httpClient.delete<GenericResponse>(this.SERVER_URL + `/templates/${ref}`).toPromise();
  }

  createTemplate(template) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + `/templates`, template).toPromise();
  }

  deleteManager(ref) {
    return this.httpClient.delete<GenericResponse>(this.SERVER_URL + `/manager/${ref}`);
  }

  getManagers() {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/manager`);
  }

  public triggerAssignmentTest(jobs: string[]) {
    return this.httpClient.post<GenericResponse>(`${this.SERVER_URL}/settings/trigger-allocation-test`, {
      jobs
    });
  }

  public getAvailableJobs() {
    return this.httpClient.get<GenericResponse>(`${this.SERVER_URL}/settings/unassigned-future-jobs`);
  }

  /**
   * gets a list of saved fetchers from previous tests
   */
  getAvailableFetchers() {
      return this.httpClient.get<GenericResponse>(`${this.SERVER_URL}/settings/get-simulation-settings`);
  }

  /**
   * Saves for simulation DRY-runs
   */
  saveAvailableFetchers(data: SavedFetcherAllocationTest) {
    return this.httpClient.post<GenericResponse>(`${this.SERVER_URL}/settings/save-simulation-settings`, data);
  }

  createManager(data) {
  return this.httpClient.post<GenericResponse>(this.SERVER_URL + '/manager', data);
  }

  getManager(ref: string) {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/manager/${ref}`).toPromise();
  }
  updateManager(ref, data) {
    return this.httpClient.post<GenericResponse>((this.SERVER_URL + `/manager/${ref}`), data).toPromise();
  }

  getGeofenceData() {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/geofence`);
  }

  getNotificationType() {
    return this.httpClient.get<GenericResponse>(this.SERVER_URL + `/geofence/notification-type`);
  }

  public deleteGeofence(ref: string) {
    return this.httpClient.delete<GenericResponse>(this.SERVER_URL + `/geofence/${ref}`);
  }

  createGeofenceTemplate(template) {
    let url = `${this.SERVER_URL}/geofence?`;
      url = template.templates_ref != '' ? url.indexOf('?') == -1 ? `${url}?templates_ref=${template.templates_ref }` : `${url}&templates_ref=${template.templates_ref }` : url;
      url = template.notification_type_ref != '' ? url.indexOf('?') == -1 ? `${url}?notification_type_ref=${template.notification_type_ref}` : `${url}&notification_type_ref=${template.notification_type_ref}` : url;
      url = template.range != '' ? url.indexOf('?') == -1 ? `${url}?range=${template.range}` : `${url}&range=${template.range}` : url;

      return this.httpClient.post<GenericResponse>(url, template);
  }

  updateGeofencedata(template, ref) {
    let url = `${this.SERVER_URL}/geofence/${ref}?`;
      url = template.templates_ref != '' ? url.indexOf('?') == -1 ? `${url}?templates_ref=${template.templates_ref }` : `${url}&templates_ref=${template.templates_ref }` : url;
      url = template.notification_type_ref != '' ? url.indexOf('?') == -1 ? `${url}?notification_type_ref=${template.notification_type_ref}` : `${url}&notification_type_ref=${template.notification_type_ref}` : url;
      url = template.range != '' ? url.indexOf('?') == -1 ? `${url}?range=${template.range}` : `${url}&range=${template.range}` : url;

      return this.httpClient.post<GenericResponse>(url, template);
  }
  assignManagerToTeam(request) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + '/manager/attach', request);
  }

  detachManagerFromTeam(request) {
    return this.httpClient.post<GenericResponse>(this.SERVER_URL + `/manager/detach?ref=${request.ref}&team_refs[]=${request.teams_ref}`, request);
  }

}

export interface VehicleCombinedDataResponseModel {
    message?: string;
    status?: number;
    data?: VehicleCombinedDataModel;
}
export interface VehicleCombinedDataModel {
  vehicle_types?: [VehicleType];
  fuel_types?: [FuelType];
}
