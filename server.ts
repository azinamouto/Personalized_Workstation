import 'reflect-metadata';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './apps/api/src/app.module';
import { createServer as createViteServer } from 'vite';

const logger = new Logger('Bootstrap');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  // Initialize NestJS application
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',').map(o => o.trim()),
      credentials: true,
    },
    logger: ['log', 'warn', 'error'],
  });

  // Swagger Documentation Setup at /api/docs
  const config = new DocumentBuilder()
    .setTitle('Talibon Workspace API')
    .setDescription(
      'Personalized Productivity, Planning and Progress Platform API — Modular NestJS Backend with workspace scoping and RBAC'
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Mount Vite development middlewares for frontend SPA
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Forward non-API routes to Vite SPA middlewares
  expressApp.use((req: any, res: any, next: any) => {
    if (req.url.startsWith('/api') || req.url.startsWith('/health')) {
      return next();
    }
    vite.middlewares(req, res, next);
  });

  await app.listen(PORT, HOST);

  logger.log(`Server running on http://${HOST}:${PORT}`);
  logger.log(`Swagger API Documentation at http://${HOST}:${PORT}/api/docs`);
}

startServer().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
