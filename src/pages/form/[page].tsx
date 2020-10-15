import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export default function FormPage(): JSX.Element {
  const { data, error } = useSWR('/api/form');
  const router = useRouter();
  const { page } = router.query;

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { form } = data;
  const formData = form[page];

  console.log(formData);

  return <div />;
}
