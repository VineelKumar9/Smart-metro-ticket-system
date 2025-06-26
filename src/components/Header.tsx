import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, Menu, X, User, Ticket, Map, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Train },
    { name: 'Book Ticket', href: '/book-ticket', icon: Ticket },
    { name: 'My Tickets', href: '/my-tickets', icon: Ticket },
    { name: 'Route Map', href: '/route-map', icon: Map },
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Train className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">MetroLink</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    </div>
                    <span className="hidden md:block font-medium">{user.firstName}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-blue-600 font-medium">Balance: ₹{user.balance}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/my-tickets"
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Ticket className="w-4 h-4" />
                          <span>My Tickets</span>
                        </Link>
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Sign In</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                {user ? (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-red-600 px-4 py-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4 border-t">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                    >
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium w-full"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;