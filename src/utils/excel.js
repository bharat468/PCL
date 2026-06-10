import * as XLSX from "xlsx";

export default function DownloadTemplate() {
  const handleDownload = () => {
    // Define headers (matching your schema)
    const headers = [
      [
        "name",
        "email",
        "password",
        "role",
        "pf",
        "urn",
        "dor (YYYY-MM-DD)",
        "dob (YYYY-MM-DD)",
        "address",
        "phone",
        "lastAssignment",
        "pensionBranch",
        "pensionBranchCircle",
        "bloodGroup",
        "gender",
        "transactionId",
      ],
    ];

    // Example sample row
    const sampleRow = [
      [
        "John Doe",
        "john@example.com",
        "1234",
        "ObjectIdOfRole",
        "PF123",
        "URN001",
        "2025-01-01",
        "1990-01-01",
        "123 Street",
        "9876543210",
        "XYZ",
        "ABC Branch",
        "Circle A",
        "O+",
        "Male",
        "TXN12345",
      ],
    ];

    // Combine into sheet
    const ws = XLSX.utils.aoa_to_sheet([...headers, ...sampleRow]);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User Template");

    // Download
    XLSX.writeFile(wb, "user_template.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
    >
      Download Template
    </button>
  );
}
