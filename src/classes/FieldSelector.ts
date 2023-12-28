export class FieldSelector<T> {
  constructor(private field: keyof T) {}

  setField(field: keyof T) {
    this.field = field;
  }

  getField() {
    return this.field;
  }
}
