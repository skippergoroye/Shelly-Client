/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Control,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  RADIO = "radio",
  DATE = "date",
}

interface CustomProps<T extends FieldValues = FieldValues> {
  type?: string;
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  render?: (field: unknown) => React.ReactNode;
  fieldType: FormFieldType;
  variant?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabledDates?: (date: Date) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: any;
  props: CustomProps<T>;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400 relative">
          {props.leftIcon && (
            <div className="absolute left-3 cursor-pointer z-10">
              {props.leftIcon}
            </div>
          )}

          <Input
            placeholder={props.placeholder}
            {...field}
            type={props.type}
            readOnly={props.readOnly}
            disabled={props.disabled}
            className={`${props.variant} text-16 placeholder:text-16 rounded-[5px] border bg-[#F7FCFF] text-gray-900 placeholder:text-gray-500 ${
              props.leftIcon ? "pl-10" : ""
            } ${props.rightIcon ? "pr-10" : ""}`}
            onChange={(e) => {
              field.onChange(e);
              props.onChange?.(e);
            }}
          />

          {props.rightIcon && (
            <div className="absolute right-3 cursor-pointer z-10">
              {props.rightIcon}
            </div>
          )}
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <div className="flex w-full items-center gap-3">
          <div className="flex items-center">
            <PhoneInput
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="w-14 h-11 rounded-[5px] px-3 text-16 placeholder:text-16 border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <input
            type="tel"
            value={field.value}
            onChange={(e) => {
              const onlyValidChars = e.target.value.replace(
                /[^+\d]/g,
                ""
              );

              field.onChange(onlyValidChars);
            }}
            placeholder={props.placeholder}
            className="w-full h-11 rounded-[5px] px-3 text-16 placeholder:text-16 border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500"
          />
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={props.placeholder}
          {...field}
          disabled={props.disabled}
          className={`${props.variant} border bg-[#F7FCFF] rounded-[5px] border-bankGradient placeholder:text-dark-600 focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
      );

    case FormFieldType.SELECT:
      return (
        <Select
          defaultValue={props.defaultValue}
          onValueChange={field.onChange}
          value={field.value || props.defaultValue}
        >
          <SelectTrigger
            className={`${props.variant} cursor-pointer text-16 placeholder:text-16 rounded-[5px] border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500`}
            disabled={props.disabled}
          >
            <SelectValue
              defaultValue={props.defaultValue}
              placeholder={props.placeholder}
            />
          </SelectTrigger>

          <SelectContent className="text-16 bg-[#F7FCFF] border-bankGradient text-gray-900">
            {props.children}
          </SelectContent>
        </Select>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />

          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.DATE:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full pl-3 text-left font-normal ${
                !field.value && "text-gray-500"
              } ${props.variant}`}
            >
              {field.value ? (
                format(field.value, props.dateFormat || "PPP")
              ) : (
                <span>{props.placeholder || "Pick a date"}</span>
              )}

              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={props.disabledDates}
              // initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case FormFieldType.RADIO:
      return props.render ? props.render(field) : null;

    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(
  props: CustomProps<T>
) => {
  const { control, name, label } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Field className="flex-1" data-invalid={!!error}>
      {props.fieldType !== FormFieldType.CHECKBOX && label && (
        <FieldLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
          {label}
        </FieldLabel>
      )}

      <RenderInput field={field} props={props} />

      {error?.message && (
        <FieldError className="shad-error">
          {String(error.message)}
        </FieldError>
      )}
    </Field>
  );
};

export default CustomFormField;