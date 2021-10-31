import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Token, TokenDocument } from "./schemas/token.schema";

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {

  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, 'jwt_access_2003', {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, 'jwt_refresh_2003', {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }
  async saveToken(userId, refreshToken) {
    const findToken = await this.tokenModel.findOne({userId})
    if(findToken) {
      findToken.refreshToken = refreshToken
      await findToken.save()
    }
    // if(findToken.refreshToken == refreshToken) {
    //   throw new HttpException('refreshToken is similar', HttpStatus.BAD_GATEWAY)
    // }
    const token = await this.tokenModel.create({userId, refreshToken})
    return token
  }
  async findToken(token) {
    const tokenData = await this.tokenModel.findOne({refreshToken: token})
    if(!tokenData) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
    }
    return tokenData.userId
  }
}