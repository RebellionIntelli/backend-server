import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Project } from 'src/entities/project.entity';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: Project,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of all projects',
    type: [Project],
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a project by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project details',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    console.log(`Attempting to update project with ID: ${id}`);
    console.log('Update data:', updateProjectDto);
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({
    status: 204,
    description: 'The project has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
