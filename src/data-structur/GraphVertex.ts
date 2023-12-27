import { CompareFunctionType } from "./Comparator";
import GraphEdge from "./GraphEdge";
import LinkedList from "./LinkedList";
import LinkedListNode from "./LinkedListNode";

export default class GraphVertex <T>{
    value: T
    edges: LinkedList<GraphEdge<T>>

    constructor(value:T) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }

        const edgeComparator: CompareFunctionType<GraphEdge<T>> = (edgeA, edgeB) => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }

            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        };

        // Normally you would store string value like vertex name.
        // But generally it may be any object as well
        this.value = value;
        this.edges = new LinkedList<GraphEdge<T>>(edgeComparator);
    }

    addEdge(edge: GraphEdge<T>) {
        this.edges.append(edge);

        return this;
    }

    deleteEdge(edge: GraphEdge<T>) {
        this.edges.delete(edge);
    }

    getNeighbors() {
        const edges = this.edges.toArray();

        const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        // Return either start or end vertex.
        // For undirected graphs it is possible that current vertex will be the end one.
        return edges.map(neighborsConverter);
    }

    getEdges() {
        return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
    }

    getDegree() {
        return this.edges.toArray().length;
    }

    hasEdge(requiredEdge: GraphEdge<T>) {
        const edgeNode = this.edges.find({
            callback: (edge) => edge === requiredEdge,
        });

        return !!edgeNode;
    }

    hasNeighbor(vertex: GraphVertex<T>) {
        const vertexNode = this.edges.find({
            callback: (edge) => edge.startVertex === vertex || edge.endVertex === vertex,
        });

        return !!vertexNode;
    }


    findEdge(vertex: GraphVertex<T>) {
        const edgeFinder = (edge: GraphEdge<T>) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find({ callback: edgeFinder });

        return edge ? edge.value : null;
    }

    getKey() {
        return this.value;
    }

    /**
     * @return {GraphVertex}
     */
    deleteAllEdges() {
        this.getEdges().forEach((edge) => this.deleteEdge(edge));

        return this;
    }

    toString(callback: ((v:T) => string)) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}