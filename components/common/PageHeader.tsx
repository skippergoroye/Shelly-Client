interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold text-primary tracking-tight">{title}</h1>
      {description && <p className="text-md text-gray-400 font-medium mt-0.5">{description}</p>}
    </div>
  );
};
