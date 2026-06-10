import { useSelector } from "react-redux";
import AccessDenied from "../pages/admin/AccessDenied";

export default function PermissionGuard({
  permission,
  children,
  shouldReturnNull = true,
}) {
  const { user } = useSelector((state) => state.global);

  if (!user || !user.role?.permissions?.includes(permission)) {
    return shouldReturnNull ? null : <AccessDenied />;
  }

  return children;
}
