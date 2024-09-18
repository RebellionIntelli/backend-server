import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { social } from 'src/entities/enums/social.enum';

export class CreateCredentialsDto {
  @ApiProperty({
    description: 'Login for the platform',
    example: 'digidagin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Password for the platform',
    example: 'jKAN6rfv3Ttf13Z',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Type of the social',
    enum: social,
    example: 'TWITTER',
  })
  @IsEnum(social)
  social: social;

  @ApiProperty({
    description: 'Subscriber count (only for twitter)',
    nullable: true,
    example: 46652,
  })
  @IsOptional()
  @IsNumber()
  subscribers?: number;
}
