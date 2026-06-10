import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import MemberTable from "./MemberTable";
import MemberFilters from "./MemberFilters";
import MemberPagination from "./MemberPagination";
import { toast } from "sonner";
import { getMembers } from "../../../services/memberService";

export default function MemberList({
  members = [],
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  searchTerm,
  fetchMembers,
}) {
  return (
    <>
      <MemberFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Members
          </CardTitle>
          <CardDescription>{members.length} members found</CardDescription>
        </CardHeader>
        <CardContent>
          <MemberTable
            members={members}
            loading={loading}
            onMembersUpdate={fetchMembers}
          />
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <MemberPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
