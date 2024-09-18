import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { wallet } from 'src/entities/enums/wallet.enum';

export class CreateWalletDto {
  @ApiProperty({
    description: 'Address of the wallet',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Phrase of the wallet',
    example: 'correct horse battery staple',
  })
  @IsNotEmpty()
  @IsString()
  phrase: string;

  @ApiProperty({
    description: 'Type of the wallet',
    enum: wallet,
    example: 'ETHEREUM',
  })
  @IsNotEmpty()
  @IsEnum(wallet)
  type: wallet;
}
