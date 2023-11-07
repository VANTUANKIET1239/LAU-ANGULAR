export class SignIn {
  private email: string;
  private password: string;

  constructor(email?: string, password?: string) {
      this.email = email ?? '';
      this.password = password ?? ''
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
}
