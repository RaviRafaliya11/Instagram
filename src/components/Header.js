import {
  HiOutlineSearch,
  HiOutlinePlusCircle,
  HiOutlinePaperAirplane,
  HiOutlineHeart,
  HiOutlineMenu,
  HiOutlineUserGroup,
  HiHome,
} from "react-icons/hi";
import { useRecoilState } from "recoil";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { modalState } from "./../atoms/modalAtom";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="/Instagram_full_logo.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-10  lg:hidden flex-shrink-0">
          <Image
            src="/Instagram_black_icon.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-xs rounded-md border-gray-300 focus:ring-black focus:border-black"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HiHome onClick={() => router.push("/")} className="navBtn" />
          <HiOutlineMenu className="h-6 w-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                <HiOutlinePaperAirplane className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <HiOutlinePlusCircle
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <HiOutlineUserGroup className="navBtn" />
              <HiOutlineHeart className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user?.image}
                className="rounded-full cursor-pointer w-10 h-10"
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Signin</button>
          )}
        </div>
      </div>
    </div>
  );
}
