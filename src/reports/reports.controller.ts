import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Report } from 'src/entities/report.entity';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reports by user id' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async getReportsByUserId(@Param('userId') userId: string): Promise<Report[]> {
    const reports = await this.reportsService.findByUserId(userId);
    if (!reports.length) {
      throw new NotFoundException(
        `Reports for user with ID ${userId} not found`
      );
    }
    return reports;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully created.',
    type: Report,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'List of reports', type: [Report] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific report by ID' })
  @ApiResponse({
    status: 200,
    description: 'The report with the given ID',
    type: Report,
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a report by ID' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully updated.',
    type: Report,
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format or update data' })
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report by ID' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
