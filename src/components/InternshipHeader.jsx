
import { Search, MapPin } from 'lucide-react';

export function InternshipHeader() {
  return (
    <div className="bg-[#F8EEDD] py-10 px-4 sm:px-8 lg:px-16">
      <h1 className="md:text-5xl text-4xl font-bold mb-2">Internships</h1>
      <p className="text-gray-700 mb-6">
        Find your perfect internship and build your career journey with us
      </p>
      <div className="flex flex-col sm:flex-row gap-4 bg-white px-6 py-4 sm:rounded-full rounded-xl shadow-md justify-between items-center">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5C5C60] w-5 h-5" />
          <input
            type="text"
            placeholder="Internship Title or Keyword"
            className="w-full rounded-lg py-2 pl-10 pr-4 outline-none focus:border-[#F4B860] transition"
          />
        </div>
        <div className="relative w-full sm:w-1/3 sm:border-l sm:border-gray-300 sm:pl-4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5C5C60] w-5 h-5" />
          <select className="w-full rounded-lg py-2 pl-10 pr-4 outline-none">
            <option>All Locations</option>
          </select>
        </div>
        <button className="bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full px-6 py-2">
          Find Internships
        </button>
      </div>
    </div>
  );
}
