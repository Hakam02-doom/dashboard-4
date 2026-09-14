import React, { useState } from "react";
import {
  LayoutGrid,
  CalendarDays,
  ShoppingBag,
  ClipboardList,
  SquareCheck,
  Layers,
  Files,
  MessagesSquare,
  Users,
  FolderOpen,
  CircleHelp,
  MoreHorizontal,
  Settings,
  Mail,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  FileText,
  Globe2,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./reference-dashboard.css";

const rail = [
  ["Dashboard", LayoutGrid],
  ["Content calendar", CalendarDays],
  ["Google Business", ShoppingBag],
  ["Content library", ClipboardList],
  ["Reviews", SquareCheck],
  ["AI visibility", Layers],
  ["Social media", Files],
  ["Notifications", MessagesSquare],
  ["Keyword research", Search],
  ["Connections", FolderOpen],
  ["Help", CircleHelp],
  ["Settings", Settings],
];
const series = {
  "This Month": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    articles: [24, 19, 25, 21, 12, 24, 20],
    social: [5, 4, 3, 5, 7, 4, 6],
  },
  "This Week": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    articles: [9, 15, 12, 19, 8, 16, 12],
    social: [2, 3, 2, 5, 3, 4, 3],
  },
  Today: {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
    articles: [2, 4, 3, 6, 4, 7, 5],
    social: [1, 1, 2, 1, 2, 3, 2],
  },
};
function IconButton({ icon: Icon, label, onClick, dot, className = "" }) {
  return (
    <button
      className={`rd-icon ${className}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon strokeWidth={1.5} />
      {dot && <i />}
    </button>
  );
}
function smooth(values, max = 30) {
  const samples = values.flatMap((v, i) =>
    i === values.length - 1
      ? [v]
      : [
          v,
          v * 0.72 + values[i + 1] * 0.28 - 1.2,
          v * 0.48 + values[i + 1] * 0.52 + 1,
          v * 0.2 + values[i + 1] * 0.8 - 0.7,
        ],
  );
  const step = 360 / (samples.length - 1);
  const pts = samples.map((v, i) => [i * step, 265 - (v / max) * 210]);
  return pts
    .map(([x, y], i) =>
      i
        ? `C${x - step * 0.6},${pts[i - 1][1]} ${x - step * 0.4},${y} ${x},${y}`
        : `M${x},${y}`,
    )
    .join(" ");
}
function ActivityChart({ range }) {
  const [point, setPoint] = useState(3);
  const [showSocial, setShowSocial] = useState(true);
  const [options, setOptions] = useState(false);
  const data = series[range];
  const scale = range === "Today" ? 9 : 30;
  const a = smooth(data.articles, scale),
    b = smooth(data.social, scale);
  return (
    <section className="rd-panel rd-activity">
      <div className="rd-panel-title">
        <h2>SEO vs Social</h2>
        <div className="rd-controls">
          <IconButton
            icon={SlidersHorizontal}
            label="Chart options"
            onClick={() => setOptions(!options)}
          />
          <IconButton
            icon={ArrowUpRight}
            label="View activity details"
            onClick={() => setOptions(!options)}
          />
        </div>
      </div>
      {options && (
        <div className="rd-chart-options">
          <label>
            <input
              type="checkbox"
              checked={showSocial}
              onChange={(e) => setShowSocial(e.target.checked)}
            />{" "}
            Show social content
          </label>
          <span>Illustrative activity · {range.toLowerCase()}</span>
        </div>
      )}
      <div className="rd-chart">
        <div
          className="rd-chart-tip"
          style={{ left: `${Math.min(49, point * 12 + 3)}%` }}
        >
          <span>
            <i className="rd-dot blue" />
            SEO articles: {data.articles[point]}
          </span>
          {showSocial && (
            <span>
              <i className="rd-dot orange" />
              Social posts: {data.social[point]}
            </span>
          )}
        </div>
        <svg
          viewBox="0 0 360 290"
          preserveAspectRatio="none"
          role="img"
          aria-label="Illustrative SEO and social content activity. Select a day below to inspect its values."
        >
          <defs>
            <linearGradient id="rd-blue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#0b9fff" stopOpacity=".16" />
              <stop offset="1" stopColor="#0b9fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rd-orange-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#ff8c00" stopOpacity=".17" />
              <stop offset="1" stopColor="#ff8c00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${a} L360 280 L0 280 Z`} fill="url(#rd-blue-fill)" />
          <path d={a} stroke="#0097f5" strokeWidth="1.3" fill="none" />
          {showSocial && (
            <>
              <path d={`${b} L360 280 L0 280 Z`} fill="url(#rd-orange-fill)" />
              <path d={b} stroke="#ff8300" strokeWidth="1.3" fill="none" />
            </>
          )}
          <path
            d={`M${point * 60} 105 V280`}
            stroke="#92999b"
            strokeDasharray="3 4"
          />
          {[data.articles, ...(showSocial ? [data.social] : [])].map((d, i) => (
            <circle
              key={i}
              cx={point * 60}
              cy={265 - (d[point] / scale) * 210}
              r="6"
              fill="white"
              stroke={i ? "#ff8300" : "#0097f5"}
              strokeWidth="2.5"
            />
          ))}
        </svg>
        <div className="rd-chart-days">
          {data.labels.map((d, i) => (
            <button
              key={d}
              onMouseEnter={() => setPoint(i)}
              onFocus={() => setPoint(i)}
              onClick={() => setPoint(i)}
              aria-label={`${d}: ${data.articles[i]} SEO articles, ${data.social[i]} social posts`}
              aria-pressed={point === i}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <p className="rd-chart-caption">Illustrative activity</p>
    </section>
  );
}
export default function ReferenceDashboard({
  items,
  query,
  onQuery,
  onOpen,
  onNavigate,
  onCreate,
  onReview,
  view = "Dashboard",
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [range, setRange] = useState("This Month");
  const [day, setDay] = useState("Today");
  const [taskFilter, setTaskFilter] = useState("On Going Tasks");
  const [pipelineFilter, setPipelineFilter] = useState(false);
  const [read, setRead] = useState(false);
  const taskItems = items.filter(
    (i) =>
      (taskFilter === "Completed Tasks"
        ? i.status === "Published"
        : i.status !== "Published") &&
      (!query ||
        `${i.title} ${i.type} ${i.keyword}`
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  // Task-day assignments are illustrative; publishing dates remain unchanged.
  const tasks = taskItems.filter(
    (item) => (item.id % 3 === 2 ? "Tomorrow" : "Today") === day,
  );
  const visibleItems = items.filter(
    (i) =>
      range === "This Month" ||
      (range === "Today"
        ? i.date === "Sep 14, 2026"
        : new Date(i.date) >= new Date("Sep 14, 2026") &&
          new Date(i.date) <= new Date("Sep 20, 2026")),
  );
  const stats = [
    [
      "In progress",
      visibleItems.filter((i) =>
        ["Scheduled", "Ready for review"].includes(i.status),
      ).length,
      "orange",
    ],
    [
      "Published",
      visibleItems.filter((i) => i.status === "Published").length,
      "blue",
    ],
    [
      "Drafts",
      visibleItems.filter((i) => i.status === "Draft").length,
      "neutral",
    ],
  ];
  const total = stats.reduce((s, x) => s + x[1], 0) || 1;
  let offset = 0;
  const reviews = items.filter((i) => i.status === "Ready for review");
  const scheduled = items.filter((i) => i.status === "Scheduled").slice(0, 2);
  const pipeline = [
    ["Draft", "Drafts", "purple"],
    ["Ready for review", "Ready for Review", "pink"],
    ["Scheduled", "Scheduled", "cyan"],
    ["Published", "Published", "green"],
  ];
  const counts = pipeline.map(
    ([status]) => visibleItems.filter((i) => i.status === status).length,
  );
  return (
    <div className="rd-shell" data-view={view}>
      <header className="rd-header">
        <button
          className="rd-brand"
          aria-label="Uplift AI home"
          onClick={() => onNavigate("Dashboard")}
        >
          uplift<span>ai workspace.</span>
        </button>
        <nav
          className="rd-period"
          aria-label={
            view === "Dashboard" ? "Dashboard period" : "Workspace shortcuts"
          }
        >
          {(view === "Dashboard"
            ? ["Today", "This Week", "This Month", "Reports"]
            : ["Overview", "Library", "Calendar", "Research"]
          ).map((x) => (
            <button
              key={x}
              className={
                (
                  view === "Dashboard"
                    ? range === x
                    : {
                        Library: "Content library",
                        Calendar: "Content calendar",
                        Research: "Keyword research",
                      }[x] === view
                )
                  ? "active"
                  : ""
              }
              aria-pressed={
                view === "Dashboard"
                  ? range === x
                  : {
                      Library: "Content library",
                      Calendar: "Content calendar",
                      Research: "Keyword research",
                    }[x] === view
              }
              onClick={() =>
                view !== "Dashboard"
                  ? onNavigate(
                      {
                        Overview: "Dashboard",
                        Library: "Content library",
                        Calendar: "Content calendar",
                        Research: "Keyword research",
                      }[x],
                    )
                  : x === "Reports"
                    ? onNavigate("AI visibility")
                    : setRange(x)
              }
            >
              {x}
            </button>
          ))}
        </nav>
        <div className="rd-header-actions">
          <IconButton
            icon={Mail}
            label="Activity inbox"
            dot={!read}
            onClick={() => {
              setRead(true);
              onNavigate("Notifications");
            }}
          />
          <IconButton
            icon={Bell}
            label="Notifications"
            dot={!read}
            onClick={() => {
              setRead(true);
              onNavigate("Notifications");
            }}
          />
          <IconButton
            icon={CircleHelp}
            label="Workspace information"
            onClick={() => onNavigate("Help")}
          />
          <IconButton
            icon={Settings}
            label="Workspace settings"
            onClick={() => onNavigate("Settings")}
          />
          <button className="rd-profile" onClick={() => onNavigate("Settings")}>
            <span className="rd-profile-avatar">L</span>
            <span>
              <strong>LunchLink</strong>
              <small>Content workspace</small>
            </span>
          </button>
        </div>
      </header>
      <aside className="rd-rail" aria-label="Main navigation">
        {rail.map(([name, Icon], i) => (
          <IconButton
            key={i}
            icon={Icon}
            className={view === name ? "active" : ""}
            label={name}
            dot={i === 7 && !read}
            onClick={() => {
              onNavigate(name);
              setMenuOpen(false);
            }}
          />
        ))}
        <IconButton
          icon={menuOpen ? X : MoreHorizontal}
          className="rd-more"
          label="More sections"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </aside>
      {menuOpen && (
        <nav className="rd-mobile-menu" aria-label="All sections">
          {rail.map(([name, Icon]) => (
            <button
              key={name}
              className={view === name ? "active" : ""}
              onClick={() => {
                onNavigate(name);
                setMenuOpen(false);
              }}
            >
              <Icon size={20} />
              {name}
            </button>
          ))}
        </nav>
      )}
      <main className="rd-main">
        <div className="rd-intro">
          <div>
            <p>
              {view === "Dashboard"
                ? "Manage and grow your content"
                : "Your LunchLink workspace"}
            </p>
            <h1>{view === "Dashboard" ? "Content Dashboard" : view}</h1>
          </div>
          {[
            "Dashboard",
            "Content library",
            "Social media",
            "Reviews",
            "Content calendar",
          ].includes(view) ? (
            <label className="rd-search">
              <Search strokeWidth={1.3} />
              <input
                aria-label="Search dashboard content"
                placeholder="Search Content, Keywords, Projects..."
                value={query}
                onChange={(e) => onQuery(e.target.value)}
              />
              {query && (
                <button
                  aria-label="Clear dashboard search"
                  onClick={() => onQuery("")}
                >
                  <X />
                </button>
              )}
            </label>
          ) : (
            <button className="rd-section-create" onClick={onCreate}>
              <Plus size={20} /> Create content
            </button>
          )}
        </div>
        {view !== "Dashboard" ? (
          <div className="panze-ui rd-section-content" key={view}>
            {children}
          </div>
        ) : (
          <div className="rd-grid">
            <section className="rd-panel rd-tasks">
              <div className="rd-panel-title">
                <h2>My Tasks</h2>
                <IconButton
                  icon={Plus}
                  label="Create content"
                  onClick={onCreate}
                />
              </div>
              <div
                className="rd-task-days"
                title="Illustrative task assignments for September 14 and 15"
              >
                {["Today", "Tomorrow"].map((d) => (
                  <button
                    key={d}
                    className={day === d ? "active" : ""}
                    aria-pressed={day === d}
                    onClick={() => setDay(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <label className="rd-task-filter">
                <span>{tasks.length}</span>
                <select
                  aria-label="Task status"
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                >
                  <option>On Going Tasks</option>
                  <option>Completed Tasks</option>
                </select>
                <ChevronDown />
              </label>
              <div className="rd-task-list">
                {tasks.slice(0, 6).map((item, i) => (
                  <article className={`rd-task tone-${i % 4}`} key={item.id}>
                    <div className="rd-task-top">
                      <span className={`rd-task-symbol symbol-${i % 4}`}>
                        {i % 4 === 0 ? (
                          <FileText />
                        ) : i % 4 === 1 ? (
                          <Globe2 />
                        ) : i % 4 === 2 ? (
                          <Share2 />
                        ) : (
                          <Sparkles />
                        )}
                      </span>
                      <button
                        aria-label={`Mark ${item.title} ready for review`}
                        disabled={
                          item.status === "Ready for review" ||
                          item.status === "Published"
                        }
                        onClick={() => onReview(item)}
                      >
                        <CircleCheck strokeWidth={1.4} />
                      </button>
                    </div>
                    <button
                      className="rd-task-open"
                      onClick={() => onOpen(item)}
                    >
                      <h3>{item.title}</h3>
                      <p>
                        {i === 0
                          ? "Create helpful SEO content for your next publishing date."
                          : item.description}
                      </p>
                    </button>
                  </article>
                ))}
                {!tasks.length && (
                  <p className="rd-empty">
                    No tasks found. Try another search or create a content item.
                  </p>
                )}
              </div>
              <button
                className="rd-text-link"
                onClick={() => onNavigate("Content library")}
              >
                View All Content <ChevronRight />
              </button>
            </section>
            <div className="rd-center">
              <div className="rd-charts">
                <section className="rd-panel rd-overview">
                  <div className="rd-panel-title">
                    <h2>Content Overview</h2>
                    <IconButton
                      icon={ArrowUpRight}
                      label="Open content library"
                      onClick={() => onNavigate("Content library")}
                    />
                  </div>
                  <div className="rd-donut">
                    <svg
                      viewBox="0 0 220 220"
                      role="img"
                      aria-label={stats
                        .map((x) => `${x[0]}: ${x[1]}`)
                        .join(", ")}
                    >
                      <defs>
                        {[
                          ["orange", "#ff8800"],
                          ["blue", "#009ff5"],
                        ].map(([color, fill]) => (
                          <pattern
                            key={color}
                            id={`rd-donut-${color}`}
                            width="6"
                            height="7"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect width="6" height="7" fill={fill} />
                            <path
                              d="M0 1H6"
                              stroke="white"
                              strokeOpacity=".17"
                              strokeWidth="2"
                            />
                            <path
                              d="M0 5H6"
                              stroke="#092b3d"
                              strokeOpacity=".07"
                              strokeWidth="1"
                            />
                          </pattern>
                        ))}
                      </defs>
                      <circle
                        cx="110"
                        cy="110"
                        r="84"
                        fill="none"
                        stroke="#f1f1fa"
                        strokeWidth="32"
                      />
                      {stats.map(([label, value, color]) => {
                        const length = (value / total) * 527.79;
                        const oldOffset = offset;
                        offset += length;
                        return (
                          <circle
                            key={label}
                            cx="110"
                            cy="110"
                            r="84"
                            fill="none"
                            stroke={
                              {
                                orange: "url(#rd-donut-orange)",
                                blue: "url(#rd-donut-blue)",
                                neutral: "#f1f1fa",
                              }[color]
                            }
                            strokeWidth="32"
                            strokeDasharray={`${Math.max(0, length - 3)} ${527.79 - Math.max(0, length - 3)}`}
                            strokeDashoffset={-oldOffset}
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="rd-legend">
                    {stats.map(([label, value, color]) => (
                      <span key={label}>
                        <i className={`rd-dot ${color}`} />
                        {label}: {value}
                      </span>
                    ))}
                  </div>
                </section>
                <ActivityChart range={range} />
              </div>
              <section className="rd-panel rd-pipeline">
                <div className="rd-panel-title">
                  <h2>Publishing Overview</h2>
                  <IconButton
                    icon={SlidersHorizontal}
                    label="Toggle unpublished content only"
                    onClick={() => setPipelineFilter(!pipelineFilter)}
                  />
                </div>
                {pipelineFilter && (
                  <p className="rd-filter-note">
                    Showing unpublished content{" "}
                    <button onClick={() => setPipelineFilter(false)}>
                      Show all
                    </button>
                  </p>
                )}
                <div className="rd-progress-list">
                  {pipeline.map(
                    ([status, label, color], i) =>
                      (!pipelineFilter || status !== "Published") && (
                        <button
                          className="rd-progress-item"
                          key={status}
                          onClick={() =>
                            onNavigate(
                              status === "Scheduled"
                                ? "Content calendar"
                                : "Content library",
                            )
                          }
                        >
                          <span className="rd-progress-label">
                            <span>{label}</span>
                            <span>
                              {counts[i]} <b />{" "}
                              {counts[i] === 1
                                ? "Content item"
                                : "Content items"}
                            </span>
                          </span>
                          <span className="rd-progress-track">
                            <span
                              className={color}
                              style={{
                                transform: `scaleX(${(counts[i] / Math.max(...counts, 1)) * 0.76})`,
                              }}
                            />
                          </span>
                        </button>
                      ),
                  )}
                </div>
                <div className="rd-source-note">
                  <span>LunchLink · {range.toLowerCase()} preview</span>
                  <span>108 published assets in source workspace</span>
                </div>
              </section>
            </div>
            <section className="rd-panel rd-right">
              <div className="rd-panel-title">
                <h2>My Schedule</h2>
                <IconButton
                  icon={CalendarDays}
                  label="Open content calendar"
                  onClick={() => onNavigate("Content calendar")}
                />
              </div>
              <div className="rd-schedule-list">
                {scheduled.map((item) => (
                  <button
                    className="rd-schedule"
                    key={item.id}
                    onClick={() => onOpen(item)}
                  >
                    <span>
                      <span className="rd-schedule-label">
                        {item.date.replace(", 2026", "")}
                      </span>
                      <strong>
                        {item.time.replace("08:00 AM", "8:00 AM")}
                      </strong>
                    </span>
                    <span>
                      <h3>{item.title}</h3>
                      <span className="rd-channel">
                        <Globe2 /> Website
                      </span>
                    </span>
                    <ArrowUpRight />
                  </button>
                ))}
              </div>
              <button
                className="rd-text-link"
                onClick={() => onNavigate("Content calendar")}
              >
                See All Scheduled <ChevronRight />
              </button>
              <div className="rd-panel-title rd-review-title">
                <h2>Content Reviews</h2>
                <IconButton
                  icon={SlidersHorizontal}
                  label="Open content reviews"
                  onClick={() => onNavigate("Content library")}
                />
              </div>
              <div className="rd-review-list">
                {reviews.slice(0, 4).map((item, i) => (
                  <article className="rd-review" key={item.id}>
                    <img
                      src={`/avatars/contributor-${(i % 3) + 1}.jpg`}
                      alt=""
                    />
                    <div>
                      <h3>{item.type}</h3>
                      <p>{item.title}</p>
                      <button onClick={() => onOpen(item)}>
                        Review <ChevronRight />
                      </button>
                    </div>
                  </article>
                ))}
                {!reviews.length && (
                  <p className="rd-empty">
                    All caught up. Content ready for review will appear here.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
        <footer className="rd-footer">
          Uplift AI · LunchLink workspace{" "}
          <span>
            Saved content with illustrative activity. Changes stay in this
            preview.
          </span>
        </footer>
      </main>
    </div>
  );
}
