import { ReactNode } from 'react';

export default interface Entanglement {
  [x: string]: ReactNode;
  businessLicense: any;
  respondentType: number;
  idReverse: any;
  evidence: any;
  idFront: any;
  id: string;
  name: string;
  courtId: string;
  createTime: string;
  createUserId: string;
  desc: string;
  peopleName: string;
  companyName: string;
}
