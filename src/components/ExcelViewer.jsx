"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function ExcelViewer({ file }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExcel = async () => {
      try {
        setLoading(true);
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Read first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON with proper handling
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "", // Default value for empty cells
          raw: false, // Format cells as strings
        });

        // Check if we have any data
        if (!jsonData || jsonData.length === 0) {
          throw new Error("No data found in Excel file");
        }

        // First row = headers
        const headerRow = jsonData[0] || [];
        if (headerRow.length === 0) {
          throw new Error("No headers found in Excel file");
        }

        // Clean and format headers
        const cleanHeaders = headerRow.map((h, i) => ({
          key: `col_${i}`,
          label:
            h && h.toString().trim() ? h.toString().trim() : `Column ${i + 1}`,
          index: i,
        }));

        // Process data rows
        const dataRows = jsonData
          .slice(1)
          .filter(
            (row) =>
              row &&
              row.some(
                (cell) => cell !== undefined && cell !== null && cell !== ""
              )
          )
          .map((row, rowIndex) => {
            const processedRow = { id: rowIndex };
            cleanHeaders.forEach((header, colIndex) => {
              const cellValue = row[colIndex];
              processedRow[header.key] =
                cellValue !== undefined && cellValue !== null
                  ? cellValue.toString().trim()
                  : "";
            });
            return processedRow;
          });

        setHeaders(cleanHeaders);
        setData(dataRows);
        setError(null);
      } catch (err) {
        console.error("Error reading excel:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      loadExcel();
    }
  }, [file]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center border rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading Excel file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center border rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error loading Excel file</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full border rounded-lg overflow-hidden bg-white">
      <div className="h-full overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider min-w-[120px]"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="border border-gray-300 px-3 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      className="border border-gray-300 px-3 py-2 text-sm text-gray-900 whitespace-pre-wrap break-words"
                    >
                      {row[header.key] || ""}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-600">
        Showing {data.length} rows × {headers.length} columns
      </div>
    </div>
  );
}
