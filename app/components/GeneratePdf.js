import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function GeneratePDF({ invoice, totalprice , expense }) {
  function generate() {
    const doc = new jsPDF();

    // Prepare data for the table
    const tableData = invoice.map(({ name, quantity, price, paid }) => [
      name,
      quantity,
      paid,
      price,
    ]);

    //total 
    const allprice = invoice.map((s) => s.quantity * s.price);
    const priceWithoutCost = allprice.reduce((a, b) => a + b, 0);
    // Add total price row
    
    tableData.push(['', '', '', '']); // Empty row
    tableData.push(['', '', '', '']); // Empty row

    tableData.push(['', '', 'Revenue ',priceWithoutCost ]);
    tableData.push(['', '', 'expenses', expense]);
    tableData.push(['', '', 'profit', totalprice]);

    // Generate PDF
    doc.autoTable({
      head: [['Name', 'Quantity', 'Paid', 'Price']],
      body: tableData,
    });

    // Save the PDF with a timestamped name
    doc.save(`daily-work-${Date.now()}`);
  }

  return (
    <div>
      <button className= "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={generate} type="button">Download PDF</button>
    </div>
  );
}
