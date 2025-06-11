import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/users/update-user.use-case';
import { GetUseByIdUseCase } from '../../application/use-cases/users/get-user-by-id.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/users/delete-user.use-case';
import { UserId } from '../../domain/value-objects/user-id';
import { Name } from '../../domain/value-objects/name';
import { JwtAuthGuard } from 'src/modules/auth/service/jwt-guard.guard';
import { CurrentUserDto } from 'src/modules/auth/domain/dtos/current-user.dto';
import { CurrentUser } from 'src/modules/auth/service/current-user.decorator';
import * as UsersDoc from './users.documentation';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUseByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(UsersDoc.FIND_ONE_OPERATION)
  @ApiParam(UsersDoc.FIND_ONE_PARAM)
  @ApiResponse(UsersDoc.FIND_ONE_RESPONSE_200)
  @ApiResponse(UsersDoc.FIND_ONE_RESPONSE_400)
  @ApiResponse(UsersDoc.FIND_ONE_RESPONSE_404)
  async findOne(@Param('id') id: string) {
    const input = UserId.create(id);
    return await this.getUserByIdUseCase.execute(input);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(UsersDoc.UPDATE_OPERATION)
  @ApiBody(UsersDoc.UPDATE_BODY)
  @ApiResponse(UsersDoc.UPDATE_RESPONSE_204)
  @ApiResponse(UsersDoc.UPDATE_RESPONSE_400)
  @ApiResponse(UsersDoc.UPDATE_RESPONSE_404)
  async update(
    @CurrentUser() user: CurrentUserDto,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserRequest,
  ) {
    const input = new UpdateUserDto();
    input.id = UserId.create(user.userId);
    input.name = Name.create(
      updateUserDto.firstName!,
      updateUserDto.secondName!,
    );
    await this.updateUserUseCase.execute(input);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(UsersDoc.DELETE_OPERATION)
  @ApiResponse(UsersDoc.DELETE_RESPONSE_204)
  @ApiResponse(UsersDoc.DELETE_RESPONSE_404)
  async remove(@CurrentUser() user: CurrentUserDto) {
    const input = UserId.create(user.userId);
    await this.deleteUserUseCase.execute(input);
  }
}
