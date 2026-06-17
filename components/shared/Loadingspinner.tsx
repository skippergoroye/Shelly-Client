import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
          <Loader className="animate-spin text-primary " />
    </div>
  );
};

export default LoadingSpinner;
