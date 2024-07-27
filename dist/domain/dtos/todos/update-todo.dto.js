"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.completedAt)
            returnObj.completedAt = this.completedAt;
        return returnObj;
    }
    static create(props) {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;
        if (isNaN(id))
            return ['Invalid id', undefined];
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date')
                return ['Invalid date', undefined];
        }
        console.log(text, newCompletedAt);
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
