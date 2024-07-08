import FrameOne from "./components/frames/FrameOne";
import FrameThree from "./components/frames/FrameThree";
import FrameTwo from "./components/frames/FrameTwo";

function App() {
  return (
    <div className="flex flex-wrap h-screen">
      <FrameOne />
      <FrameTwo />
      <FrameThree />
    </div>
  );
}

export default App;
