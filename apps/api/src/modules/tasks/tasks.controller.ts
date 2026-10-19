import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../../common/guards/workspace.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { PriorityLevel, TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task title', maxLength: 300 })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiPropertyOptional({ description: 'Optional longer description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: PriorityLevel, default: PriorityLevel.medium })
  @IsEnum(PriorityLevel)
  @IsOptional()
  priority: PriorityLevel = PriorityLevel.medium;

  @ApiPropertyOptional({ description: 'ISO 8601 due date-time string' })
  @IsString()
  @IsOptional()
  dueAt?: string;

  @ApiPropertyOptional({ description: 'Estimated duration in minutes', minimum: 0 })
  @IsNumber()
  @IsOptional()
  estimatedMinutes?: number;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Updated task title', maxLength: 300 })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Updated description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: PriorityLevel })
  @IsEnum(PriorityLevel)
  @IsOptional()
  priority?: PriorityLevel;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'ISO 8601 due date-time string' })
  @IsString()
  @IsOptional()
  dueAt?: string;

  @ApiPropertyOptional({ minimum: 0 })
  @IsNumber()
  @IsOptional()
  estimatedMinutes?: number;
}

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, WorkspaceGuard)
@Controller('api/v1/workspaces/:workspaceId/tasks')
export class TasksController {
  @Get()
  @ApiOperation({ summary: 'List workspace tasks with pagination and filters' })
  listTasks(@Param('workspaceId') workspaceId: string, @Query() query: PaginationDto) {
    const items = [
      {
        id: 't-1',
        workspaceId,
        title: 'Grade Grade 7 Quiz on Photosynthesis',
        status: 'in_progress',
        priority: 'high',
        dueAt: 'Today, 4:00 PM',
        estimatedMinutes: 45,
        createdAt: '2026-10-04T08:00:00Z',
      },
      {
        id: 't-2',
        workspaceId,
        title: 'Submit quarterly lesson plan for Physics Unit',
        status: 'todo',
        priority: 'urgent',
        dueAt: 'Tomorrow, 10:00 AM',
        estimatedMinutes: 60,
        createdAt: '2026-10-04T08:30:00Z',
      },
    ];

    return {
      items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: items.length,
        totalPages: 1,
      },
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task in workspace' })
  createTask(@Param('workspaceId') workspaceId: string, @Body() dto: CreateTaskDto) {
    return {
      id: `t-${Date.now()}`,
      workspaceId,
      title: dto.title,
      description: dto.description,
      status: TaskStatus.todo,
      priority: dto.priority,
      dueAt: dto.dueAt,
      estimatedMinutes: dto.estimatedMinutes || 30,
      createdAt: new Date().toISOString(),
    };
  }

  @Put(':taskId/complete')
  @ApiOperation({ summary: 'Toggle completion status of task' })
  toggleComplete(
    @Param('workspaceId') workspaceId: string,
    @Param('taskId') taskId: string
  ) {
    return {
      id: taskId,
      workspaceId,
      status: TaskStatus.done,
      completedAt: new Date().toISOString(),
    };
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Partially update a task' })
  updateTask(
    @Param('workspaceId') workspaceId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return {
      id: taskId,
      workspaceId,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  deleteTask(
    @Param('workspaceId') workspaceId: string,
    @Param('taskId') taskId: string
  ) {
    return {
      success: true,
      message: `Task ${taskId} removed`,
    };
  }
}
