import mongoose from 'mongoose';

const instagramDataSchema = new mongoose.Schema({
  title: String,
  variantLink: String,
  version: String,
  releaseDate: String,
});

const InstagramData = mongoose.model('InstagramData', instagramDataSchema);

export default InstagramData;

