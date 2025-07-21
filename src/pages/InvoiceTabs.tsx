import { useEffect, useState } from "react";
import { getUser } from "../hooks/UserContext";
import Table from "react-bootstrap/Table";

interface InvoiceData {
  id: string;
  amount: string;
  creation_time: string;
  status: string;
}

interface InvoiceResp {
  name: string;
  values: InvoiceData;
}

interface Invoice {
  name: string;
  id: string;
  creation_time: string;
  status: string;
}

type InvoiceList = InvoiceResp[];

export function InvoiceTab({ invTab }: { invTab: string }): React.ReactNode {
  const [data, setData] = useState<Invoice[] | null>(null);
  const user = getUser(); 

  useEffect(() => {
    if (!user) return;
    fetch(`/api/getInvoiceList?tab=${invTab}&currentUser=${user.userDetails}`)
    .then(r => r.json() as Promise<InvoiceList>)
    .then(data => {
        const invoices: Invoice[] = data.map(
          item => ({
            name: item.name,
            ...item.values,
          })
        );
        setData(invoices);
    })
    .catch(console.error)
  }, [invTab, user]);

  if (!data){
    return <h1>Loading...</h1> //Add a spinner element for Loading.
  }

  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>ID</th>
          <th>Invoice Name</th>
          <th>Date Created</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(inv => (
          <tr>
            <td>{inv.id}</td>
            <td>{inv.name}</td>
            <td>{inv.creation_time}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InvoiceTab;
