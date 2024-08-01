

export class TodoEntity {

    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date | null,
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject = (object: { [key: string]: any }): TodoEntity => {
        const { id, text, completedAt } = object;

        if (!id) throw new Error('Id is required');
        if (!text) throw new Error('Text is required');

        let newCompletedAt = null;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw new Error('Invalid date');
            }
        }

        return new TodoEntity(id, text, completedAt);
    }

}

