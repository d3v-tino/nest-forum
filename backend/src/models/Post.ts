import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { 
        uid: { type: Number, required: true },
        username: { type: String, required: true },
    },
    likes_count: { type: Number, required: true, default: 0 },
  }, { timestamps: true });

PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
});

export const Post = mongoose.model('Post', PostSchema);