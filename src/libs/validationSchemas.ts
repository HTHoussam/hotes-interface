import * as yup from 'yup';

export const inputSchema = yup.object({
  name: yup.string().required(),
});
export type InputSchemaType = yup.InferType<typeof inputSchema>;
export const SaksReportSchema = yup.object({
  amountFrom: yup.string().required(),
  amountTo: yup.string().required(),
  caseManager: yup.string().optional(),
  department: yup.string().optional(),
  debtorNo: yup.string().optional(),
  terminatedFrom: yup.string().optional(),
  terminatedUntil: yup.string().optional(),
  sorting: yup.string().optional(),
  inSummary: yup.boolean().optional(),
  openCases: yup.boolean().optional(),
});
export type SaksReportSchemaType = yup.InferType<typeof SaksReportSchema>;
