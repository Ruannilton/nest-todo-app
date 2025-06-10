import { Test, TestingModule } from '@nestjs/testing';
import { GetUseByIdUseCase } from './get-user-by-id.use-case';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { Name } from '../../../domain/value-objects/name';

describe('GetUseByIdUseCase', () => {
  let useCase: GetUseByIdUseCase;
  const mockUserRepository = {
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUseByIdUseCase,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetUseByIdUseCase>(GetUseByIdUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get a user by id successfully', async () => {
    const userId = UserId.create('123');
    const mockUser = new User(userId, Name.create('John', 'Doe'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);

    const result = await useCase.execute(userId);

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(result).toBe(mockUser);
    expect(result.name.First).toBe('John');
    expect(result.name.Last).toBe('Doe');
  });

  it('should throw an error if user is not found', async () => {
    const userId = UserId.create('123');

    mockUserRepository.getUserById.mockResolvedValue(null);

    await expect(useCase.execute(userId)).rejects.toThrow(
      'User with id 123 not found',
    );
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
  });

  it('should throw an error with correct message format', async () => {
    const userId = UserId.create('456');

    mockUserRepository.getUserById.mockResolvedValue(null);

    await expect(useCase.execute(userId)).rejects.toThrow(
      'User with id 456 not found',
    );
  });

  it('should return user with correct structure', async () => {
    const userId = UserId.create('789');
    const mockUser = new User(userId, Name.create('Jane', 'Smith'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);

    const result = await useCase.execute(userId);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result.id.Id).toBe('789');
    expect(result.name.First).toBe('Jane');
    expect(result.name.Last).toBe('Smith');
  });

  it('should call repository only once', async () => {
    const userId = UserId.create('999');
    const mockUser = new User(userId, Name.create('Test', 'User'));

    mockUserRepository.getUserById.mockResolvedValue(mockUser);

    await useCase.execute(userId);

    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
  });
});
