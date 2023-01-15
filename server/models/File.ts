import mongoose, {Document} from 'mongoose'

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {
        type: String,
        required:true
    },
    secure_url: {
        type: String,
        required:true
    },
    format: {
        type: String,
        required:true
    },
    sizeInBytes: {
        type: String,
        required:true
    },
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },

}, {
    timestamps: true,
})

//We have created interface which has all properties
interface IFile extends Document{
    filename: string,
    secure_url: string,
    sizeInBytes: string,
    format: string,
    sender?: string,
    receiver?: string
}

export default mongoose.model<IFile>("File", fileSchema)