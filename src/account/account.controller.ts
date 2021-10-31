import { Body, Controller, Get, Param, Post, Redirect, Headers } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { LoginAccountDto } from "./dto/login-account.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

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

  @Post('/reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.accountService.resetPassword(dto)
  }
  @Post('/reset-password/:link')
  changePassword(@Body() dto: ChangePasswordDto, @Param('link') link: string) {
    return this.accountService.changePassword(dto, link)
  }
}