export class ErrorModel{
    private _isInvalid: boolean;
    private _message: string;

    constructor(
      isInvalid?: boolean,
      message?:string
    ){
        this._isInvalid = isInvalid ?? false;
        this._message = message ?? "";
    }

    public get isInvalid(): boolean {
      return this._isInvalid;
  }

      public set isInvalid(isInvalid: boolean) {
          this._isInvalid = isInvalid;
      }

      public get message(): string {
          return this._message;
      }

      public set message(message: string) {
          this._message = message;
      }
}
