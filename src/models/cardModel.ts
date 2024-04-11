import mongoose from 'mongoose';

//

export type TCard = {
  name: string,
  link: string,
  owner: any,
  likes: any,
  createdAt: any,
};

//
//

const cardSchema = new mongoose.Schema<TCard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {

    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

//
//

export default mongoose.model<TCard>('card', cardSchema);
