import { ObjectId } from "mongoose";

export class ProfileDto {
  readonly id: ObjectId;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly isActivated: boolean;

  constructor(model) {
    this.id = model._id
    this.first_name = model.first_name
    this.last_name = model.last_name
    this.email = model.email
    this.isActivated = model.isActivated
  }
}