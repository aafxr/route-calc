import { FieldSelector } from './FieldSelector';

export class GraphVertexWeight<T extends { [key: string]: any }> {
  constructor(private value: T, private fieldSelector: FieldSelector<T>) {}

  valueOf() {
    if (
      this.value &&
      typeof this.value === 'object' &&
      this.fieldSelector.getField() in this.value
    ) {
      const result = this.value[this.fieldSelector.getField()];
      return typeof result === 'number' ? result : Infinity;
    }
    return typeof this.value === 'number' ? this.value : Infinity;
  }
}
