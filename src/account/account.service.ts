import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { EmailService } from "../email/email.service";
import * as uuid from 'uuid'
import { LoginAccountDto } from "./dto/login-account.dto";
import { UserDto } from "./dto/user.dto";
import { TokenService } from "../token/token.service";
import { ProfileDto } from "./dto/profile.dto";

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private emailService: EmailService,
              private tokenService: TokenService) {
  }
  async registration(dto: CreateAccountDto): Promise<User> {
    const findUser = await this.userModel.findOne({email: dto.email})
    if(findUser) {
      throw new HttpException('User with such mail already exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = bcrypt.hashSync(dto.password, 3)
    const activationLink = `http://localhost:5000/account/activate/${uuid.v4()}`
    const newUser = await this.userModel.create({...dto, password: hashPassword, isActivated: false, activationLink})
    await this.emailService.sendActivation(dto.email, activationLink)
    return newUser
  }
  async activate(link) {
    const activationLink = `http://localhost:5000/account/activate/${link}`
    const findUser = await this.userModel.findOne({activationLink})
    if(!findUser) {
      throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED)
    }
    findUser.isActivated = true
    await findUser.save()
    return activationLink
  }
  async login(dto: LoginAccountDto) {
    if(dto.password !== dto.password2) {
      throw new HttpException('Password mismatch', HttpStatus.BAD_REQUEST)
    }
    const findUser = await this.userModel.findOne({email: dto.email})
    if(!findUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    const isPassEquals = bcrypt.compare(findUser.password, dto.password)
    if(!isPassEquals) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST)
    }
    const userDto = new UserDto(findUser)
    const tokens = this.tokenService.generateTokens({...userDto})
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async profile(headers) {
    const {authorization} = headers
    const token = authorization.split(' ')[1]
    const findUserId = await this.tokenService.findToken(token)
    const findUser = await this.userModel.findById(findUserId)
    if(!findUser) {
      throw new HttpException('Invalid user id', HttpStatus.UNAUTHORIZED)
    }
    const profileDto = new ProfileDto(findUser)
    return profileDto
  }
  async logout() {

  }
}