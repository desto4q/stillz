import { FileIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData } from "react-router";
import { toast } from "sonner";
import { ClientResponseError } from "pocketbase";

import FlexBody from "~/components/FlexBody";
import VideoPlayer from "~/components/VideoPlayer";
import { getSession } from "~/method/methods";
import type { Route } from "../api/user/+types";
import { generate_thumb } from "~/helpers/helpers";
import NavBar from "~/components/NavBar";
import { createClient } from "~/client/pocketbase";
import { useLoaderData } from "react-router";

export let loader = async () => {
  let db = createClient();
  let resp = await db.collection("tags").getFullList();

  return resp;
};

export let action = async (req: Route.ActionArgs) => {
  try {
    const form_data = await req.request.formData();
    const video = form_data.get("file_input") as unknown as File;
    const title = form_data.get("title");
    const subtitle = form_data.get("subtitle");
    const thumb = form_data.get("thumb") as unknown as File;
    const duration = form_data.get("duration") as string;
    const tag = form_data.get("tag") as string;
    const { user_data, db } = await getSession(req);

    if (!video) {
      return Response.json(
        { error: "video is empty" },
        {
          status: 400,
        },
      );
    }
    const data = {
      video: video,
      title,
      duration: Number(duration),
      thumb: thumb,
      subtitle,
      user_id: user_data?.id,
      userName: user_data?.userName,
      "+tags": tag,
    };

    await db.collection("posts").create(data);

    return Response.json({ message: "created", data }, { status: 201 });
  } catch (err) {
    if (err instanceof ClientResponseError) {
      return Response.json(
        { error: err.message, fullError: err },
        { status: err.status },
      );
    }

    return Response.json({ error: "internal error occured" }, { status: 500 });
  }
};

interface tag {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  tag: string;
  updated: string;
}
function Index() {
  const [url, setUrl] = useState<string | null>(null);
  const resp = useActionData();
  let thumbRef = useRef<HTMLInputElement>(null);
  let vidRef = useRef<HTMLInputElement>(null);
  let metaRef = useRef<HTMLVideoElement>(null);
  let [disabled, setDisabled] = useState(false);
  let tags_: tag[] = useLoaderData();
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (resp?.error) {
      console.error(resp.fullError);
      toast.error(resp.error);
    } else if (resp?.message) {
      console.log(resp.data);
      toast.success(resp.message);
    }
    console.log(tags_);
  }, [resp]);

  return (
    <>
      <NavBar />
      <FlexBody className="bg-base-100">
        <div className="flex-1 mx-auto w-full container grid place-items-center py-8">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!thumbRef.current) return;
              if (!vidRef.current) return;
              if (!vidRef.current?.files) return;
              if (!metaRef.current) return;
              if (!url) return;
              setDisabled(true);
              const form = e.target as HTMLFormElement;
              let resp = await generate_thumb(url);
              let thumb_url = URL.createObjectURL(resp as Blob);
              console.log(thumb_url);

              const file = new File(
                [resp as Blob],
                vidRef.current?.files[0]?.name.replace(
                  /(mp4|mov|mkv|WebM)$/i,
                  "png",
                ) ?? new Date().toISOString(),
                {
                  type: "image/png",
                },
              );
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              thumbRef.current.files = dataTransfer.files;
              const durationInput = document.createElement("input");
              durationInput.type = "hidden";
              durationInput.name = "duration";
              let durr = String(metaRef.current?.duration * 1000);
              durationInput.value = durr;
              console.log(durr);
              form.appendChild(durationInput);
              let form_ = new FormData(form);
              for (const [key, value] of form_.entries()) {
                console.log([key, value]);
              }
              form.submit();
            }}
            encType="multipart/form-data"
            method="post"
            className="w-full max-w-4xl mx-4 p-8 flex flex-col gap-5 bg-base-200 rounded-lg shadow-lg"
          >
            <h2 className=" text-2xl font-bold text-center text-primary border-b pb-3">
              Create Content
            </h2>
            <input name="thumb" ref={thumbRef} type="file" className="hidden" />
            <input
              ref={vidRef}
              onChange={handleFileInput}
              className="hidden"
              type="file"
              name="file_input"
              id="file_input"
              accept="video/*"
            />
            <div className=" max-h-72 aspect-video w-full rounded-lg relative bg-base-100 hover:bg-base-300 duration-150 border-2 border-dashed border-primary/30">
              {!url ? (
                <label
                  className="h-full cursor-pointer w-full flex justify-center items-center gap-4 flex-col aspect-video"
                  htmlFor="file_input"
                >
                  <h2 className="text-xl font-bold text-primary">
                    Click to Select Video
                  </h2>
                  <div className="text-primary/70 animate-pulse">
                    <FileIcon size={64} />
                  </div>
                  <p className="text-sm text-base-content/70">
                    Supported formats: MP4, MOV, WebM
                  </p>
                </label>
              ) : (
                <VideoPlayer
                  setUrl={setUrl}
                  url={url}
                  ref={metaRef as unknown as any}
                />
              )}
            </div>
            <div>
              <h2 className="label text-xl font-bold py-2">Tag</h2>
              <select className="select select-bordered w-full" name="tag">
                {tags_
                  ? tags_.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.tag}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className=" w-full">
              <label className="label text-lg font-bold">Title</label>
              <input
                type="text"
                className="input input-bordered w-full focus:input-primary mt-2"
                name="title"
                placeholder="Enter a catchy title"
              />
            </div>
            <div className="w-full">
              <label className="label text-lg font-bold">Subtitle</label>
              <textarea
                className="textarea textarea-bordered w-full focus:textarea-primary mt-2"
                name="subtitle"
                placeholder="Add a brief description"
                rows={4} // Adjust the number of rows as needed
                required
              />
            </div>
            <button
              disabled={disabled}
              className="btn btn-primary btn-lg mt-4 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              {disabled ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Processing...
                </>
              ) : (
                "Upload Content"
              )}
            </button>
          </form>
        </div>
      </FlexBody>
    </>
  );
}

export default Index;
