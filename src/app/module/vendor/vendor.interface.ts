import { Types } from 'mongoose';

export type TVendorDetails = {
  user: Types.ObjectId;
  companyName: string;
  transportType: 'bus' | 'car' | 'truck' | 'microbus' | 'others';
  companyAddress: string;
};
