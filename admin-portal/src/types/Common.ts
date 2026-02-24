export interface KeyValue<T> {
  key: string;
  value: T;
}
export interface LabelValue<T> {
  label: string;
  value: T;
}
export interface IdName<T> {
  id: T;
  name: string;
}

export interface Data<T> {
  data: T;
}
// locations
export interface Division {
  id: number;
  name: string;
  districts: District[];
}
export interface District {
  id: number;
  name: string;
  thana: Thana[];
}
export interface Thana {
  id: number;
  name: string;
}

// vehicle
export interface Vehicle extends IdName<string> {
  brands: VehicleBrands[];
}
export interface VehicleBrands extends IdName<string> {
  models: VehicleModels[];
}
export interface VehicleModels extends IdName<string> {
  cc: VehicleCC | null;
}
export interface VehicleCC {
  id: string;
  cc: string;
  type_id: string;
}
export interface Direction {
  label: string;
  link?: string;
}
// export interface PageProp {
//   searchParams?: {
//     page: number;
//   };
// }

export interface PageProp {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
