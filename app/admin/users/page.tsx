'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const itemsPerPage = 10;

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        console.error('Response status:', response.status);
        toast.error(`Failed to fetch users: ${response.status}`);
        setLoading(false);
        return;
      }

      const text = await response.text();
      console.log('Response text:', text);
      
      if (!text) {
        console.error('Empty response from API');
        toast.error('Empty response from server');
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        console.error('Invalid response format:', data);
        toast.error('Invalid response format from server');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  // Real-time polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + itemsPerPage);

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`/api/auth/register?id=${userId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  if (loading) {
    return (
      <AdminLayout currentPage="Users">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="Users">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Active Users</p>
            <p className="text-3xl font-bold text-green-600">{users.filter(u => u.role === 'user').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Admins</p>
            <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="date">Sort by Date (Newest)</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString('en-IN') : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <button
                          onClick={() => {
                            // View user details
                            toast.info(`User: ${user.name}\nEmail: ${user.email}`);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = currentPage > 3 ? currentPage - 2 + i : i + 1;
                    return page <= totalPages ? (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
