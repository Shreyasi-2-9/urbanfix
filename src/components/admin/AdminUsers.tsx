import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Shield, UserCheck, CheckCircle2, XCircle } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { fieldWorkers, showToast } = useApp();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchUser, setSearchUser] = useState('');

  const demoUsers = [
    { id: 'usr-1', name: 'Aarav Kumar', email: 'aarav.kumar@example.com', role: 'Citizen', ward: 'Ward 12 · Bandra', status: 'Active', points: 1240 },
    { id: 'usr-2', name: 'Priya Sharma', email: 'priya.sharma@urbanfix.gov.in', role: 'Ward Officer', ward: 'Ward 12 · Bandra', status: 'Active', points: 3820 },
    { id: 'usr-3', name: 'Asha Nair', email: 'asha.nair@field.urbanfix.gov.in', role: 'Field Worker (Drainage)', ward: 'Ward 12 · Bandra', status: 'Active', points: 4190 },
    { id: 'usr-4', name: 'Vikramaditya Roy', email: 'v.roy@mcgm.gov.in', role: 'Super Admin', ward: 'All Wards (Headquarters)', status: 'Active', points: 9500 },
    { id: 'usr-5', name: 'Ravi Kumar', email: 'ravi.kumar@field.urbanfix.gov.in', role: 'Field Worker (Roads)', ward: 'Ward 12 · Bandra', status: 'Active', points: 3200 },
    { id: 'usr-6', name: 'Imran Ali', email: 'imran.ali@field.urbanfix.gov.in', role: 'Field Worker (Sanitation)', ward: 'Ward 12 · Bandra', status: 'Active', points: 2890 },
    { id: 'usr-7', name: 'Meera Shah', email: 'meera.shah@field.urbanfix.gov.in', role: 'Field Worker (Lighting)', ward: 'Ward 12 · Bandra', status: 'Active', points: 3100 },
    { id: 'usr-8', name: 'Rajesh Varma', email: 'rajesh.varma@urbanfix.gov.in', role: 'Ward Officer', ward: 'Ward A · Colaba', status: 'Active', points: 2750 },
    { id: 'usr-9', name: 'Karan Mehra', email: 'karan.mehra@urbanfix.gov.in', role: 'Ward Officer', ward: 'Ward K/West · Andheri', status: 'Active', points: 3400 },
  ];

  const filteredUsers = demoUsers.filter((u) => {
    if (roleFilter !== 'all' && !u.role.toLowerCase().includes(roleFilter.toLowerCase())) return false;
    if (searchUser) {
      const q = searchUser.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.ward.toLowerCase().includes(q);
    }
    return true;
  });

  const handleToggleStatus = (name: string) => {
    showToast(`User status toggled for ${name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
            User & Account Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Role assignments, permissions, and municipal directory access
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search user, email or ward..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                roleFilter === 'all' ? 'bg-[#176B4D] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Users ({demoUsers.length})
            </button>
            <button
              onClick={() => setRoleFilter('citizen')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                roleFilter === 'citizen' ? 'bg-[#176B4D] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Citizens
            </button>
            <button
              onClick={() => setRoleFilter('officer')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                roleFilter === 'officer' ? 'bg-[#176B4D] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Ward Officers
            </button>
            <button
              onClick={() => setRoleFilter('worker')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                roleFilter === 'worker' ? 'bg-[#176B4D] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Field Workers
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{u.name}</div>
                    <div className="text-[11px] text-gray-400">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{u.ward}</td>
                  <td className="py-3.5 px-3">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(u.name)}
                      className="text-xs text-[#176B4D] font-bold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

