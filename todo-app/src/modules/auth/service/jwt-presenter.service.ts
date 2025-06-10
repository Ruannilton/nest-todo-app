import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto } from '../domain/dtos/jwt-token.dto';

@Injectable()
export class JwtPresenterService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(email: string, userId: string): JwtTokenDto {
    const payload = { userName: email, sub: userId };
    const accessToken = this.jwtService.sign(payload);
    const response = new JwtTokenDto(accessToken);
    return response;
  }
}
