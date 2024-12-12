import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Post, Body } from '@nestjs/common';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('get')
  async getProject(@Body() body) {
    return await this.projectService.getProject(body.username);
  }

  @Post('update')
  async updateProject(@Body() body) {
    return await this.projectService.updateProject(body);
  }

  @Post('delete')
  async deleteProject(@Body() body) {
    return await this.projectService.deleteProject(body);
  }

}
