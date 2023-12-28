import { GraphVertexWeight } from '../classes/GraphVertexWeight';
import GraphVertex from './GraphVertex';

/**
 * @class
 * @name GraphEdge
 *
 * @param {GraphVertex} startVertex
 * @param {GraphVertex} endVertex
 * @param {number} [weight=1]
 * @constructor
 */
export default class GraphEdge<T, K extends {}> {
  startVertex: GraphVertex<T>;
  endVertex: GraphVertex<T>;
  weight: number | GraphVertexWeight<K>;

  constructor(
    startVertex: GraphVertex<T>,
    endVertex: GraphVertex<T>,
    weight: number | GraphVertexWeight<K>
  ) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  toString() {
    return this.getKey();
  }
}
