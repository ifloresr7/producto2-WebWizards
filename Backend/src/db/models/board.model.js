const { Schema, model } =  require('mongoose');

const boardSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    },
    {
        timestamps: true
    }
)

const Board = model('Board', boardSchema)

module.exports = Board