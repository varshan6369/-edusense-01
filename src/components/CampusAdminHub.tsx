import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  BookMarked,
  Bus,
  Leaf,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Zap,
  Droplet,
  Wind,
  Check,
  RotateCcw,
} from 'lucide-react';

interface BookRecord {
  id: string;
  title: string;
  author: string;
  isbn: string;
  shelf: string;
  status: 'Available' | 'Issued';
  borrower?: string;
  dueDate?: string;
}

const INITIAL_BOOKS: BookRecord[] = [
  { id: 'b1', title: 'Concepts of Physics (Vol 1 & 2)', author: 'Dr. H.C. Verma', isbn: '978-8177091878', shelf: 'Shelf P-14', status: 'Available' },
  { id: 'b2', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest', isbn: '978-0262033848', shelf: 'Shelf CS-03', status: 'Issued', borrower: 'Rahul Sharma', dueDate: '04 Oct 2026' },
  { id: 'b3', title: 'Vedic Mathematics', author: 'Swami Bharati Krishna Tirtha', isbn: '978-8120801646', shelf: 'Shelf IKS-01', status: 'Available' },
  { id: 'b4', title: 'Concise Inorganic Chemistry', author: 'J.D. Lee', isbn: '978-8126515547', shelf: 'Shelf C-09', status: 'Available' },
  { id: 'b5', title: 'Calculus: Early Transcendentals', author: 'James Stewart', isbn: '978-1285741550', shelf: 'Shelf M-05', status: 'Issued', borrower: 'Ananya Iyer', dueDate: '02 Oct 2026' },
];

export const CampusAdminHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'transport' | 'green'>('library');
  const [books, setBooks] = useState<BookRecord[]>(INITIAL_BOOKS);
  const [searchBook, setSearchBook] = useState<string>('');

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      b.author.toLowerCase().includes(searchBook.toLowerCase()) ||
      b.shelf.toLowerCase().includes(searchBook.toLowerCase())
  );

  const toggleBookStatus = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          if (b.status === 'Available') {
            return {
              ...b,
              status: 'Issued',
              borrower: 'Active Student',
              dueDate: '12 Oct 2026',
            };
          } else {
            return {
              ...b,
              status: 'Available',
              borrower: undefined,
              dueDate: undefined,
            };
          }
        }
        return b;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Banner */}
      <div className="clay-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-sky-500/30 border border-sky-400/40 text-sky-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                Theme E: Administration & Smart Campus Tools
              </span>
              <span className="text-xs text-sky-300 font-semibold hidden sm:inline">
                • Library Automation, Transport & Green Campus
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              School Productivity & Smart Campus Hub
            </h1>
            <p className="text-xs sm:text-sm text-sky-200 font-medium max-w-2xl leading-relaxed">
              Real-time library book circulation, active GPS bus transit routes, and solar/environmental sustainability monitoring.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'library' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" /> Library
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'transport' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bus className="w-3.5 h-3.5" /> Transport Live
            </button>
            <button
              onClick={() => setActiveTab('green')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'green' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" /> Green Campus
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: LIBRARY AUTOMATION */}
      {activeTab === 'library' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Digital Library Catalog & Automated Book Circulation
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Integrated RFID shelf location, instant book status toggles, and overdue trackers.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Search title, author, shelf..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-[#9B9BB8] font-black uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Book Title & Author</th>
                  <th className="p-3">ISBN</th>
                  <th className="p-3">Shelf Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Circulation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <p className="font-black text-slate-900 dark:text-white">{b.title}</p>
                      <p className="text-[11px] text-slate-500">{b.author}</p>
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{b.isbn}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                        {b.shelf}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          b.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status} {b.dueDate ? `(Due ${b.dueDate})` : ''}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleBookStatus(b.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          b.status === 'Available'
                            ? 'bg-sky-600 hover:bg-sky-700 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {b.status === 'Available' ? 'Issue Book' : 'Return Book'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSPORT TRACKER */}
      {activeTab === 'transport' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
                Live School Bus Transit Fleet Monitor
              </h3>
              <p className="text-xs text-[#9B9BB8] font-medium">
                Real-time GPS telemetry, scheduled stops, speed telemetry, and driver connectivity.
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Fleet Online: 8 Buses Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Bus className="w-4 h-4 text-sky-600" />
                  Route 04: CIRS Coimbatore Express
                </span>
                <span className="text-xs font-bold text-sky-600">ETA: 12 Mins</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p><strong>Current Location:</strong> Gandhipuram Crossway (Speed: 38 km/h)</p>
                <p><strong>Driver:</strong> S. Murugan (+91 98412 87654)</p>
                <p><strong>Capacity:</strong> 34 / 40 Students Boarded</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full w-3/4" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Bus className="w-4 h-4 text-amber-600" />
                  Route 07: Peelamedu & Airport Loop
                </span>
                <span className="text-xs font-bold text-emerald-600">Arrived at Campus</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p><strong>Current Location:</strong> Main Gate Bus Bay</p>
                <p><strong>Driver:</strong> K. Raman (+91 94431 12345)</p>
                <p><strong>Capacity:</strong> 40 / 40 All Students Deboarded</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GREEN CAMPUS & SUSTAINABILITY */}
      {activeTab === 'green' && (
        <div className="clay-card p-6 sm:p-7 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-black text-[#1A1A2E] dark:text-white">
              Green Campus Environmental Telemetry
            </h3>
            <p className="text-xs text-[#9B9BB8] font-medium">
              Live solar grid yield, rainwater harvesting volume, and classroom ambient air quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-center space-y-1">
              <Zap className="w-6 h-6 text-amber-500 mx-auto" />
              <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 block">
                Rooftop Solar Harvest
              </span>
              <span className="text-2xl font-black text-amber-900 dark:text-amber-200">
                48.2 kWh
              </span>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 font-bold">
                Offsetting 62% of campus load today
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 text-center space-y-1">
              <Droplet className="w-6 h-6 text-sky-500 mx-auto" />
              <span className="text-[10px] font-black uppercase text-sky-800 dark:text-sky-300 block">
                Rainwater Storage Tank
              </span>
              <span className="text-2xl font-black text-sky-900 dark:text-sky-200">
                18,400 L
              </span>
              <p className="text-[10px] text-sky-700 dark:text-sky-400 font-bold">
                84% reservoir capacity full
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-center space-y-1">
              <Wind className="w-6 h-6 text-emerald-500 mx-auto" />
              <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 block">
                Classroom Air Quality (AQI)
              </span>
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200">
                32 AQI (Good)
              </span>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                Optimal clean breathing environment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
