

// import {db} from "@/lib/db";

// export interface BlogDataParams {
//   page: number;
//   cat?: string;
// }

// export default async function getBlogData (
//   params: BlogDataParams
// ) {
//   try {
//     const { page, cat} = params
//     let query: any = {}

//   } catch(error: any) {
//     throw new Error(error)
//   }
// }

// export const getBlogData = async (page: number, cat: string) => {
//   const stockCount = await db.post.count({
//     where: {
//       storeId,
//       isArchived: false,
//     }
//   });

//   return stockCount;
// };