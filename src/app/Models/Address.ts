export class Address {
    address_Id: string;
    name: string;
    phone: string;
   email: string;
    addressDetail: string;
    ward: number;
   district: number;
   city: number;
   wardName: string;
   districtName: string;
   cityName: string;
   isDefault: boolean;
   state: boolean;

  get Address_Id(): string {
      return this.address_Id;
  }

  set Address_Id(value: string) {
      this.address_Id = value;
  }

  get Name(): string {
      return this.name;
  }

  set Name(value: string) {
      this.name = value;
  }

  get Phone(): string {
      return this.phone;
  }

  set Phone(value: string) {
      this.phone = value;
  }

  get Email(): string {
      return this.email;
  }

  set Email(value: string) {
      this.email = value;
  }

  get AddressDetail(): string {
      return this.addressDetail;
  }

  set AddressDetail(value: string) {
      this.addressDetail = value;
  }

  get Ward(): number {
      return this.ward;
  }

  set Ward(value: number) {
      this.ward = value;
  }

  get District(): number {
      return this.district;
  }

  set District(value: number) {
      this.district = value;
  }

  get City(): number {
      return this.city;
  }

  set City(value: number) {
      this.city = value;
  }

  get IsDefault(): boolean {
      return this.isDefault;
  }

  set IsDefault(value: boolean) {
      this.isDefault = value;
  }

  get State(): boolean {
      return this.state;
  }

  set State(value: boolean) {
      this.state = value;
  }

  get CityName(): number {
    return this.city;
}

set CityName(value: string) {
    this.cityName = value;
}

get DistrictName(): string {
    return this.cityName;
}

set DistrictName(value: string) {
    this.districtName = value;
}

get WardName(): string {
    return this.wardName;
}

set WardName(value: string) {
    this.wardName = value;
}

  constructor(
      address_Id?: string,
      name?: string,
      phone?: string,
      email?: string,
      addressDetail?: string,
      ward?: number,
      district?: number,
      city?: number,
      isDefault?: boolean,
      state?: boolean,
      wardName?: string,
      districtName?: string,
      cityName?: string
  ) {
      this.address_Id = address_Id ?? "";
      this.name = name ?? "";
      this.phone = phone ?? "";
      this.email = email ?? "";
      this.addressDetail = addressDetail ?? "";
      this.ward = ward ?? 0;
      this.district = district ?? 0;
      this.city = city ?? 0;
      this.isDefault = isDefault ?? false;
      this.state = state ?? true;
      this.wardName = wardName ?? "";
      this.districtName = districtName ?? "";
      this.cityName = cityName ?? "";
  }
}
