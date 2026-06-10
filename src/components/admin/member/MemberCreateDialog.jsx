import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createMember } from "@/services/memberService";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import PermissionGuard from "@/components/PermissionGuard";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  wpPhone: "", // WhatsApp phone number
  address: "",
  pf: "",
  urn: "",
  dor: "",
  dob: "",
  joinedAt: "", // When user joined the organization
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

export default function MemberCreateDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      // Validate required fields
      if (!form.name.trim()) {
        toast.error("Name is required");
        return;
      }
      if (!form.email.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!form.password.trim()) {
        toast.error("Password is required");
        return;
      }

      // Convert datetime fields to UTC before sending to server
      const formData = { ...form };
      if (formData.joinedAt) {
        // Convert local datetime to UTC
        const localDate = new Date(formData.joinedAt);
        formData.joinedAt = localDate.toISOString();
      }

      const response = await createMember(formData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Member created successfully");
        setOpen(false);
        setForm(initialFormState);
        onSuccess();
      } else {
        throw new Error("Failed to create member");
      }
    } catch (error) {
      console.error("Create member error:", error);
      toast.error(error.response?.data?.message || "Failed to create member");
    } finally {
      setCreating(false);
    }
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PermissionGuard shouldReturnNull permission="create_members">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Member</DialogTitle>
            <DialogDescription>
              Add a new member to the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Enter full name"
                  disabled={creating}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="Enter email address"
                  disabled={creating}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wpPhone">WhatsApp Phone</Label>
                <Input
                  id="wpPhone"
                  value={form.wpPhone}
                  onChange={(e) => updateForm("wpPhone", e.target.value)}
                  placeholder="Enter WhatsApp number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pf">PF Number</Label>
                <Input
                  id="pf"
                  value={form.pf}
                  onChange={(e) => updateForm("pf", e.target.value)}
                  placeholder="Enter PF number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urn">URN</Label>
                <Input
                  id="urn"
                  value={form.urn}
                  onChange={(e) => updateForm("urn", e.target.value)}
                  placeholder="Enter URN"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={(e) => updateForm("dob", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dor">Date of Retirement</Label>
                <Input
                  id="dor"
                  type="date"
                  value={form.dor}
                  onChange={(e) => updateForm("dor", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinedAt">Joined Date & Time</Label>
                <Input
                  id="joinedAt"
                  type="datetime-local"
                  value={form.joinedAt}
                  onChange={(e) => updateForm("joinedAt", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
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
                <Label htmlFor="bloodGroup">Blood Group</Label>
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
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="Enter full address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastAssignment">Last Assignment</Label>
                <Input
                  id="lastAssignment"
                  value={form.lastAssignment}
                  onChange={(e) => updateForm("lastAssignment", e.target.value)}
                  placeholder="Enter last assignment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pensionBranch">Pension Branch</Label>
                <Input
                  id="pensionBranch"
                  value={form.pensionBranch}
                  onChange={(e) => updateForm("pensionBranch", e.target.value)}
                  placeholder="Enter pension branch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pensionBranchCircle">
                  Pension Branch Circle
                </Label>
                <Input
                  id="pensionBranchCircle"
                  value={form.pensionBranchCircle}
                  onChange={(e) =>
                    updateForm("pensionBranchCircle", e.target.value)
                  }
                  placeholder="Enter pension branch circle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={form.transactionId}
                  onChange={(e) => updateForm("transactionId", e.target.value)}
                  placeholder="Enter transaction ID"
                />
              </div>
            </div>

            {/* Payment and Undertaking Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Payment Amount</Label>
                <Input
                  id="paymentAmount"
                  type="text"
                  value={form.paymentAmount}
                  onChange={(e) => updateForm("paymentAmount", e.target.value)}
                  placeholder="Enter payment amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={form.paymentDate}
                  onChange={(e) => updateForm("paymentDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentReference">Payment Reference</Label>
                <Input
                  id="paymentReference"
                  value={form.paymentReference}
                  onChange={(e) =>
                    updateForm("paymentReference", e.target.value)
                  }
                  placeholder="Enter payment reference number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="underTaking">Undertaking Details</Label>
              <Input
                id="underTaking"
                value={form.underTaking}
                onChange={(e) => updateForm("underTaking", e.target.value)}
                placeholder="Enter undertaking details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
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
                onClick={() => setOpen(false)}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {creating ? (
                  <Loader className={"text-white"} />
                ) : (
                  "Create Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
}
