"use client";

import { Plus } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { PageHeader } from "@/components/common/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ORDER_TABS } from "./constants";
import { OrderMetricsCards } from "./_components/OrderMetricsCards";
import OrdersTable from "./_components/OrdersTable";



const Order = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Order Management"
          description="Oversee bespoke craft fulfillment and logistical workflows."
        />

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <SubmitButton
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
          >
            <Plus />
            Export Orders
          </SubmitButton>
        </div>
      </div>


      <OrderMetricsCards />

      <Tabs defaultValue="all" className="flex-col">
        <TabsList className="flex flex-wrap items-center gap-2 bg-transparent p-0 h-auto w-137.5 justify-start">
          {ORDER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-500 shadow-none transition-all
                data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary
                hover:border-primary/40 hover:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ORDER_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-5">
            <OrdersTable statusFilter={tab.filter} />
          </TabsContent>
        ))}
      </Tabs>


   



    </div>
  );
};

export default Order;