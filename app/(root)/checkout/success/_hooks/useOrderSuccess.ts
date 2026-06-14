"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseNameAndSize } from "@/lib/utils";

export interface OrderItem {
  id: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
  category: string;
}

export interface OrderData {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function useOrderSuccess() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("shelly_last_order");
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch {
        // invalid data
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!order) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const PRIMARY = "#2563EB";
    const PAGE_W = doc.internal.pageSize.getWidth();
    const MARGIN = 48;
    const CONTENT_W = PAGE_W - MARGIN * 2;
    let y = 0;

    // Header bar
    doc.setFillColor(PRIMARY);
    doc.rect(0, 0, PAGE_W, 72, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#ffffff");
    doc.text("Shelly Collections", MARGIN, 38);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("ORDER INVOICE", MARGIN, 56);
    y = 100;

    // Order meta
    doc.setTextColor("#1e293b");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Order #${order.orderNumber}`, MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#64748b");
    doc.text(`Date: ${order.orderDate}`, MARGIN, y + 16);
    doc.text(`Est. Delivery: ${order.estimatedDelivery}`, MARGIN, y + 30);
    y += 58;

    // Divider
    doc.setDrawColor(PRIMARY);
    doc.setLineWidth(1.5);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 18;

    // Items table header
    doc.setFillColor("#eff6ff");
    doc.rect(MARGIN, y, CONTENT_W, 22, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(PRIMARY);
    doc.text("ITEM", MARGIN + 8, y + 14);
    doc.text("QTY", MARGIN + CONTENT_W * 0.62, y + 14);
    doc.text("UNIT PRICE", MARGIN + CONTENT_W * 0.72, y + 14);
    doc.text("TOTAL", MARGIN + CONTENT_W * 0.88, y + 14);
    y += 30;

    // Item rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    order.items.forEach((item, idx) => {
      const { baseName, size } = parseNameAndSize(item.name);
      const label = `${baseName}${size ? ` — ${size}` : ""}`;
      const lineTotal = item.price * item.quantity;

      if (idx % 2 === 0) {
        doc.setFillColor("#f8fafc");
        doc.rect(MARGIN, y - 4, CONTENT_W, 20, "F");
      }

      doc.setTextColor("#1e293b");
      doc.text(label, MARGIN + 8, y + 10, { maxWidth: CONTENT_W * 0.58 });
      doc.text(String(item.quantity), MARGIN + CONTENT_W * 0.62, y + 10);
      doc.text(`NGN ${item.price.toLocaleString()}`, MARGIN + CONTENT_W * 0.72, y + 10);
      doc.text(`NGN ${lineTotal.toLocaleString()}`, MARGIN + CONTENT_W * 0.88, y + 10);
      y += 22;
    });

    y += 10;

    // Totals
    doc.setDrawColor("#e2e8f0");
    doc.setLineWidth(0.5);
    doc.line(MARGIN + CONTENT_W * 0.6, y, PAGE_W - MARGIN, y);
    y += 14;

    const totalsX = MARGIN + CONTENT_W * 0.6;
    const valX = PAGE_W - MARGIN;

    const row = (label: string, value: string, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(bold ? 10 : 9);
      doc.setTextColor(bold ? PRIMARY : "#64748b");
      doc.text(label, totalsX, y);
      doc.text(value, valX, y, { align: "right" });
      y += bold ? 18 : 16;
    };

    row("Subtotal", `NGN ${order.subtotal.toLocaleString()}`);
    row("Shipping", "FREE");
    row("VAT (8%)", `NGN ${order.tax.toFixed(2)}`);
    y += 4;
    doc.setDrawColor(PRIMARY);
    doc.setLineWidth(1);
    doc.line(totalsX, y, PAGE_W - MARGIN, y);
    y += 12;
    row("TOTAL", `NGN ${order.total.toFixed(2)}`, true);

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 40;
    doc.setFillColor(PRIMARY);
    doc.rect(0, footerY, PAGE_W, 40, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor("#ffffff");
    doc.text("Thank you for shopping with Shelly Collections!", PAGE_W / 2, footerY + 24, { align: "center" });

    doc.save(`shelly-invoice-${order.orderNumber}.pdf`);
  };

  return { router, order, mounted, handleDownload };
}
