import React, { useState } from 'react';
import { MapPin, ArrowRight, Clock, CreditCard, Ticket, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTicket } from '../context/TicketContext';

const BookTicket: React.FC = () => {
  const { user } = useAuth();
  const { bookTicket } = useTicket();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    passengers: 1,
    ticketType: 'single',
    travelDate: new Date().toISOString().split('T')[0],
    travelTime: '09:00'
  });
  const [fare, setFare] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  // Hyderabad Metro stations
  const stations = [
    // Red Line (Miyapur to LB Nagar)
    'Miyapur', 'JNTU College', 'KPHB Colony', 'Kukatpally', 'Balanagar', 'Moosapet',
    'Bharat Nagar', 'Erragadda', 'ESI Hospital', 'SR Nagar', 'Ameerpet', 'Punjagutta',
    'Irrum Manzil', 'Khairatabad', 'Lakdi-ka-pul', 'Assembly', 'Nampally', 'Gandhi Bhavan',
    'Osmania Medical College', 'MG Bus Station', 'Malakpet', 'New Market', 'Musarambagh',
    'Dilsukhnagar', 'Chaitanyapuri', 'Victoria Memorial', 'LB Nagar',
    
    // Blue Line (Nagole to Raidurg)
    'Nagole', 'Uppal', 'Survey Settlement', 'Nagole X Roads', 'Tarnaka', 'Habsiguda',
    'NGRI', 'Stadium', 'Gandhi Hospital', 'Musheerabad', 'RTC X Roads', 'Chikkadpally',
    'Narayanguda', 'Sultan Bazar', 'Kothaguda X Roads', 'Shilparamam', 'Hitec City', 'Raidurg',
    
    // Green Line (JBS to MGBS)
    'JBS', 'Parade Ground', 'Secunderabad West', 'MGBS'
  ];

  const calculateFare = (from: string, to: string, passengers: number, ticketType: string) => {
    if (!from || !to) return 0;
    
    const baseDistance = Math.abs(stations.indexOf(from) - stations.indexOf(to));
    let baseFare = Math.max(15, baseDistance * 1.5);
    
    if (ticketType === 'return') baseFare *= 1.8;
    if (ticketType === 'day-pass') baseFare = 150;
    
    return baseFare * passengers;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    if (name === 'from' || name === 'to' || name === 'passengers' || name === 'ticketType') {
      const newFare = calculateFare(newFormData.from, newFormData.to, parseInt(newFormData.passengers.toString()), newFormData.ticketType);
      setFare(newFare);
    }
  };

  const handleBookTicket = async () => {
    if (!user) {
      alert('Please sign in to book tickets');
      return;
    }

    if (!formData.from || !formData.to) {
      alert('Please select both source and destination stations');
      return;
    }

    if (formData.from === formData.to) {
      alert('Source and destination cannot be the same');
      return;
    }

    setIsBooking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      const ticket = {
        id: `HYD${Date.now()}`,
        from: formData.from,
        to: formData.to,
        passengers: formData.passengers,
        ticketType: formData.ticketType,
        fare: fare,
        travelDate: formData.travelDate,
        travelTime: formData.travelTime,
        bookingDate: new Date().toISOString(),
        status: 'active',
        userId: user.id
      };
      
      bookTicket(ticket);
      alert('Ticket booked successfully!');
      
      // Reset form
      setFormData({
        from: '',
        to: '',
        passengers: 1,
        ticketType: 'single',
        travelDate: new Date().toISOString().split('T')[0],
        travelTime: '09:00'
      });
      setFare(0);
    } catch (error) {
      alert('Failed to book ticket. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Hyderabad Metro Ticket</h1>
            <p className="text-xl text-gray-600">Fast, easy, and secure ticket booking for Hyderabad Metro</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Journey Details</h2>
                
                <div className="space-y-6">
                  {/* Route Selection */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        From Station
                      </label>
                      <select
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select source station</option>
                        {stations.map((station) => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        To Station
                      </label>
                      <select
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select destination station</option>
                        {stations.map((station) => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Journey Preview */}
                  {formData.from && formData.to && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">From</div>
                            <div className="font-semibold text-gray-900">{formData.from}</div>
                          </div>
                          <ArrowRight className="w-6 h-6 text-blue-600" />
                          <div className="text-center">
                            <div className="text-sm text-gray-600">To</div>
                            <div className="font-semibold text-gray-900">{formData.to}</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Distance</div>
                          <div className="font-semibold text-gray-900">
                            {Math.abs(stations.indexOf(formData.from) - stations.indexOf(formData.to)) * 1.2} km
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ticket Options */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Passengers
                      </label>
                      <input
                        type="number"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleInputChange}
                        min="1"
                        max="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Ticket className="w-4 h-4 inline mr-1" />
                        Ticket Type
                      </label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="single">Single Journey</option>
                        <option value="return">Return Journey</option>
                        <option value="day-pass">Day Pass</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Travel Date
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Travel Time
                    </label>
                    <input
                      type="time"
                      name="travelTime"
                      value={formData.travelTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fare Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fare Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-semibold">₹{fare > 0 ? (fare / formData.passengers).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers</span>
                    <span className="font-semibold">{formData.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Type</span>
                    <span className="font-semibold capitalize">{formData.ticketType.replace('-', ' ')}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Total Fare</span>
                      <span className="font-bold text-blue-600">₹{fare.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {user && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Wallet Balance</span>
                      <span className="font-semibold text-blue-600">₹{user.balance}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBookTicket}
                  disabled={!formData.from || !formData.to || fare === 0 || isBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isBooking ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Book Ticket</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Secure payment powered by bank-level encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;