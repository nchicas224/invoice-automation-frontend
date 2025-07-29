import { useEffect, useState } from "react";
import { getUser } from "../hooks/UserContext";
import LoadSpinner from "../components/LoadingSpinner";
import Table from "react-bootstrap/Table";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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

export interface Invoice {
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
  const [data, setData] = useState<Invoice[] | string>("");
  const [referrer, setReferrer] = useState<string>("");
  const user = getUser(); 

  useEffect(() => {
    if (!user) return;
    setReferrer(invTab);
    fetch(`/api/getInvoiceList?tab=${invTab}&currentUser=${user.userDetails}`)
    .then<Invoice[] | string>((r) => {
      const ct = r.headers.get("content-type") || "";
      return ct.includes("application/json")
        ? (r.json() as Promise<Invoice[]>)
        : r.text();
    })
    .then((data) => setData(data))
    .catch(console.error)
  }, [invTab, user]);

  if (!data){
    return <LoadSpinner/>
  }

  if(typeof data === "string"){
    return <p>{data}</p> // Returns no messages found message...possible to make it look better
  }

  return (
    // <div className="table-responsive">
      <Card className="lcf-bg-primary p-0">
        <Card.Body>
          <Table striped borderless hover variant="light" className="invoice-list-table m-0">
            <thead>
              <tr>
                <th> </th>
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
                  <td>
                    <Link to={`/invoice/${inv.id}?ref=${referrer}`}
                    state={{ invoice: inv}}
                    onClick={() => {
                      localStorage.setItem(`inv-id:${inv.id}`, JSON.stringify(inv));
                    }}
                    >
                    View
                    </Link>
                  </td>
                  <td title={inv.id}>
                    {inv.id.substring(0,8) + "..."}
                  </td>
                  <td>{inv.inv_num}</td>
                  <td>{inv.inv_name}</td>
                  <td>{inv.vendor}</td>
                  <td>{inv.amount}</td>
                  <td>{inv.inv_date}</td>
                  <td>{inv.due_date}</td>
                  <td>{new Date(inv.creation_date).toLocaleDateString()}</td>
                  <td>{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    // </div>
  );
}

export default InvoiceTab;
