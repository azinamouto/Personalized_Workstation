/** Role a user holds within a workspace. Determines access level. */
export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

/** Workspace template that pre-configures modules and widgets for a specific user type. */
export enum TemplateKey {
  TEACHER = 'teacher',
  STUDENT = 'student',
  EMPLOYEE = 'employee',
  FREELANCER = 'freelancer',
  BUSINESS = 'business',
  PERSONAL = 'personal',
  CUSTOM = 'custom',
}

/** Lifecycle status of a task. */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  ARCHIVED = 'archived',
}

/** Urgency level of a task or assignment. */
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/** Lifecycle status of a student assignment. */
export enum AssignmentStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

/** Student attendance record for a class session. */
export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

/** Academic or performance trend direction for a student. */
export enum TrendStatus {
  IMPROVING = 'improving',
  CONSISTENT = 'consistent',
  NEEDS_ATTENTION = 'needs_attention',
  SIGNIFICANT_DECLINE = 'significant_decline',
}

/** Category of a user goal. */
export enum GoalType {
  ACADEMIC = 'academic',
  PROFESSIONAL = 'professional',
  FINANCIAL = 'financial',
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

/** Direction of a financial transaction. */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  SAVINGS = 'savings',
}

/** Subscription tier that controls feature access. */
export enum PlanTier {
  FREE = 'free',
  PREMIUM = 'premium',
  EDUCATION = 'education',
  ORGANIZATION = 'organization',
}
