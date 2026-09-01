import mongoose from "mongoose";

const anmeldungSchema = new mongoose.Schema(
  {
    tour_type: {
      type: String,
      required: true,
    },
    tour_number: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tour",
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
    number_person: { type: Number, required: true, min: 3 },
    // Broj nocenja ovisi o vrsti ture (Tour 1 = 4, Tour 2 = 5, Tour 3 = 7)
    nights: { type: Number, required: true, min: 1 },
    // Prvo nocenje je uvijek subota, odlazak = dolazak + broj nocenja
    checkIn_date: { type: Date, required: true },
    checkOut_date: { type: Date, required: true },
    address: { type: String },
    phone: { type: String },
    transport: { type: String, required: true },
    rentaBike: { type: Boolean, require: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Anmeldung ||
  mongoose.model("Anmeldung", anmeldungSchema);
