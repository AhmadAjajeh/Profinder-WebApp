import image from "../../assets/images/temp-user-image.jpg";

export default function UserImage({ className }) {
  return <img src={image} className={className} />;
}
