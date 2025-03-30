import StocksList from "../ui/stocks/StocksList";
import React, { Suspense } from 'react';

export default function Stocks() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <StocksList />
      </Suspense>
    </div>  
  );
}


