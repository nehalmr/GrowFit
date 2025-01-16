import React from 'react';
import { Users, Calendar, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Total Members"
          value="256"
          trend="+12% this month"
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-green-500" />}
          title="Active Classes"
          value="12"
          trend="4 starting today"
        />
        <StatCard
          icon={<Activity className="h-8 w-8 text-purple-500" />}
          title="Check-ins Today"
          value="78"
          trend="85% of average"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-orange-500" />}
          title="Revenue"
          value="₹1,24,450"
          trend="+18% vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingClasses />
        <RecentCheckIns />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { 
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-sm text-gray-500">{trend}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function UpcomingClasses() {
  const classes = [
    { name: 'Yoga Flow', time: '10:00 AM', instructor: 'Sarah Miller', price: '₹1,500' },
    { name: 'HIIT Training', time: '11:30 AM', instructor: 'Mike Johnson', price: '₹2,000' },
    { name: 'Spin Class', time: '2:00 PM', instructor: 'Emma Davis', price: '₹1,800' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
      <div className="space-y-4">
        {classes.map((cls, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{cls.name}</h3>
              <p className="text-sm text-gray-600">{cls.instructor}</p>
              <p className="text-sm text-indigo-600">{cls.price}</p>
            </div>
            <span className="text-sm font-medium text-indigo-600">{cls.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentCheckIns() {
  const checkIns = [
    { name: 'John Smith', time: '9:45 AM', type: 'Check-in' },
    { name: 'Lisa Wong', time: '9:30 AM', type: 'Check-out' },
    { name: 'Robert Chen', time: '9:15 AM', type: 'Check-in' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Check-ins</h2>
      <div className="space-y-4">
        {checkIns.map((checkIn, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{checkIn.name}</h3>
              <p className="text-sm text-gray-600">{checkIn.type}</p>
            </div>
            <span className="text-sm font-medium text-indigo-600">{checkIn.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}