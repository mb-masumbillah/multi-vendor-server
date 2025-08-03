import { model, Schema } from 'mongoose';
import { TVendorDetails } from './vendor.interface';


const vendorSchema = new Schema<TVendorDetails>(
 {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    transportType: {
      type: String,
      enum: ['bus', 'car', 'truck', 'microbus', 'others'],
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);


export const Vendor = model<TVendorDetails>('Vendor', vendorSchema);
