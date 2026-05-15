import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import CompanyName from "@/components/common/company-name";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 font-sans text-center">
      <div className="mb-8">
        <CompanyName />
      </div>
      
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 max-w-md w-full flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
          <FileQuestion className="w-12 h-12 text-[#0A58CA]" />
        </div>
        
        <h2 className="text-4xl font-black text-gray-900 mb-2">404</h2>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Page Not Found</h3>
        
        <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-[#0A58CA] hover:bg-[#084298] text-white font-medium h-12 shadow-sm rounded-md flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Homepage
            </Link>
          </Button>
          
          <Button asChild variant="outline" className=" font-medium h-12 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2">
            <Link href="/admin">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
