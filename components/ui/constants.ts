import type { AssessmentType } from '@/types';

export const TYPE_COLORS: Record<AssessmentType, string> = {
  'weekly-test': '#3b82f6',
  'class-test': '#eab308',
  'semester-test': '#f97316',
  'exam': '#ef4444',
  'assignment': '#8b5cf6',
  'online-test': '#06b6d4',
  'attendance': '#6b7280',
  'aleks': '#10b981',
  'class-work': '#ec4899',
};

export const TYPE_LABELS: Record<AssessmentType, string> = {
  'weekly-test': 'Weekly Test',
  'class-test': 'Class Test',
  'semester-test': 'Semester Test',
  'exam': 'Exam',
  'assignment': 'Assignment',
  'online-test': 'Online Test',
  'attendance': 'Attendance',
  'aleks': 'ALEKS',
  'class-work': 'Class Work',
};

export const PRIORITY_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#6b7280',
};


