import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTaskUseCase } from './delete-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import { TaskId } from '../../../domain/value-objects/task-id';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
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
        DeleteTaskUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a task successfully', async () => {
    const taskId = TaskId.create('123');
    const mockTask = {
      Id: '123',
      title: 'Test Task',
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.deleteTask.mockResolvedValue(undefined);

    await expect(useCase.execute(taskId)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId.Id);
    expect(mockTaskRepository.deleteTask).toHaveBeenCalledWith(taskId.Id);
  });

  it('should throw an error if task is not found', async () => {
    const taskId = TaskId.create('123');

    mockTaskRepository.getTaskById.mockResolvedValue(null);

    await expect(useCase.execute(taskId)).rejects.toThrow('Task not found');
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId.Id);
    expect(mockTaskRepository.deleteTask).not.toHaveBeenCalled();
  });
});
