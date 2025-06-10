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
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserUseCase } from '../../application/use-cases/users/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/users/update-user.use-case';
import { GetUseByIdUseCase } from '../../application/use-cases/users/get-user-by-id.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/users/delete-user.use-case';
import { UserId } from '../../domain/value-objects/user-id';
import { Name } from '../../domain/value-objects/name';
import {
  ValidationErrorResponseDto,
  NotFoundErrorResponseDto,
} from '../common/dto/error-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/service/jwt-guard.guard';
import { CurrentUserDto } from 'src/modules/auth/domain/dtos/current-user.dto';
import { CurrentUser } from 'src/modules/auth/service/current-user.decorator';
import {
  UserResponseExamplesDto,
  UpdateUserExamplesDto,
  UpdateUserResponseExamplesDto,
} from './dto/user-examples.dto';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUseByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description: 'Retorna os dados de um usuário específico baseado no seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: UserResponseDto,
    examples: {
      usuario_encontrado: UserResponseExamplesDto.USUARIO_ENCONTRADO,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido',
    type: ValidationErrorResponseDto,
    examples: {
      id_invalido: UserResponseExamplesDto.ERRO_ID_INVALIDO,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundErrorResponseDto,
    examples: {
      usuario_nao_encontrado: UserResponseExamplesDto.ERRO_NAO_ENCONTRADO,
    },
  })
  async findOne(@Param('id') id: string) {
    const input = UserId.create(id);
    return await this.getUserByIdUseCase.execute(input);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza parcialmente os dados do usuário autenticado.',
  })
  @ApiBody({
    type: UpdateUserRequest,
    examples: {
      atualizar_nome: UpdateUserExamplesDto.ATUALIZAR_NOME,
      atualizar_email: UpdateUserExamplesDto.ATUALIZAR_EMAIL,
      atualizar_completo: UpdateUserExamplesDto.ATUALIZAR_COMPLETO,
    },
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou email já em uso',
    type: ValidationErrorResponseDto,
    examples: {
      email_duplicado: UpdateUserResponseExamplesDto.ERRO_EMAIL_DUPLICADO,
      dados_invalidos: UpdateUserResponseExamplesDto.ERRO_VALIDACAO,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundErrorResponseDto,
  })
  async update(
    @CurrentUser() user: CurrentUserDto,
    @Body() updateUserDto: UpdateUserRequest,
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
  @ApiOperation({
    summary: 'Excluir usuário',
    description: 'Remove permanentemente o usuário autenticado do sistema.',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário excluído com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundErrorResponseDto,
  })
  async remove(@CurrentUser() user: CurrentUserDto) {
    const input = UserId.create(user.userId);
    await this.deleteUserUseCase.execute(input);
  }
}
