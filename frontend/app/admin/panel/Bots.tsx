import { useState } from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  const url = process.env.NEXT_PUBLIC_BASE_URL;
export default function Bots() {
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState<{ action: any; status: any; message: any; }[]>([]);

    const handleResponse = (action: any, res: any) => {
        setResponses(prev => [...prev, { action, status: res.status, message: res.statusText }]);
    };

    const RunBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/rpa-bot/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };
    

    const RunFortnightlyBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/rpa-bot/fortnightly`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };

    const RunStockScraperBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/rpa-bot/stockscraper`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };
    
    const ShowHistory = async () => {
        const res = await fetch(`${url}/rpa-bot/history`, {
            method: 'GET',
        });
        handleResponse('History', res);
    };

//files
    const AddAmc = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/amc`, {
            method: 'POST'
        });
        handleResponse('Amc Data', res);
        setLoading(false);
    };

    const AddMf = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/mf`, {
            method: 'POST'
        });
        handleResponse('Mutualfund Data', res);
        setLoading(false);
    };

    const AddStock = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/stock`, {
            method: 'POST'
        });
        handleResponse('Stock Data', res);
        setLoading(false);
    };

    const AddFundstock = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/fs`, {
            method: 'POST'
        });
        handleResponse('FundStock Data', res);
        setLoading(false);
    };

    const Updatestock = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/updatestockdata`, {
            method: 'POST'
        });
        handleResponse('Update stock data', res);
        setLoading(false);
    };
    const Addfortnightly = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/fort`, {
            method: 'POST'
        });
        handleResponse('Fortnightly Data', res);
        setLoading(false);
    };
    const AddIndex = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/addindex`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const AddIndexStock = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/addindexstock`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const DeactivateAllFunds = async () => {
        setLoading(true);
        const res = await fetch(`${url}/data/deactivatefs`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const updatemf = async () => {
        setLoading(true);
        const res = await fetch(`${url}/mf/total`, {
            method: 'put'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
//ds
    const RunMonthlyBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/datasci/run`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };

    const RunFortnightlyDSBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/datasci/fortnightly`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const RunIndiceBot = async () => {
        setLoading(true);
        const res = await fetch(`${url}/datasci/run-indices`, {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    return (
        <div>
            {loading && (
                <div className="loading-container ">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}  
                
                <Menubar className='mt-4 mb-4 h-fit justify-between bg-black'>
                    <MenubarMenu >
                        <MenubarTrigger className="btn btn-primary w-1/3">RPA</MenubarTrigger>
                        <MenubarContent className='bg-neutral w-full'>
                            <MenubarItem 
                                className="btn btn-primary w-full my-1"
                                onClick={RunBot}
                                disabled={loading}
                            >Run Portfolio Bot</MenubarItem>
                            <MenubarItem
                                className="btn btn-primary w-full my-1"
                                onClick={RunFortnightlyBot}
                                disabled={loading}
                            >Run Fortnightly Bot</MenubarItem>
                            <MenubarItem
                                className="btn btn-primary w-full my-1"
                                onClick={RunStockScraperBot}
                                disabled={loading}
                            >Run Stock Scraper Bot</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem
                                className="btn btn-primary w-full my-1"
                                onClick={ShowHistory}
                                disabled={loading}
                            >Show History</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="btn btn-primary w-1/3">File Runner</MenubarTrigger>
                        <MenubarContent className='bg-neutral'>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddAmc}
                        disabled={loading}
                        >Add AMC</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddMf}
                        disabled={loading}
                        >Add MF</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddStock}
                        disabled={loading}
                        >Add Stock</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddFundstock}
                        disabled={loading}
                        >Add FundStock</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={Updatestock}
                        disabled={loading}
                        >Update Stock Details</MenubarItem>
                        <MenubarSeparator/>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={Addfortnightly}
                        disabled={loading}
                        >Add Fortnightly</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddIndex}
                        disabled={loading}
                        >Add Index</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={AddIndexStock}
                        disabled={loading}
                        >Add IndexStock</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="btn btn-primary w-1/3">Data Science</MenubarTrigger>
                        <MenubarContent className='bg-neutral'>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={RunFortnightlyDSBot}
                        disabled={loading}>Run Fortnightly</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={RunMonthlyBot}
                        disabled={loading}>Run Monthly</MenubarItem>
                        <MenubarItem
                        className="btn btn-primary w-full my-1"
                        onClick={RunIndiceBot}
                        disabled={loading}
                        >Run Indice</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem 
                        className="btn btn-primary w-full my-1"
                        onClick={DeactivateAllFunds}
                        disabled={loading}>Deactivate All Funds</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

                <div>
                    <h2 className="text-2xl mt-10">Responses:</h2>
                    <div className='border-2'>
                        {responses.map((response, index) => (
                            <div className='border-2 m-1' key={index}>
                                <p>Action: {response.action}</p>
                                <p>Status: {response.status}</p>
                                <p>Message: {response.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

            <style jsx>{`
                .loading-container {
                    text-align: center;
                    margin-bottom: 20px;
                    }
                    .disabled {
                    pointer-events: none;
                    opacity: 0.6;
                }
            `}</style>
        </div>
    );
}
