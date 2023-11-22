export class User {
  private _userId: string;
  private _userImage: string | Uint8Array;
  private _name: string;
  private _email: string;
  private _gender: boolean;
  private _birthDate: Date;
  private _phone: string;
  private _rewardPoints: number;

  constructor(
      userId?: string,
      userImage?: string | Uint8Array,
      name?: string,
      email?: string,
      gender?: boolean,
      birthDate?: Date,
      phone?: string,
      rewardPoints?: number
  ) {
      this._userId = userId ?? "";
      this._userImage = userImage ?? "";
      this._name = name ?? "";
      this._email = email ?? "";
      this._gender = gender ?? true;
      this._birthDate = birthDate ?? new Date();
      this._phone = phone ?? "";
      this._rewardPoints = rewardPoints ?? 0;
  }

  get userId(): string {
      return this._userId;
  }

  set userId(userId: string) {
      this._userId = userId;
  }

  get userImage(): string | Uint8Array {
      return this._userImage;
  }

  set userImage(userImage: string | Uint8Array) {
      this._userImage = userImage;
  }

  get name(): string {
      return this._name;
  }

  set name(name: string) {
      this._name = name;
  }

  get email(): string {
      return this._email;
  }

  set email(email: string) {
      this._email = email;
  }

  get gender(): boolean {
      return this._gender;
  }

  set gender(gender: boolean) {
      this._gender = gender;
  }

  get birthDate(): Date {
      return this._birthDate;
  }

  set birthDate(birthDate: Date) {
      this._birthDate = birthDate;
  }

  get phone(): string {
      return this._phone;
  }

  set phone(phone: string) {
      this._phone = phone;
  }

  get rewardPoints(): number {
      return this._rewardPoints;
  }

  set rewardPoints(rewardPoints: number) {
      this._rewardPoints = rewardPoints;
  }
}
