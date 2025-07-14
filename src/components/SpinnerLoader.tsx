import React from 'react';

interface SpinnerLoaderProps {
  width?: string;
  height?: string;
  borderT?: string;
  borderTBg?: string;
  borderBg?: string;
  extraclass?: string;
  borderThickness?: string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  width = 'w-4',
  height = 'h-4',
  borderT = 'border-t-2',
  borderTBg = 'border-t-blue-500',
  borderBg = 'border-gray-300',
  extraclass = '',
  borderThickness = 'border-2',
}) => {
  return (
    <div
      className={`${borderThickness} ${borderBg} ${borderT} ${borderTBg} rounded-full ${width} ${height} animate-spin ${extraclass}`}
    ></div>
  );
};

export default SpinnerLoader;
