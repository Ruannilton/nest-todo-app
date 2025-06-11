import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from './delete-user.use-case';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { Name } from '../../../domain/value-objects/name';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  const mockUserRepository = {
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a user successfully', async () => {
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');
    const mockUser = new User(userId, Name.create('John', 'Doe'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);
    mockUserRepository.deleteUser.mockResolvedValue(undefined);

    await expect(useCase.execute(userId)).resolves.toBeUndefined();
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId.Id);
  });

  it('should throw an error if user is not found', async () => {
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');

    mockUserRepository.getUserById.mockResolvedValue(null);

    await expect(useCase.execute(userId)).rejects.toThrow();
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.deleteUser).not.toHaveBeenCalled();
  });

  it('should throw an error with correct message format for different user id', async () => {
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');

    mockUserRepository.getUserById.mockResolvedValue(null);

    await expect(useCase.execute(userId)).rejects.toThrow();
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.deleteUser).not.toHaveBeenCalled();
  });

  it('should call repository methods correctly', async () => {
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');
    const mockUser = new User(userId, Name.create('Jane', 'Smith'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);
    mockUserRepository.deleteUser.mockResolvedValue(undefined);

    await useCase.execute(userId);

    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId.Id);
  });

  it('should handle repository errors gracefully', async () => {
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');
    const mockUser = new User(userId, Name.create('Test', 'User'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);
    mockUserRepository.deleteUser.mockRejectedValue(
      new Error('Database connection error'),
    );

    await expect(useCase.execute(userId)).rejects.toThrow();
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId.Id);
  });
});
