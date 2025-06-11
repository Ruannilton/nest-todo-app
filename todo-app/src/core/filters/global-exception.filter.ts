import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../contracts/domain-exception';
import { ApplicationException } from '../contracts/application-exception';
import { InfrastructureException } from '../contracts/infrastructure-exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let message: string | string[];
    let errorType: string;

    // Log da exceção para debugging
    this.logger.error(
      `Exception caught: ${exception instanceof Error ? exception.constructor.name : 'Unknown'}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    if (exception instanceof DomainException) {
      // Domain exceptions: retorna 400 Bad Request
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      errorType = 'Domain Error';
    } else if (exception instanceof ApplicationException) {
      // Application exceptions: verifica se é ResourceNotFoundException
      if (exception.name === 'ResourceNotFoundException') {
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        errorType = 'Resource Not Found';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        errorType = 'Application Error';
      }
    } else if (exception instanceof InfrastructureException) {
      // Infrastructure exceptions: retorna 500 Internal Server Error
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error occurred';
      errorType = 'Infrastructure Error';

      // Log detalhado para infraestrutura
      this.logger.error(
        `Infrastructure error: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof HttpException) {
      // HttpExceptions: preserva status e message originais
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorType = exception.constructor.name;

      // Extrai mensagem do response da HttpException
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, any>;

        // Para ValidationPipe errors que retornam array de mensagens
        if (responseObj.message && Array.isArray(responseObj.message)) {
          message = responseObj.message as string[];
        } else if (responseObj.message) {
          message = String(responseObj.message);
        } else {
          message = String(responseObj.error) || 'Http Exception';
        }
      } else {
        message = 'Http Exception';
      }
    } else {
      // Outras exceções não mapeadas: retorna 500
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorType = 'Unknown Error';

      // Log da exceção desconhecida
      this.logger.error(
        `Unhandled exception: ${String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: errorType,
      message: Array.isArray(message) ? message : [message],
    };

    response.status(status).json(errorResponse);
  }
}
