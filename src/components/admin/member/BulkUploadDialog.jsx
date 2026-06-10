"use client";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PermissionGuard from "../../PermissionGuard";
import { bulkUploadUsers } from "@/services/memberService";
import { format, isValid, parse } from "date-fns";

// 🔹 Try parsing with multiple formats
function tryParseWithFormats(value, formats) {
  for (const f of formats) {
    const parsed = parse(value, f, new Date());
    if (isValid(parsed)) return parsed;
  }
  return null;
}

// 🔹 Parse full date-time
// 🔹 Convert Excel serial number to JS Date
function excelDateToJSDate(serial) {
  if (typeof serial !== "number") return null;

  // Excel stores days since 1900-01-00 (yes, "00" → off by 1)
  const utc_days = serial - 25569;
  const utc_value = utc_days * 86400; // seconds
  const date_info = new Date(utc_value * 1000);

  return date_info; // ✅ includes hours, minutes, seconds
}

// 🔹 Parse date only (returns yyyy-MM-dd)
// 🔹 Date only (yyyy-MM-dd)
function parseSmartDate(value) {
  if (value == null || value === "") return null;

  if (typeof value === "number") {
    const jsDate = excelDateToJSDate(value);
    return isValid(jsDate) ? jsDate.toISOString().slice(0, 10) : null; // yyyy-MM-dd
  }

  if (value instanceof Date && isValid(value)) {
    return value.toISOString().slice(0, 10);
  }

  const parsed = tryParseWithFormats(String(value), [
    "dd-MM-yyyy",
    "dd/MM/yyyy",
    "MM/dd/yyyy",
    "yyyy-MM-dd",
    "dd-MM-yy",
    "dd/MM/yy",
    "MM/dd/yy",
  ]);
  return parsed ? parsed.toISOString().slice(0, 10) : null;
}

// Date + Time
function parseSmartDateTime(value) {
  if (value == null || value === "") return null;

  if (typeof value === "number") {
    const jsDate = excelDateToJSDate(value);
    return isValid(jsDate) ? jsDate.toISOString().replace("Z", "") : null;
    // yyyy-MM-ddTHH:mm:ss (no timezone)
  }

  if (value instanceof Date && isValid(value)) {
    return value.toISOString().replace("Z", "");
  }

  const parsed = tryParseWithFormats(String(value), [
    "dd-MM-yyyy HH:mm:ss",
    "dd-MM-yyyy HH:mm",
    "dd/MM/yyyy HH:mm:ss",
    "dd/MM/yyyy HH:mm",
    "yyyy-MM-dd HH:mm:ss",
    "yyyy-MM-dd'T'HH:mm:ss",
    "MM/dd/yyyy HH:mm:ss",
    "MM/dd/yyyy HH:mm",
    "dd-MM-yyyy",
    "dd/MM/yyyy",
    "yyyy-MM-dd",
  ]);
  return parsed ? parsed.toISOString().replace("Z", "") : null;
}

function normalizeKey(key) {
  return key.toString().trim().toLowerCase().replace(/\s+/g, "");
}

