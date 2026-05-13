import {
  FaBell,
  FaChartLine,
  FaCheck,
  FaClock,
  FaCreditCard,
  FaCrown,
  FaHome,
  FaLock,
  FaPlus,
  FaProjectDiagram,
  FaRegCalendarAlt,
  FaSearch,
  FaShieldAlt,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

type Role = "admin" | "user" | "guest";
type Plan = "free" | "pro" | "enterprise";
type TaskStatus = "todo" | "in-progress" | "review" | "completed";
type Page = "Dashboard" | "Projects" | "Tasks" | "Billing" | "Admin" | "Team";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan: Plan;
  status: "active" | "invited" | "suspended";
}

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: "active" | "completed" | "archived";
  due: string;
  members: number;
}

interface Task {
  id: string;
  title: string;
  owner: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
}

const navItems = [
  { label: "Dashboard", icon: FaHome },
  { label: "Projects", icon: FaProjectDiagram },
  { label: "Tasks", icon: FaTasks },
  { label: "Billing", icon: FaCreditCard },
  { label: "Admin", icon: FaShieldAlt },
  { label: "Team", icon: FaUsers },
] satisfies Array<{ label: Page; icon: typeof FaHome }>;

const pageMeta: Record<Page, { eyebrow: string; title: string; action: string }> = {
  Dashboard: {
    eyebrow: "Tuesday, May 13",
    title: "Operations dashboard",
    action: "New project",
  },
  Projects: {
    eyebrow: "Project portfolio",
    title: "Projects",
    action: "Create project",
  },
  Tasks: {
    eyebrow: "Delivery workflow",
    title: "Tasks",
    action: "Add task",
  },
  Billing: {
    eyebrow: "Subscriptions and invoices",
    title: "Billing",
    action: "Simulate payment",
  },
  Admin: {
    eyebrow: "Workspace governance",
    title: "Admin",
    action: "Invite admin",
  },
  Team: {
    eyebrow: "People and access",
    title: "Team",
    action: "Invite member",
  },
};

const stats = [
  { label: "Monthly revenue", value: "$48.2k", change: "+18.4%", icon: FaChartLine },
  { label: "Active projects", value: "36", change: "+7 this week", icon: FaProjectDiagram },
  { label: "Paid accounts", value: "1,248", change: "94% healthy", icon: FaCrown },
  { label: "Open tasks", value: "284", change: "41 due soon", icon: FaTasks },
];

const revenue = [
  { month: "Jan", revenue: 24000, users: 720 },
  { month: "Feb", revenue: 28500, users: 810 },
  { month: "Mar", revenue: 31200, users: 890 },
  { month: "Apr", revenue: 36800, users: 1020 },
  { month: "May", revenue: 42100, users: 1140 },
  { month: "Jun", revenue: 48200, users: 1248 },
];

const planMix = [
  { name: "Free", value: 42, color: "#94a3b8" },
  { name: "Pro", value: 46, color: "#14b8a6" },
  { name: "Enterprise", value: 12, color: "#f59e0b" },
];

const projects: Project[] = [
  {
    id: "p1",
    name: "Atlas CRM Rollout",
    client: "Northstar Labs",
    progress: 78,
    status: "active",
    due: "May 28",
    members: 8,
  },
  {
    id: "p2",
    name: "Billing Automation",
    client: "Brightline Studio",
    progress: 52,
    status: "active",
    due: "Jun 04",
    members: 5,
  },
  {
    id: "p3",
    name: "Analytics Portal",
    client: "Nimbus Health",
    progress: 93,
    status: "active",
    due: "May 19",
    members: 12,
  },
];

const tasks: Task[] = [
  { id: "t1", title: "Finalize subscription webhook copy", owner: "Isha", status: "todo", priority: "medium" },
  { id: "t2", title: "QA role based admin routes", owner: "Arjun", status: "in-progress", priority: "high" },
  { id: "t3", title: "Review enterprise invoice export", owner: "Mira", status: "review", priority: "medium" },
  { id: "t4", title: "Publish onboarding email template", owner: "Dev", status: "completed", priority: "low" },
];

