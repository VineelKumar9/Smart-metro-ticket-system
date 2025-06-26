import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Clock, CreditCard, Shield, MapPin, Ticket, Users, Star } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Ticket,
      title: 'Easy Booking',
      description: 'Book your Hyderabad Metro tickets in seconds with our intuitive interface'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Pay with cards, UPI, wallets, or maintain a prepaid balance'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get live train schedules and platform information'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your transactions and data are protected with bank-level security'
    }
  ];

  const stats = [
    { icon: Users, value: '1M+', label: 'Active Users' },
    { icon: Ticket, value: '25M+', label: 'Tickets Booked' },
    { icon: Train, value: '64', label: 'Metro Stations' },
    { icon: Star, value: '4.9', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hyderabad Metro
                <span className="block text-yellow-300">Smart Ticketing</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Experience seamless travel across Hyderabad with our intelligent metro ticket system. 
                Book, pay, and travel effortlessly across all three metro corridors.
              </p>
              
              <div className="flex flex-wrap gap-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>64 stations</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-ticket"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors transform hover:scale-105 shadow-lg text-center"
                >
                  Book Ticket Now
                </Link>
                <Link
                  to="/route-map"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors text-center"
                >
                  View Route Map
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://img.staticmb.com/mbcontent/images/uploads/2023/2/hyderabad-metro-phase-2.jpg.webp"
                  alt="Hyderabad Metro train"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hyderabad Metro?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most advanced metro ticketing system designed for modern Hyderabad commuters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Lines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Metro Network</h2>
            <p className="text-xl text-gray-600">Three corridors connecting the entire city</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                <h3 className="text-xl font-bold">Red Line (Corridor I)</h3>
              </div>
              <p className="text-red-100 mb-4">Miyapur to LB Nagar</p>
              <div className="text-sm text-red-100">
                <div>27 Stations • 29.2 km</div>
                <div>Major stops: Ameerpet, Punjagutta, Assembly</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                <h3 className="text-xl font-bold">Blue Line (Corridor II)</h3>
              </div>
              <p className="text-blue-100 mb-4">Nagole to Raidurg</p>
              <div className="text-sm text-blue-100">
                <div>26 Stations • 30 km</div>
                <div>Major stops: Hitec City, Stadium, Uppal</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                <h3 className="text-xl font-bold">Green Line (Corridor III)</h3>
              </div>
              <p className="text-green-100 mb-4">JBS to MGBS</p>
              <div className="text-sm text-green-100">
                <div>10 Stations • 10 km</div>
                <div>Major stops: Secunderabad, RTC X Roads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to book your metro ticket</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select Route</h3>
              <p className="text-gray-600">Choose your source and destination stations from our comprehensive network</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make Payment</h3>
              <p className="text-gray-600">Pay securely using your preferred payment method - cards, UPI, or wallet</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Travel Smart</h3>
              <p className="text-gray-600">Show your digital ticket and enjoy a seamless metro journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of commuters who trust Hyderabad Metro for their daily travel needs
          </p>
          <Link
            to="/book-ticket"
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors transform hover:scale-105 shadow-lg inline-block"
          >
            Book Your First Ticket
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;