export class City {
  private _ID: number;
  private _tenTinhThanhPho: string;
  private _quocGiaId: number;

  get id(): number {
      return this._ID;
  }

  set id(value: number) {
      this._ID = value;
  }

  get tenTinhThanhPho(): string {
      return this._tenTinhThanhPho;
  }

  set tenTinhThanhPho(value: string) {
      this._tenTinhThanhPho = value;
  }

  get quocGiaId(): number {
      return this._quocGiaId;
  }

  set quocGiaId(value: number) {
      this._quocGiaId = value;
  }

  constructor(id: number, tenTinhThanhPho: string, quocGiaId: number) {
      this._ID = id;
      this._tenTinhThanhPho = tenTinhThanhPho;
      this._quocGiaId = quocGiaId;
  }
}
