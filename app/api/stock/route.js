import {connectDB} from "./../database/mongoDB"
import { NextResponse } from "next/server"
import Sale from "../database/sales"


export async function GET(request) {
  // console.log(request)?\
  try { 
    await connectDB();
    const sales = await Sale.find();
    return NextResponse.json({sales}, {status: 200} );
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request){
  try {
    await connectDB();
    const body = await request.json();
    const sale = new Sale(body);
    await sale.save();
    return NextResponse.json({sale}, {status: 200} );
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request){
  try {
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    await Sale.findByIdAndDelete(id)
    return NextResponse.json({message: "Success delete " } , {status: 200})
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}