import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Box } from '../../ui/components/box';
import { Title } from '../../ui/components/title';
import { Text } from '../../ui/components/text';
import { Padding } from '../../ui/components/padding';
import { Field } from '../../ui/components/field';
import { Input } from '../../ui/components/input';
import { Button } from '../../ui/components/button';

interface FormItem {
  fieldId: string;
  type: string;
  label: string;
}

const renderFormItems = (items: FormItem[]) => {
  return items.map((item: FormItem) => {
    switch (item.type) {
      case 'text':
      case 'number':
        return (
          <Padding key={item.fieldId} bottom={20}>
            <Field fieldId={item.fieldId} label={item.label}>
              <Input fieldId={item.fieldId} type={item.type} />
            </Field>
          </Padding>
        );
      case 'radioGroup':
      default:
        return null;
    }
  });
};

export default function FormPage(): JSX.Element {
  const { data, error } = useSWR('/api/form');
  const router = useRouter();
  const { page } = router.query;

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { form } = data;
  const pageInt = parseInt(page, 10);
  const formData = form[pageInt - 1];
  const formLength = form.length;

  if (!formData) return <div>Loading...</div>;

  const { meta } = formData;

  return (
    <Padding left={256} right={256} top={128}>
      <Box border={1} borderRadius={10} boxShadow="card">
        <Padding size={20}>
          <Title size={24} as="h1">
            <Padding bottom={20}>{meta.title}</Padding>
          </Title>
          {meta.description ? (
            <Text>
              <Padding bottom={20}>{meta.description}</Padding>
            </Text>
          ) : null}
          {renderFormItems(formData.data)}
          <StyledActionButtons>
            {pageInt !== 1 ? (
              <Button size="secondary" href={`/form/${pageInt - 1}`}>
                Back
              </Button>
            ) : null}
            {pageInt !== formLength - 1 ? (
              <Button style={{ marginLeft: 'auto' }} href={`/form/${pageInt + 1}`}>
                Next
              </Button>
            ) : null}
            {pageInt === formLength - 1 ? <Button>Finish</Button> : null}
          </StyledActionButtons>
        </Padding>
      </Box>
    </Padding>
  );
}

const StyledActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
