import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import * as path from 'path'
import * as fs from 'rotating-file-stream'

const accessLogStream = fs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
})

const start = async () => {
  try{
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    app.use(morgan('combined', {stream: accessLogStream}))
    await app.listen(PORT, () => console.log('SERVER STARTED ON PORT = ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

start()