import { VehicleType } from "./VehicleType";
import { FuelType } from "./FuelType";

export interface Vehicle {
    ref?: string;
    vehicle_type?: VehicleType;
    model?: string;
    colour?: string;
    registration: string;
    fuel_type?: FuelType;
    co2_emissions?: string;
    type?: VehicleType;
}
