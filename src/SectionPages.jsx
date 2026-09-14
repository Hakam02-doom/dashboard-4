import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  FileText,
  Share2,
  Globe2,
  Search,
  CalendarDays,
  CircleCheck,
  Clock3,
  Sparkles,
  X,
  Check,
  SlidersHorizontal,
  LayoutGrid,
  List,
  FolderOpen,
} from "lucide-react";
const statuses = ["Draft", "Ready for review", "Scheduled", "Published"];
const iso = (d) => new Date(d + " 12:00:00");
const short = (d) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const key = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const tone = (s) =>
  ({
    Draft: "peach",
    "Ready for review": "pink",
    Scheduled: "blue",
    Published: "mint",
  })[s] || "peach";
export function RoundAction({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      className="px-round"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={21} strokeWidth={1.5} />
    </button>
  );
}
function PanelTitle({ title, children }) {
  return (
    <div className="px-heading">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
function Badge({ status }) {
  return (
    <span className={`px-status ${tone(status)}`}>
      <i />
      {status}
    </span>
  );
}
function Empty({ message, onCreate }) {
  return (
    <div className="px-empty">
      <FolderOpen size={32} />
      <h3>Room for your next idea.</h3>
      <p>{message || "No content matches this view. Try another filter."}</p>
      {onCreate && (
        <button className="px-button" onClick={() => onCreate()}>
          Create content <Plus size={17} />
        </button>
      )}
    </div>
  );
}
function exportRows(rows, onToast) {
  const fields = ["title", "type", "status", "date", "keyword"];
  const esc = (s) => '"' + String(s ?? "").replaceAll('"', '""') + '"';
  const blob = new Blob(
    [
      fields.join(",") +
        "\n" +
        rows.map((r) => fields.map((f) => esc(r[f])).join(",")).join("\n"),
    ],
    { type: "text/csv;charset=utf-8;" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lunchlink-content.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  onToast(`${rows.length} content items exported.`);
}
function ContentCard({ item, onOpen }) {
  const Icon = item.type === "Social post" ? Share2 : FileText;
  return (
    <button
      className={`px-content-card ${tone(item.status)}`}
      onClick={() => onOpen(item)}
    >
      <span className="px-card-top">
        <Icon size={27} strokeWidth={1.6} />
        <ArrowUpRight size={20} />
      </span>
      <span className="px-card-title">{item.title}</span>
      <span className="px-card-copy">{item.description}</span>
      <span className="px-card-foot">
        <span>{item.type}</span>
        <span>{item.date.replace(", 2026", "")}</span>
      </span>
      <Badge status={item.status} />
    </button>
  );
}
export function LibraryPage({
  items,
  onOpen,
  onCreate,
  onToast,
  onNavigate,
  socialOnly = false,
}) {
  const [filter, setFilter] = useState("All content"),
    [layout, setLayout] = useState("Grid"),
    [sort, setSort] = useState("Newest first");
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => setVisibleCount(6), [filter, sort, items]);
  const base = items.filter((i) => !socialOnly || i.type === "Social post");
  const rows = base
    .filter(
      (i) =>
        filter === "All content" ||
        (filter === "SEO articles"
          ? i.type === "SEO article"
          : filter === "Social posts"
            ? i.type === "Social post"
            : i.status === filter),
    )
    .sort((a, b) =>
      sort === "A to Z"
        ? a.title.localeCompare(b.title)
        : iso(b.date) - iso(a.date),
    );
  const scheduled = base
    .filter((i) => i.status === "Scheduled")
    .sort((a, b) => iso(a.date) - iso(b.date));
  return (
    <div className="px-library-layout">
      <aside className="px-panel px-collections">
        <PanelTitle title={socialOnly ? "Post collections" : "My Collections"}>
          <FolderOpen size={23} />
        </PanelTitle>
        <div className="px-collection-list">
          {[
            "All content",
            ...(!socialOnly ? ["SEO articles", "Social posts"] : []),
            ...statuses,
          ].map((f) => (
            <button
              key={f}
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              <span>{f}</span>
              <span>
                {
                  base.filter(
                    (i) =>
                      f === "All content" ||
                      (f === "SEO articles"
                        ? i.type === "SEO article"
                        : f === "Social posts"
                          ? i.type === "Social post"
                          : i.status === f),
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="px-side-note mint">
          <Sparkles size={25} />
          <h3>Good ideas belong here.</h3>
          <p>
            Bring your articles and social content together, from first draft to
            final review.
          </p>
          <button className="px-link" onClick={() => onCreate()}>
            Add an idea <Plus size={17} />
          </button>
        </div>
      </aside>
      <section className="px-panel px-library-main">
        <PanelTitle title={socialOnly ? "Social Studio" : "Your Content"}>
          <RoundAction
            icon={Plus}
            label="Create content"
            onClick={() => onCreate()}
          />
        </PanelTitle>
        <div className="px-toolbar">
          <span>
            {rows.length} {rows.length === 1 ? "piece" : "pieces"} in this
            collection
          </span>
          <div>
            <select
              aria-label="Sort content"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Newest first</option>
              <option>A to Z</option>
            </select>
            <button
              className={layout === "Grid" ? "selected" : ""}
              aria-label="Grid layout"
              onClick={() => setLayout("Grid")}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={layout === "List" ? "selected" : ""}
              aria-label="List layout"
              onClick={() => setLayout("List")}
            >
              <List size={19} />
            </button>
            <RoundAction
              icon={ArrowDownToLine}
              label="Export this collection"
              onClick={() => exportRows(rows, onToast)}
            />
          </div>
        </div>
        <div
          className={layout === "Grid" ? "px-content-grid" : "px-content-list"}
        >
          {rows.slice(0, visibleCount).map((item) => (
            <ContentCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
        {rows.length > visibleCount && (
          <button
            className="px-button px-load-more"
            onClick={() => setVisibleCount((n) => n + 6)}
          >
            Show more content <Plus size={17} />
          </button>
        )}
        {!!rows.length && (
          <p className="px-footnote">
            Showing {Math.min(visibleCount, rows.length)} of {rows.length}{" "}
            pieces
          </p>
        )}
        {!rows.length && <Empty />}
      </section>
      <aside className="px-library-side">
        <section className="px-panel">
          <PanelTitle title="Next to Publish">
            <RoundAction
              icon={CalendarDays}
              label="Open calendar"
              onClick={() => onNavigate("Content calendar")}
            />
          </PanelTitle>
          {scheduled.slice(0, 2).map((i) => (
            <button
              className="px-next-card"
              key={i.id}
              onClick={() => onOpen(i)}
            >
              <span>
                {i.date.replace(", 2026", "")}
                <ArrowUpRight size={18} />
              </span>
              <h3>{i.title}</h3>
              <small>
                <Globe2 size={17} />
                {i.time}
              </small>
            </button>
          ))}
          {!scheduled.length && (
            <p className="px-muted">No scheduled content in this collection.</p>
          )}
          <button
            className="px-link"
            onClick={() => onNavigate("Content calendar")}
          >
            See your calendar <ChevronRight size={18} />
          </button>
        </section>
        <section className="px-panel">
          <PanelTitle title="Your Channels" />
          <div className="px-channel-row">
            <span className="px-symbol blue">
              <Globe2 />
            </span>
            <div>
              <h3>Website</h3>
              <p>
                {items.filter((i) => i.type === "SEO article").length} articles
                in this preview
              </p>
            </div>
          </div>
          <div className="px-channel-row">
            <span className="px-symbol pink">
              <Share2 />
            </span>
            <div>
              <h3>Social media</h3>
              <p>
                {items.filter((i) => i.type === "Social post").length} post sets
                in this preview
              </p>
            </div>
          </div>
          <button className="px-link" onClick={() => onNavigate("Connections")}>
            Manage connections <ChevronRight size={18} />
          </button>
        </section>
      </aside>
    </div>
  );
}
export function ReviewsPage({ items, setItems, onOpen, onToast }) {
  const [tab, setTab] = useState("Ready for review"),
    [chosen, setChosen] = useState(null);
  const queue = items.filter((i) => i.status === tab);
  const selected = queue.find((i) => i.id === chosen) || queue[0];
  function move(status) {
    setItems((old) =>
      old.map((i) => (i.id === selected.id ? { ...i, status } : i)),
    );
    onToast(
      status === "Draft"
        ? "Returned to drafts in this preview."
        : "Added to your preview publishing schedule.",
    );
    setChosen(null);
  }
  return (
    <div className="px-review-layout">
      <section className="px-panel px-review-queue">
        <PanelTitle title="Review Queue">
          <span className="px-count">{queue.length}</span>
        </PanelTitle>
        <div className="px-pills">
          {["Ready for review", "Draft"].map((s) => (
            <button
              className={tab === s ? "selected" : ""}
              key={s}
              onClick={() => {
                setTab(s);
                setChosen(null);
              }}
            >
              {s === "Ready for review" ? "To review" : "Drafts"}
            </button>
          ))}
        </div>
        {queue.map((item, i) => (
          <button
            key={item.id}
            className={`px-review-choice ${selected?.id === item.id ? "chosen" : ""}`}
            onClick={() => setChosen(item.id)}
          >
            <img src={`/avatars/contributor-${(i % 3) + 1}.jpg`} alt="" />
            <span>
              <strong>{item.title}</strong>
              <small>
                {item.type} · {item.date.replace(", 2026", "")}
              </small>
            </span>
            <ChevronRight size={19} />
          </button>
        ))}
        {!queue.length && (
          <Empty message="You're all caught up with this queue." />
        )}
      </section>
      <section className="px-panel px-review-detail">
        {selected ? (
          <>
            <PanelTitle title="A Fresh Pair of Eyes">
              <RoundAction
                icon={ArrowUpRight}
                label="Open full content details"
                onClick={() => onOpen(selected)}
              />
            </PanelTitle>
            <div className={`px-review-paper ${tone(selected.status)}`}>
              <span className="px-paper-type">
                <FileText size={20} />
                {selected.type}
              </span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="px-keyword-chip">
                <Search size={16} />
                {selected.keyword}
              </div>
            </div>
            <div className="px-detail-facts">
              <div>
                <span>Planned for</span>
                <strong>{selected.date}</strong>
              </div>
              <div>
                <span>Publishing time</span>
                <strong>{selected.time}</strong>
              </div>
              <div>
                <span>Search demand</span>
                <strong>{selected.volume} / month</strong>
              </div>
            </div>
            <div className="px-review-checks">
              <h3>Before you schedule</h3>
              <p>
                Check the topic, target keyword and publishing date in the
                content details.
              </p>
              <span>
                <CircleCheck size={18} /> Content brief available
              </span>
              <span>
                <CircleCheck size={18} /> Publishing date assigned
              </span>
            </div>
            <div className="px-actions">
              <button
                className="px-button"
                disabled={selected.status === "Draft"}
                onClick={() => move("Draft")}
              >
                Return to drafts
              </button>
              <button
                className="px-button primary"
                onClick={() => move("Scheduled")}
              >
                Add to schedule <Check size={18} />
              </button>
            </div>
            <p className="px-footnote">
              Updates this local preview. Nothing is published.
            </p>
          </>
        ) : (
          <Empty message="Select another queue to keep reviewing." />
        )}
      </section>
    </div>
  );
}
export function CalendarPage({ items, onOpen, onCreate }) {
  const [cursor, setCursor] = useState(new Date(2026, 8, 14)),
    [month, setMonth] = useState(new Date(2026, 8, 1)),
    [type, setType] = useState("All content"),
    [mode, setMode] = useState("Week");
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(cursor);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + i);
    return d;
  });
  const active = items
    .filter((i) => type === "All content" || i.type === type)
    .sort((a, b) => iso(a.date) - iso(b.date));
  const dates = mode === "Week" ? days : [cursor];
  const first = (month.getDay() + 6) % 7;
  const count = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  function change(n) {
    const d = new Date(cursor);
    d.setDate(d.getDate() + n);
    setCursor(d);
    setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }
  return (
    <div className="px-calendar-layout">
      <section className="px-panel px-agenda">
        <PanelTitle title="Your Publishing Week">
          <div className="px-controls">
            <RoundAction
              icon={ChevronLeft}
              label="Previous week"
              onClick={() => change(-7)}
            />
            <RoundAction
              icon={ChevronRight}
              label="Next week"
              onClick={() => change(7)}
            />
            <button
              className="px-button"
              onClick={() => {
                setCursor(new Date(2026, 8, 14));
                setMonth(new Date(2026, 8, 1));
              }}
            >
              Today
            </button>
          </div>
        </PanelTitle>
        <div className="px-week-strip">
          {days.map((d) => (
            <button
              key={key(d)}
              className={key(d) === key(cursor) ? "selected" : ""}
              onClick={() => setCursor(d)}
            >
              <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
              <strong>{d.getDate()}</strong>
              <i
                className={
                  active.some((i) => key(iso(i.date)) === key(d))
                    ? "has-content"
                    : ""
                }
              />
            </button>
          ))}
        </div>
        <div className="px-toolbar">
          <div className="px-pills">
            {["Week", "Day"].map((m) => (
              <button
                key={m}
                className={mode === m ? "selected" : ""}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <select
            aria-label="Calendar content type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>All content</option>
            <option>SEO article</option>
            <option>Social post</option>
          </select>
        </div>
        <div className="px-agenda-days">
          {dates.map((d) => {
            const entries = active.filter((i) => key(iso(i.date)) === key(d));
            return (
              <div className="px-agenda-day" key={key(d)}>
                <div className="px-agenda-date">
                  <strong>{d.getDate()}</strong>
                  <span>
                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </div>
                <div className="px-agenda-entries">
                  {entries.map((item) => (
                    <button
                      className={`px-agenda-event ${tone(item.status)}`}
                      key={item.id}
                      onClick={() => onOpen(item)}
                    >
                      <span className="px-event-time">
                        <Clock3 size={17} />
                        {item.time}
                      </span>
                      <span>
                        <h3>{item.title}</h3>
                        <small>{item.type}</small>
                      </span>
                      <ArrowUpRight size={21} />
                    </button>
                  ))}
                  {!entries.length && (
                    <button
                      className="px-calendar-empty"
                      onClick={() => onCreate(key(d))}
                    >
                      A little room for your next idea <Plus size={19} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <aside className="px-calendar-side">
        <section className="px-panel">
          <PanelTitle
            title={month.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          >
            <div className="px-controls">
              <RoundAction
                icon={ChevronLeft}
                label="Previous month"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
              />
              <RoundAction
                icon={ChevronRight}
                label="Next month"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
              />
            </div>
          </PanelTitle>
          <div className="px-month-grid">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={"h" + i}>{d}</span>
            ))}
            {Array.from({ length: first }, (_, i) => (
              <i key={"blank" + i} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const d = new Date(month.getFullYear(), month.getMonth(), i + 1);
              return (
                <button
                  key={i}
                  aria-label={short(d)}
                  className={key(d) === key(cursor) ? "selected" : ""}
                  onClick={() => setCursor(d)}
                >
                  {i + 1}
                  {active.some((a) => key(iso(a.date)) === key(d)) && <i />}
                </button>
              );
            })}
          </div>
          <button
            className="px-button primary px-full"
            onClick={() => onCreate(key(cursor))}
          >
            Plan content <Plus size={18} />
          </button>
        </section>
        <section className="px-panel">
          <PanelTitle title="On Your Calendar" />
          {statuses.map((s) => (
            <div className="px-calendar-total" key={s}>
              <Badge status={s} />
              <strong>{active.filter((i) => i.status === s).length}</strong>
            </div>
          ))}
          <p className="px-footnote">Counts from this preview workspace.</p>
        </section>
      </aside>
    </div>
  );
}
const keywords = [
  { name: "office snack delivery", volume: 900, difficulty: 42 },
  { name: "healthy salad catering guide", volume: 480, difficulty: 38 },
  { name: "vegan office catering options", volume: 70, difficulty: 26 },
  { name: "gluten-free catering strategies", volume: 60, difficulty: 30 },
  { name: "allergen labeling best practices", volume: 50, difficulty: 32 },
];
export function KeywordPage({ onCreate }) {
  const [query, setQuery] = useState(""),
    [low, setLow] = useState(false),
    [chosen, setChosen] = useState(keywords[2]);
  const rows = keywords.filter(
    (k) => k.name.includes(query.toLowerCase()) && (!low || k.difficulty <= 32),
  );
  return (
    <div className="px-keywords-layout">
      <section className="px-panel px-keyword-collection">
        <PanelTitle title="Find Your Next Topic">
          <RoundAction
            icon={SlidersHorizontal}
            label="Toggle lower difficulty keywords"
            onClick={() => setLow(!low)}
          />
        </PanelTitle>
        <label className="px-search">
          <Search size={22} />
          <input
            aria-label="Search keyword opportunities"
            placeholder="What are people searching for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="px-pills">
          <button
            className={!low ? "selected" : ""}
            onClick={() => setLow(false)}
          >
            All opportunities
          </button>
          <button
            className={low ? "selected" : ""}
            onClick={() => setLow(true)}
          >
            Lower difficulty
          </button>
        </div>
        <div className="px-keyword-list">
          {rows.map((k, i) => (
            <button
              className={`px-keyword-option ${chosen.name === k.name ? "chosen" : ""}`}
              key={k.name}
              onClick={() => setChosen(k)}
            >
              <span
                className={`px-symbol ${["peach", "blue", "mint", "pink"][i % 4]}`}
              >
                <Search size={24} />
              </span>
              <span>
                <strong>{k.name}</strong>
                <small>{k.volume} monthly searches</small>
              </span>
              <span className="px-keyword-difficulty">
                {k.difficulty}
                <small>difficulty</small>
              </span>
              <ChevronRight size={20} />
            </button>
          ))}
        </div>
        {!rows.length && (
          <Empty message="Try a different keyword or change your difficulty filter." />
        )}
        <p className="px-footnote">
          5 source opportunities · 132 tracked keywords in the saved workspace
        </p>
      </section>
      <aside className="px-panel px-keyword-plan">
        <PanelTitle title="Make It Your Next Article">
          <Sparkles size={25} />
        </PanelTitle>
        <div className="px-topic-paper mint">
          <span className="px-symbol">
            <Search size={28} />
          </span>
          <h2>{chosen.name}</h2>
          <p>A search opportunity for your LunchLink content plan.</p>
        </div>
        <div className="px-topic-measures">
          <div>
            <span>Monthly searches</span>
            <strong>{chosen.volume}</strong>
            <div className="px-track">
              <i style={{ width: `${(chosen.volume / 900) * 100}%` }} />
            </div>
          </div>
          <div>
            <span>Keyword difficulty</span>
            <strong>
              {chosen.difficulty}
              <small>/100</small>
            </strong>
            <div className="px-track orange">
              <i style={{ width: `${chosen.difficulty}%` }} />
            </div>
          </div>
        </div>
        <button
          className="px-button primary px-full"
          onClick={() => onCreate(chosen.name)}
        >
          Plan this article <Plus size={18} />
        </button>
        <p className="px-footnote">
          Opens a content brief with this keyword filled in. Search volumes are
          historical source data.
        </p>
      </aside>
    </div>
  );
}
const prompts = [
  "What is corporate catering GTA?",
  "What are vegan corporate catering options?",
  "How much does corporate catering cost in Toronto?",
  "How to choose a corporate caterer?",
  "What is breakfast catering for corporate meetings?",
];
export function VisibilityPage({ onKeywords }) {
  const [query, setQuery] = useState("");
  return (
    <div className="px-visibility-layout">
      <section className="px-panel px-visibility-baseline">
        <PanelTitle title="Your Place in AI Search">
          <Sparkles size={26} />
        </PanelTitle>
        <div className="px-score">
          <strong>
            6<span>%</span>
          </strong>
          <p>Your recorded visibility</p>
        </div>
        <div className="px-track">
          <i style={{ width: "6%" }} />
        </div>
        <div className="px-baseline-facts">
          <div>
            <strong>6</strong>
            <span>Citations</span>
          </div>
          <div>
            <strong>53</strong>
            <span>Monitored prompts</span>
          </div>
          <div>
            <strong>5</strong>
            <span>Competitors</span>
          </div>
        </div>
        <p className="px-footnote">
          Source scan · August 29, 2026
          <br />A new scan requires a connected workspace.
        </p>
      </section>
      <section className="px-panel px-prompt-panel">
        <PanelTitle title="Be Part of the Answer" />
        <label className="px-search">
          <Search size={21} />
          <input
            aria-label="Search tracked questions"
            placeholder="Search audience questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="px-prompt-list">
          {prompts
            .filter((p) => p.toLowerCase().includes(query.toLowerCase()))
            .map((p, i) => (
              <div
                className={`px-prompt ${["peach", "blue", "pink", "mint"][i % 4]}`}
                key={p}
              >
                <Search size={21} />
                <h3>{p}</h3>
                <span>Tracked</span>
              </div>
            ))}
        </div>
        {!prompts.some((p) =>
          p.toLowerCase().includes(query.toLowerCase()),
        ) && <Empty />}
        <p className="px-footnote">
          Sample tracked prompts from the saved workspace.
        </p>
      </section>
      <section className="px-panel px-visibility-next">
        <div>
          <span className="px-symbol mint">
            <FileText size={28} />
          </span>
          <h2>Helpful content starts here.</h2>
          <p>Find the questions you can answer with your next article.</p>
        </div>
        <div>
          <span className="px-readiness">
            Content readiness <strong>Not scored</strong>
          </span>
          <button className="px-button primary" onClick={onKeywords}>
            Explore keywords <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
export function ContentComposer({
  open,
  onClose,
  onSave,
  initialDate,
  initialKeyword = "",
}) {
  const ref = useRef(null);
  const [title, setTitle] = useState(""),
    [type, setType] = useState("SEO article"),
    [status, setStatus] = useState("Draft"),
    [date, setDate] = useState(initialDate),
    [time, setTime] = useState("08:00"),
    [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (open) {
      setTitle(initialKeyword);
      setKeyword(initialKeyword);
      setType("SEO article");
      setStatus("Draft");
      setDate(initialDate);
      setTime("08:00");
      ref.current?.showModal();
    } else ref.current?.close();
  }, [open, initialDate, initialKeyword]);
  function save(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const [h, m] = time.split(":").map(Number);
    onSave({
      id: Date.now(),
      title: title.trim(),
      type,
      status,
      date: short(new Date(date + "T12:00:00")),
      time: `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`,
      keyword: keyword.trim() || title.trim().toLowerCase(),
      volume: 0,
      tone: type === "SEO article" ? "peach" : "green",
      description: "A new content brief planned in this local workspace.",
    });
    onClose();
  }
  return (
    <dialog
      ref={ref}
      className="px-composer"
      aria-label="Create content"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <form onSubmit={save}>
        <PanelTitle title="A New Idea Starts Here">
          <RoundAction icon={X} label="Close new content" onClick={onClose} />
        </PanelTitle>
        <p className="px-muted">
          Give your next piece a title, a topic, and a place in your calendar.
        </p>
        <label>
          Content title
          <input
            autoFocus
            required
            maxLength={140}
            placeholder="What's your next idea?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className="px-form-pair">
          <label>
            Content type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>SEO article</option>
              <option>Social post</option>
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses
                .filter((s) => s !== "Published")
                .map((s) => (
                  <option key={s}>{s}</option>
                ))}
            </select>
          </label>
        </div>
        <label>
          Target keyword
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. office lunch catering"
          />
        </label>
        <div className="px-form-pair">
          <label>
            Planned date
            <input
              type="date"
              required
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Time
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>
        <div className="px-actions">
          <span className="px-footnote">Saved in this preview only.</span>
          <button type="submit" className="px-button primary">
            Add content <Plus size={18} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
