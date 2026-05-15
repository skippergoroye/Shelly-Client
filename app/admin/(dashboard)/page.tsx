import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Wallet, ShoppingBag, Package } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back, Administrator. Here's what's happening with LUXE today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-[#0A58CA]">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">+12.5%</span>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total Sales</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">$128,430.00</h3>
          <p className="text-xs text-gray-500">vs. $114,160 last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-[#0A58CA]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">+8.2%</span>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">1,240</h3>
          <p className="text-xs text-gray-500">vs. 1,146 last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-[#0A58CA]">
              <Package className="w-5 h-5" />
            </div>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">Stable</span>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Active Products</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">432</h3>
          <p className="text-xs text-gray-500">Across 8 categories</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trends */}
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

        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Categories</h3>
          
          <div className="space-y-6 flex-1">
            {[
              { name: "Premium Leather Goods", p: 42 },
              { name: "Timepieces", p: 28 },
              { name: "Ready-to-Wear", p: 18 },
              { name: "Accessories", p: 12 },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">{cat.name}</span>
                  <span className="font-bold text-[#0A58CA]">{cat.p}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A58CA]" style={{ width: `${cat.p}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-2.5 text-sm font-semibold text-[#0A58CA] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            View Full Inventory Report
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button className="text-sm font-semibold text-[#0A58CA] hover:text-blue-800 flex items-center gap-1">
            View All <span className="text-lg leading-none">›</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-bold text-gray-600 bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 rounded-tl-md">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: "#LX-8890", init: "JS", name: "Julianne Smith", date: "Oct 24, 2023", total: "$2,450.00", status: "COMPLETED", color: "bg-green-100 text-green-700" },
                { id: "#LX-8891", init: "MR", name: "Marcus Reed", date: "Oct 24, 2023", total: "$890.00", status: "PENDING", color: "bg-yellow-100 text-yellow-700" },
                { id: "#LX-8892", init: "EL", name: "Elena Laurent", date: "Oct 23, 2023", total: "$12,100.00", status: "COMPLETED", color: "bg-green-100 text-green-700" },
                { id: "#LX-8893", init: "DB", name: "David Brooks", date: "Oct 23, 2023", total: "$450.00", status: "CANCELLED", color: "bg-red-100 text-red-700" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#0A58CA]">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {row.init}
                      </div>
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{row.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 4 of 24 transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A58CA] hover:bg-[#084298] rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
