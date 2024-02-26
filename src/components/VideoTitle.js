import { FaPlay } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex">
        <button className="bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg flex items-center">
          <FaPlay className="mx-1" /> Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg flex items-center">
          <MdInfoOutline />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
