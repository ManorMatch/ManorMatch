import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('database connected')
});

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  telephoneNumber: String,
  email: String,
  password: String
})

const vendorSchema = new mongoose.Schema({
  name: String,
  serviceDescription: String,
  category: String,
  telephoneNumber: String,
  email: String,
  price: Number,
  photo: String,
  specialties: [{ specialty1: String,
                  specialty2: String,
                  specialty3: String,
                  specialty4: String,
                  specialty5: String}]
})

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  services: [{
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    category: String,
    price: Number,
  }],
  jobDate: Date,
  completed: Boolean,
});


const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  createdAt: Date
})

const serviceSchema = new mongoose.Schema({
  category: String,
  description: String,
  photo: String,
  serviceDetails: { detail1: String,
                     detail2: String,
                     detail3: String,
                     detail4: String,
                     detail5: String }
})

const addressSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
})

const Customer = mongoose.model('Customer', customerSchema);

const Vendor = mongoose.model('Vendor', vendorSchema);

const Booking = mongoose.model('Booking', bookingSchema);

const Message = mongoose.model('Message', messageSchema);

const Service = mongoose.model('Service', serviceSchema);

const Address = mongoose.model('Address', addressSchema);

export default { Customer, Vendor, Booking, Message, Service, Address };