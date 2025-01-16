import React from 'react';
import { useGym } from '../context/GymContext';
import { LogIn, LogOut } from 'lucide-react';

export default function Attendance() {
  const { members, attendance, recordAttendance, recordCheckout } = useGym();

  const getMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  const isCheckedIn = (memberId: string) => {
    const latestAttendance = [...attendance]
      .reverse()
      .find(a => a.memberId === memberId);
    return latestAttendance && !latestAttendance.checkOutTime;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Member Check-in/out</h2>
          <div className="space-y-4">
            {members.map(member => {
              const checkedIn = isCheckedIn(member.id);
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.membershipType}</p>
                  </div>
                  <button
                    onClick={() => checkedIn ? recordCheckout(member.id) : recordAttendance(member.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                      checkedIn
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {checkedIn ? (
                      <>
                        <LogOut className="h-5 w-5" />
                        <span>Check Out</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5" />
                        <span>Check In</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[...attendance].reverse().slice(0, 10).map(record => (
              <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{getMemberName(record.memberId)}</h3>
                    <p className="text-sm text-gray-600">
                      Checked in: {new Date(record.checkInTime).toLocaleString()}
                    </p>
                    {record.checkOutTime && (
                      <p className="text-sm text-gray-600">
                        Checked out: {new Date(record.checkOutTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    record.checkOutTime ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {record.checkOutTime ? 'Completed' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}