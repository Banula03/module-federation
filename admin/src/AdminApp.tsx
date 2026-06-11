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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stats = [
  { label: 'Total Admins', value: '124', change: '+12%', trend: 'up', icon: ShieldCheck, color: 'text-black', bg: 'bg-white' },
  { label: 'Security Threats', value: '3', change: '-45%', trend: 'down', icon: ShieldAlert, color: 'text-white', bg: 'bg-neutral-800' },
  { label: 'Pending Access', value: '18', change: '+5', trend: 'up', icon: UserPlus, color: 'text-black', bg: 'bg-neutral-300' },
  { label: 'System Uptime', value: '99.98%', change: '+0.01%', trend: 'up', icon: Activity, color: 'text-white', bg: 'bg-neutral-900' },
];

const users = [
  { name: 'Sarah Chen', email: 'sarah.c@company.com', role: 'Super Admin', status: 'Active', avatar: 'SC' },
  { name: 'Michael Ross', email: 'm.ross@company.com', role: 'Security lead', status: 'Active', avatar: 'MR' },
  { name: 'James Wilson', email: 'j.wilson@company.com', role: 'Admin', status: 'Inactive', avatar: 'JW' },
  { name: 'Elena Rodriguez', email: 'e.rod@company.com', role: 'Auditor', status: 'Active', avatar: 'ER' },
  { name: 'David Kim', email: 'd.kim@company.com', role: 'Admin', status: 'Pending', avatar: 'DK' },
];

export default function AdminApp() {
  return (
    <div className="min-h-screen p-8 text-neutral-200 bg-transparent font-sans uppercase tracking-tight">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section (Internal to page) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white italic">
              Admin Control Center
            </h1>
            <p className="text-neutral-500 mt-1 text-[10px] font-bold tracking-widest uppercase">System-wide permissions and security protocols.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white hover:bg-neutral-200 text-black rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Administrator
            </button>
            <button className="p-2 bg-neutral-900 hover:bg-white hover:text-black text-neutral-400 rounded-lg transition-all border border-neutral-800">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-black border border-neutral-800 p-6 rounded-2xl hover:border-white transition-all group shadow-2xl">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-xl shadow-lg", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black tracking-widest",
                  stat.trend === 'up' ? "text-white" : "text-neutral-500"
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-neutral-500 text-[10px] font-bold tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1 group-hover:scale-105 transition-transform origin-left italic">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Table (2/3 width) */}
          <div className="lg:col-span-2 bg-black border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-4 bg-neutral-900/50">
              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                <h2 className="text-lg font-bold text-white tracking-widest uppercase">Administrators</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-[10px] font-black border border-neutral-700">
                  {users.length} Total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-black border border-neutral-800 rounded-lg py-1.5 pl-9 pr-4 text-[10px] font-bold focus:outline-none focus:border-white transition-all w-full md:w-48 placeholder:text-neutral-700"
                  />
                </div>
                <button className="p-2 bg-neutral-800 hover:bg-white hover:text-black text-neutral-500 rounded-lg border border-neutral-700 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-900/30">
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-800">User</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-800">Role</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-800">Status</th>
                    <th className="px-6 py-4 text-neutral-500 font-bold text-[10px] tracking-widest uppercase border-b border-neutral-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {users.map((user, i) => (
                    <tr key={i} className="hover:bg-neutral-900/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-black text-white">{user.name}</p>
                            <p className="text-[10px] text-neutral-600 font-bold lowercase tracking-normal italic mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-neutral-500" />
                          <span className="text-[10px] text-neutral-300 font-bold tracking-widest">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border",
                          user.status === 'Active' ? "bg-white text-black border-white" : 
                          user.status === 'Inactive' ? "bg-neutral-800 text-neutral-500 border-neutral-700" :
                          "bg-neutral-500 text-black border-neutral-400"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button className="p-2 hover:bg-neutral-800 text-neutral-700 hover:text-white rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-neutral-900 bg-neutral-950 flex items-center justify-between">
              <p className="text-[9px] text-neutral-600 font-black tracking-widest uppercase">Page 1 of 1</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-neutral-900 text-neutral-600 text-[10px] font-bold rounded border border-neutral-800 uppercase tracking-widest">Prev</button>
                <button className="px-3 py-1 bg-neutral-900 text-neutral-600 text-[10px] font-bold rounded border border-neutral-800 uppercase tracking-widest">Next</button>
              </div>
            </div>
          </div>

          {/* Activity Log (1/3 width) */}
          <div className="bg-black border border-neutral-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <h2 className="text-lg font-black text-white mb-8 tracking-widest uppercase italic shadow-2xl">Security Log</h2>
            <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-[1px] before:bg-neutral-900">
              {[
                { time: '2m ago', event: 'Admin login detected', type: 'white', user: 'Sarah Chen' },
                { time: '45m ago', event: 'Permissions modified', type: 'gray', user: 'System' },
                { time: '2h ago', event: 'New auditor created', type: 'white', user: 'M. Ross' },
                { time: '3h ago', event: 'Brute force blocked', type: 'black', user: 'Cloud Guard' },
                { time: '5h ago', event: 'Access token revoked', type: 'gray', user: 'Security Bot' },
              ].map((item, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className={cn(
                    "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-black z-10 transition-all group-hover:scale-125",
                    item.type === 'white' ? "bg-white" : 
                    item.type === 'gray' ? "bg-neutral-600" :
                    "bg-neutral-900"
                  )} />
                  <p className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.2em]">{item.time}</p>
                  <p className="text-xs font-bold text-neutral-200 mt-1 uppercase tracking-tight">{item.event}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 font-bold">BY <span className="text-white italic">{item.user}</span></p>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-neutral-900 hover:bg-white hover:text-black text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-neutral-800 rounded-xl">
              Audit Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
