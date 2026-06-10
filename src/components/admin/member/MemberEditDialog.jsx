import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { getMemberById, updateMember } from "@/services/memberService";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import PermissionGuard from "@/components/PermissionGuard";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  wpPhone: "", // WhatsApp phone number
  address: "",
  pf: "",
  urn: "",
  dor: "",
  dob: "",
  joinedAt: "", // Joined date
  lastAssignment: "",
  pensionBranch: "",
  pensionBranchCircle: "",
  bloodGroup: "",
  gender: "",
  transactionId: "",
  underTaking: "", // Undertaking details
  paymentAmount: "", // Payment amount
  paymentDate: "", // Payment date
  paymentReference: "", // Payment reference number
  remarks: "", // Additional remarks
};

export default function MemberEditDialog({ member, open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    if (open && member) {
      fetchMemberDetails();
    } else {
      setForm(initialFormState);
      setMemberDetails(null);
    }
  }, [open, member]);

  const fetchMemberDetails = async () => {
    if (!member?._id) return;

    setLoading(true);
    setForm(initialFormState);

    try {
      const response = await getMemberById(member._id);
      if (response.status === 200) {
        const memberData = response.data.member;
        setMemberDetails(memberData);
        setForm({
          name: memberData.name || "",
          email: memberData.email || "",
          phone: memberData.phone || "",
          wpPhone: memberData.wpPhone || "",
          address: memberData.address || "",
          pf: memberData.pf || "",
          urn: memberData.urn || "",
          dor: formatDateForInput(memberData.dor),
          dob: formatDateForInput(memberData.dob),
          joinedAt: formatDateTimeForInput(memberData.joinedAt),
          lastAssignment: memberData.lastAssignment || "",
          pensionBranch: memberData.pensionBranch || "",
          pensionBranchCircle: memberData.pensionBranchCircle || "",
          bloodGroup: memberData.bloodGroup || "",
          gender: memberData.gender || "",
          transactionId: memberData.transactionId || "",
          underTaking: memberData.underTaking || "",
          paymentAmount: memberData.paymentAmount || "",
          paymentDate: formatDateForInput(memberData.paymentDate),
          paymentReference: memberData.paymentReference || "",
          remarks: memberData.remarks || "",
        });
      } else {
        throw new Error("Failed to fetch member details");
      }
    } catch (error) {
      console.error("Fetch member details for edit error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch member details"
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return "";
    }
  };

  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      // Convert UTC to local time for datetime-local input
      // Get local date components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Return in format required by datetime-local input (YYYY-MM-DDTHH:MM)
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting datetime:", error, dateString);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!form.name.trim()) {
        toast.error("Name is required");
        return;
      }
      if (!form.email.trim()) {
        toast.error("Email is required");
        return;
      }

      // Convert datetime fields to UTC before sending to server
      const formData = { ...form };
      if (formData.joinedAt) {
        // Convert local datetime to UTC
        const localDate = new Date(formData.joinedAt);
        formData.joinedAt = localDate.toISOString();
      }

      const response = await updateMember(member._id, formData);

      if (response.status === 200) {
        toast.success("Member updated successfully");
        onClose();
        onSuccess();
      } else {
        throw new Error("Failed to update member");
      }
    } catch (error) {
      console.error("Update member error:", error);
      toast.error(error.response?.data?.message || "Failed to update member");
    } finally {
      setUpdating(false);
    }
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PermissionGuard shouldReturnNull permission="edit_members">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {loading ? "Loading Member Details..." : "Edit Member"}
            </DialogTitle>
            <DialogDescription>Update member information</DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Name *</Label>
                  <Input
                    id="editName"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email *</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input
                    id="editPhone"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editWpPhone">WhatsApp Phone</Label>
                  <Input
                    id="editWpPhone"
                    value={form.wpPhone}
                    onChange={(e) => updateForm("wpPhone", e.target.value)}
                    placeholder="Enter WhatsApp number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPf">PF Number</Label>
                  <Input
                    id="editPf"
                    value={form.pf}
                    onChange={(e) => updateForm("pf", e.target.value)}
                    placeholder="Enter PF number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editUrn">URN</Label>
                  <Input
                    id="editUrn"
                    value={form.urn}
                    onChange={(e) => updateForm("urn", e.target.value)}
                    placeholder="Enter URN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDob">Date of Birth</Label>
                  <Input
                    id="editDob"
                    type="date"
                    value={form.dob}
                    onChange={(e) => updateForm("dob", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDor">Date of Retirement</Label>
                  <Input
                    id="editDor"
                    type="date"
                    value={form.dor}
                    onChange={(e) => updateForm("dor", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editJoinedAt">Joined Date & Time</Label>
                  <Input
                    id="editJoinedAt"
                    type="datetime-local"
                    value={form.joinedAt}
                    onChange={(e) => updateForm("joinedAt", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editGender">Gender</Label>
                  <Select
                    value={form.gender}
                    onValueChange={(value) => updateForm("gender", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editBloodGroup">Blood Group</Label>
                  <Select
                    value={form.bloodGroup}
                    onValueChange={(value) => updateForm("bloodGroup", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editAddress">Address</Label>
                <Textarea
                  id="editAddress"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  placeholder="Enter full address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editLastAssignment">Last Assignment</Label>
                  <Input
                    id="editLastAssignment"
                    value={form.lastAssignment}
                    onChange={(e) =>
                      updateForm("lastAssignment", e.target.value)
                    }
                    placeholder="Enter last assignment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPensionBranch">Pension Branch</Label>
                  <Input
                    id="editPensionBranch"
                    value={form.pensionBranch}
                    onChange={(e) =>
                      updateForm("pensionBranch", e.target.value)
                    }
                    placeholder="Enter pension branch"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPensionBranchCircle">
                    Pension Branch Circle
                  </Label>
                  <Input
                    id="editPensionBranchCircle"
                    value={form.pensionBranchCircle}
                    onChange={(e) =>
                      updateForm("pensionBranchCircle", e.target.value)
                    }
                    placeholder="Enter pension branch circle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editTransactionId">Transaction ID</Label>
                  <Input
                    id="editTransactionId"
                    value={form.transactionId}
                    onChange={(e) =>
                      updateForm("transactionId", e.target.value)
                    }
                    placeholder="Enter transaction ID"
                  />
                </div>
              </div>

              {/* Payment and Undertaking Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editPaymentAmount">Payment Amount</Label>
                  <Input
                    id="editPaymentAmount"
                    type="text"
                    value={form.paymentAmount}
                    onChange={(e) =>
                      updateForm("paymentAmount", e.target.value)
                    }
                    placeholder="Enter payment amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPaymentDate">Payment Date</Label>
                  <Input
                    id="editPaymentDate"
                    type="date"
                    value={form.paymentDate}
                    onChange={(e) => updateForm("paymentDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPaymentReference">
                    Payment Reference
                  </Label>
                  <Input
                    id="editPaymentReference"
                    value={form.paymentReference}
                    onChange={(e) =>
                      updateForm("paymentReference", e.target.value)
                    }
                    placeholder="Enter payment reference number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editUnderTaking">Undertaking Details</Label>
                <Textarea
                  id="editUnderTaking"
                  value={form.underTaking}
                  onChange={(e) => updateForm("underTaking", e.target.value)}
                  placeholder="Enter undertaking details"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editRemarks">Remarks</Label>
                <Textarea
                  id="editRemarks"
                  value={form.remarks}
                  onChange={(e) => updateForm("remarks", e.target.value)}
                  placeholder="Enter additional remarks"
                  rows={2}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <Loader className={"text-white"} />
                  ) : (
                    "Update Member"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
