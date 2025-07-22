import { useEffect, useState } from "react";
import { getUser } from "../hooks/UserContext";
import Table from "react-bootstrap/Table";

// interface InvoiceData {
//   id: string;
//   amount: string;
//   creation_time: string;
//   status: string;
// }

// interface InvoiceResp {
//   name: string;
//   values: InvoiceData;
// }

interface Invoice {
  id: string;
  status: string;
  inv_name: string;
  inv_num: string;
  vendor: string;
  amount: string;
  inv_date: string;
  due_date: string;
  creation_date: string;
}

//type InvoiceList = InvoiceResp[];

export function InvoiceTab({ invTab }: { invTab: string }): React.ReactNode {
  const [data, setData] = useState<Invoice[] | null>(null);
  const user = getUser(); 

  useEffect(() => {
    if (!user) return;
    fetch(`/api/getInvoiceList?tab=${invTab}&currentUser=${user.userDetails}`)
    .then(r => r.json() as Promise<Invoice[]>)
    .then((data: Invoice[]) => setData(data))
    .catch(console.error)
  }, [invTab, user]);

  if (!data){
    return <h1>Loading...</h1> //Add a spinner element for Loading.
  }

  if(typeof data === "string"){
    return <p>{data}</p>
  }

  return (
    <Table striped bordered hover variant="light" className="invoice-list-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Invoice #</th>
          <th>Invoice Name</th>
          <th>Vendor</th>
          <th>Amount</th>
          <th>Invoice Date</th>
          <th>Due Date</th>
          <th>Date Created</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(inv => (
          <tr>
            <td>{inv.id}</td>
            <td>{inv.inv_num}</td>
            <td>{inv.inv_name}</td>
            <td>{inv.vendor}</td>
            <td>{inv.amount}</td>
            <td>{inv.inv_date}</td>
            <td>{inv.due_date}</td>
            <td>{inv.creation_date}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InvoiceTab;
