import Listing from "@/app/ui/mutual-funds/listing"
import React, { Suspense } from 'react';

export default function MutualFunds(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Listing/>
        </Suspense>
    );
}