import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  X,
  CircleCheck,
  FileText,
  Globe2,
  Share2,
  Link2,
  Check,
  ArrowUpRight,
  Search,
  Sparkles,
  CalendarDays,
  Settings,
  CircleHelp,
} from "lucide-react";
import ReferenceDashboard from "./ReferenceDashboard";
import {
  LibraryPage,
  CalendarPage,
  ContentComposer,
  ReviewsPage,
  KeywordPage,
  VisibilityPage,
} from "./SectionPages";
import { content } from "./workspace-data";
import { extraContent } from "./content-data";
import "./section-shell.css";
import "./section-pages.css";
const views = [
  "Dashboard",
  "Content library",
  "Content calendar",
  "Social media",
  "Reviews",
  "Keyword research",
  "AI visibility",
  "Google Business",
  "Connections",
  "Notifications",
  "Settings",
  "Help",
];
const routeFor = (name) => name.toLowerCase().replaceAll(" ", "-");
const currentView = () =>
  views.find((v) => routeFor(v) === location.hash.slice(2)) || "Dashboard";
function App() {
  const [view, setView] = useState(currentView),
    [items, setItems] = useState([...content, ...extraContent]),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(null),
    [composer, setComposer] = useState(null),
    [toast, setToast] = useState("");
  const dialog = useRef(null);
  useEffect(() => {
    const change = () => {
      setView(currentView());
      setQuery("");
      setSelected(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  function navigate(name) {
    if (!views.includes(name)) return;
    setView(name);
    setQuery("");
    setSelected(null);
    setComposer(null);
    location.hash = "/" + routeFor(name);
    window.scrollTo(0, 0);
  }
  function create(date = "2026-09-14", keyword = "") {
    setComposer({
      date: typeof date === "string" ? date : "2026-09-14",
      keyword,
    });
  }
  function review(item) {
    setItems((old) =>
      old.map((i) =>
        i.id === item.id ? { ...i, status: "Ready for review" } : i,
      ),
    );
    setSelected(null);
    setToast("Marked ready for review in this preview.");
  }
  const filtered = items.filter((i) =>
    `${i.title} ${i.keyword} ${i.type}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  let section;
  if (view === "Reviews")
    section = (
      <ReviewsPage
        items={filtered}
        setItems={setItems}
        onOpen={setSelected}
        onToast={setToast}
      />
    );
  else if (["Content library", "Social media"].includes(view))
    section = (
      <LibraryPage
        key={view}
        items={filtered}
        setItems={setItems}
        onOpen={setSelected}
        onToast={setToast}
        onCreate={create}
        socialOnly={view === "Social media"}
        initialStatus={view === "Reviews" ? "Ready for review" : "All statuses"}
        onNavigate={navigate}
      />
    );
  else if (view === "Content calendar")
    section = (
      <CalendarPage items={filtered} onOpen={setSelected} onCreate={create} />
    );
  else if (view === "Keyword research")
    section = (
      <KeywordPage
        onCreate={(keyword) =>
          create("2026-09-14", typeof keyword === "string" ? keyword : "")
        }
        onLibrary={() => navigate("Content library")}
      />
    );
  else if (view === "AI visibility")
    section = (
      <VisibilityPage onKeywords={() => navigate("Keyword research")} />
    );
  else
    section = (
      <WorkspaceSection
        view={view}
        items={items}
        onOpen={setSelected}
        onNavigate={navigate}
      />
    );
  return (
    <>
      <ReferenceDashboard
        view={view}
        items={items}
        query={query}
        onQuery={setQuery}
        onOpen={setSelected}
        onNavigate={navigate}
        onCreate={create}
        onReview={review}
      >
        {section}
      </ReferenceDashboard>
      <div className="panze-ui rd-overlays">
        <ContentComposer
          open={!!composer}
          initialDate={composer?.date || "2026-09-14"}
          initialKeyword={composer?.keyword || ""}
          onClose={() => setComposer(null)}
          onSave={(item) => {
            setItems((old) => [...old, item]);
            setToast("Content added to your preview workspace.");
          }}
        />
        <dialog
          ref={dialog}
          aria-label="Content details"
          onCancel={() => setSelected(null)}
          onClick={(e) => {
            if (e.target === dialog.current) setSelected(null);
          }}
        >
          {selected && (
            <>
              <div className="dialog-header">
                <span className="px-symbol peach">
                  <FileText size={24} />
                </span>
                <button
                  className="px-round"
                  aria-label="Close content details"
                  onClick={() => setSelected(null)}
                >
                  <X size={22} />
                </button>
              </div>
              <h2>{selected.title}</h2>
              <p className="dialog-description">{selected.description}</p>
              <dl>
                {[
                  ["Content type", selected.type],
                  ["Scheduled for", `${selected.date} · ${selected.time}`],
                  ["Target keyword", selected.keyword],
                  ["Monthly searches", selected.volume],
                  ["Status", selected.status],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="preview-note">
                Content preview · Changes stay in this session.
              </p>
              <div className="dialog-actions">
                <button className="px-button" onClick={() => setSelected(null)}>
                  Close
                </button>
                <button
                  className="px-button primary"
                  disabled={
                    selected.status === "Published" ||
                    selected.status === "Ready for review"
                  }
                  onClick={() => review(selected)}
                >
                  <Check size={16} />
                  Mark ready for review
                </button>
              </div>
            </>
          )}
        </dialog>
        {toast && (
          <div className="toast" role="status">
            <CircleCheck size={20} />
            {toast}
            <button
              aria-label="Dismiss notification"
              onClick={() => setToast("")}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
function WorkspaceSection({ view, items, onOpen, onNavigate }) {
  if (view === "Help")
    return (
      <div className="ws-two-col">
        <section className="px-panel ws-panel">
          <h2>A little help, when you need it.</h2>
          <p className="ws-lead">
            Get from your next idea to a ready-to-review content plan.
          </p>
          {[
            [
              "How do I create content?",
              "Choose Create content, add a title and target keyword, and select a publishing date. Your draft joins the content library for this session.",
            ],
            [
              "Where can I review my content?",
              "Open Reviews from the navigation to see content ready for review. Open any item to inspect its topic, keyword and schedule.",
            ],
            [
              "Is this connected to my live website?",
              "This workspace is a local preview using saved LunchLink content. It does not publish, sync or generate live content.",
            ],
            [
              "Will my changes be saved?",
              "Changes remain while this page is open. Refreshing restores the saved sample workspace.",
            ],
          ].map(([q, a]) => (
            <details className="ws-faq" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section className="px-panel ws-panel ws-peach">
          <CircleHelp size={36} />
          <h2>Make yourself at home.</h2>
          <p className="ws-lead">
            Your content, schedule and research all live in one workspace.
          </p>
          <button
            className="px-button primary"
            onClick={() => onNavigate("Dashboard")}
          >
            Back to Dashboard <ArrowUpRight size={18} />
          </button>
        </section>
      </div>
    );
  if (view === "Notifications")
    return (
      <section className="px-panel ws-panel">
        <div className="ws-heading">
          <div>
            <h2>Your latest activity</h2>
            <p className="ws-lead">
              A snapshot of the LunchLink content workspace.
            </p>
          </div>
          <span className="ws-tag">Source snapshot</span>
        </div>
        {items
          .filter((i) => i.status === "Published")
          .slice(0, 5)
          .map((item) => (
            <button
              className="ws-activity-row"
              key={item.id}
              onClick={() => onOpen(item)}
            >
              <span className="ws-symbol">
                <FileText />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>
                  {item.type} · {item.date}
                </small>
              </span>
              <ArrowUpRight />
            </button>
          ))}
      </section>
    );
  if (view === "Settings")
    return (
      <div className="ws-two-col">
        <section className="px-panel ws-panel">
          <h2>Your workspace</h2>
          <div className="ws-workspace">
            <span className="ws-workspace-avatar">L</span>
            <div>
              <h3>LunchLink</h3>
              <p>Uplift AI content workspace</p>
            </div>
          </div>
          <dl className="ws-settings">
            <div>
              <dt>Workspace</dt>
              <dd>LunchLink</dd>
            </div>
            <div>
              <dt>Content channels</dt>
              <dd>Website, social & Google Business</dd>
            </div>
            <div>
              <dt>Workspace status</dt>
              <dd>Setup complete</dd>
            </div>
            <div>
              <dt>Environment</dt>
              <dd>Local preview</dd>
            </div>
          </dl>
          <button
            className="px-button"
            onClick={() => onNavigate("Connections")}
          >
            View publishing connections <ArrowUpRight size={17} />
          </button>
        </section>
        <section className="px-panel ws-panel">
          <div className="ws-heading">
            <h2>You're ready to go</h2>
            <span className="ws-tag">5 of 5 complete</span>
          </div>
          {[
            "Business profile",
            "SEO content plan",
            "Social topic plan",
            "Publishing connections",
            "Generate SEO + Social",
          ].map((label, i) => (
            <div className="ws-setup-row" key={label}>
              <span>{i + 1}</span>
              <strong>{label}</strong>
              <CircleCheck />
            </div>
          ))}
          <p className="ws-note">
            Setup reflects the saved workspace. Live account settings are not
            connected in this preview.
          </p>
        </section>
      </div>
    );
  const connections =
    view === "Google Business"
      ? [
          [
            Globe2,
            "Google Business Profile",
            "The saved connection has not synced recently.",
            "Sync overdue",
          ],
        ]
      : [
          [
            Globe2,
            "Website publishing",
            "Your saved website publishing destination is ready.",
            "Connected",
          ],
          [
            Globe2,
            "Google Business Profile",
            "Review the saved connection before relying on automation.",
            "Sync overdue",
          ],
          [
            Share2,
            "Social publishing",
            "4 social accounts connected in the source workspace.",
            "Connected",
          ],
        ];
  return (
    <div className="ws-two-col">
      <section className="px-panel ws-panel">
        <h2>
          {view === "Google Business"
            ? "Your local presence"
            : "Keep your channels together"}
        </h2>
        <p className="ws-lead">Publishing connection health for LunchLink.</p>
        {connections.map(([Icon, name, desc, status]) => (
          <div className="ws-connection" key={name}>
            <span className="ws-symbol">
              <Icon />
            </span>
            <div>
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
            <span
              className={
                "ws-tag " + (status === "Sync overdue" ? "warning" : "")
              }
            >
              {status}
            </span>
          </div>
        ))}
        <p className="ws-note">
          These are saved connection states. Live syncing is unavailable in this
          preview.
        </p>
      </section>
      <section className="px-panel ws-panel ws-mint">
        <CalendarDays size={34} />
        <h2>Plan what comes next.</h2>
        <p className="ws-lead">
          Keep your website and social content moving with one shared publishing
          calendar.
        </p>
        <button
          className="px-button primary"
          onClick={() => onNavigate("Content calendar")}
        >
          Open your calendar <ArrowUpRight size={18} />
        </button>
      </section>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
