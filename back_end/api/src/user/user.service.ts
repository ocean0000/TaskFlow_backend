import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { jwtDecode } from 'jwt-decode';



@Injectable()
export class UserService {

   constructor(@InjectModel(User.name) private userscollection: Model<User>) {}
   //create a new collection


   async register(user: User) {
      
      const existingUser = await this.userscollection.findOne({ username: user.username });
      if (existingUser) {
         return { message: 'User already exists' };
      }
      const existingEmail = await this.userscollection.findOne({ email: user.email });
      if (existingEmail) {
         return { message: 'Email already exists' };
      }

      const newUser = new this.userscollection(user);
      await newUser.save();
      return { message: 'Register successfully' };
   }

   async login(user: User) {
      const existingUser = await this.userscollection.findOne({ username: user.username });
      if (!existingUser) {
         return { message: 'User does not exist' };
      }
      if (existingUser.password !== user.password) {
         return { message: 'Password is incorrect' };
      }
      return { message: 'Login successfully' };
   }

   async login_google(jwt: any) {
      
      const data: { name: string; email: string } = jwtDecode(jwt.credential);
     
      const username = data.name; 
      const email = data.email;
      const name = username;
      const existingUser = await this.userscollection.findOne({ username: username });
      if (!existingUser) {
         const newUser = new this.userscollection({ name, email, username});
         await newUser.save();
      }
      return true;

   
   }
       
}
