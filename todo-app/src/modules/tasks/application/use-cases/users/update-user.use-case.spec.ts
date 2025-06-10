import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user.use-case';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { Name } from '../../../domain/value-objects/name';
import { UpdateUserDto } from '../../../domain/dto/update-user.dto';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  const mockUserRepository = {
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a user successfully', async () => {
    const userId = UserId.create('123');
    const existingUser = new User(userId, Name.create('John', 'Doe'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('Jane', 'Smith'),
    };

    const updatedUser = new User(userId, Name.create('Jane', 'Smith'));

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await useCase.execute(updateUserDto);

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: userId,
        name: updateUserDto.name,
      }),
    );
    expect(result).toBe(updatedUser);
    expect(result.name.First).toBe('Jane');
    expect(result.name.Last).toBe('Smith');
  });

  it('should update user name when provided', async () => {
    const userId = UserId.create('456');
    const existingUser = new User(userId, Name.create('Old', 'Name'));
    const newName = Name.create('New', 'Name');
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: newName,
    };

    const updatedUser = new User(userId, newName);

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await useCase.execute(updateUserDto);

    expect(existingUser.name).toBe(newName);
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(existingUser);
    expect(result.name.First).toBe('New');
    expect(result.name.Last).toBe('Name');
  });

  it('should keep existing name when no name is provided', async () => {
    const userId = UserId.create('789');
    const existingUser = new User(userId, Name.create('Keep', 'Same'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
    };

    const updatedUser = new User(userId, Name.create('Keep', 'Same'));

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await useCase.execute(updateUserDto);

    expect(existingUser.name.First).toBe('Keep');
    expect(existingUser.name.Last).toBe('Same');
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(existingUser);
    expect(result.name.First).toBe('Keep');
    expect(result.name.Last).toBe('Same');
  });

  it('should throw an error if user is not found', async () => {
    const userId = UserId.create('123');
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('Jane', 'Smith'),
    };

    mockUserRepository.getUserById.mockResolvedValue(null);

    await expect(useCase.execute(updateUserDto)).rejects.toThrow(
      'User not found',
    );
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
  });

  it('should handle repository errors gracefully', async () => {
    const userId = UserId.create('error-test');
    const existingUser = new User(userId, Name.create('Test', 'User'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('Updated', 'User'),
    };

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockRejectedValue(
      new Error('Database connection error'),
    );

    await expect(useCase.execute(updateUserDto)).rejects.toThrow(
      'Database connection error',
    );
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.updateUser).toHaveBeenCalled();
  });

  it('should call repository methods correctly', async () => {
    const userId = UserId.create('order-test');
    const existingUser = new User(userId, Name.create('First', 'Last'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('Updated', 'Name'),
    };

    const updatedUser = new User(userId, Name.create('Updated', 'Name'));

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    await useCase.execute(updateUserDto);

    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId.Id);
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(existingUser);
  });

  it('should preserve user id during update', async () => {
    const userId = UserId.create('preserve-id-test');
    const existingUser = new User(userId, Name.create('Original', 'User'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('Updated', 'User'),
    };

    const updatedUser = new User(userId, Name.create('Updated', 'User'));

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await useCase.execute(updateUserDto);

    expect(result.id.Id).toBe(userId.Id);
    expect(result.id).toBe(userId);
  });

  it('should return the updated user from repository', async () => {
    const userId = UserId.create('return-test');
    const existingUser = new User(userId, Name.create('Before', 'Update'));
    const updateUserDto: UpdateUserDto = {
      id: userId,
      name: Name.create('After', 'Update'),
    };

    const repositoryReturnedUser = new User(
      userId,
      Name.create('After', 'Update'),
    );

    mockUserRepository.getUserById.mockResolvedValue(existingUser);
    mockUserRepository.updateUser.mockResolvedValue(repositoryReturnedUser);

    const result = await useCase.execute(updateUserDto);

    expect(result).toBe(repositoryReturnedUser);
    expect(result).not.toBe(existingUser);
  });
});
