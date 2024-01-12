import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import * as yup from 'yup';

export interface YupResolverProps<T extends object> {
  schema: Helper.TypeOrCallbackValue<yup.ObjectSchema<T>, typeof yup>;
}
export default function useYupResolver<T extends object>({ schema }: YupResolverProps<T>) {
  const resolver = useMemo(() => {
    if (typeof schema === 'function') return yupResolver(schema(yup));
    return yupResolver(schema);
  }, [schema]);

  return {
    yup,
    yupResolver,
    resolver,
  };
}
