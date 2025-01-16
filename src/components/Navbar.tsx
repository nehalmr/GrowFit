import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Users, Calendar, ClipboardList } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-indigo-600 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:text-indigo-200">
          <Dumbbell className="h-8 w-8" />
          <span className="text-xl font-bold">GrowFit</span>
        </Link>
        <div className="flex space-x-6">
          <NavItem 
            to="/members"
            icon={<Users className="h-5 w-5" />} 
            text="Members" 
            active={location.pathname === '/members'}
          />
          <NavItem 
            to="/classes"
            icon={<Calendar className="h-5 w-5" />} 
            text="Classes" 
            active={location.pathname === '/classes'}
          />
          <NavItem 
            to="/attendance"
            icon={<ClipboardList className="h-5 w-5" />} 
            text="Attendance" 
            active={location.pathname === '/attendance'}
          />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, text, active }: { 
  to: string;
  icon: React.ReactNode; 
  text: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 transition-colors ${
        active ? 'text-white' : 'text-indigo-200 hover:text-white'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}