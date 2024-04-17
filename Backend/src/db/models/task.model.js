const { Schema, model } =  require('mongoose');
const { status, colours} = require('../../constants');


const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        order: { type: String, enum: status,  required: true },
        colour: { type: String, enum: colours,  required: true },
        endTime: { type: Date, required: true },
        members: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true
    }
)

const Task = model('Task', taskSchema)

module.exports = Task