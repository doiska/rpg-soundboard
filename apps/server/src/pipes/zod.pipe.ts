import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      console.log(value);
      this.schema.parse(value);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