const users: User[] = [
  { id: "u1", name: "Deepika Carter", email: "deepika@example.com", role: "admin", plan: "enterprise", status: "active" },
  { id: "u2", name: "Mira Shah", email: "mira@example.com", role: "user", plan: "pro", status: "active" },
  { id: "u3", name: "Jon Bell", email: "jon@example.com", role: "user", plan: "free", status: "invited" },
  { id: "u4", name: "Ava Reed", email: "ava@example.com", role: "guest", plan: "free", status: "active" },
];

const plans = [
  { name: "Free", price: "$0", features: ["3 projects", "Basic task boards", "Community support"] },
  { name: "Pro", price: "$29", featured: true, features: ["Unlimited projects", "Billing history", "Realtime updates"] },
  { name: "Enterprise", price: "$99", features: ["Admin controls", "Custom invoices", "Priority support"] },
];

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  review: "Review",
  completed: "Done",
};

const invoices = [
  { number: "INV-2048", account: "Northstar Labs", amount: "$2,940", status: "paid", date: "May 12, 2026" },
  { number: "INV-2047", account: "Brightline Studio", amount: "$899", status: "paid", date: "May 08, 2026" },
  { number: "INV-2046", account: "Nimbus Health", amount: "$4,200", status: "open", date: "May 01, 2026" },
];

const taskColumns: Record<TaskStatus, Task[]> = {
  todo: tasks.filter((task) => task.status === "todo"),
  "in-progress": tasks.filter((task) => task.status === "in-progress"),
  review: tasks.filter((task) => task.status === "review"),
  completed: tasks.filter((task) => task.status === "completed"),
};

function DashboardPage() {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-panel">
          <div>
            <p className="eyebrow">Complete SaaS workspace</p>
            <h2>Projects, subscriptions, users, and admin controls in one place.</h2>
            <p>
              Track delivery, monitor recurring revenue, simulate payments, and keep team access
              governed from a single professional dashboard.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-button" type="button">Review billing</button>
            <button className="secondary-button" type="button">Open admin</button>
          </div>
        </div>

        <div className="health-panel">
          <div className="health-ring">94%</div>
          <div>
            <p className="eyebrow">Workspace health</p>
            <h3>Strong retention</h3>
            <p>32 renewals, 4 trials converting, and 0 failed payment escalations this week.</p>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Key metrics">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article className="metric-card" key={item.label}>
              <div className="metric-icon"><Icon /></div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.change}</small>
            </article>
          );
        })}
      </section>

      <section className="content-grid">
        <RevenuePanel />
        <PlanMixPanel />
      </section>

      <section className="content-grid">
        <ProjectPanel />
        <BillingMiniPanel />
      </section>

      <section className="content-grid three-column">
        <TaskPanel />
        <AdminMiniPanel />
        <PlanPanel />
      </section>

      <VelocityPanel />
    </>
  );
}

function RevenuePanel() {
  return (
    <article className="panel panel-wide">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Revenue analytics</p>
          <h3>MRR and user growth</h3>
        </div>
        <span className="pill success">Live</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenue}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Area dataKey="revenue" fill="url(#revenueGradient)" stroke="#0f766e" strokeWidth={3} type="monotone" />
        </AreaChart>
      </ResponsiveContainer>
    </article>
  );
}

