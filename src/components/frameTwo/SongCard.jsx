export default function SongCard({ name, artist, url }) {
  return (
    <div className="flex items-center justify-between py-4 w-5/6 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md min-w-72 transition duration-300 ease-in-out px-4">
      <div className="flex gap-4">
        <img
          src="https://indiater.com/wp-content/uploads/2021/06/Free-Music-Album-Cover-Art-Banner-Photoshop-Template-1024x1024.jpg"
          alt={`${name} Cover`}
          className="w-12 h-auto rounded-full"
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
};
