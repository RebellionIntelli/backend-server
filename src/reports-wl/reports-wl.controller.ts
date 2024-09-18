import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ReportsWLService } from './reports-wl.service';
import { CreateReportsWLDto } from './dto/create-reports-wl.dto';
import { UpdateReportWLDto } from './dto/update-reports-wl.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReportWL } from 'src/entities/reportWL.entity';

@ApiTags('Reports WhiteList')
@Controller('reports-wl')
export class ReportsWLController {
  constructor(private readonly reportsWLService: ReportsWLService) {}

  @Get('user/:userId')
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async getReportsWLByUserId(
    @Param('userId') userId: string
  ): Promise<ReportWL[]> {
    const reportWLs = await this.reportsWLService.findByUserId(userId);
    if (!reportWLs.length) {
      throw new NotFoundException(
        `Reports for user with ID ${userId} not found`
      );
    }
    return reportWLs;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new whitelist report' })
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully created.',
    type: CreateReportsWLDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createReportWLDto: CreateReportsWLDto) {
    try {
      return await this.reportsWLService.create(createReportWLDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all whitelist reports' })
  @ApiResponse({
    status: 200,
    description: 'List of all whitelist reports',
    type: [CreateReportsWLDto],
  })
  async findAll() {
    return await this.reportsWLService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific whitelist report by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the report (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully retrieved.',
    type: CreateReportsWLDto,
  })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async findOne(@Param('id') id: string) {
    return await this.reportsWLService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific whitelist report by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the report (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully updated.',
    type: UpdateReportWLDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateReportWLDto: UpdateReportWLDto
  ) {
    return await this.reportsWLService.update(id, updateReportWLDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific whitelist report by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the report (UUID)',
    example: 'e9e1e7f4-0f3d-4b2b-a02f-6d3739c9a45c',
  })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  async remove(@Param('id') id: string) {
    return await this.reportsWLService.remove(id);
  }
}
