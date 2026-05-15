import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// export { Skeleton }



interface TableSkeletonProps {
    rows?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5 }) => {
    return (
        <div className='space-y-2'>
            {[...Array(rows)].map((_, index) => (
                <Skeleton key={index++} className='h-6 w-full rounded-md' />
            ))}
        </div>
    );
};

export { Skeleton, TableSkeleton };
