import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://Jeet:Jeet%401991@freecluster.ehj5s.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
