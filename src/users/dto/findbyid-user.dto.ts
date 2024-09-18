import { IsUUID } from 'class-validator';

export class FindUserByIdDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;
}
