import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskUseCase } from './update-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import { UpdateTaskDto } from '../../../domain/dto/update-task.dto';
import { TaskDescription } from '../../../domain/value-objects/task-description';
import { TaskTitle } from '../../../domain/value-objects/task-title';
import { TaskId } from '../../../domain/value-objects/task-id';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
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
        UpdateTaskUseCase,
        {
          provide: ITaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update task title successfully', async () => {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create('123'),
      title: TaskTitle.create('Updated Title'),
    };

    const mockTask = {
      Id: '123',
      title: { Title: 'Old Title' },
      description: { Description: 'Old Description' },
      updateTitle: jest.fn(),
      updateDescription: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockTask);

    await expect(useCase.execute(updateTaskDto)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(
      updateTaskDto.id.Id,
    );
    expect(mockTask.updateTitle).toHaveBeenCalledWith(updateTaskDto.title);
    expect(mockTask.updateDescription).not.toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should update task description successfully', async () => {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create('123'),
      description: TaskDescription.create('Updated Description'),
    };

    const mockTask = {
      Id: '123',
      title: { Title: 'Old Title' },
      description: { Description: 'Old Description' },
      updateTitle: jest.fn(),
      updateDescription: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockTask);

    await expect(useCase.execute(updateTaskDto)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(
      updateTaskDto.id.Id,
    );
    expect(mockTask.updateTitle).not.toHaveBeenCalled();
    expect(mockTask.updateDescription).toHaveBeenCalledWith(
      updateTaskDto.description,
    );
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should update both title and description successfully', async () => {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create('123'),
      title: TaskTitle.create('Updated Title'),
      description: TaskDescription.create('Updated Description'),
    };

    const mockTask = {
      Id: '123',
      title: { Title: 'Old Title' },
      description: { Description: 'Old Description' },
      updateTitle: jest.fn(),
      updateDescription: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockTask);

    await expect(useCase.execute(updateTaskDto)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(
      updateTaskDto.id.Id,
    );
    expect(mockTask.updateTitle).toHaveBeenCalledWith(updateTaskDto.title);
    expect(mockTask.updateDescription).toHaveBeenCalledWith(
      updateTaskDto.description,
    );
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should throw an error if task is not found', async () => {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create('123'),
      title: TaskTitle.create('Updated Title'),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(null);

    await expect(useCase.execute(updateTaskDto)).rejects.toThrow(
      'Task not found',
    );
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(
      updateTaskDto.id.Id,
    );
    expect(mockTaskRepository.updateTask).not.toHaveBeenCalled();
  });

  it('should update task with no fields when neither title nor description provided', async () => {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create('123'),
    };

    const mockTask = {
      Id: '123',
      title: { Title: 'Old Title' },
      description: { Description: 'Old Description' },
      updateTitle: jest.fn(),
      updateDescription: jest.fn(),
    };

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockTask);

    await expect(useCase.execute(updateTaskDto)).resolves.toBeUndefined();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(
      updateTaskDto.id.Id,
    );
    expect(mockTask.updateTitle).not.toHaveBeenCalled();
    expect(mockTask.updateDescription).not.toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });
});