function PlanMixPanel() {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Subscription mix</p>
          <h3>Plan adoption</h3>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={245}>
        <PieChart>
          <Pie data={planMix} dataKey="value" innerRadius={58} outerRadius={90} paddingAngle={4}>
            {planMix.map((entry) => (
              <Cell fill={entry.color} key={entry.name} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {planMix.map((item) => (
          <span key={item.name}><i style={{ background: item.color }} />{item.name} {item.value}%</span>
        ))}
      </div>
    </article>
  );
}

function ProjectPanel() {
  return (
    <article className="panel panel-wide">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Project management</p>
          <h3>Active client work</h3>
        </div>
        <button className="ghost-button" type="button">View all</button>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <div className="project-row" key={project.id}>
            <div>
              <strong>{project.name}</strong>
              <span>{project.client}</span>
            </div>
            <div className="progress-track"><i style={{ width: `${project.progress}%` }} /></div>
            <span>{project.progress}%</span>
            <span><FaUsers /> {project.members}</span>
            <span><FaRegCalendarAlt /> {project.due}</span>
            <span className="pill">{project.status}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function BillingMiniPanel() {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Simulated payments</p>
          <h3>Billing activity</h3>
        </div>
        <FaCreditCard className="panel-icon" />
      </div>
      <div className="billing-stack">
        <div>
          <span>Latest invoice</span>
          <strong>INV-2048</strong>
          <small>$2,940 paid by card ending 4242</small>
        </div>
        <div>
          <span>Next renewal</span>
          <strong>May 28, 2026</strong>
          <small>Enterprise annual subscription</small>
        </div>
      </div>
    </article>
  );
}

function TaskPanel() {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Task board</p>
          <h3>Current sprint</h3>
        </div>
      </div>
      <div className="task-stack">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <strong>{task.title}</strong>
            <span>{task.owner} · {statusLabels[task.status]}</span>
            <small className={`priority ${task.priority}`}>{task.priority}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function AdminMiniPanel() {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h3>User controls</h3>
        </div>
      </div>
      <UserList />
    </article>
  );
}

function PlanPanel() {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Plans</p>
          <h3>Subscriptions</h3>
        </div>
      </div>
      <div className="plan-stack">
        {plans.map((plan) => (
          <div className={plan.featured ? "plan-card featured" : "plan-card"} key={plan.name}>
            <div>
              <strong>{plan.name}</strong>
              <span>{plan.price}/mo</span>
            </div>
            {plan.features.map((feature) => (
              <small key={feature}><FaCheck /> {feature}</small>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function VelocityPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Reporting</p>
          <h3>Weekly delivery velocity</h3>
        </div>
        <span className="pill"><FaClock /> Auto updated</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={revenue}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="users" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

function UserList() {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div className="user-row" key={user.id}>
          <div className="avatar small">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
          <div>
            <strong>{user.name}</strong>
            <span>{user.role} · {user.plan}</span>
          </div>
          <span className={`status-dot ${user.status}`} />
        </div>
      ))}
    </div>
  );
}

function ProjectsPage() {
  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Portfolio control</p>
          <h2>Plan work, track progress, and keep every client engagement visible.</h2>
        </div>
        <div className="summary-strip">
          <span><strong>36</strong> active</span>
          <span><strong>8</strong> at risk</span>
          <span><strong>93%</strong> best progress</span>
        </div>
      </section>
      <ProjectPanel />
      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Timeline</p>
              <h3>Upcoming milestones</h3>
            </div>
          </div>
          <div className="timeline-list">
            {projects.map((project) => (
              <div key={project.id}>
                <FaRegCalendarAlt />
                <span>{project.due}</span>
                <strong>{project.name}</strong>
              </div>
            ))}
          </div>
        </article>
        <VelocityPanel />
      </section>
    </>
  );
}

function TasksPage() {
  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Sprint execution</p>
          <h2>Move tasks from intake to done with owner, priority, and status clarity.</h2>
        </div>
        <div className="summary-strip">
          <span><strong>4</strong> tracked</span>
          <span><strong>1</strong> high priority</span>
          <span><strong>1</strong> in review</span>
        </div>
      </section>
      <section className="kanban-grid">
        {(Object.keys(taskColumns) as TaskStatus[]).map((status) => (
          <article className="panel kanban-column" key={status}>
            <div className="panel-header">
              <div>
                <p className="eyebrow">{tasks.filter((task) => task.status === status).length} tasks</p>
                <h3>{statusLabels[status]}</h3>
              </div>
            </div>
            <div className="task-stack">
              {taskColumns[status].map((task) => (
                <div className="task-card" key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{task.owner}</span>
                  <small className={`priority ${task.priority}`}>{task.priority}</small>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function BillingPage() {
  return (
    <>
      <section className="content-grid">
        <PlanPanel />
        <BillingMiniPanel />
      </section>
      <section className="content-grid">
        <RevenuePanel />
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Invoices</p>
              <h3>Billing history</h3>
            </div>
          </div>
          <div className="data-table">
            {invoices.map((invoice) => (
              <div key={invoice.number}>
                <span>{invoice.number}</span>
                <strong>{invoice.account}</strong>
                <span>{invoice.amount}</span>
                <span className={invoice.status === "paid" ? "pill success" : "pill"}>{invoice.status}</span>
                <small>{invoice.date}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}

function AdminPage() {
  return (
    <>
      <section className="stats-grid" aria-label="Admin metrics">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article className="metric-card" key={item.label}>
              <div className="metric-icon"><Icon /></div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.change}</small>
            </article>
          );
        })}
      </section>
      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Role management</p>
              <h3>Users and permissions</h3>
            </div>
          </div>
          <UserList />
        </article>
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Security</p>
              <h3>Access policies</h3>
            </div>
          </div>
          <div className="policy-list">
            <span><FaCheck /> JWT authentication enabled</span>
            <span><FaCheck /> Admin-only routes protected</span>
            <span><FaCheck /> Guest access restricted</span>
            <span><FaCheck /> Payment simulation logged</span>
          </div>
        </article>
      </section>
      <VelocityPanel />
    </>
  );
}

function TeamPage() {
  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Team workspace</p>
          <h2>Manage members, roles, invitations, and project access from one clean view.</h2>
        </div>
        <div className="summary-strip">
          <span><strong>4</strong> members</span>
          <span><strong>1</strong> admin</span>
          <span><strong>1</strong> invite</span>
        </div>
      </section>
      <section className="team-grid">
        {users.map((user) => (
          <article className="panel team-card" key={user.id}>
            <div className="avatar">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
            <div>
              <span className="pill">{user.role}</span>
              <span className="pill">{user.plan}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function renderPage(page: Page) {
  switch (page) {
    case "Projects":
      return <ProjectsPage />;
    case "Tasks":
      return <TasksPage />;
    case "Billing":
      return <BillingPage />;
    case "Admin":
      return <AdminPage />;
    case "Team":
      return <TeamPage />;
    default:
      return <DashboardPage />;
  }
}

function App() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const activeMeta = pageMeta[activePage];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <div>
            <strong>FlowSync</strong>
            <span>SaaS command center</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                className={activePage === item.label ? "active" : ""}
                key={item.label}
                onClick={() => setActivePage(item.label)}
                type="button"
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="upgrade-panel">
          <FaLock />
          <strong>Pro workspace</strong>
          <p>Usage is at 72%. Upgrade before invoices, automations, and reports hit the limit.</p>
          <button type="button">Manage plan</button>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeMeta.eyebrow}</p>
            <h1>{activeMeta.title}</h1>
          </div>
          <div className="topbar-actions">
            <label className="search">
              <FaSearch />
              <input placeholder="Search projects, users, invoices" />
            </label>
            <button className="icon-button" aria-label="Notifications" type="button">
              <FaBell />
            </button>
            <button className="primary-button" type="button">
              <FaPlus />
              {activeMeta.action}
            </button>
            <div className="avatar" title="Deepika Carter">DC</div>
          </div>
        </header>

        {renderPage(activePage)}
      </main>
    </div>
  );
}

export default App;
