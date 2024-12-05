import { Body, Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import e, { Express } from 'express';
import { Multer } from 'multer';
import { UserService } from './user.service';
import { User } from './user.schema';
import { Post , Get} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register( @Body() user: User) {
    return this.userService.register(user);
  }


  @Post('login')
  async login( @Body()   user: User) {
    return this.userService.login(user);
  }

  @Post('login_google')
  async login_google( @Body()   jwt :any) {
    return this.userService.login_google(jwt);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('profile_image'))
  async update(
    @Body('username') username: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profile_image = file ? file.buffer.toString('base64') : null;
    const user = { username, name, password, description, profile_image, email: '' };
     
    return this.userService.update(user);
  }

  @Post('get_user')
  async get_user( @Body() user: User) {
    
    return this.userService.get_user(user);
  }

}
