export type Controller = new (...args: unknown[]) => unknown

export class MetadataStore {
  public static controllers: Controller[] = []
}
