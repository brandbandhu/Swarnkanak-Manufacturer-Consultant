import React, { useEffect, useMemo, useSyncExternalStore } from "react";

type SearchValue = string | number | boolean | null | undefined;
type SearchInput = Record<string, SearchValue>;
type NavigateInput =
  | string
  | {
      to?: string;
      params?: Record<string, string | number>;
      search?: SearchInput | ((prev: SearchInput) => SearchInput);
    };

const NAVIGATION_EVENT = "app:navigation";

function notifyNavigation() {
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(NAVIGATION_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(NAVIGATION_EVENT, callback);
  };
}

function getSnapshot() {
  return window.location.pathname + window.location.search;
}

function readSearch(): SearchInput {
  const params = new URLSearchParams(window.location.search);
  const search: SearchInput = {};
  params.forEach((value, key) => {
    const numeric = Number(value);
    search[key] =
      value !== "" && Number.isFinite(numeric) && String(numeric) === value ? numeric : value;
  });
  return search;
}

function buildPath(to: string, params?: Record<string, string | number>) {
  let path = to.replace("/products_/$slug", "/products/$slug");
  Object.entries(params ?? {}).forEach(([key, value]) => {
    path = path.replace(`$${key}`, encodeURIComponent(String(value)));
  });
  return path;
}

function buildUrl(input: NavigateInput) {
  if (typeof input === "string") return input;

  const path = buildPath(input.to ?? window.location.pathname, input.params);
  const nextSearch =
    typeof input.search === "function" ? input.search(readSearch()) : (input.search ?? {});
  const query = new URLSearchParams();

  Object.entries(nextSearch).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export function navigate(input: NavigateInput) {
  const url = buildUrl(input);
  window.history.pushState({}, "", url);
  notifyNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function useNavigate() {
  return navigate;
}

export function useLocationSnapshot() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}

export function useSearch<TSearch extends SearchInput = SearchInput>() {
  const snapshot = useLocationSnapshot();
  return useMemo(() => readSearch() as TSearch, [snapshot]);
}

export function useParams() {
  useLocationSnapshot();
  const parts = window.location.pathname.split("/").filter(Boolean);
  return { slug: parts[0] === "products" ? decodeURIComponent(parts[1] ?? "") : "" };
}

export function notFound(): Error {
  return new Error("Page not found");
}

export function createFileRoute(_path: string) {
  return function createRoute<
    TLoaderData,
    TConfig extends {
      component?: React.ComponentType;
      loader?: (ctx: { params: ReturnType<typeof useParams> }) => TLoaderData;
    },
  >(config: TConfig) {
    return {
      ...config,
      useNavigate,
      useSearch,
      useParams,
      useLoaderData: () =>
        (config.loader ? config.loader({ params: useParams() }) : undefined) as TLoaderData,
    };
  };
}

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  params?: Record<string, string | number>;
  search?: SearchInput;
};

export function Link({ to, params, search, onClick, ...props }: LinkProps) {
  const href = buildUrl({ to, params, search });

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
