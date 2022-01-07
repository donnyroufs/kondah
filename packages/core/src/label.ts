export interface ILabelProps {
  value: string
}

export class Label {
  get value() {
    return this._props.value
  }

  protected constructor(private readonly _props: ILabelProps) {}

  public static create(value: string) {
    return new Label({ value: ` ${value.trim().toUpperCase()} ` })
  }
}
