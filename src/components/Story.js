export default function Story({ user }) {
  return (
    <div>
      <img
        className="h-16 w-16 transform cursor-pointer rounded-full border-2 border-red-500 object-contain p-[1.5px] transition duration-200 ease-out hover:scale-110"
        src={user.picture?.large}
        alt=""
      />
      <p className="w-16 truncate text-center text-xs capitalize">
        {user.name?.first} {user.name?.last}
      </p>
    </div>
  );
}
