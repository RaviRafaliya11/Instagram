export default function Suggestions({ randomusers }) {
  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions For You</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>

      {randomusers.slice(40, 46).map((profile) => (
        <div
          key={profile.email}
          className="mt-3 flex items-center justify-between"
        >
          <img
            src={profile.picture.large}
            className="h-10 w-10 rounded-full border p-[2px]"
            alt=""
          />

          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">
              {" "}
              {profile.name.first} {profile.name.last}
            </h2>
            <h3 className="text-xs text-gray-400">Email: {profile.email}</h3>
          </div>
          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}
