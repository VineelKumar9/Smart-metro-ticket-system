import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, History, Settings, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTicket } from '../context/TicketContext';

const Profile: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const { getUserTickets } = useTicket();
  const [isEditing, setIsEditing] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600">You need to sign in to view your profile</p>
        </div>
      </div>
    );
  }

  const userTickets = getUserTickets(user.id);
  const totalSpent = userTickets.reduce((sum, ticket) => sum + ticket.fare, 0);
  const activeTickets = userTickets.filter(ticket => ticket.status === 'active').length;

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    // Update user data in context (simplified)
  };

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (amount > 0) {
      updateBalance(user.balance + amount);
      setRechargeAmount('');
      alert(`Successfully recharged ₹${amount}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.firstName}
                          onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{user.firstName}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.lastName}
                          onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{user.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Wallet & Recharge */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Wallet & Recharge</h2>
                
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 mb-1">Current Balance</p>
                      <p className="text-3xl font-bold">₹{user.balance.toFixed(2)}</p>
                    </div>
                    <CreditCard className="w-12 h-12 text-blue-200" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recharge Wallet</h3>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleRecharge}
                      disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Recharge
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    {[100, 200, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setRechargeAmount(amount.toString())}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Quick Actions */}
            <div className="space-y-6">
              {/* Travel Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Tickets</span>
                    <span className="font-bold text-blue-600">{userTickets.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Tickets</span>
                    <span className="font-bold text-green-600">{activeTickets}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-bold text-purple-600">₹{totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-bold text-gray-900">2024</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/book-ticket"
                    className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Book New Ticket</span>
                  </a>
                  <a
                    href="/my-tickets"
                    className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <History className="w-5 h-5" />
                    <span className="font-medium">View My Tickets</span>
                  </a>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Account Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;