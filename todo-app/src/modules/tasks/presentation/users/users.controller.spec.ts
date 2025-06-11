import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UpdateUserUseCase } from '../../application/use-cases/users/update-user.use-case';
import { GetUseByIdUseCase } from '../../application/use-cases/users/get-user-by-id.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/users/delete-user.use-case';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id';
import { Name } from '../../domain/value-objects/name';
import { UpdateUserRequest } from './dto/update-user.dto';
import { CurrentUserDto } from '../../../../modules/auth/domain/dtos/current-user.dto';
import { ResourceNotFoundException } from '../../application/exceptions/resource-not-found-exception';
import { InvalidIdException } from '../../domain/exceptions/invalid-id-exception';
import { InvalidNameException } from '../../domain/exceptions/invalid-name-exception';
import { first } from 'rxjs';

describe('UsersController', () => {
  let controller: UsersController;
  let updateUserUseCase: jest.Mocked<UpdateUserUseCase>;
  let getUserByIdUseCase: jest.Mocked<GetUseByIdUseCase>;
  let deleteUserUseCase: jest.Mocked<DeleteUserUseCase>;

  const mockUser = new User(
    UserId.create('123e4567-e89b-12d3-a456-426614174000'),
    Name.create('João', 'Silva'),
  );

  const mockCurrentUser = new CurrentUserDto(
    '123e4567-e89b-12d3-a456-426614174000',
    'joao@test.com',
  );

  beforeEach(async () => {
    const mockUpdateUserUseCase = {
      execute: jest.fn(),
    };

    const mockGetUserByIdUseCase = {
      execute: jest.fn(),
    };

    const mockDeleteUserUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UpdateUserUseCase,
          useValue: mockUpdateUserUseCase,
        },
        {
          provide: GetUseByIdUseCase,
          useValue: mockGetUserByIdUseCase,
        },
        {
          provide: DeleteUserUseCase,
          useValue: mockDeleteUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    updateUserUseCase = module.get(UpdateUserUseCase);
    getUserByIdUseCase = module.get(GetUseByIdUseCase);
    deleteUserUseCase = module.get(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when valid ID is provided', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      getUserByIdUseCase.execute.mockResolvedValue(mockUser);

      // Act
      const result = await controller.findOne(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          Id: userId,
        }),
      );
    });

    it('should throw InvalidIdException when invalid ID is provided', async () => {
      // Arrange
      const invalidId = 'invalid-id';

      // Act & Assert
      await expect(() => controller.findOne(invalidId)).rejects.toThrow('Invalid ID');
      expect(getUserByIdUseCase.execute).not.toHaveBeenCalled();
    });

    it('should throw ResourceNotFoundException when user is not found', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      getUserByIdUseCase.execute.mockRejectedValue(
        new ResourceNotFoundException('User', userId),
      );

      // Act & Assert
      await expect(controller.findOne(userId)).rejects.toThrow(
        ResourceNotFoundException,
      );
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          Id: userId,
        }),
      );
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const updateRequest: UpdateUserRequest = {
        firstName: 'João',
        secondName: 'Santos',
      };
      updateUserUseCase.execute.mockResolvedValue(mockUser);

      // Act
      await controller.update(mockCurrentUser, updateRequest);

      // Assert
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.objectContaining({
            Id: mockCurrentUser.userId,
          }) as UserId,
          firstName: 'João',
          lastName: 'Santos',
        }),
      );
    });

    it('should throw InvalidNameException when invalid name is provided', async () => {
      // Arrange
      const updateRequest: UpdateUserRequest = {
        firstName: 'A',
        secondName: 'Santos',
      };

      // Act & Assert
      await expect(
        controller.update(mockCurrentUser, updateRequest),
      ).rejects.toThrow(InvalidNameException);
      expect(updateUserUseCase.execute).not.toHaveBeenCalled();
    });

    it('should throw InvalidIdException when invalid user ID is provided', async () => {
      // Arrange
      const invalidCurrentUser = new CurrentUserDto(
        'invalid-id',
        'test@test.com',
      );
      const updateRequest: UpdateUserRequest = {
        firstName: 'João',
        secondName: 'Santos',
      };

      // Act & Assert
      await expect(
        controller.update(invalidCurrentUser, updateRequest),
      ).rejects.toThrow(InvalidIdException);
      expect(updateUserUseCase.execute).not.toHaveBeenCalled();
    });

    it('should throw ResourceNotFoundException when user to update is not found', async () => {
      // Arrange
      const updateRequest: UpdateUserRequest = {
        firstName: 'João',
        secondName: 'Santos',
      };
      updateUserUseCase.execute.mockRejectedValue(
        new ResourceNotFoundException('User', mockCurrentUser.userId),
      );

      // Act & Assert
      await expect(
        controller.update(mockCurrentUser, updateRequest),
      ).rejects.toThrow(ResourceNotFoundException);
      expect(updateUserUseCase.execute).toHaveBeenCalled();
    });

    it('should handle partial updates with only firstName', async () => {
      // Arrange
      const updateRequest: UpdateUserRequest = {
        firstName: 'João',
        secondName: 'Silva',
      };
      updateUserUseCase.execute.mockResolvedValue(mockUser);

      // Act
      await controller.update(mockCurrentUser, updateRequest);

      // Assert
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.objectContaining({
            Id: mockCurrentUser.userId,
          }) as UserId,
          firstName: 'João',
          lastName: 'Silva',
        }),
      );
    });
  });

  describe('remove', () => {
    it('should delete user successfully', async () => {
      // Arrange
      deleteUserUseCase.execute.mockResolvedValue();

      // Act
      await controller.remove(mockCurrentUser);

      // Assert
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          Id: mockCurrentUser.userId,
        }),
      );
    });

    it('should throw InvalidIdException when invalid user ID is provided', async () => {
      // Arrange
      const invalidCurrentUser = new CurrentUserDto(
        'invalid-id',
        'test@test.com',
      );

      // Act & Assert
      await expect(controller.remove(invalidCurrentUser)).rejects.toThrow(
        InvalidIdException,
      );
      expect(deleteUserUseCase.execute).not.toHaveBeenCalled();
    });

    it('should throw ResourceNotFoundException when user to delete is not found', async () => {
      // Arrange
      deleteUserUseCase.execute.mockRejectedValue(
        new ResourceNotFoundException('User', mockCurrentUser.userId),
      );

      // Act & Assert
      await expect(controller.remove(mockCurrentUser)).rejects.toThrow(
        ResourceNotFoundException,
      );
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          Id: mockCurrentUser.userId,
        }),
      );
    });
  });
});
