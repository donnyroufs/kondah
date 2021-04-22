import express from 'express';
import { ServerAdapter } from '@konda/core';

export class ExpressAdapter extends ServerAdapter {
  protected server = express();

  public run(port: number, onSuccess?: () => void) {
    this.server.listen(port, () => this.onSuccessListen(port));
  }

  public use(namespace: string, fn: any): void;
  public use(fn: any): void;

  public use(namespace: any, fn?: any) {
    if (namespace && !fn) {
      this.server.use(namespace);
      return;
    }

    this.server.use(namespace, fn);
    return;
  }

  // TODO: Fix types for all handlers
  public get(namespace: string, handler: any) {
    this.server.get(namespace, handler);
  }

  public post(namespace: string, handler: any) {
    this.server.post(namespace, handler);
  }

  public put(namespace: string, handler: any) {
    this.server.put(namespace, handler);
  }

  public patch(namespace: string, handler: any) {
    this.server.patch(namespace, handler);
  }

  public delete(namespace: string, handler: any) {
    this.server.delete(namespace, handler);
  }
}
