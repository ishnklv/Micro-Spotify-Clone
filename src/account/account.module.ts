import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { EmailService } from "../email/email.service";
import { TokenService } from "../token/token.service";
import { Token, TokenSchema } from "../token/schemas/token.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}])
  ],
  controllers: [AccountController],
  providers: [AccountService, EmailService, TokenService]
})
export class AccountModule {}