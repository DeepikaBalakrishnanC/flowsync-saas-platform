export type UserRole = "admin" | "user" | "guest";
export type SubscriptionPlan = "free" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";
export type ProjectStatus = "active" | "completed" | "archived";
export type TaskStatus = "todo" | "in-progress" | "review" | "completed";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  price: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: string[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  priority: "low" | "medium" | "high";
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  status: "paid" | "open" | "void";
  invoiceNumber: string;
  paidAt?: Date;
  createdAt: Date;
}
