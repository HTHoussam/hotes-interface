import * as yup from 'yup';

export const inputSchema = yup.object({
  name: yup.string().required(),
});
export type InputSchemaType = yup.InferType<typeof inputSchema>;
