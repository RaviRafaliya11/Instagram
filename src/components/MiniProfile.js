import { signOut, useSession } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src={session.user.image}
        className="h-16 w-16 rounded-full border p-[2px]"
        alt=""
      />
      <div className="mx-4 flex-1">
        <h2 className="font-bold capitalize">{session?.user?.name}</h2>
        <h3 className="text-xs text-gray-400">{session?.user?.email}</h3>
      </div>
      <button className="text-sm font-semibold text-blue-400" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}
