import mongoose, { Schema, Document } from 'mongoose'

export interface IHabitLog extends Document {
    habitId: string
    date: Date
    completed: boolean
}

const habitLogSchema = new Schema({
    habitId: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})
export const HabitLog = mongoose.model<IHabitLog>('HabitLog', habitLogSchema)
