import Story from "./Story";
import { useSession } from "next-auth/react";
import { HiPlusCircle } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { modalState } from "./../atoms/modalAtom";

export default function Stories({ randomusers }) {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  return (
    <div className="mr-1 flex space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-6 scrollbar-thin scrollbar-thumb-black md:mt-8">
      {session && (
        <div onClick={() => setOpen(true)} className="relative">
          <Story
            key={session.user.uid}
            user={{
              picture: { large: session?.user?.image },
              name: { first: session?.user?.name },
            }}
          />
          <HiPlusCircle className="absolute right-0 bottom-[18px] rounded-full bg-white text-blue-600" />
        </div>
      )}
      {randomusers.map((profile, i) => (
        <Story key={i} user={profile} />
      ))}
    </div>
  );
}
