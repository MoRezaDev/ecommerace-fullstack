// Custom styles for react-select to match dark mode
export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#374151" : "#1F2937", // Dark mode background
    borderColor: state.isFocused ? "#3B82F6" : "#4B5563", // Border on focus
    color: "#D1D5DB", // Light text in dark mode
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : null,
    "&:hover": {
      borderColor: "#3B82F6",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1F2937", // Dark mode background
    color: "#D1D5DB",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3B82F6"
      : state.isFocused
      ? "#374151"
      : "#1F2937", // Highlight options in dark mode
    color: "#D1D5DB",
    "&:hover": {
      backgroundColor: "#374151", // Hover color in dark mode
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#D1D5DB", // Light text in dark mode
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF", // Lighter placeholder text in dark mode
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF", // Dark dropdown arrow
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
