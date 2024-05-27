import { Schema, model } from "mongoose";

const eventsSchema = new Schema(
  {
    clockId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Events = model("Events", eventsSchema);
