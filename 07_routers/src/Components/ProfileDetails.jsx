import { useSearchParams } from 'react-router-dom';

const ProfileDetails = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const name = searchParams.get('name');

  return (
    <div>
      <h2>ID: {id}</h2>
      <h2>Name: {name}</h2>
    </div>
  );
};

export default ProfileDetails;