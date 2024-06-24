import { UserProfile } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export default ProfilePage;