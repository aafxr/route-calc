import GraphVertex from "./GraphVertex";

/**
 * @class
 * @name GraphEdge
 *
 * @param {GraphVertex} startVertex
 * @param {GraphVertex} endVertex
 * @param {number} [weight=1]
 * @constructor
 */
export default class GraphEdge<T> {
    startVertex: GraphVertex<T>
    endVertex: GraphVertex<T>
    weight: number
    
    constructor(startVertex:GraphVertex<T>, endVertex:GraphVertex<T>, weight = 0) {
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