export default function BulkUploadDialog({ onSuccess = () => {} }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setResult(null);
  };

  const handleDialogOpenChange = (isOpen) => {
    setOpen(isOpen);

    if (!isOpen) {
      setFile(null);
      setResult(null);
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearFileInput = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const normalizeGender = (value) => {
    if (value == null || value === "") return null;
    const val = String(value).toLowerCase().trim();
    if (["male", "m"].includes(val)) return "Male";
    if (["female", "f"].includes(val)) return "Female";
    if (["other", "o"].includes(val)) return "Other";
    return null;
  };

  const normalizeBloodGroup = (value) => {
    if (value == null || value === "") return null;
    const val = String(value).toUpperCase().replace(/\s+/g, "");
    const allowed = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    return allowed.includes(val) ? val : null;
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array", cellDates: false });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Get both raw values and formatted values
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: true, // Keep original Excel values (including serial dates)
      });

      const rows = jsonData.slice(1);
      console.log("📋 Raw Excel rows:", rows);

      const users = rows.map((row) => {
        const norm = {};
        Object.keys(row || {}).forEach((k) => {
          norm[normalizeKey(k)] = row[k];
        });
        const get = (header) => norm[normalizeKey(header)] ?? "";

        const paymentAmountRaw = get("paymentamount") || get("payment amount");
        const paymentAmount =
          paymentAmountRaw === "" ? null : Number(paymentAmountRaw);

        return {
          name:
            (get("name") || get("full name") || "").toString().trim() || null,
          email: (get("email") || "").toString().trim().toLowerCase() || null,
          password: get("password") || null,
          pf: get("pf") || null,
          urn: get("urn") || null,
          dor:
            parseSmartDate(
              get("dor (dd-mm-yyyy)") || get("dor") || get("date of retirement")
            ) || null,
          dob:
            parseSmartDate(
              get("dob (dd-mm-yyyy)") || get("dob") || get("date of birth")
            ) || null,
          joinedAt:
            parseSmartDateTime(
              get("joinedat (dd-mm-yyyy hh:mm:ss)") ||
                get("joinedat") ||
                get("joined at") ||
                get("joined at (dd-mm-yyyy hh:mm:ss)")
            ) || null,
          address: get("address") || null,
          phone: get("phone") || null,
          wpPhone: get("wpphone") || get("whatsapp phone") || null,
          lastAssignment: get("lastassignment") || null,
          pensionBranch: get("pensionbranch") || get("pension branch") || null,
          pensionBranchCircle:
            get("pensionbranchcircle") || get("pension branch circle") || null,
          bloodGroup: normalizeBloodGroup(
            get("bloodgroup") || get("blood group")
          ),
          gender: normalizeGender(get("gender") || get("sex")),
          transactionId: get("transactionid") || null,
          underTaking: get("undertaking") || get("under taking") || null,
          paymentAmount: Number.isFinite(paymentAmount)
            ? parseFloat(paymentAmount)
            : null,
          paymentDate:
            parseSmartDate(
              get("paymentdate (dd-mm-yyyy)") ||
                get("paymentdate") ||
                get("payment date")
            ) || null,
          paymentReference: get("paymentreference") || null,
          remarks: get("remarks") || null,
        };
      });

      // 🚀 send in chunks
      const chunkSize = 100;
      let successCount = 0;
      let skipCount = 0;
      let totalReceived = 0;

      for (let i = 0; i < users.length; i += chunkSize) {
        const chunk = users.slice(i, i + chunkSize);
        const response = await bulkUploadUsers(chunk);

        if (response?.status === 200) {
          successCount += response.data?.successCount || 0;
          skipCount += response.data?.skipCount || 0;
          totalReceived += response.data?.totalReceived || chunk.length;
        } else {
          const msg =
            response?.data?.message || "Unexpected response from server";
          setResult({ error: msg });
          toast.error(msg);
          return; // stop further chunks on failure
        }
      }

      setResult({ successCount, skipCount, totalReceived });
      onSuccess();
      toast.success(
        `✅ Upload completed! Inserted: ${successCount}/${totalReceived}, Skipped: ${skipCount}`
      );
      clearFileInput();
      setOpen(false);
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast.error(err.message || "Upload failed");
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PermissionGuard shouldReturnNull permission="create_members">
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default">Bulk Upload Members</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Members via Excel</DialogTitle>
            <DialogDescription>
              <p className="text-sm rounded-md text-destructive border border-border p-2">
                ⚠️ Note: The <strong>first row</strong> in the Excel template is
                just an example and will be ignored during upload.
              </p>
            </DialogDescription>
          </DialogHeader>

          <Input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="mb-4"
          />

          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>

          {result && (
            <div className="mt-4 p-2 text-sm rounded bg-muted">
              {result.error ? (
                <p className="text-destructive">{result.error}</p>
              ) : (
                <p>
                  ✅ Inserted: {result.insertedCount} / {result.totalReceived}
                  <br />
                  🚫 Skipped (duplicates): {result.skipped}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
