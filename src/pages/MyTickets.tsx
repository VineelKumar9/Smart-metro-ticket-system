import React from 'react';
import { Ticket, Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTicket } from '../context/TicketContext';
import { format } from 'date-fns';

const MyTickets: React.FC = () => {
  const { user } = useAuth();
  const { getUserTickets, cancelTicket } = useTicket();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600">You need to sign in to view your tickets</p>
        </div>
      </div>
    );
  }

  const userTickets = getUserTickets(user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'used': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelTicket = (ticketId: string) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      cancelTicket(ticketId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Tickets</h1>
            <p className="text-xl text-gray-600">Manage your metro tickets</p>
          </div>

          {userTickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tickets Found</h2>
              <p className="text-gray-600 mb-6">You haven't booked any tickets yet</p>
              <a
                href="/book-ticket"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Your First Ticket
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {userTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Ticket #{ticket.id}</h3>
                          <p className="text-sm text-gray-600">
                            Booked on {format(new Date(ticket.bookingDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        {ticket.status === 'active' && (
                          <button
                            onClick={() => handleCancelTicket(ticket.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Ticket"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Journey Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Journey Details</h4>
                        
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                          <div className="text-center">
                            <MapPin className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                            <div className="text-sm text-gray-600">From</div>
                            <div className="font-semibold text-gray-900">{ticket.from}</div>
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4"></div>
                          <div className="text-center">
                            <MapPin className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                            <div className="text-sm text-gray-600">To</div>
                            <div className="font-semibold text-gray-900">{ticket.to}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-sm text-gray-600">Travel Date</div>
                              <div className="font-semibold">{format(new Date(ticket.travelDate), 'MMM dd, yyyy')}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-sm text-gray-600">Travel Time</div>
                              <div className="font-semibold">{ticket.travelTime}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Ticket Details</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ticket Type</span>
                            <span className="font-semibold capitalize">{ticket.ticketType.replace('-', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Passengers</span>
                            <span className="font-semibold flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {ticket.passengers}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg">
                            <span className="font-bold text-gray-900">Total Fare</span>
                            <span className="font-bold text-blue-600">₹{ticket.fare.toFixed(2)}</span>
                          </div>
                        </div>

                        {ticket.status === 'active' && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-sm text-blue-800 font-medium">
                              Show this ticket at the metro station for entry
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    {ticket.status === 'active' && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center">
                          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
                              <p className="text-xs text-gray-600">QR Code</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                          Scan this QR code at the metro station
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;