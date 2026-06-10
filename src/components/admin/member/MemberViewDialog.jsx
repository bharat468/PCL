import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getMemberById } from "../../../services/memberService";
import Loader from "../../Loader";
import { convertUtcToLocal } from "../../../lib/utils";

export default function MemberViewDialog({ member, open, onClose }) {
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && member) {
      fetchMemberDetails();
    }
  }, [open, member]);

  const fetchMemberDetails = async () => {
    if (!member?._id) return;

    setLoading(true);
    setMemberDetails(null);

    try {
      const response = await getMemberById(member._id);
      if (response.status === 200) {
        setMemberDetails(response.data.member);
      } else {
        throw new Error("Failed to fetch member details");
      }
    } catch (error) {
      console.error("Fetch member details error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch member details"
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return convertUtcToLocal(dateString);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {loading ? "Loading Member Details..." : memberDetails?.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader className={"text-foreground"} />
              <p className="mt-2 text-muted-foreground">
                Fetching member details...
              </p>
            </div>
          </div>
        ) : memberDetails ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {memberDetails.email}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {memberDetails.phone || "Not provided"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">WhatsApp Phone</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {memberDetails.wpPhone || "Not provided"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <p className="mt-1">
                  <Badge variant="outline">
                    {memberDetails.role?.name || "No Role"}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">PF Number</Label>
                <p className="mt-1">{memberDetails.pf || "Not set"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">URM</Label>
                <p className="mt-1">{memberDetails.urn || "Not set"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Gender</Label>
                <p className="mt-1">
                  {memberDetails.gender || "Not specified"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Blood Group</Label>
                <p className="mt-1">
                  {memberDetails.bloodGroup || "Not specified"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Date of Birth</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(memberDetails.dob)}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  Date of Retirement
                </Label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(memberDetails.dor)}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Joined Date</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateTime(memberDetails.joinedAt)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p className="mt-1 flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  {memberDetails.address || "Not provided"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">
                    Last Assignment
                  </Label>
                  <p className="mt-1">
                    {memberDetails.lastAssignment || "Not specified"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Transaction ID
                  </Label>
                  <p className="mt-1">
                    {memberDetails.transactionId || "Not set"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Pension Branch
                  </Label>
                  <p className="mt-1">
                    {memberDetails.pensionBranch || "Not specified"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Pension Branch Circle
                  </Label>
                  <p className="mt-1">
                    {memberDetails.pensionBranchCircle || "Not specified"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Payment Amount
                  </Label>
                  <p className="mt-1">
                    {memberDetails.paymentAmount
                      ? `₹${memberDetails.paymentAmount}`
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment Date</Label>
                  <p className="mt-1">
                    {formatDate(memberDetails.paymentDate)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Payment Reference
                  </Label>
                  <p className="mt-1">
                    {memberDetails.paymentReference || "Not set"}
                  </p>
                </div>
              </div>

              {/* Undertaking and Remarks Section */}
              {(memberDetails.underTaking || memberDetails.remarks) && (
                <div className="space-y-4">
                  {memberDetails.underTaking && (
                    <div>
                      <Label className="text-muted-foreground">
                        Undertaking Details
                      </Label>
                      <p className="mt-1 text-sm bg-gray-50 p-3 rounded-md">
                        {memberDetails.underTaking}
                      </p>
                    </div>
                  )}
                  {memberDetails.remarks && (
                    <div>
                      <Label className="text-muted-foreground">Remarks</Label>
                      <p className="mt-1 text-sm bg-gray-50 p-3 rounded-md">
                        {memberDetails.remarks}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(memberDetails.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(memberDetails.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No member data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
