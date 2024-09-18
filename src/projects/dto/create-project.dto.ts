import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsHexColor } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Cool Project',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Logotype URL of the project',
    example: 'https://example.com/logo.png',
    required: true,
  })
  @IsUrl()
  logotype: string;

  @ApiProperty({
    description: 'Color associated with the project',
    example: '#FF5733',
    required: true,
  })
  @IsHexColor()
  color: string;

  @ApiProperty({
    description: 'Link to the project website',
    example: 'https://example.com',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiProperty({
    description: 'Discord chat link for the project',
    example: 'https://discord.gg/example',
    required: true,
  })
  @IsUrl()
  chat: string;
}
