import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Users,
  ImageIcon,
  ClipboardClock,
  Calendar,
  Cake,
} from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getDashboardStatistics } from "../../services/dashboardService";
import { birthdays } from "../../services/memberService";
import { convertUtcToLocal } from "../../lib/utils";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [birthdaysData, setBirthdaysData] = useState([]);
  const [birthdaysLoading, setBirthdaysLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardStatistics();
        const result = response.data;
        setData(result ?? {});
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBirthdays = async () => {
      setBirthdaysLoading(true);
      try {
        const response = await birthdays();
        setBirthdaysData(response.data?.birthdays || []);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
        setBirthdaysData([]);
      } finally {
        setBirthdaysLoading(false);
      }
    };

    fetchData();
    fetchBirthdays();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader className="text-primary" />
      </div>
    );
  }
  return (
    <div className="">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your application with ease
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.totalDocuments ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalImages ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Approvals
            </CardTitle>
            <ClipboardClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.totalApprovals ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Birthdays Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cake className="h-5 w-5 text-primary" />
              <CardTitle>Users Birthdays</CardTitle>
            </div>
            <CardDescription>
              View all users birthdays throughout the year
            </CardDescription>
          </CardHeader>
          <CardContent>
            {birthdaysLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="text-primary" />
              </div>
            ) : birthdaysData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No birthdays data available</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead> Name</TableHead>
                      <TableHead>Mobile Number</TableHead>
                      <TableHead>Date of Birth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {birthdaysData.map((member) => {
                      return (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">
                            {member.name}
                          </TableCell>
                          <TableCell>{member.phone || "N/A"}</TableCell>
                          <TableCell>{convertUtcToLocal(member.dob)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
