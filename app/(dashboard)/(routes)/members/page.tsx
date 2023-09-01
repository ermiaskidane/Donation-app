import { MembersClient } from "./components/client";
import { data } from "@/lib/data"



// console.log(data)
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