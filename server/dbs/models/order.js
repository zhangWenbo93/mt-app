import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  count: {
    type: String,
    require: true
  },
  user: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  imgs: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Order', Order)
