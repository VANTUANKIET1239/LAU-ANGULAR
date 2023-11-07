export class SignUp {
  private email: string;
  private name: string;
  private password: string;
  private birthdate: Date;
  private gender: boolean;
  private phone:string;
  private confirmPassword: string;

  constructor(
      email?: string,
      name?: string,
      password?: string,
      birthdate?: Date,
      gender?: boolean,
      confirmPassword?: string,
      phone?: string
  ) {
      this.email = email ?? '';
      this.name = name ?? '';
      this.password = password ?? '';
      this.birthdate = birthdate ?? new Date();
      this.gender = gender ?? true;
      this.confirmPassword = confirmPassword ?? '';
      this.phone = phone ?? '';
  }

  public get Email(): string {
    return this.email;
}

    public set Email(email: string) {
        this.email = email;
    }

    public get Password(): string {
        return this.password;
    }

    public set Password(password: string) {
        this.password = password;
    }
    public get Name(): string {
      return this.name;
    }
    public set Name(name: string) {
      this.name = name;
    }

  public set Birthdate(birthdate: Date) {
      this.birthdate = birthdate;
  }

  public get Birthdate(): Date {
      return this.birthdate;
  }
  public get Gender(): boolean {
    return this.gender;
  }
  public set Gender(gender: boolean) {
    this.gender = gender;
  }
    public get ConfirmPassword(): string {
      return this.confirmPassword;
  }

  public set ConfirmPassword(confirmPassword: string) {
      this.confirmPassword = confirmPassword;
  }
  public get Phone(): string {
    return this.phone;
  }

  public set Phone(phone: string) {
    this.phone = phone;
  }
}
