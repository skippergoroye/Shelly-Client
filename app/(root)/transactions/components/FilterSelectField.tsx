import React, { useState, useCallback } from "react";
import { Combobox } from "@/components/ui/combobox";
import { FrameworkT } from "@/types/global";

interface FilterSelectFieldProps {
    label: string;
    options: FrameworkT[];
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    isLoading?: boolean;
    name?: string;
}

const FilterSelectField: React.FC<FilterSelectFieldProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select Option",
    isLoading = false,
    name,
}) => {
    const [selected, setSelected] = useState<FrameworkT>(
        options.find((opt) => opt.value === value) ?? { value: undefined, label: "" }
    );

    const handleChange = useCallback(
        (framework: FrameworkT) => {
            setSelected(framework);
            onChange(framework.value ?? "");
        },
        [onChange]
    );

    React.useEffect(() => {
        const match = options.find((opt) => opt.value === value);
        setSelected(match ?? { value: undefined, label: "" });
    }, [value, options]);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-text-primary">
                {label}
            </label>
            <Combobox
                name={name ?? label}
                frameworks={options}
                value={selected}
                setValue={handleChange as React.Dispatch<React.SetStateAction<FrameworkT>>}
                isLoading={isLoading}
                placeHolder={placeholder}
            />
        </div>
    );
};

export default FilterSelectField;
