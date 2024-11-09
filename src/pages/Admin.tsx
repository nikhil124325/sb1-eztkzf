import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, DollarSign, Settings, AlertTriangle, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user has admin privileges
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Total Users</h3>
            </div>
            <p className="text-2xl">{users.length}</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Active Sessions</h3>
            </div>
            <p className="text-2xl">{users.reduce((acc, user) => acc + (user.activeSessions || 0), 0)}</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Revenue</h3>
            </div>
            <p className="text-2xl">$5,234</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold">Issues</h3>
            </div>
            <p className="text-2xl">2</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3">Email</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {user.subscription}
                    </span>
                  </td>
                  <td className="py-3">{user.viewsRemaining}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-sm text-blue-500 hover:text-blue-400">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">System Settings</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Save Changes
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Max Concurrent Sessions</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
              defaultValue={10}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default View Duration (s)</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
              defaultValue={30}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">API Rate Limit</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
              defaultValue={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Session Timeout (min)</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
              defaultValue={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;