import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Document } from "mongoose";

export type TokenDocument = Token & Document

@Schema()
export class Token {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userId: number

  @Prop({required: true})
  refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)