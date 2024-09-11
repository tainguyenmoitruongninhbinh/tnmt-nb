import { Typography } from '@mui/material';

// Function to round numbers to two decimal places
const roundToTwoDecimalPlaces = (num: number): number => parseFloat(num?.toFixed(2));

// Modified FormatCellValue function to accept an optional label
const FormatCellValue = (value: number, label?: string) => {
  const formattedValue = roundToTwoDecimalPlaces(value);

  return (
    <Typography
      style={{
        color: formattedValue < 0 ? 'red' : 'inherit',
        fontSize: '0.875rem',
      }}
    >
      {label ? `${label}: ${formattedValue}` : formattedValue}
    </Typography>
  );
};

export default FormatCellValue;
