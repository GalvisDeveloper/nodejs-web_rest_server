

export class TodoEntity {

    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date | null,
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

}

