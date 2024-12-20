import { useSelector } from "react-redux";
import { getBaseUrl } from "../../util/http";

export default function UserImage({ className }) {
  const user = useSelector((state) => state.auth.user);

  return <img src={getBaseUrl() + user.profile_image} className={className} />;
}
