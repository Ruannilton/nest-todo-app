import { Test, TestingModule } from '@nestjs/testing';
import { ListTasksUseCase } from './list-tasks.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import {
  ListTasksDto,
  ListTasksResult,
} from '../../../domain/dto/list-tasks.dto';
import { UserId } from '../../../domain/value-objects/user-id';
import { Task } from '../../../domain/entities/task.entity';
import { TaskDescription } from '../../../domain/value-objects/task-description';
import { TaskTitle } from '../../../domain/value-objects/task-title';
import { TaskId } from '../../../domain/value-objects/task-id';

describe('ListTasksUseCase', () => {
  let useCase: ListTasksUseCase;
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
        ListTasksUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListTasksUseCase>(ListTasksUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should list tasks successfully', async () => {
    const listTasksDto: ListTasksDto = {
      userId: UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      page: 1,
      limit: 10,
    };

    const mockTask = new Task(
      TaskId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      TaskTitle.create('Test Task'),
      TaskDescription.create('Test Description'),
    );

    const mockResult: ListTasksResult = {
      tasks: [mockTask],
      total: 1,
    };

    mockTaskRepository.listTasks.mockResolvedValue(mockResult);

    const result = await useCase.execute(listTasksDto);

    expect(mockTaskRepository.listTasks).toHaveBeenCalledWith(listTasksDto);
    expect(result).toBe(mockResult);
    expect(result.tasks).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('should list tasks with filters', async () => {
    const listTasksDto: ListTasksDto = {
      userId: UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      title: 'Test',
      completed: false,
      createdFrom: new Date('2024-01-01'),
      createdTo: new Date('2024-12-31'),
      page: 1,
      limit: 5,
    };

    const mockResult: ListTasksResult = {
      tasks: [],
      total: 0,
    };

    mockTaskRepository.listTasks.mockResolvedValue(mockResult);

    const result = await useCase.execute(listTasksDto);

    expect(mockTaskRepository.listTasks).toHaveBeenCalledWith(listTasksDto);
    expect(result).toBe(mockResult);
    expect(result.tasks).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should return empty result when no tasks found', async () => {
    const listTasksDto: ListTasksDto = {
      userId: UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8'),
      page: 1,
      limit: 10,
    };

    const mockResult: ListTasksResult = {
      tasks: [],
      total: 0,
    };

    mockTaskRepository.listTasks.mockResolvedValue(mockResult);

    const result = await useCase.execute(listTasksDto);

    expect(result.tasks).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});
