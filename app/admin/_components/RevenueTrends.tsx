export function RevenueTrends() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
        <select className="text-sm border-gray-200 rounded-md py-1.5 pl-3 pr-8 focus:ring-blue-500">
          <option>Monthly View</option>
          <option>Weekly View</option>
        </select>
      </div>
      
      {/* Simulated Chart */}
      <div className="h-64 flex items-end justify-between gap-2 relative">
        <div className="absolute w-full border-t border-gray-100 top-1/4"></div>
        <div className="absolute w-full border-t border-gray-100 top-2/4"></div>
        <div className="absolute w-full border-t border-gray-100 top-3/4"></div>
        
        {[30, 40, 35, 50, 45, 65, 55, 75, 70, 65, 68, 90].map((h, i) => (
          <div key={i} className="w-full flex flex-col justify-end h-full z-10 group">
            <div 
              className={`w-full rounded-t-sm transition-all duration-300 ${i === 11 ? 'bg-[#8CA8D1]' : i === 7 ? 'bg-[#A3BCE1]' : 'bg-[#E2E8F0] group-hover:bg-[#CBD5E1]'}`}
              style={{ height: `${h}%` }}
            >
              {(i === 11 || i === 7) && <div className="w-full h-1 bg-[#0A58CA] rounded-t-sm"></div>}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 tracking-wider">
        <span>WEEK 1</span>
        <span>WEEK 2</span>
        <span>WEEK 3</span>
        <span>WEEK 4</span>
      </div>
    </div>
  );
}
