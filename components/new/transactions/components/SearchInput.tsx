import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <Input
                placeholder="Search Transaction Ref"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
            />
        </div>
    );
};

export default SearchInput;
