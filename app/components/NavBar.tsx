import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { Link } from "react-router";
import type { UserData } from "~/routes/user+";
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

  // useEffect(() => {
  //   console.log(query.data, query.error, query.isError, query.error);
  // }, [query.isFetching, query.isError]);
  return (
    <div className="h-18 bg-base-200 drop-shadow-lg sticky top-0 z-20">
      <nav className="mx-auto h-full flex items-center container gap-2 px-2 md:px-0">
        <Link
          to={"/"}
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-primary"
        >
          <span className="hidden md:inline">Stillz</span>
          <span className="inline md:hidden">S</span>
        </Link>
        <div className="flex items-center gap-4 mx-auto w-full max-w-lg">
          <form className="join w-full" action={"/"}>
            <input
              className="join-item input w-full"
              placeholder="search"
              type="search"
            />
            <button className="btn btn-square join-item btn-soft btn-primary">
              <SearchIcon size={18} />
            </button>
          </form>
        </div>
        <div className="ml-auto">
          {query.isFetching ? (
            <div className="flex gap-2 items-center px-4">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="flex items-center ">
              {query.isError ||
                (!query.data && (
                  <div className="join">
                    <Link to={"/auth/login"} className="join-item btn btn-soft">
                      Login
                    </Link>
                    <Link
                      to={"/auth/login"}
                      className="join-item btn btn-primary btn-soft"
                    >
                      Sign Up
                    </Link>
                  </div>
                ))}
              {!query.isError || query.data ? (
                <>
                  <div className="md:flex items-center hidden ">
                    <button className="btn btn-primary">
                      <PlusIcon />
                      <span className="hidden lg:inline">Create</span>
                    </button>
                    <Link to={"/user"} className="flex gap-2 btn btn-ghost">
                      <div className="size-6 outline-primary outline rounded-full bg-base-100"></div>
                      <h2>{query.data?.profile?.userName || "User"}</h2>
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
