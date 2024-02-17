 export class Branch {
  branch_Id: string;
  branchName: string;
  addressDetail: string;
  ward: number;
  district: number;
  city: number;
  wardName?: string;
  districtName?: string;
  cityName?: string;
  phone: string;
  email: string;
  openingTime: string;
  state: boolean;

  constructor(
      branch_Id?: string,
      branchName?: string,
      addressDetail?: string,
      ward?: number,
      district?: number,
      city?: number,
      phone?: string,
      email?: string,
      openingTime?: string,
      state?: boolean,
      wardName?: string,
      districtName?: string,
      cityName?: string
  ) {
      this.branch_Id = branch_Id ?? "";
      this.branchName = branchName ?? "";
      this.addressDetail = addressDetail ?? "";
      this.ward = ward ?? 0;
      this.district = district ?? 0;
      this.city = city ?? 0;
      this.wardName = wardName ?? "";
      this.districtName = districtName ?? "";
      this.cityName = cityName ?? "";
      this.phone = phone ?? "";
      this.email = email ?? "";
      this.openingTime = openingTime ?? "";
      this.state = state ?? true;
  }


set Branch_Id(value: string) {
    this.branch_Id = value;
}
set BranchName(value: string) {
    this.branchName = value;
}

set AddressDetail(value: string) {
    this.addressDetail = value;
}

set Email(value: string) {
    this.email = value;
}

set Ward(value: number) {
    this.ward = value;
}

set District(value: number) {
    this.district = value;
}
set City(value: number) {
    this.city = value;
}

set OpeningTime(value: string) {
    this.openingTime = value;
}

set State(value: boolean) {
    this.state = value;
}

  set CityName(value: string) {
    this.cityName = value;
  }

  set DistrictName(value: string) {
    this.districtName = value;
  }
  set WardName(value: string) {
    this.wardName = value;
  }
}
