import { MembersClient } from "./components/client";

const data = [
  {
    id: "1001",
    name: "John Doe",
    phone: "555-1234",
    email: "john@example.com",
    amount: "250.00",
    createdAt: "2023-08-31T10:00:00"
  },
  {
    id: "1002",
    name: "Jane Smith",
    phone: "555-5678",
    email: "jane@example.com",
    amount: "150.50",
    createdAt: "2023-08-30T15:30:00"
  },
  {
    id: "1003",
    name: "Michael Johnson",
    phone: "555-7890",
    email: "michael@example.com",
    amount: "500.75",
    createdAt: "2023-08-29T09:15:00"
  },
  {
    id: "1004",
    name: "Emily Brown",
    phone: "555-2345",
    email: "emily@example.com",
    amount: "75.20",
    createdAt: "2023-08-28T14:20:00"
  },
  {
    id: "1005",
    name: "William Davis",
    phone: "555-6789",
    email: "william@example.com",
    amount: "350.90",
    createdAt: "2023-08-27T11:45:00"
  }
];


const MembersPage = async() => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MembersClient data={data}/>
      </div>
    </div>
  )
}

export default MembersPage;