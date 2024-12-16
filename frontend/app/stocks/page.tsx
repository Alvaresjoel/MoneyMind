import StocksList from "../ui/stocks/StocksList";
import React, { Suspense } from 'react';

export default function Stocks() {
  return (
    <div className=" pb-80 pt-12  bg-primary">
      <Suspense fallback={<div>Loading...</div>}>
        <StocksList />
      </Suspense>
    </div>  
  );
}


