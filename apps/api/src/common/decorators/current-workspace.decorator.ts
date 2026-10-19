import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentWorkspace = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const workspace = request.workspace || {
      id: request.params?.workspaceId || 'ws-dev-01',
      name: 'Dev Workspace',
      role: 'owner',
    };
    return data ? workspace?.[data] : workspace;
  }
);
