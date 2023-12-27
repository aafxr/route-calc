import LinkedListNode from './LinkedListNode';
import Comparator, { CompareFunctionType } from "./Comparator";

export default class LinkedList<T> {
    /** @type {LinkedListNode} */
    head: LinkedListNode<T> | null = null;

    /** @type {LinkedListNode} */
    tail: LinkedListNode<T> | null = null;

    compare: Comparator<T>

    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction: CompareFunctionType<T>) {
        this.compare = new Comparator(comparatorFunction);
    }

    prepend(value: T) {
        // Make new node to be a head.
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // If there is no tail yet let's make new node a tail.
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value: T) {
        const newNode = new LinkedListNode(value);

        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Attach new node to the end of linked list.
        this.tail!.next = newNode;
        this.tail = newNode;

        return this;
    }

    insert(value: T, rawIndex: number) {
        if(typeof rawIndex === 'number'){
            const index = rawIndex < 0 ? 0 : rawIndex;
            if (index === 0) {
                this.prepend(value);
            } else {
                let count = 1;
                let currentNode = this.head;
                const newNode = new LinkedListNode(value);
                while (currentNode) {
                    if (count === index) break;
                    currentNode = currentNode.next;
                    count += 1;
                }
                if (currentNode) {
                    newNode.next = currentNode.next;
                    currentNode.next = newNode;
                } else {
                    if (this.tail) {
                        this.tail.next = newNode;
                        this.tail = newNode;
                    } else {
                        this.head = newNode;
                        this.tail = newNode;
                    }
                }
            }
        } else {
            let node = this.head
            while(node && this.compare.lessThan(node.value, value))
                node = node.next

            if(node){
                node.next = new LinkedListNode(value, node.next)
            } else {
                this.append(value)
            }
        }
        return this;
    }

    delete(value: T) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // If the head must be deleted then make next node that is different
        // from the head to be a new head.
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If next node must be deleted then make next node to be a next next one.
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.compare.equal(this.tail!.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({value = undefined, callback}: {value?:T, callback?: (v:T) => boolean}): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let currentNode: LinkedListNode<T> | null = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // If value is specified then try to compare by value..
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            // There is only one node in linked list.
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // If there are many nodes in linked list...

        // Rewind to the last node and delete "next" link for the node before the last one.
        let currentNode = this.head;
        while (currentNode && currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {LinkedList<T>}
     */
    fromArray(values:T[]) {
        values.forEach((value) => this.append(value));

        return this;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback?:(v:T) => string) {
        return this.toArray().map((node) => callback ?  callback(node.value): node.value);
    }

    /**
     * Reverse a linked list.
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // Store next node.
            nextNode = currNode.next;

            // Change next node of the current node so it would link to previous node.
            currNode.next = prevNode;

            // Move prevNode and currNode nodes one step forward.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}
