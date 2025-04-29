import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MenuIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Suspense, useEffect, useRef } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";
import { Link } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import type { UserData } from "~/types/types";
import ProfileImage from "./ProfileImg";
import { useAtom } from "jotai";
import { drawer_atom } from "~/client/ui";
import { toast } from "sonner";
function NavBar() {
  let query = useQuery<UserData>({
    queryKey: ["user_info"],
    queryFn: async () => {
      let resp = await fetch("api/user", {
        credentials: "include",
      });
      if (!resp.ok) {
        throw new Error("error");
      }
      return await resp.json();
    },
  });
  let [open, setOpen] = useAtom(drawer_atom);
  let navigate = useNavigate();
  return (
    <div className="h-18 bg-base-200 drop-shadow-lg sticky top-0 z-20">
      <nav className="mx-auto h-full flex items-center container gap-2 px-2 md:px-0">
        <Link
          viewTransition
          to={"/home"}
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-primary"
        >
          <span className="hidden md:inline">Stillz</span>
          <span className="inline md:hidden">S</span>
        </Link>
        <div className="flex items-center gap-4 mx-auto w-full max-w-lg">
          <form
            className="join w-full"
            onSubmit={(e) => {
              e.preventDefault();
              let form = new FormData(e.target as HTMLFormElement);
              let search = form.get("search") as string;

              if (!search || search.length < 3) return toast.error("invalid");
              navigate("/search/" + search);
            }}
            method="post"
          >
            <input
              className="join-item input w-full"
              placeholder="search"
              name="search"
              id="search"
              type="search"
            />
            <button className="btn btn-square join-item btn-soft btn-primary">
              <SearchIcon size={18} />
            </button>
          </form>
        </div>
        <div className="ml-auto">
          <ClientOnly fallback={<>loading</>}>
            {() => (
              <div>
                {query.isFetching ? (
                  <>loading</>
                ) : (
                  !query.isError &&
                  query.data && (
                    <div className="dropdown dropdown-end">
                      <button
                        tabIndex={0}
                        role="button"
                        className="btn btn-square md:btn-block md:px-2  btn-flair btn-secondary duration-150"
                      >
                        <div className="flex gap-2 items-center">
                          <div className="size-6 rounded avatar ring">
                            {/* <img src={query.data.profile.profileImg} alt="" /> */}
                            <ProfileImage {...query.data.profile} />
                          </div>
                          <p className="hidden md:inline">
                            @{query.data?.profile.userName}
                          </p>
                        </div>
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <Link className="to" to={"/user"}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="" to={"/Create"}>
                            Create
                          </Link>
                        </li>
                        <li className="">
                          <form
                            action="/api/user/auth/logout"
                            method="post"
                            className="flex"
                          >
                            <button className="btn btn-error btn-flair w-full">
                              logout
                            </button>
                          </form>
                        </li>
                      </ul>
                    </div>
                  )
                )}
                {query.isError ||
                  (!query.data && (
                    <>
                      <div className="join">
                        <Link
                          className="btn join-item btn-flair btn-primary"
                          to="/auth/login"
                        >
                          Login
                        </Link>
                        <Link
                          className="btn join-item btn-flair btn-secondary"
                          to="/auth/signup"
                        >
                          SignUp
                        </Link>
                      </div>
                    </>
                  ))}
              </div>
            )}
          </ClientOnly>
        </div>
        <div
          className="btn btn-square"
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
