import { useEffect, useState } from "react";

const API_BASE = "https://api-me-backend.vercel.app/api";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
  fetch(`${API_BASE}/profile`)
    .then(res => {
      if (res.status === 304) {
        // Cached response, do nothing or refetch
        return null;
      }
      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        setProfile(data);
      }
    })
    .catch(err => {
      console.error("Profile fetch error:", err);
      setProfile({ error: true });
    });
}, []);


  function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) {
      setIsSearching(false);
      setResults(null);
      return;
    }

    fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setIsSearching(true);
      });
  }

  if (profile?.error) {
    return <div className="loading">Failed to load profile...</div>;
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>

          {/* SEARCH */}
          <form className="search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search skills or projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </header>

        {/* SEARCH RESULTS */}
        {isSearching && results && (
          <section>
            <h2>Search Results</h2>

            {results.skills.length === 0 &&
             results.projects.length === 0 && (
              <p className="empty">No results found.</p>
            )}

            {results.skills.length > 0 && (
              <>
                <h3>Skills</h3>
                <div className="skills">
                  {results.skills.map(skill => (
                    <span key={skill} className="skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {results.projects.length > 0 && (
              <>
                <h3>Projects</h3>
                <div className="projects">
                  {results.projects.map(project => (
                    <article key={project.title} className="project">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tech">
                        {project.tech.join(" · ")}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View on GitHub →
                      </a>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* DEFAULT VIEW */}
        {!isSearching && (
          <>
            <section>
              <h2>Skills</h2>
              <div className="skills">
                {profile.skills.map(skill => (
                  <span key={skill} className="skill">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2>Projects</h2>
              <div className="projects">
                {profile.projects.map(project => (
                  <article key={project.title} className="project">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech">
                      {project.tech.join(" · ")}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub →
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #0b1220;
          color: #e5e7eb;
        }

        .page {
          padding: 48px 20px;
          display: flex;
          justify-content: center;
        }

        .container {
          max-width: 900px;
          width: 100%;
        }

        .header {
          margin-bottom: 40px;
        }

        .header p {
          max-width: 720px;
          color: #cbd5f5;
        }

        .search {
          margin-top: 24px;
          display: flex;
          gap: 12px;
        }

        .search input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #1f2937;
          background: #111827;
          color: #fff;
        }

        .search button {
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          background: #2563eb;
          color: #fff;
          cursor: pointer;
        }

        section { margin-bottom: 48px; }

        h2 {
          color: #93c5fd;
          margin-bottom: 16px;
        }

        h3 {
          margin: 16px 0 12px;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill {
          padding: 8px 14px;
          border-radius: 999px;
          background: #111827;
          border: 1px solid #1f2937;
        }

        .projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .project {
          background: #111827;
          border: 1px solid #1f2937;
          border-radius: 14px;
          padding: 20px;
        }

        .tech {
          font-size: 0.85rem;
          color: #9ca3af;
        }

        .empty {
          color: #9ca3af;
        }

        .loading {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
