'use client'
import { useSession , signOut} from "next-auth/react";
// import Image from "next/image";
const UserDropdownMenu = () => {
  const session = useSession();

  return (
    <div className=" cursor-pointer shadow-lg rounded-lg ">
      <div className=" pt-2 pl-2 flex  ">
        <img className=" object-contain p aspect-[5/3] w-28 p-4" src={session?.data?.user?.image} alt="Profile" />
        <div className="text-left mx-4 flex justify-center items-center">
          <p className="text-xl font-semibold ">{session.data?.user?.name}</p>
        </div>
        <button onClick={signOut} className=" h-10 absolute right-1 top-14 w-[70px] -translate-y-1/2 items-center text-white hover:shadow-3xl rounded-xl hover:scale-110 transition ease-in-out hover:bg-purple-600 bg-royalblue "> logout</button>
      </div>
    </div>
  );
};

export default UserDropdownMenu;
