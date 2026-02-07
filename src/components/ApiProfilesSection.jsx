import { useEffect, useMemo, useState } from "react";
import Card from "./Card.jsx";

const TITLES_URL = "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php";
const ALL_DATA_URL = "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php";

// https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10
const FILTER_URL =
  "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php";

export default function ApiProfilesSection({ mode }) {
  const [titles, setTitles] = useState(["All"]);
  const [filterTitle, setFilterTitle] = useState("All");
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [profiles, setProfiles] = useState([]);
  const [loadingTitles, setLoadingTitles] = useState(false);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch titles for the dropdown (rendered with fetched data)
  useEffect(() => {
    let ignore = false;

    async function loadTitles() {
      setLoadingTitles(true);
      setError("");
      try {
        const res = await fetch(TITLES_URL);
        if (!res.ok) throw new Error("Failed to load titles");

        const data = await res.json();

        // Handle common shapes:
        // 1) ["Developer", "Student", ...]
        // 2) [{title:"Developer"}, {title:"Student"}]
        const extracted = Array.isArray(data)
          ? data.map((t) => (typeof t === "string" ? t : t?.title)).filter(Boolean)
          : [];

        const unique = Array.from(new Set(extracted));
        if (!ignore) setTitles(["All", ...unique.sort()]);
      } catch (e) {
        if (!ignore) setError("Could not load title options from the API.");
      } finally {
        if (!ignore) setLoadingTitles(false);
      }
    }

    loadTitles();
    return () => {
      ignore = true;
    };
  }, []);

  // ✅ Fetch profiles whenever filters change (useEffect side effect)
  useEffect(() => {
    let ignore = false;

    async function loadProfiles() {
      setLoadingProfiles(true);
      setError("");

      try {
        const hasFilter = filterTitle !== "All" || searchText.trim() !== "";

        let url = ALL_DATA_URL;

        if (hasFilter) {
          const params = new URLSearchParams({
            title: filterTitle === "All" ? "" : filterTitle,
            name: searchText.trim(),
            page: String(page),
            limit: String(limit),
          });

          url = `${FILTER_URL}?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load profiles");
        const data = await res.json();

        // Handle common shapes:
        // 1) array of profiles
        // 2) { data: [...] }
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

        if (!ignore) setProfiles(list);
      } catch (e) {
        if (!ignore) setError("Could not load profiles from the API.");
      } finally {
        if (!ignore) setLoadingProfiles(false);
      }
    }

    loadProfiles();
    return () => {
      ignore = true;
    };
  }, [filterTitle, searchText, page]);

  // Reset page when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [filterTitle, searchText]);

  // ✅ Map API profiles into your existing Card props
  const cardsFromApi = useMemo(() => {
    return profiles.map((p, idx) => {
      const name = p?.name ?? "Unknown";
      const title = p?.title ?? "No Title";
      const email = p?.email ?? "";
      const bio = p?.bio ?? "";
      const image = p?.image ?? p?.image_url ?? p?.photo ?? ""; // try common keys

      return {
        id: p?.id ?? `${name}-${idx}`,
        title: name,
        description: `${title}${email ? ` • ${email}` : ""}${bio ? `\n\n${bio}` : ""}`,
        image: image || "", // Card may still render even if empty, depends on your Card.jsx
      };
    });
  }, [profiles]);

  return (
    <div>
      <div className="controls">
        <label className="control">
          Filter (API Titles)
          <select
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            disabled={loadingTitles}
          >
            {titles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="control">
          Search (Name)
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name..."
          />
        </label>

        <div className="control" style={{ alignSelf: "end" }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          <span style={{ padding: "0 10px" }}>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={profiles.length < limit}
          >
            Next
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {loadingProfiles ? (
        <p>Loading profiles...</p>
      ) : (
        <div className="cardGrid">
          {cardsFromApi.map((card) => (
            <Card
              key={card.id}
              {...card}
              // For API cards, no spin/select needed (optional)
              isSelected={false}
              isSpinning={false}
              onClick={() => {}}
              mode={mode}
            />
          ))}
        </div>
      )}
    </div>
  );
}