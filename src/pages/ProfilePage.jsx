import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();

  <div className="bg-green w-full">{id}</div>;
}
