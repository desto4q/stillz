import { XIcon } from "lucide-react";
import type { RefObject } from "react";

function VideoPlayer({
  url,
  setUrl,
  ref,
}: {
  url: string;
  setUrl: (val: any) => any;
  ref?: RefObject<HTMLVideoElement>;
}) {
  return (
    <div className="w-full h-full relative">
      <video
        className="w-full h-full"
        src={url}
        controls
        ref={ref ?? null}
      ></video>
      <button
        type="button"
        onClick={() => setUrl(undefined)}
        className="absolute right-0 top-0 p-2 m-2 btn btn-circle  btn-error "
      >
        <XIcon />
      </button>
    </div>
  );
}

export default VideoPlayer;
