import SubmitButton from "@/components/shared/SubmitButton";

export function TopCategories() {
  return (
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

      <SubmitButton type="button" className="w-full mt-8 py-2.5 text-sm font-semibold text-[#0A58CA] border border-gray-200 bg-white rounded-md hover:bg-gray-50 transition-colors shadow-sm h-auto">
        View Full Inventory Report
      </SubmitButton>
    </div>
  );
}
