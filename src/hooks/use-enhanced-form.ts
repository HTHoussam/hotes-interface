import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupResolver, { YupResolverProps } from './use-yup-resolver';

type HookFormProps<T extends object> = NonNullable<Parameters<typeof useForm<T>>[0]>;
type EnhancedFormProps<T extends object> = HookFormProps<T> & YupResolverProps<T>;

export default function useEnhancedForm<T extends object>({ schema, ...formProps }: EnhancedFormProps<T>) {
  const resolvedSchema = useMemo(() => {
    if (!schema) return yup.object<T>({});
    return schema;
  }, [schema]);

  const yupResolver = useYupResolver({ schema: resolvedSchema as yup.ObjectSchema<T> });

  // @ts-expect-error deed
  const form = useForm<T>({ mode: 'all', ...formProps, resolver: yupResolver.resolver });

  return Object.assign(form, yupResolver);
}
