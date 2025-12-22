import mongoose from "mongoose";

const AttributeValueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "value title required"],
      minlength: [2, "too short value title"],
      trim: true
    },
    arTitle: {
      type: String,
      required: [true, "value arTitle required"],
      minlength: [2, "too short value arTitle"],
      trim: true
    },
    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: [true, "value must belong to attribute"]
    }
  },
  { timestamps: true }
);

AttributeValueSchema.index(
  { attribute: 1, title: 1 , arTitle: 1 },
  { unique: true }
);


export const AttributeValuesModel = mongoose.model("AttributeValues" , AttributeValueSchema)