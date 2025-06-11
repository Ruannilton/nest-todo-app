import { Test, TestingModule } from '@nestjs/testing';
import { CompleteTaskUseCase } from './complete-task.use-case';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import { TaskId } from '../../../domain/value-objects/task-id';
import { Task } from '../../../domain/entities/task.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { TaskTitle } from '../../../domain/value-objects/task-title';
import { TaskDescription } from '../../../domain/value-objects/task-description';
import { ResourceNotFoundException } from '../../exceptions/resource-not-found-exception';

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
    const taskId = TaskId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');
    const userId = UserId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');
    const taskTitle = TaskTitle.create('Test Task');
    const taskDescription = TaskDescription.create('Test Description');
    const mockTask = new Task(
      taskId,
      userId,
      taskTitle,
      taskDescription,
      false,
      new Date(),
      null,
      null,
    );
    jest.spyOn(mockTask, 'markAsCompleted');

    mockTaskRepository.getTaskById.mockResolvedValue(mockTask);
    mockTaskRepository.updateTask.mockResolvedValue(mockTask);

    await expect(useCase.execute(taskId)).resolves.toBeUndefined();
    expect(mockTask.markAsCompleted).toHaveBeenCalled();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(mockTask);
  });

  it('should throw an error if task is not found', async () => {
    const taskId = TaskId.create('45dc7ba8-69d1-4b78-be08-a07629a838c8');

    mockTaskRepository.getTaskById.mockResolvedValue(null);

    await expect(useCase.execute(taskId)).rejects.toThrow(
      new ResourceNotFoundException('Task', taskId.Id),
    );
  });
});
