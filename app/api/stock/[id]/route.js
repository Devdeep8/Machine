import { connectDB } from "../../database/mongoDB";
import Sale from "../../database/sales";
import { NextResponse } from "next/server";

// PUT function to update a sale
export async function PUT(request, { params }) {
    try {
      const { id } = params;
      // console.log(id);
      const requestBody = await request.json();
      // console.log(requestBody);
  
      await connectDB();
  
      const updatedSale = await Sale.findByIdAndUpdate(id, requestBody , { new: true });
      // console.log(updatedSale);
  
      if (!updatedSale) {
        return NextResponse.error({ message: "Sale not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Sale updated", sale: updatedSale }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.error({ message: "Internal Server Error" }, { status: 500 });
    }
  }
export async function GET(request, { params }) {
    try {
        const { id } = params;
        // console.log(id);
        await connectDB();
        const sale = await Sale.findById({ _id: id });
        // console.log(sale);
        return NextResponse.json({ sale }, { status: 200 });
        
    } catch (error) {
        console.log(error);
    }
  }