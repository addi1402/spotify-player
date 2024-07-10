export default function Tabs({ tab, setTab }) {
  // Function to trigger tab change
  function switchTab(e) {
    if (e.target.id === tab) return;
    setTab(tab === "forYou" ? "topTracks" : "forYou");
  }
  return (
    <nav className="flex gap-10 font-bold text-lg">
      <p
        id="forYou"
        className={`cursor-pointer transition-all duration-200 ease-linear ${
          tab === "forYou" ? "" : "opacity-50"
        }`}
        onClick={switchTab}
      >
        For You
      </p>
      <p
        id="topTracks"
        className={`cursor-pointer transition-all duration-200 ease-linear ${
          tab !== "forYou" ? "" : "opacity-50"
        }`}
        onClick={switchTab}
      >
        Top Tracks
      </p>
    </nav>
  );
}
