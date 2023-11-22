export class NotificationModel{
  private _isValid: boolean;
  private _message: string;
  private _condition: string;
  constructor(
    isValid?: boolean,
    message?:string,
    condition?:string
  ){
      this._isValid = isValid ?? false;
      this._message = message ?? "";
      this._condition = condition ?? AlertStatus.SUCCESS;
  }

  public get isValid(): boolean {
    return this._isValid;
}

    public set isSuccess(isValid: boolean) {
        this._isValid = isValid;
    }

    public get message(): string {
        return this._message;
    }

    public set message(message: string) {
        this._message = message;
    }
    public get condition(): string {
      return this._condition;
  }

  public set condition(condition: string) {
      this._condition = condition;
  }
      public SetError(message:string){
            this._isValid = true;
            this._condition = AlertStatus.ERROR;
            this._message = message;
      }
      public SetSuccess(message:string){
        this._isValid = true;
        this._condition = AlertStatus.SUCCESS;
        this._message = message;
      }
  }

  export enum AlertStatus {
    SUCCESS = 'alert-success',
    ERROR = 'alert-danger'
}
