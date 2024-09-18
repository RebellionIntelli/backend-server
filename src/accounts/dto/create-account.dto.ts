import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCredentialsDto } from './create-credentials.dto';
import { CreateWalletDto } from './create-wallet.dto';

export class CreateAccountDto {
  @ApiProperty({
    description: 'User ID associated with the account',
    example: 'c9df5d2b-71b2-46dd-8201-86ecd7f9bfca',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Credentials associated with the account',
    type: [CreateCredentialsDto],
    example: [
      {
        social: 'TWITTER',
        login: 'digidagin',
        password: 'jKAN6rfv3Ttf13Z',
        subscribers: 46652,
      },
      {
        social: 'DISCORD',
        login: 'digidagin',
        password: '3Oqq1fH7V1q5dRm',
      },
      {
        social: 'MAIL',
        login: 'theFigiDaGin34502@rambler.com',
        password: 'G4XfDNZLR8gOaD3',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(3, { message: 'At least three credentials must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreateCredentialsDto)
  credentials: CreateCredentialsDto[];

  @ApiProperty({
    description: 'Wallets associated with the account',
    type: [CreateWalletDto],
    example: [
      {
        type: 'ETHEREUM',
        address: '0x1234567890abcdef1234567890abcdef12345678',
      },
      {
        type: 'BITCOIN',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(2, { message: 'At least two wallets must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreateWalletDto)
  wallets: CreateWalletDto[];
}
