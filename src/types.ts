export interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: 'basic' | 'premium' | 'platinum';
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  price: number;
}

export interface Attendance {
  id: string;
  memberId: string;
  checkInTime: string;
  checkOutTime?: string;
}