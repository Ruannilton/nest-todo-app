import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from './create-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';

import { Task } from '../../../domain/entities/task.entity';
import { TaskDescription } from '../../../domain/value-objects/task-description';
import { TaskTitle } from '../../../domain/value-objects/task-title';
import { TaskId } from '../../../domain/value-objects/task-id';
import { UserId } from '../../../domain/value-objects/user-id';
import { CreateTaskDto } from '../../../domain/dto/create-task.dto';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  const mockTaskRepository = {
    listTasks: jest.fn(),
    createTask: jest.fn(),
    getTaskById: jest.fn(),
    getTasksByUserId: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a task successfully', async () => {
    const createTaskDto: CreateTaskDto = {
      userId: UserId.create('user-123'),
      title: TaskTitle.create('Test Task'),
      description: TaskDescription.create('Test Description'),
    };

    const mockCreatedTask = new Task(
      TaskId.create('task-123'),
      createTaskDto.userId,
      createTaskDto.title,
      createTaskDto.description,
    );

    mockTaskRepository.createTask.mockResolvedValue(mockCreatedTask);

    const result = await useCase.execute(createTaskDto);

    expect(mockTaskRepository.createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: createTaskDto.userId,
        title: createTaskDto.title,
        description: createTaskDto.description,
      }),
    );
    expect(result).toBe(mockCreatedTask);
  });

  it('should throw an error if task creation fails', async () => {
    const createTaskDto: CreateTaskDto = {
      userId: UserId.create('user-123'),
      title: TaskTitle.create('Test Task'),
      description: TaskDescription.create('Test Description'),
    };

    mockTaskRepository.createTask.mockResolvedValue(null);

    await expect(useCase.execute(createTaskDto)).rejects.toThrow(
      'Task creation failed',
    );
    expect(mockTaskRepository.createTask).toHaveBeenCalled();
  });
});
