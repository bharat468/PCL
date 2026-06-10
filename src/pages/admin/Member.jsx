import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MemberHeader from "../../components/admin/member/MemberHeader";
import MemberList from "../../components/admin/member/MemberList";
import { toast } from "sonner";
import { getMembers } from "../../services/memberService";
import {
  setLoading,
  setMembers,
  setSearchTerm,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setError,
} from "../../features/member/memberSlice";

export default function Members() {
  const dispatch = useDispatch();
  const {
    members,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    itemsPerPage,
  } = useSelector((state) => state.member);

  const fetchMembers = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getMembers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });

      if (response.status === 200) {
        dispatch(setMembers(response.data.members || []));
        dispatch(setTotalPages(response.data.pagination.totalPages || 1));
        dispatch(setError(null));
      } else {
        dispatch(setMembers([]));
        throw new Error(response);
      }
    } catch (error) {
      console.error("Fetch members error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch members";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleMembersUpdate = () => {
    fetchMembers();
  };

  const handleSetCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleSetItemsPerPage = (limit) => {
    dispatch(setItemsPerPage(limit));
  };

  const handleSetSearchTerm = (term) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <div className="">
      <MemberHeader onMembersUpdate={handleMembersUpdate} />
      <MemberList
        members={members || []}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handleSetCurrentPage}
        setItemsPerPage={handleSetItemsPerPage}
        setSearchTerm={handleSetSearchTerm}
        searchTerm={searchTerm}
        fetchMembers={fetchMembers}
      />
    </div>
  );
}
