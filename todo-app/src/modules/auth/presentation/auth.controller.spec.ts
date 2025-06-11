import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SignInUseCase } from '../application/use-cases/signin.use-case';
import { SignUpUseCase } from '../application/use-cases/signup.use-case';
import { JwtPresenterService } from '../service/jwt-presenter.service';
import { SignInRequest } from './dto/signin.dto';
import { SignUpRequest } from './dto/signup.dto';
import { ResourceNotFoundException } from '../application/exceptions/resource-not-found-exception';
import { WrongPasswordException } from '../application/exceptions/wrong-password-exception';
import { EmailAlreadyExistsException } from '../application/exceptions/email-already-exists-exception';
import { InvalidEmailException } from '../domain/exceptions/invalid-email-exception';
import { InvalidPasswordException } from '../domain/exceptions/invalid-password-exception';
import { JwtTokenDto } from '../domain/dtos/jwt-token.dto';
import { SignInOutputDto } from '../domain/dtos/signin.dto';
import { SignUpOutputDto } from '../domain/dtos/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let signInUseCase: jest.Mocked<SignInUseCase>;
  let signUpUseCase: jest.Mocked<SignUpUseCase>;
  let jwtPresenterService: jest.Mocked<JwtPresenterService>;

  const mockSignInUseCase = {
    execute: jest.fn(),
  };

  const mockSignUpUseCase = {
    execute: jest.fn(),
  };

  const mockJwtPresenterService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SignInUseCase,
          useValue: mockSignInUseCase,
        },
        {
          provide: SignUpUseCase,
          useValue: mockSignUpUseCase,
        },
        {
          provide: JwtPresenterService,
          useValue: mockJwtPresenterService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    signInUseCase = module.get(SignInUseCase);
    signUpUseCase = module.get(SignUpUseCase);
    jwtPresenterService = module.get(JwtPresenterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have all dependencies injected', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((controller as any).signInUseCase).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((controller as any).signUpUsecase).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((controller as any).jwtPresenterService).toBeDefined();
    });
  });

  describe('signIn', () => {
    const validSignInRequest: SignInRequest = {
      email: 'test@example.com',
      password: 'Password123',
    };

    const mockSignInOutput = new SignInOutputDto('user-123', 'test@example.com');
    const mockJwtToken = new JwtTokenDto('mock-jwt-token');

    beforeEach(() => {
      signInUseCase.execute.mockResolvedValue(mockSignInOutput);
      jwtPresenterService.generateToken.mockReturnValue(mockJwtToken);
    });

    it('should successfully sign in a user with valid credentials', async () => {
      const result = await controller.signIn(validSignInRequest);

      expect(signInUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.objectContaining({ Address: 'test@example.com' }),
          password: expect.objectContaining({ Password: 'Password123' }),
        }),
      );
      expect(jwtPresenterService.generateToken).toHaveBeenCalledWith(
        'test@example.com',
        'user-123',
      );
      expect(result).toEqual(mockJwtToken);
    });

    it('should throw InvalidEmailException for invalid email format', async () => {
      const invalidEmailRequest = {
        ...validSignInRequest,
        email: 'invalid-email',
      };

      await expect(controller.signIn(invalidEmailRequest)).rejects.toThrow(
        InvalidEmailException,
      );
      expect(signInUseCase.execute).not.toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw InvalidPasswordException for invalid password format', async () => {
      const invalidPasswordRequest = {
        ...validSignInRequest,
        password: 'weak',
      };

      await expect(controller.signIn(invalidPasswordRequest)).rejects.toThrow(
        InvalidPasswordException,
      );
      expect(signInUseCase.execute).not.toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw ResourceNotFoundException when user identity is not found', async () => {
      signInUseCase.execute.mockRejectedValue(
        new ResourceNotFoundException('Identity', 'test@example.com'),
      );

      await expect(controller.signIn(validSignInRequest)).rejects.toThrow(
        ResourceNotFoundException,
      );
      expect(signInUseCase.execute).toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw WrongPasswordException when password is incorrect', async () => {
      signInUseCase.execute.mockRejectedValue(new WrongPasswordException());

      await expect(controller.signIn(validSignInRequest)).rejects.toThrow(
        WrongPasswordException,
      );
      expect(signInUseCase.execute).toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw ResourceNotFoundException when user is not found', async () => {
      signInUseCase.execute.mockRejectedValue(
        new ResourceNotFoundException('User', 'user-123'),
      );

      await expect(controller.signIn(validSignInRequest)).rejects.toThrow(
        ResourceNotFoundException,
      );
      expect(signInUseCase.execute).toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should handle edge case with empty email', async () => {
      const emptyEmailRequest = {
        ...validSignInRequest,
        email: '',
      };

      await expect(controller.signIn(emptyEmailRequest)).rejects.toThrow();
      expect(signInUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with empty password', async () => {
      const emptyPasswordRequest = {
        ...validSignInRequest,
        password: '',
      };

      await expect(controller.signIn(emptyPasswordRequest)).rejects.toThrow();
      expect(signInUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe('signUp', () => {
    const validSignUpRequest: SignUpRequest = {
      email: 'newuser@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    const mockSignUpOutput = new SignUpOutputDto('user-456', 'newuser@example.com');
    const mockJwtToken = new JwtTokenDto('mock-jwt-token-signup');

    beforeEach(() => {
      signUpUseCase.execute.mockResolvedValue(mockSignUpOutput);
      jwtPresenterService.generateToken.mockReturnValue(mockJwtToken);
    });

    it('should successfully sign up a new user with valid data', async () => {
      const result = await controller.signUp(validSignUpRequest);

      expect(signUpUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.objectContaining({ Address: 'newuser@example.com' }),
          password: expect.objectContaining({ Password: 'Password123' }),
          name: expect.objectContaining({
            First: 'John',
            Last: 'Doe',
          }),
        }),
      );
      expect(jwtPresenterService.generateToken).toHaveBeenCalledWith(
        'newuser@example.com',
        'user-456',
      );
      expect(result).toEqual(mockJwtToken);
    });

    it('should throw InvalidEmailException for invalid email format during signup', async () => {
      const invalidEmailRequest = {
        ...validSignUpRequest,
        email: 'invalid-email-format',
      };

      await expect(controller.signUp(invalidEmailRequest)).rejects.toThrow(
        InvalidEmailException,
      );
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw InvalidPasswordException for weak password during signup', async () => {
      const weakPasswordRequest = {
        ...validSignUpRequest,
        password: 'weak',
      };

      await expect(controller.signUp(weakPasswordRequest)).rejects.toThrow(
        InvalidPasswordException,
      );
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw EmailAlreadyExistsException when email is already registered', async () => {
      signUpUseCase.execute.mockRejectedValue(
        new EmailAlreadyExistsException('newuser@example.com'),
      );

      await expect(controller.signUp(validSignUpRequest)).rejects.toThrow(
        EmailAlreadyExistsException,
      );
      expect(signUpUseCase.execute).toHaveBeenCalled();
      expect(jwtPresenterService.generateToken).not.toHaveBeenCalled();
    });

    it('should handle edge case with empty firstName', async () => {
      const emptyFirstNameRequest = {
        ...validSignUpRequest,
        firstName: '',
      };

      await expect(controller.signUp(emptyFirstNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with empty lastName', async () => {
      const emptyLastNameRequest = {
        ...validSignUpRequest,
        lastName: '',
      };

      await expect(controller.signUp(emptyLastNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with short firstName', async () => {
      const shortFirstNameRequest = {
        ...validSignUpRequest,
        firstName: 'Jo', // Less than minimum length of 3
      };

      await expect(controller.signUp(shortFirstNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with short lastName', async () => {
      const shortLastNameRequest = {
        ...validSignUpRequest,
        lastName: 'Do', // Less than minimum length of 3
      };

      await expect(controller.signUp(shortLastNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with very long firstName', async () => {
      const longFirstNameRequest = {
        ...validSignUpRequest,
        firstName: 'a'.repeat(100), // Exceeds maximum length of 64
      };

      await expect(controller.signUp(longFirstNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });

    it('should handle edge case with very long lastName', async () => {
      const longLastNameRequest = {
        ...validSignUpRequest,
        lastName: 'a'.repeat(100), // Exceeds maximum length of 64
      };

      await expect(controller.signUp(longLastNameRequest)).rejects.toThrow();
      expect(signUpUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe('Input validation scenarios', () => {
    it('should validate email format in signIn', async () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
        '',
      ];

      for (const email of invalidEmails) {
        const request = { email, password: 'Password123' };
        await expect(controller.signIn(request)).rejects.toThrow();
      }
    });

    it('should validate password requirements in signIn', async () => {
      const invalidPasswords = ['weak', '123456', 'password', 'PASSWORD', 'Pass', ''];

      for (const password of invalidPasswords) {
        const request = {
          email: 'test@example.com',
          password,
        };
        await expect(controller.signIn(request)).rejects.toThrow();
      }
    });

    it('should validate all required fields in signUp', async () => {
      const baseRequest = {
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      // Test missing email
      const requestWithoutEmail = {
        ...baseRequest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        email: undefined as any,
      };
      await expect(controller.signUp(requestWithoutEmail)).rejects.toThrow();

      // Test missing password
      const requestWithoutPassword = {
        ...baseRequest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        password: undefined as any,
      };
      await expect(controller.signUp(requestWithoutPassword)).rejects.toThrow();

      // Test missing firstName
      const requestWithoutFirstName = {
        ...baseRequest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        firstName: undefined as any,
      };
      await expect(controller.signUp(requestWithoutFirstName)).rejects.toThrow();

      // Test missing lastName
      const requestWithoutLastName = {
        ...baseRequest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lastName: undefined as any,
      };
      await expect(controller.signUp(requestWithoutLastName)).rejects.toThrow();
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete signIn flow with all valid transformations', async () => {
      const request: SignInRequest = {
        email: 'integration@test.com',
        password: 'Integration123',
      };

      const mockOutput = new SignInOutputDto('int-user-123', 'integration@test.com');
      const mockToken = new JwtTokenDto('integration-jwt-token');

      signInUseCase.execute.mockResolvedValue(mockOutput);
      jwtPresenterService.generateToken.mockReturnValue(mockToken);

      const result = await controller.signIn(request);

      // Verify the complete flow
      expect(signInUseCase.execute).toHaveBeenCalledTimes(1);
      expect(jwtPresenterService.generateToken).toHaveBeenCalledTimes(1);
      expect(jwtPresenterService.generateToken).toHaveBeenCalledWith(
        'integration@test.com',
        'int-user-123',
      );
      expect(result).toEqual(mockToken);
    });

    it('should handle complete signUp flow with all valid transformations', async () => {
      const request: SignUpRequest = {
        email: 'signup@test.com',
        password: 'Signup123',
        firstName: 'Integration',
        lastName: 'Test',
      };

      const mockOutput = new SignUpOutputDto('signup-user-123', 'signup@test.com');
      const mockToken = new JwtTokenDto('signup-jwt-token');

      signUpUseCase.execute.mockResolvedValue(mockOutput);
      jwtPresenterService.generateToken.mockReturnValue(mockToken);

      const result = await controller.signUp(request);

      // Verify the complete flow
      expect(signUpUseCase.execute).toHaveBeenCalledTimes(1);
      expect(jwtPresenterService.generateToken).toHaveBeenCalledTimes(1);
      expect(jwtPresenterService.generateToken).toHaveBeenCalledWith(
        'signup@test.com',
        'signup-user-123',
      );
      expect(result).toEqual(mockToken);
    });
  });
});
