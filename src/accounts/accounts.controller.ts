import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Account } from 'src/entities/account.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get accounts by user ID' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async getAccountsByUserId(
    @Param('userId') userId: string
  ): Promise<Account[]> {
    const accounts = await this.accountsService.findByUserId(userId);
    if (!accounts.length) {
      throw new NotFoundException(
        `Accounts for user with ID ${userId} not found`
      );
    }
    return accounts;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
    type: Account,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({
    status: 200,
    description: 'List of all accounts',
    type: [Account],
  })
  @ApiResponse({ status: 404, description: 'Accounts not found' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the account',
    example: 'a2d4e0f8-33b8-4b56-973e-74c85bfa9c42',
  })
  @ApiResponse({
    status: 200,
    description: 'Account found',
    type: Account,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the account',
    example: 'a2d4e0f8-33b8-4b56-973e-74c85bfa9c42',
  })
  @ApiResponse({
    status: 200,
    description: 'The account has been successfully updated.',
    type: Account,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the account',
    example: 'a2d4e0f8-33b8-4b56-973e-74c85bfa9c42',
  })
  @ApiResponse({
    status: 204,
    description: 'The account has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.remove(id);
  }
}
