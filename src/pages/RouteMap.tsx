import React, { useState } from 'react';
import { MapPin, Clock, Train, Search } from 'lucide-react';

const RouteMap: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState('all');
  const [searchStation, setSearchStation] = useState('');

  const metroLines = [
    {
      id: 'red',
      name: 'Red Line (Corridor I)',
      color: 'bg-red-500',
      stations: [
        'Miyapur', 'JNTU College', 'KPHB Colony', 'Kukatpally', 'Balanagar', 'Moosapet',
        'Bharat Nagar', 'Erragadda', 'ESI Hospital', 'SR Nagar', 'Ameerpet', 'Punjagutta',
        'Irrum Manzil', 'Khairatabad', 'Lakdi-ka-pul', 'Assembly', 'Nampally', 'Gandhi Bhavan',
        'Osmania Medical College', 'MG Bus Station', 'Malakpet', 'New Market', 'Musarambagh',
        'Dilsukhnagar', 'Chaitanyapuri', 'Victoria Memorial', 'LB Nagar'
      ]
    },
    {
      id: 'blue',
      name: 'Blue Line (Corridor II)',
      color: 'bg-blue-500',
      stations: [
        'Nagole', 'Uppal', 'Survey Settlement', 'Nagole X Roads', 'Tarnaka', 'Habsiguda',
        'NGRI', 'Stadium', 'Gandhi Hospital', 'Musheerabad', 'RTC X Roads', 'Chikkadpally',
        'Narayanguda', 'Sultan Bazar', 'MG Bus Station', 'Malakpet', 'New Market', 'Musarambagh',
        'Dilsukhnagar', 'Chaitanyapuri', 'Victoria Memorial', 'LB Nagar', 'Kothaguda X Roads',
        'Shilparamam', 'Hitec City', 'Raidurg'
      ]
    },
    {
      id: 'green',
      name: 'Green Line (Corridor III)',
      color: 'bg-green-500',
      stations: [
        'JBS', 'Parade Ground', 'Secunderabad West', 'Gandhi Hospital', 'Musheerabad',
        'RTC X Roads', 'Chikkadpally', 'Narayanguda', 'Sultan Bazar', 'MGBS'
      ]
    }
  ];

  const filteredStations = metroLines
    .filter(line => selectedLine === 'all' || line.id === selectedLine)
    .flatMap(line => 
      line.stations
        .filter(station => station.toLowerCase().includes(searchStation.toLowerCase()))
        .map(station => ({ station, line: line.name, color: line.color }))
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hyderabad Metro Route Map</h1>
            <p className="text-xl text-gray-600">Explore the complete Hyderabad Metro network</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Station
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchStation}
                      onChange={(e) => setSearchStation(e.target.value)}
                      placeholder="Enter station name"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Metro Lines */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Metro Lines
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedLine('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedLine === 'all' 
                          ? 'bg-blue-100 text-blue-800 font-semibold' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All Lines
                    </button>
                    {metroLines.map((line) => (
                      <button
                        key={line.id}
                        onClick={() => setSelectedLine(line.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                          selectedLine === line.id 
                            ? 'bg-blue-100 text-blue-800 font-semibold' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${line.color}`}></div>
                        <span>{line.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Train className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Metro Station</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Interchange</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-600">Terminal</span>
                    </div>
                  </div>
                </div>

                {/* Metro Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Metro Info</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Operating Hours: 6:00 AM - 10:00 PM</div>
                    <div>Frequency: 3-5 minutes</div>
                    <div>Total Stations: 64</div>
                    <div>Total Length: 69.2 km</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Station List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedLine === 'all' ? 'All Stations' : `${metroLines.find(l => l.id === selectedLine)?.name} Stations`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {filteredStations.length} stations found
                  </span>
                </div>

                {selectedLine === 'all' ? (
                  /* All Lines View */
                  <div className="space-y-8">
                    {metroLines.map((line) => (
                      <div key={line.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-4 h-4 rounded-full ${line.color}`}></div>
                          <h4 className="text-lg font-semibold text-gray-900">{line.name}</h4>
                          <span className="text-sm text-gray-500">({line.stations.length} stations)</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {line.stations
                            .filter(station => station.toLowerCase().includes(searchStation.toLowerCase()))
                            .map((station, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Train className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{station}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Single Line View */
                  <div className="space-y-4">
                    {metroLines
                      .find(line => line.id === selectedLine)
                      ?.stations
                      .filter(station => station.toLowerCase().includes(searchStation.toLowerCase()))
                      .map((station, index, array) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${metroLines.find(l => l.id === selectedLine)?.color}`}></div>
                          {index < array.length - 1 && (
                            <div className={`w-0.5 h-8 ${metroLines.find(l => l.id === selectedLine)?.color}`}></div>
                          )}
                        </div>
                        <div className="flex-1 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{station}</span>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              {index === 0 || index === array.length - 1 ? (
                                <Clock className="w-4 h-4" />
                              ) : (
                                <Train className="w-4 h-4" />
                              )}
                              <span>
                                {index === 0 ? 'Terminal' : index === array.length - 1 ? 'Terminal' : 'Station'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredStations.length === 0 && searchStation && (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No stations found</h3>
                    <p className="text-gray-600">Try searching with a different keyword</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;