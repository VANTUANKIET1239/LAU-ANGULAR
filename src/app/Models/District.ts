export class District {
  private _ID: number;
  private _tenQuanHuyen: string;
  private _tinhThanhPhoId: number;

  get id(): number {
      return this._ID;
  }

  set id(value: number) {
      this._ID = value;
  }

  get tenQuanHuyen(): string {
      return this._tenQuanHuyen;
  }

  set tenQuanHuyen(value: string) {
      this._tenQuanHuyen = value;
  }

  get tinhThanhPhoId(): number {
      return this._tinhThanhPhoId;
  }

  set tinhThanhPhoId(value: number) {
      this._tinhThanhPhoId = value;
  }

  constructor(id: number, tenQuanHuyen: string, tinhThanhPhoId: number) {
      this._ID = id;
      this._tenQuanHuyen = tenQuanHuyen;
      this._tinhThanhPhoId = tinhThanhPhoId;
  }
}
