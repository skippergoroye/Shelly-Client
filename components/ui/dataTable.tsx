"use client";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import Image from "next/image";
// import NoImage from "../../../public/images/no-data.png";
import clsx from "clsx";
import { TableSkeleton } from "./skeleton";
// import { TableSkeleton } from "./skeleton";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    columnVisibility?: {};
    setColumnVisibility?: any;
    emptyDataMessage?: string | ReactNode;
    className?: string;
    loading?: boolean;
    selectedRows?: TData[];
}

function DataTable<TData, TValue>({
    columns,
    data,
    columnVisibility,
    setColumnVisibility,
    emptyDataMessage = "No Transactions available.",
    className,
    loading,
    selectedRows = [],
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={clsx("rounded-md border overflow-y-auto", className)}>
            <Table className='font-averta text-sm'>
                <TableHeader className='bg-[#F8F8F8]'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className='bg-[#F8F8F8]'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                {!loading && (
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    <div className='flex flex-col justify-center items-center my-10 gap-3'>
                                        {/* <Image src={NoImage} alt='table Data' /> */}
                                        <p className='text-[#18425D] font-medium'>
                                            {emptyDataMessage}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                )}
            </Table>

            {loading && (
                <div className='w-full p-2'>
                    <TableSkeleton />
                </div>
            )}
        </div>
    );
}

export default DataTable;
