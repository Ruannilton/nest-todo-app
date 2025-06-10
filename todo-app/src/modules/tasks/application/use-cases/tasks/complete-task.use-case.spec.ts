import { Test, TestingModule } from '@nestjs/testing';
import { CompleteTaskUseCase } from './complete-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';

describe('CompleteTaskUseCase', () => {
  let useCase: CompleteTaskUseCase;
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
        CompleteTaskUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<CompleteTaskUseCase>(CompleteTaskUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should complete a task successfully', async () => {
    const taskId = { Id: '123' };
    const mockTask = {
      Id: '123',
      markAsCompleted: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue({});

    await expect(useCase.execute(taskId)).resolves.toBeUndefined();
    expect(mockTask.markAsCompleted).toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should throw an error if task is not found', async () => {
    const taskId = { Id: '123' };

    mockTaskRepository.getTaskById.mockResolvedValue(null);

    await expect(useCase.execute(taskId)).rejects.toThrow('Task not found');
  });
});
