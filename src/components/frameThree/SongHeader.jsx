export default function SongHeader({ current }) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">{current.name}</h1>
      <p className="text-white opacity-60">{current.artist}</p>
    </header>
  );
}
