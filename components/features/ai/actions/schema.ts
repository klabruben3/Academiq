import { z } from "zod";

const AssessmentTypeSchema = z.enum([
  "weekly-test",
  "class-test",
  "semester-test",
  "exam",
  "assignment",
  "online-test",
  "attendance",
  "aleks",
  "class-work",
]);

const AssessmentSlotSchema = z.object({
  date: z.string(),
  time: z.string().optional(),
  label: z.string().optional(),
});

const AssessmentComponentSchema = z.object({
  // Required
  id: z.string(),
  name: z.string(),
  type: AssessmentTypeSchema,
  weight: z.number(),

  // Optional
  maxScore: z.number().optional(),
  score: z.number().optional(),

  date: z.string().optional(),
  dateEnd: z.string().optional(),
  dateAvailable: z.string().optional(),

  time: z.string().optional(),
  slots: z.array(AssessmentSlotSchema).optional(),

  location: z.string().optional(),
  duration: z.string().optional(),
  studyUnits: z.string().optional(),

  dropLowest: z.number().optional(),
  required: z.boolean().optional(),

  minimumExamAdmission: z.number().optional(),

  category: z.string().optional(),

  completed: z.boolean().optional(),
  countsTowardCompletion: z.boolean().optional(),
});

const FormulaComponentSchema = z.object({
  componentId: z.string(),
  weight: z.number(),

  dropLowest: z.number().optional(),
  minimumCompleted: z.number().optional(),
  totalInCategory: z.number().optional(),
  useAll: z.boolean().optional(),
});

const ParticipationFormulaSchema = z.object({
  components: z.array(FormulaComponentSchema),

  minimumToPass: z.number().optional(),
});

const PassRequirementsSchema = z.object({
  participationMin: z.number().optional(),
  examMin: z.number().optional(),
  finalMin: z.number().optional(),
  minimumCompletionPercent: z.number().optional(),
});

const ExamOpportunitySchema = z.object({
  label: z.string(),
  start: z.string(),
  end: z.string(),
});

const ExamPaperSchema = z.object({
  name: z.string(),

  maxScore: z.number().optional(),
  duration: z.string().optional(),
  studyUnits: z.string().optional(),
});

const ExamInfoSchema = z.object({
  papers: z.array(ExamPaperSchema).default([]),

  finalMarkIsAverage: z.boolean().optional(),
  secondOpportunityOverridesFirst: z.boolean().optional(),
});

const ModuleGroupSchema = z.object({
  id: z.string(),
  label: z.string(),

  language: z.string().optional(),
  lecturer: z.string().optional(),
  email: z.string().optional(),
  office: z.string().optional(),

  venue: z.string().optional(),
  periods: z.string().optional(),
});

const RecessPeriodSchema = z.object({
  start: z.string(),
  end: z.string(),

  label: z.string().optional(),
});

const AddModuleSchema = z.object({
  // Required
  id: z.string(),
  code: z.string(),
  name: z.string(),

  // assessments: z.array(AssessmentComponentSchema),

  hasExam: z.boolean(),

  // Optional
  // color: z.string().optional(),

  // lecturer: z.string().optional(),
  // email: z.string().optional(),
  // office: z.string().optional(),
  // consultationHours: z.string().optional(),

  // groups: z.array(ModuleGroupSchema).optional(),

  // participationFormula: ParticipationFormulaSchema.optional(),
  // passRequirements: PassRequirementsSchema.optional(),

  // examDate: z.string().optional(),
  // examDateEnd: z.string().optional(),
  // examOpportunities: z.array(ExamOpportunitySchema).optional(),
  // examInfo: ExamInfoSchema.optional(),

  // recessPeriods: z.array(RecessPeriodSchema).optional(),

  // semesterStart: z.string().optional(),
  // semesterEnd: z.string().optional(),
});

type AddModuleInputProp = z.infer<typeof AddModuleSchema>;

const AddUserSchema = z.object({
  name: z.string(),
});

type AddUserInputProp = z.infer<typeof AddUserSchema>;

export { AddModuleSchema, type AddModuleInputProp };
export { AddUserSchema, type AddUserInputProp };
