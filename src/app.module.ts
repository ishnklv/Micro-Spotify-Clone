import { Module } from '@nestjs/common';
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";

import * as path from 'path'
import { AccountModule } from "./account/account.module";
import { EmailModule } from "./email/email.module";
import { TokenModule } from "./token/token.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://aktan:root1234@cluster0.8f980.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '.', 'static')
    }),
    TrackModule,
    FileModule,
    AccountModule,
    EmailModule,
    TokenModule
  ]
})
export class AppModule {}
