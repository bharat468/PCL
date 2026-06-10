"use client";
import ExcelJS from "exceljs";
import { Button } from "@/components/ui/button";

export default function DownloadTemplateButton() {
  const handleDownload = async () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("MembersTemplate");

    // Columns / headers (role removed)
    ws.columns = [
      { header: "name", key: "name", width: 20 },
      { header: "email", key: "email", width: 26 },
      { header: "password", key: "password", width: 16 },
      { header: "pf", key: "pf", width: 12 },
      { header: "urn", key: "urn", width: 16 },
      { header: "dor (DD-MM-YYYY)", key: "dor", width: 18 },
      { header: "dob (DD-MM-YYYY)", key: "dob", width: 18 },
      { header: "joinedAt (DD-MM-YYYY HH:MM:SS)", key: "joinedAt", width: 25 },
      { header: "address", key: "address", width: 28 },
      { header: "phone", key: "phone", width: 16 },
      { header: "wpPhone", key: "wpPhone", width: 16 },
      { header: "lastAssignment", key: "lastAssignment", width: 20 },
      { header: "pensionBranch", key: "pensionBranch", width: 20 },
      { header: "pensionBranchCircle", key: "pensionBranchCircle", width: 22 },
      { header: "bloodGroup", key: "bloodGroup", width: 10 },
      { header: "gender", key: "gender", width: 10 },
      { header: "transactionId", key: "transactionId", width: 18 },
      { header: "underTaking", key: "underTaking", width: 30 },
      { header: "paymentAmount", key: "paymentAmount", width: 15 },
      { header: "paymentDate (DD-MM-YYYY)", key: "paymentDate", width: 22 },
      { header: "paymentReference", key: "paymentReference", width: 20 },
      { header: "remarks", key: "remarks", width: 30 },
    ];
    ws.getRow(1).font = { bold: true };
    ws.views = [{ state: "frozen", ySplit: 1 }];

    // Example row (row 2)
    const exampleRow = ws.addRow({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      pf: "PF12345",
      urn: "URN98765",
      dor: new Date(2025, 11, 31), // <-- Excel stores as real date
      dob: new Date(1985, 5, 15),
      joinedAt: new Date(2024, 11, 5, 10, 48, 49), // Example: 05-12-2024 10:48:49
      address: "123 Main Street",
      phone: "9876543210",
      wpPhone: "9876543210",
      lastAssignment: "Clerk",
      pensionBranch: "XYZ Branch",
      pensionBranchCircle: "Delhi",
      bloodGroup: "B+",
      gender: "Male",
      transactionId: "TXN001",
      underTaking: "N/A",
      paymentAmount: 1000,
      paymentDate: new Date(2024, 11, 5),
      paymentReference: "REF123",
      remarks: "No remarks",
    });

    // Highlight example row yellow
    exampleRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF99" },
      };
      cell.font = { italic: true };
    });

    // ✅ Apply proper date format for DOB, DOR and joinedAt columns
    ws.getColumn("dor").numFmt = "dd-mm-yyyy";
    ws.getColumn("dob").numFmt = "dd-mm-yyyy";
    ws.getColumn("joinedAt").numFmt = "dd-mm-yyyy hh:mm:ss";

    // Reference sheet for validations
    const ref = wb.addWorksheet("ReferenceData");
    ref.getCell("A1").value = "Gender";
    ["Male", "Female", "Other"].forEach(
      (g, i) => (ref.getCell(`A${i + 2}`).value = g)
    );
    ref.getCell("B1").value = "BloodGroup";
    ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].forEach(
      (b, i) => (ref.getCell(`B${i + 2}`).value = b)
    );

    // Data validations (apply from row 3 onward)
    ws.dataValidations.add("M3:M1048576", {
      type: "list",
      allowBlank: true,
      formulae: ["=ReferenceData!$B$2:$B$9"],
      showErrorMessage: true,
      errorTitle: "Invalid blood group",
      error: "Pick a value from the dropdown.",
    });
    ws.dataValidations.add("N3:N1048576", {
      type: "list",
      allowBlank: true,
      formulae: ["=ReferenceData!$A$2:$A$4"],
      showErrorMessage: true,
      errorTitle: "Invalid gender",
      error: "Pick a value from the dropdown.",
    });

    // Download
    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members_template.xlsx"; // changed name here
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-primary text-primary-foreground"
    >
      Download Excel Template
    </Button>
  );
}
