import React, { createContext, useContext, useState, useCallback } from 'react';
import { Member, Class, Attendance } from '../types';
import { format } from 'date-fns';

interface GymContextType {
  members: Member[];
  classes: Class[];
  attendance: Attendance[];
  addMember: (member: Omit<Member, 'id'>) => void;
  deleteMember: (id: string) => void;
  addClass: (classItem: Omit<Class, 'id'>) => void;
  deleteClass: (id: string) => void;
  recordAttendance: (memberId: string) => void;
  recordCheckout: (memberId: string) => void;
  enrollInClass: (classId: string, memberId: string) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      membershipType: 'premium',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      membershipType: 'basic',
      joinDate: '2024-02-01',
      status: 'active'
    }
  ]);

  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Yoga Flow',
      instructor: 'Sarah Miller',
      time: '10:00 AM',
      duration: 60,
      capacity: 20,
      enrolled: 12,
      price: 1500
    },
    {
      id: '2',
      name: 'HIIT Training',
      instructor: 'Mike Johnson',
      time: '11:30 AM',
      duration: 45,
      capacity: 15,
      enrolled: 8,
      price: 2000
    }
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const addMember = useCallback((member: Omit<Member, 'id'>) => {
    const newMember = {
      ...member,
      id: Math.random().toString(36).substr(2, 9)
    };
    setMembers(prev => [...prev, newMember]);
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  const addClass = useCallback((classItem: Omit<Class, 'id'>) => {
    const newClass = {
      ...classItem,
      id: Math.random().toString(36).substr(2, 9)
    };
    setClasses(prev => [...prev, newClass]);
  }, []);

  const deleteClass = useCallback((id: string) => {
    setClasses(prev => prev.filter(classItem => classItem.id !== id));
  }, []);

  const recordAttendance = useCallback((memberId: string) => {
    const newAttendance: Attendance = {
      id: Math.random().toString(36).substr(2, 9),
      memberId,
      checkInTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };
    setAttendance(prev => [...prev, newAttendance]);
  }, []);

  const recordCheckout = useCallback((memberId: string) => {
    setAttendance(prev => {
      const latestAttendance = [...prev]
        .reverse()
        .find(a => a.memberId === memberId && !a.checkOutTime);
      
      if (latestAttendance) {
        return prev.map(a => 
          a.id === latestAttendance.id 
            ? { ...a, checkOutTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss') }
            : a
        );
      }
      return prev;
    });
  }, []);

  const enrollInClass = useCallback((classId: string, memberId: string) => {
    setClasses(prev => 
      prev.map(c => 
        c.id === classId && c.enrolled < c.capacity
          ? { ...c, enrolled: c.enrolled + 1 }
          : c
      )
    );
  }, []);

  return (
    <GymContext.Provider value={{
      members,
      classes,
      attendance,
      addMember,
      deleteMember,
      addClass,
      deleteClass,
      recordAttendance,
      recordCheckout,
      enrollInClass
    }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
}