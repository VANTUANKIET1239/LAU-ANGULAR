export class Ward {
  private _ID: number;
  private _tenXaPhuong: string;
  private _quanHuyenId: number;

  get id(): number {
      return this._ID;
  }

  set id(value: number) {
      this._ID = value;
  }

  get tenXaPhuong(): string {
      return this._tenXaPhuong;
  }

  set tenXaPhuong(value: string) {
      this._tenXaPhuong = value;
  }

  get quanHuyenId(): number {
      return this._quanHuyenId;
  }

  set quanHuyenId(value: number) {
      this._quanHuyenId = value;
  }

  constructor(id: number, tenXaPhuong: string, quanHuyenId: number) {
      this._ID = id;
      this._tenXaPhuong = tenXaPhuong;
      this._quanHuyenId = quanHuyenId;
  }
}
