export default function SongCard({ name, artist, url, cover, accent }) {
  // Function for dynamic accent change
  function handleClick(){
    document.body.style.setProperty('--accent', accent);
  }

  return (
    <div onClick={handleClick} className="flex items-center justify-between py-4 w-11/12 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg min-w-72 transition duration-300 ease-in-out px-4">
      <div className="flex gap-4">
        <img
          src={`https://cms.samespace.com/assets/${cover}`}
          alt={`${name} Cover`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p>{name}</p>
          <p className="text-sm opacity-60">{artist}</p>
        </div>
      </div>
      <div>
        <span className="opacity-60">4:16</span>
      </div>
    </div>
  );
}
