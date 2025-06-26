import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import MyTickets from './pages/MyTickets';
import RouteMap from './pages/RouteMap';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book-ticket" element={<BookTicket />} />
                <Route path="/my-tickets" element={<MyTickets />} />
                <Route path="/route-map" element={<RouteMap />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;