import { Schema, model } from "mongoose";

const clocksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
    events: {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  },
  { timestamps: true }
);

export const Clocks = model("Clocks", clocksSchema);
