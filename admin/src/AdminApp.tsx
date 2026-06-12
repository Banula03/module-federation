import { 
  ShieldAlert, 
  UserPlus, 
  Settings, 
  Search, 
  Filter, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useState, useEffect } from 'react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stats = [
  { label: 'Total Admins', value: '124', change: '+12%', trend: 'up', icon: ShieldCheck, color: 'text-white', bg: 'bg-black' },
  { label: 'Security Threats', value: '3', change: '-45%', trend: 'down', icon: ShieldAlert, color: 'text-black', bg: 'bg-neutral-200' },
  { label: 'Pending Access', value: '18', change: '+5', trend: 'up', icon: UserPlus, color: 'text-white', bg: 'bg-neutral-300' },
  { label: 'System Uptime', value: '99.98%', change: '+0.01%', trend: 'up', icon: Activity, color: 'text-black', bg: 'bg-neutral-100' },
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

export default function AdminApp() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Add User State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Admin');

  // Fetch users from the Dashboard BFF
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/users');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Invalid user data received:', data);
        setUsers([]); // Fallback to empty array so .map doesn't crash
      }
    } catch (error) {
      console.error('Failed to fetch administrators:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      
      if (response.ok) {
        // Optimistically update local state or re-fetch
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          status: 'Active' // Default to Active as defined in the plan
        }),
      });
      
      if (response.ok) {
        const createdUser = await response.json();
        setUsers(prev => [...prev, createdUser]); // Optimistic update
        setIsAddModalOpen(false); // Close Modal
        
        // Reset form
        setNewUserName('');
        setNewUserEmail('');
        setNewUserRole('Admin');
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 text-neutral-800 bg-transparent font-sans uppercase tracking-tight">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section (Internal to page) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-black italic">
              Admin Control Center
            </h1>
            <p className="text-neutral-500 mt-1 text-[10px] font-bold tracking-widest uppercase">System-wide permissions and security protocols.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add Administrator
            </button>
            <button className="p-2 bg-neutral-100 hover:bg-black hover:text-white text-neutral-600 rounded-lg transition-all border border-neutral-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-neutral-200 p-6 rounded-2xl hover:border-black transition-all group shadow-2xl">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-xl shadow-lg", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black tracking-widest",
                  stat.trend === 'up' ? "text-black" : "text-neutral-500"
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-neutral-500 text-[10px] font-bold tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-black mt-1 group-hover:scale-105 transition-transform origin-left italic">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Table (2/3 width) */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between flex-wrap gap-4 bg-neutral-100/50">
              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                <h2 className="text-lg font-bold text-black tracking-widest uppercase">Administrators</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 text-[10px] font-black border border-neutral-300">
                  {users.length} Total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-white border border-neutral-200 rounded-lg py-1.5 pl-9 pr-4 text-[10px] font-bold focus:outline-none focus:border-black transition-all w-full md:w-48 placeholder:text-neutral-300"
                  />
                </div>
                <button className="p-2 bg-neutral-200 hover:bg-black hover:text-white text-neutral-500 rounded-lg border border-neutral-300 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-100/30">
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-200">User</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-200">Role</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-200">Status</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-neutral-500 animate-pulse font-bold tracking-widest uppercase">Synchronizing with BFF...</td>
                    </tr>
                  ) : users.map((user, i) => (
                    <tr key={i} className="hover:bg-neutral-100/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-black text-black">{user.name}</p>
                            <p className="text-[10px] text-neutral-400 font-bold lowercase tracking-normal italic mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-neutral-500" />
                          <span className="text-[10px] text-neutral-700 font-bold tracking-widest">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <span className={cn(
                            "px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border text-center w-full max-w-[100px]",
                            user.status === 'Active' ? "bg-black text-white border-black" : 
                            user.status === 'Inactive' ? "bg-neutral-200 text-neutral-500 border-neutral-300" :
                            "bg-neutral-500 text-white border-neutral-400"
                          )}>
                            {user.status}
                          </span>
                          <div className="flex items-center gap-1">
                            {user.status === 'Active' ? (
                              <button 
                                onClick={() => handleStatusChange(user.id, 'Inactive')}
                                className="text-[8px] font-black text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
                              >
                                [Deactivate]
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleStatusChange(user.id, 'Active')}
                                className="text-[8px] font-black text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
                              >
                                [Activate]
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button className="p-2 hover:bg-neutral-200 text-neutral-300 hover:text-black rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-neutral-900 bg-neutral-50 flex items-center justify-between">
              <p className="text-[9px] text-neutral-400 font-black tracking-widest uppercase">Page 1 of 1</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-neutral-100 text-neutral-400 text-[10px] font-bold rounded border border-neutral-200 uppercase tracking-widest">Prev</button>
                <button className="px-3 py-1 bg-neutral-100 text-neutral-400 text-[10px] font-bold rounded border border-neutral-200 uppercase tracking-widest">Next</button>
              </div>
            </div>
          </div>

          {/* Activity Log (1/3 width) */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <h2 className="text-lg font-black text-black mb-8 tracking-widest uppercase italic shadow-2xl">Security Log</h2>
            <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-[1px] before:bg-neutral-100">
              {[
                { time: '2m ago', event: 'Admin login detected', type: 'white', user: 'Sarah Chen' },
                { time: '45m ago', event: 'Permissions modified', type: 'gray', user: 'System' },
                { time: '2h ago', event: 'New auditor created', type: 'white', user: 'M. Ross' },
                { time: '3h ago', event: 'Brute force blocked', type: 'black', user: 'Cloud Guard' },
                { time: '5h ago', event: 'Access token revoked', type: 'gray', user: 'Security Bot' },
              ].map((item, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className={cn(
                    "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white z-10 transition-all group-hover:scale-125",
                    item.type === 'white' ? "bg-black" : 
                    item.type === 'gray' ? "bg-neutral-600" :
                    "bg-neutral-100"
                  )} />
                  <p className="text-[9px] text-neutral-400 font-black uppercase tracking-[0.2em]">{item.time}</p>
                  <p className="text-xs font-bold text-neutral-800 mt-1 uppercase tracking-tight">{item.event}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 font-bold">BY <span className="text-black italic">{item.user}</span></p>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-neutral-100 hover:bg-black hover:text-white text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-neutral-200 rounded-xl">
              Audit Archive
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <h2 className="text-2xl font-black text-black italic mb-2">Create Administrator</h2>
            <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mb-6">Enter details for the new system admin.</p>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black tracking-widest text-neutral-600 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={newUserName} 
                  onChange={e => setNewUserName(e.target.value)} 
                  className="w-full bg-white border border-neutral-200 rounded-lg py-2 px-4 text-xs font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-neutral-300" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-neutral-600 mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={newUserEmail} 
                  onChange={e => setNewUserEmail(e.target.value)} 
                  className="w-full bg-white border border-neutral-200 rounded-lg py-2 px-4 text-xs font-bold lowercase text-black focus:outline-none focus:border-black transition-all placeholder:text-neutral-300 placeholder:uppercase" 
                  placeholder="john.doe@company.com" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-neutral-600 mb-1">Role</label>
                <select 
                  value={newUserRole} 
                  onChange={e => setNewUserRole(e.target.value)} 
                  className="w-full bg-white border border-neutral-200 rounded-lg py-2 px-4 text-xs font-bold uppercase tracking-widest text-black focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Security Lead">Security Lead</option>
                  <option value="Auditor">Auditor</option>
                </select>
              </div>
              <div className="flex gap-4 mt-8 pt-4 border-t border-neutral-200">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)} 
                  className="flex-1 py-3 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-black text-white hover:bg-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-white/10"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
