import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // Use environment variables for CORS origin and port
  const frontendUrl = process.env.NEXT_FRONTEND_URL;;
  const port = process.env.PORT || 8000;

  app.enableCors({
    origin: (origin, callback) => {
      console.log('Request Origin:', origin);
      if (!origin || origin === frontendUrl) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Stock Traacker')
    .setDescription('Creative Capsule')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
