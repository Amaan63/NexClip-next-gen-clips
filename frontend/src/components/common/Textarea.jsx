import React from "react";
import clsx from "clsx";

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  className = "",
  ...props
}) => {
  const textareaClasses = clsx(
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-y",
    error
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    disabled && "bg-gray-100 cursor-not-allowed",
    className
  );

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
        {...props}
      />

      <div className="flex justify-between items-center mt-1">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {maxLength && (
          <p className="text-gray-400 text-sm ml-auto">
            {value?.length || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
