import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { Name } from '../../../domain/value-objects/name';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  const mockUserRepository = {
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const createUserDto = new CreateUserDto('John', 'Doe');
    const mockCreatedUser = new User(
      UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      Name.create('John', 'Doe'),
    );

    mockUserRepository.createUser.mockResolvedValue(mockCreatedUser);

    const result = await useCase.execute(createUserDto);

    expect(mockUserRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: createUserDto.name,
      }),
    );
    expect(result).toBe(mockCreatedUser);
  });

  it('should create a user with valid name', async () => {
    const createUserDto = new CreateUserDto('Jane', 'Smith');
    const mockCreatedUser = new User(
      UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      Name.create('Jane', 'Smith'),
    );

    mockUserRepository.createUser.mockResolvedValue(mockCreatedUser);

    const result = await useCase.execute(createUserDto);

    expect(result.name.First).toBe('Jane');
    expect(result.name.Last).toBe('Smith');
  });

  it('should handle repository response correctly', async () => {
    const createUserDto = new CreateUserDto('Test', 'User');
    const mockCreatedUser = new User(
      UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      Name.create('Test', 'User'),
    );

    mockUserRepository.createUser.mockResolvedValue(mockCreatedUser);

    const result = await useCase.execute(createUserDto);

    expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCreatedUser);
  });
});
