import { Wallet, ShoppingBag, Package } from "lucide-react";

export function KpiCards() {
  return (
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
  );
}
