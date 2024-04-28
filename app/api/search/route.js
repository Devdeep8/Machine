// pages/api/search.js

import { connectDB } from "../database/mongoDB";
import Sale from "../database/sales";
import { NextResponse } from "next/server";

export async function GET(request) {
    // console.log(request)
    const query =  request.nextUrl.searchParams.get("query");
    // console.log(query);
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    // Perform Atlas search query in your database (using Mongoose)
    const searchResults = await Sale.aggregate([{
        $search: {
          index: "Machine",
          text: {
            query: query,
            path: {
              wildcard: "*",
            },
          },
        },
  }
]);
    //   console.log(searchResults);

    // Send success response using NextResponse
    return NextResponse.json( searchResults, { status: 200 });
  } catch (error) {
    console.log('Error searching:', error);
    // Send error response using NextResponse
    return NextResponse.json({ error: 'Error searching' }, { status: 500 });
  }
}
