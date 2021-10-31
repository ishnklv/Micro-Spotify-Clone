import { Body, Controller, Get, Param, Post, Redirect, Headers } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { LoginAccountDto } from "./dto/login-account.dto";

@Controller('/account')
export class AccountController {

  constructor(private accountService: AccountService) {}

  @Post('/signup')
  registration(@Body() dto: CreateAccountDto) {
    return this.accountService.registration(dto)
  }

  @Get('/activate/:link/')
  @Redirect('https://youtube.com', 301)
  activate(@Param('link') link: string) {
    return this.accountService.activate(link)
  }

  @Post('/signin')
  login(@Body() dto: LoginAccountDto) {
    return this.accountService.login(dto)
  }

  @Get('/profile')
  profile(@Headers() headers) {
    return this.accountService.profile(headers)
  }
}