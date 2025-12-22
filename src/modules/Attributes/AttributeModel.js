import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Attribute name required"],
    unique: true,
    minlength: [3, "too short length of Attribute name"],
    maxlength: [32, "too much length of Attribute name"],
    trim: true
  },
  arName: {
    type: String,
    required: [true, "Attribute arName required"],
    unique: true,
    minlength: [3, "too short length of Attribute arName"],
    maxlength: [32, "too much length of Attribute arName"],
    trim: true
  }
}, { timestamps: true });

AttributeSchema.index({ name: 1 }, { unique: true });
AttributeSchema.index({ arName: 1 }, { unique: true });

export const AttributeModel = mongoose.model("Attribute", AttributeSchema);
