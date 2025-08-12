import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: {
    type: String, required: true, trim: true
  },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});
const Facility = mongoose.model('Facility', facilitySchema);
export default Facility; // Export the Facility model for use in other parts of the application
// export { facilitySchema }; // Export the schema if needed for further customization or validation
// export { Facility }; // Export the Facility model for use in other parts of the application  