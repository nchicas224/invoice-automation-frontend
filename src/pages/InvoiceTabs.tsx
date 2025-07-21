import { useEffect, useState } from "react";
import { userName } from "../hooks/UserContext";

interface InvoiceData {
  id: string;
  amount: string;
  creation_time: string;
  status: string;
}

interface InvoiceRecord {
  values: InvoiceData;
}

type InvoiceMap = Record<string, InvoiceRecord>;

interface Invoice {
  name: string;
  id: string;
  creation_time: string;
  status: string;
}

export function InvoiceTab({ invTab }: { invTab: string }): React.ReactNode {
  const [data, setData] = useState<Invoice[] | null>(null);
  const user = userName(); 

  useEffect(() => {
    fetch(`/api/getInvoiceList?tab=${invTab}&currentUser=${user}`)
    .then(r => r.json() as Promise<InvoiceMap>)
    .then(data => {
        const invoices: Invoice[] = Object.entries(data).map(
          ([name, values]) => ({
            name,
            ...values.values,
          })
        );
        setData(invoices);
    })
  }, [invTab]);

  if (!data){
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {data.map(inv => (
        <div>
          <div>{inv.name}</div>
          <div>{inv.creation_time}</div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceTab;
