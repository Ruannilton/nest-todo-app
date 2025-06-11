import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { CompleteTaskUseCase } from '../../application/use-cases/tasks/complete-task.use-case';
import { UncompleteTaskUseCase } from '../../application/use-cases/tasks/uncomplete-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/tasks/list-tasks.use-case';
import { Task } from '../../domain/entities/task.entity';
import { TaskId } from '../../domain/value-objects/task-id';
import { TaskTitle } from '../../domain/value-objects/task-title';
import { TaskDescription } from '../../domain/value-objects/task-description';
import { UserId } from '../../domain/value-objects/user-id';
import { CurrentUserDto } from '../../../auth/domain/dtos/current-user.dto';
import { CreateTaskRequest } from './dto/create-task.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { ListTasksRequest } from './dto/list-tasks.dto';
import { ListTasksResponseDto } from './dto/task-response.dto';
import { ResourceNotFoundException } from '../../application/exceptions/resource-not-found-exception';
import { InvalidIdException } from '../../domain/exceptions/invalid-id-exception';
import { InvalidTitleException } from '../../domain/exceptions/invalid-title-exception';

describe('TasksController', () => {
  let controller: TasksController;
  let createTaskUseCase: jest.Mocked<CreateTaskUseCase>;
  let updateTaskUseCase: jest.Mocked<UpdateTaskUseCase>;
  let completeTaskUseCase: jest.Mocked<CompleteTaskUseCase>;
  let uncompleteTaskUseCase: jest.Mocked<UncompleteTaskUseCase>;
  let deleteTaskUseCase: jest.Mocked<DeleteTaskUseCase>;
  let listTasksUseCase: jest.Mocked<ListTasksUseCase>;

  const mockCurrentUser: CurrentUserDto = {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
  };

  const mockTaskId = '123e4567-e89b-12d3-a456-426614174001';
  const mockTask: Task = new Task(
    TaskId.create(mockTaskId),
    UserId.create(mockCurrentUser.userId),
    TaskTitle.create('Test Task'),
    TaskDescription.create('Test Description'),
    false,
    new Date('2024-01-01T00:00:00Z'),
  );

  beforeEach(async () => {
    const mockCreateTaskUseCase = {
      execute: jest.fn(),
    };
    const mockUpdateTaskUseCase = {
      execute: jest.fn(),
    };
    const mockCompleteTaskUseCase = {
      execute: jest.fn(),
    };
    const mockUncompleteTaskUseCase = {
      execute: jest.fn(),
    };
    const mockDeleteTaskUseCase = {
      execute: jest.fn(),
    };
    const mockListTasksUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: CreateTaskUseCase,
          useValue: mockCreateTaskUseCase,
        },
        {
          provide: UpdateTaskUseCase,
          useValue: mockUpdateTaskUseCase,
        },
        {
          provide: CompleteTaskUseCase,
          useValue: mockCompleteTaskUseCase,
        },
        {
          provide: UncompleteTaskUseCase,
          useValue: mockUncompleteTaskUseCase,
        },
        {
          provide: DeleteTaskUseCase,
          useValue: mockDeleteTaskUseCase,
        },
        {
          provide: ListTasksUseCase,
          useValue: mockListTasksUseCase,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    createTaskUseCase = module.get(CreateTaskUseCase);
    updateTaskUseCase = module.get(UpdateTaskUseCase);
    completeTaskUseCase = module.get(CompleteTaskUseCase);
    uncompleteTaskUseCase = module.get(UncompleteTaskUseCase);
    deleteTaskUseCase = module.get(DeleteTaskUseCase);
    listTasksUseCase = module.get(ListTasksUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    const createTaskRequest: CreateTaskRequest = {
      title: 'Test Task',
      description: 'Test Description',
    };

    it('should create a task successfully', async () => {
      createTaskUseCase.execute.mockResolvedValue(mockTask);

      const result = await controller.createTask(mockCurrentUser, createTaskRequest);

      expect(createTaskUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: expect.any(UserId),
          title: expect.any(TaskTitle),
          description: expect.any(TaskDescription),
        }),
      );
      expect(result).toBe(mockTask);
    });

    it('should create a task with null description', async () => {
      const requestWithNullDescription = {
        ...createTaskRequest,
        description: null,
      };
      createTaskUseCase.execute.mockResolvedValue(mockTask);

      const result = await controller.createTask(mockCurrentUser, requestWithNullDescription);

      expect(createTaskUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: expect.any(UserId),
          title: expect.any(TaskTitle),
          description: expect.any(TaskDescription),
        }),
      );
      expect(result).toBe(mockTask);
    });

    it('should throw InvalidTitleException for invalid title', async () => {
      const invalidRequest = { ...createTaskRequest, title: 'ab' }; // título muito curto
      createTaskUseCase.execute.mockRejectedValue(
        new InvalidTitleException('ab'),
      );

      await expect(controller.createTask(mockCurrentUser, invalidRequest)).rejects.toThrow(InvalidTitleException);
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      createTaskUseCase.execute.mockRejectedValue(error);

      await expect(controller.createTask(mockCurrentUser, createTaskRequest)).rejects.toThrow(error);
    });
  });

  describe('listTasks', () => {
    const listTasksRequest: ListTasksRequest = {
      page: 1,
      limit: 10,
    };

    const mockListResult = {
      tasks: [mockTask],
      total: 1,
    };

    it('should list tasks successfully', async () => {
      listTasksUseCase.execute.mockResolvedValue(mockListResult);

      const result = await controller.listTasks(mockCurrentUser, listTasksRequest);

      expect(listTasksUseCase.execute).toHaveBeenCalledWith({
        userId: expect.any(UserId),
        title: undefined,
        completed: undefined,
        createdFrom: undefined,
        createdTo: undefined,
        page: 1,
        limit: 10,
      });
      expect(result).toBeInstanceOf(ListTasksResponseDto);
      expect(result.tasks).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should list tasks with filters', async () => {
      const requestWithFilters: ListTasksRequest = {
        title: 'Test',
        completed: true,
        createdFrom: new Date('2024-01-01'),
        createdTo: new Date('2024-01-31'),
        page: 2,
        limit: 5,
      };

      listTasksUseCase.execute.mockResolvedValue(mockListResult);

      const result = await controller.listTasks(mockCurrentUser, requestWithFilters);

      expect(listTasksUseCase.execute).toHaveBeenCalledWith({
        userId: expect.any(UserId),
        title: 'Test',
        completed: true,
        createdFrom: new Date('2024-01-01'),
        createdTo: new Date('2024-01-31'),
        page: 2,
        limit: 5,
      });
      expect(result).toBeInstanceOf(ListTasksResponseDto);
    });

    it('should use default pagination values', async () => {
      const requestWithoutPagination = {};
      listTasksUseCase.execute.mockResolvedValue(mockListResult);

      await controller.listTasks(mockCurrentUser, requestWithoutPagination as ListTasksRequest);

      expect(listTasksUseCase.execute).toHaveBeenCalledWith({
        userId: expect.any(UserId),
        title: undefined,
        completed: undefined,
        createdFrom: undefined,
        createdTo: undefined,
        page: 1,
        limit: 10,
      });
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      listTasksUseCase.execute.mockRejectedValue(error);

      await expect(controller.listTasks(mockCurrentUser, listTasksRequest)).rejects.toThrow(error);
    });
  });

  describe('updateTask', () => {
    const updateTaskRequest: UpdateTaskRequest = {
      title: 'Updated Title',
      description: 'Updated Description',
    };

    it('should update a task successfully', async () => {
      updateTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.updateTask(mockTaskId, updateTaskRequest);

      expect(updateTaskUseCase.execute).toHaveBeenCalledWith({
        id: expect.any(TaskId),
        title: expect.any(TaskTitle),
        description: expect.any(TaskDescription),
      });
    });

    it('should update a task with only title', async () => {
      const partialRequest = { title: 'Updated Title' };
      updateTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.updateTask(mockTaskId, partialRequest);

      expect(updateTaskUseCase.execute).toHaveBeenCalledWith({
        id: expect.any(TaskId),
        title: expect.any(TaskTitle),
      });
    });

    it('should update a task with only description', async () => {
      const partialRequest = { description: 'Updated Description' };
      updateTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.updateTask(mockTaskId, partialRequest);

      expect(updateTaskUseCase.execute).toHaveBeenCalledWith({
        id: expect.any(TaskId),
        description: expect.any(TaskDescription),
      });
    });

    it('should throw InvalidIdException for invalid task ID', async () => {
      const invalidId = 'invalid-id';
      
      await expect(controller.updateTask(invalidId, updateTaskRequest)).rejects.toThrow(InvalidIdException);
    });

    it('should throw ResourceNotFoundException when task not found', async () => {
      updateTaskUseCase.execute.mockRejectedValue(new ResourceNotFoundException('Task', mockTaskId));

      await expect(controller.updateTask(mockTaskId, updateTaskRequest)).rejects.toThrow(ResourceNotFoundException);
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      updateTaskUseCase.execute.mockRejectedValue(error);

      await expect(controller.updateTask(mockTaskId, updateTaskRequest)).rejects.toThrow(error);
    });
  });

  describe('completeTask', () => {
    it('should complete a task successfully', async () => {
      completeTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.completeTask(mockTaskId);

      expect(completeTaskUseCase.execute).toHaveBeenCalledWith(expect.any(TaskId));
    });

    it('should throw InvalidIdException for invalid task ID', async () => {
      const invalidId = 'invalid-id';
      
      await expect(controller.completeTask(invalidId)).rejects.toThrow(InvalidIdException);
    });

    it('should throw ResourceNotFoundException when task not found', async () => {
      completeTaskUseCase.execute.mockRejectedValue(new ResourceNotFoundException('Task', mockTaskId));

      await expect(controller.completeTask(mockTaskId)).rejects.toThrow(ResourceNotFoundException);
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      completeTaskUseCase.execute.mockRejectedValue(error);

      await expect(controller.completeTask(mockTaskId)).rejects.toThrow(error);
    });
  });

  describe('uncompleteTask', () => {
    it('should uncomplete a task successfully', async () => {
      uncompleteTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.uncompleteTask(mockTaskId);

      expect(uncompleteTaskUseCase.execute).toHaveBeenCalledWith(expect.any(TaskId));
    });

    it('should throw InvalidIdException for invalid task ID', async () => {
      const invalidId = 'invalid-id';
      
      await expect(controller.uncompleteTask(invalidId)).rejects.toThrow(InvalidIdException);
    });

    it('should throw ResourceNotFoundException when task not found', async () => {
      uncompleteTaskUseCase.execute.mockRejectedValue(new ResourceNotFoundException('Task', mockTaskId));

      await expect(controller.uncompleteTask(mockTaskId)).rejects.toThrow(ResourceNotFoundException);
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      uncompleteTaskUseCase.execute.mockRejectedValue(error);

      await expect(controller.uncompleteTask(mockTaskId)).rejects.toThrow(error);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      deleteTaskUseCase.execute.mockResolvedValue(undefined);

      await controller.deleteTask(mockTaskId);

      expect(deleteTaskUseCase.execute).toHaveBeenCalledWith(expect.any(TaskId));
    });

    it('should throw InvalidIdException for invalid task ID', async () => {
      const invalidId = 'invalid-id';
      
      await expect(controller.deleteTask(invalidId)).rejects.toThrow(InvalidIdException);
    });

    it('should throw ResourceNotFoundException when task not found', async () => {
      deleteTaskUseCase.execute.mockRejectedValue(new ResourceNotFoundException('Task', mockTaskId));

      await expect(controller.deleteTask(mockTaskId)).rejects.toThrow(ResourceNotFoundException);
    });

    it('should handle use case errors', async () => {
      const error = new Error('Use case error');
      deleteTaskUseCase.execute.mockRejectedValue(error);

      await expect(controller.deleteTask(mockTaskId)).rejects.toThrow(error);
    });
  });
});
