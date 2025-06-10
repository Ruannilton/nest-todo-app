export class JwtTokenDto {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
