export function InventoryKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Total SKU</p>
        <h3 className="text-[28px] font-bold text-[#0A58CA]">1,284</h3>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Out of Stock</p>
        <h3 className="text-[28px] font-bold text-red-600">12</h3>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Low Stock</p>
        <h3 className="text-[28px] font-bold text-orange-600">48</h3>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Inventory Value</p>
        <h3 className="text-[28px] font-bold text-gray-900">$242.5k</h3>
      </div>
    </div>
  );
}
