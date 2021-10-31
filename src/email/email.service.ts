import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  async sendActivation(to, link) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: 'aktanishenkulov@gmail.com',
        pass: 'msconfig123456789'
      }
    })
    await transporter.sendMail({
      from: 'aktanishenkulov@gmail.com',
      to,
      subject: `Activation on http://localhost:5000`,
      text: '',
      html: `
        <div>
            <h1>To activate, follow the link below</h1>
            <a href="${link}">${link}</a>
        </div>
      `
    })
  }
}