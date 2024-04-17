// components/ApplicantTile.tsx

import Link from 'next/link';

interface ApplicantTileProps {
  id: string;  
  name: string;
  headshotUrl: string;
}

const ApplicantTile: React.FC<ApplicantTileProps> = ({ id, name, headshotUrl }) => {
    return (
        <Link href={`/applicants/${id}`} className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
            <img src={headshotUrl} alt={`Headshot of ${name}`} onError={(e: { currentTarget: { src: string; }; }) => e.currentTarget.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2H4ZVi1qQmc39CZLN4p_Zh&ust=1713405312587000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKi9jKqSyIUDFQAAAAAdAAAAABAE'} className="w-full h-56 object-cover" />
            <div className="p-4">
                <h5 className="text-md font-semibold tracking-tight text-gray-900">{name}</h5>
            </div>
        </Link>
    );
};

export default ApplicantTile;
