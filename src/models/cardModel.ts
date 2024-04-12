import mongoose, { ObjectId } from 'mongoose';

//

export type TCard = {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date,
};

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
      type: mongoose.Types.ObjectId,
      ref: 'user',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

//

const CardModel = mongoose.model<TCard>('card', cardSchema);

export default CardModel;
