// src/users/users.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByIdDto } from './dto/findbyid-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [User],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the user (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  async findOne(@Param() params: FindUserByIdDto): Promise<User> {
    return await this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the user (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the user (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Get a user by Telegram ID' })
  @ApiParam({
    name: 'telegramId',
    type: 'string',
    description: 'ID of the telegram user (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('telegram/:telegramId')
  async getUserByTelegramId(@Param('telegramId') telegramId: number) {
    const user = await this.usersService.findByTelegramId(telegramId);
    if (!user) {
      throw new NotFoundException(
        `User with Telegram ID ${telegramId} not found`
      );
    }
    return user;
  }
}
