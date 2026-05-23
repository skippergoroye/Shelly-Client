"use client";

import { InventoryHeader } from "./_components/InventoryHeader";
import { InventoryKpiCards } from "./_components/InventoryKpiCards";
import { InventoryTable } from "./_components/InventoryTable";

export default function InventoryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <InventoryHeader />
      <InventoryKpiCards />
      <InventoryTable />
    </div>
  );
}

