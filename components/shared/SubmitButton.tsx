import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";


export interface SubmitButtonProps {
  type?: any;
  isLoading?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  loadingText?: string;
  children: React.ReactNode;
  // clickFn?: () => void;
  clickFn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const SubmitButton = ({
  type = "submit",
  isLoading,
  loading,
  loadingText,
  className,
  clickFn,
  children,
  disabled,
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isLoading || loading || disabled}
      className={className ?? " text-white cursor-pointer"}
      onClick={clickFn}
    >
      {isLoading || loading ? (
        <div className="flex items-center gap-4">
          <Loader className="inline-block ml-2 animate-spin" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
