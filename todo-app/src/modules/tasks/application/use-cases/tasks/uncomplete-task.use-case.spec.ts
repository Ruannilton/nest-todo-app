import { Test, TestingModule } from '@nestjs/testing';
import { UncompleteTaskUseCase } from './uncomplete-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import { TaskId } from '../../../domain/value-objects/task-id';

describe('UncompleteTaskUseCase', () => {
  let useCase: UncompleteTaskUseCase;
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
        UncompleteTaskUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<UncompleteTaskUseCase>(UncompleteTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should uncomplete a task successfully', async () => {
    const taskId = TaskId.create('123');
    const mockTask = {
      Id: '123',
      completed: true,
      markAsIncomplete: jest.fn(),
    };

    const mockUpdatedTask = {
      ...mockTask,
      completed: false,
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockUpdatedTask);

    await expect(useCase.execute(taskId)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId.Id);
    expect(mockTask.markAsIncomplete).toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should throw an error if task is not found', async () => {
    const taskId = TaskId.create('123');

    mockTaskRepository.getTaskById.mockResolvedValue(null);

    await expect(useCase.execute(taskId)).rejects.toThrow('Task not found');
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId.Id);
    expect(mockTaskRepository.updateTask).not.toHaveBeenCalled();
  });

  it('should throw an error if task update fails', async () => {
    const taskId = TaskId.create('123');
    const mockTask = {
      Id: '123',
      completed: true,
      markAsIncomplete: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(null);

    await expect(useCase.execute(taskId)).rejects.toThrow(
      'Task completion failed',
    );
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId.Id);
    expect(mockTask.markAsIncomplete).toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });
});
