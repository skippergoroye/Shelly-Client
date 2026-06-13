import Link from "next/link";
import { usePathname } from "next/navigation";
import useReportStore from "@/app/stores/useReportStore";

interface TableViewLinkProps {
  row: { id: number };
  rawItems: Map<number, Record<string, unknown>>;
}

const TableViewLink = ({ row, rawItems }: TableViewLinkProps) => {
  const pathname = usePathname();
  const { setSelectedItem } = useReportStore();
  return (
    <Link
      href={`${pathname}/${row.id}`}
      className="text-primary hover:underline text-sm font-medium"
      onClick={() => {
        const item = rawItems.get(row.id);
        if (item) setSelectedItem(item);
      }}
    >
      View
    </Link>
  );
};

export default TableViewLink;
