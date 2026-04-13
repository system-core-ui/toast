import React from 'react';

import type { Meta } from '@storybook/react';
import { Button } from '@thanh-libs/button';
import { Stack } from '@thanh-libs/layout';
import { ThemeProvider } from '@thanh-libs/theme';
import { Typography } from '@thanh-libs/typography';

import { ToastProvider, useToast } from '../ToastProvider/ToastProvider';

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const ToastDisplay = ({
  title,
  variant,
}: {
  title: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}) => {
  const { addToast } = useToast();
  return (
    <Button
      variant="contained"
      color={variant !== 'default' ? variant : 'primary'}
      onClick={() => addToast(`This is a ${title} message!`, { variant })}
    >
      {title}
    </Button>
  );
};

export const Playground = () => (
  <ToastProvider placement="bottom-right">
    <Stack spacing={2} style={{ padding: '2rem' }}>
      <Typography variant="h4">Toast Playground</Typography>
      <Typography variant="body">
        Click the buttons below to trigger different types of toast
        notifications.
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        style={{ flexWrap: 'wrap', gap: '8px' }}
      >
        <ToastDisplay title="Success" variant="success" />
        <ToastDisplay title="Error" variant="error" />
        <ToastDisplay title="Warning" variant="warning" />
        <ToastDisplay title="Info" variant="info" />
        <ToastDisplay title="Default" variant="default" />
      </Stack>
    </Stack>
  </ToastProvider>
);

export const Placements = () => {
  return (
    <Stack spacing={4} style={{ padding: '2rem' }}>
      <Typography variant="h4">Placements</Typography>

      <Stack direction="row" spacing={4}>
        <ToastProvider placement="top-left">
          <ToastDisplay title="Top Left" variant="info" />
        </ToastProvider>

        <ToastProvider placement="top-center">
          <ToastDisplay title="Top Center" variant="info" />
        </ToastProvider>

        <ToastProvider placement="top-right">
          <ToastDisplay title="Top Right" variant="info" />
        </ToastProvider>
      </Stack>

      <Stack direction="row" spacing={4}>
        <ToastProvider placement="bottom-left">
          <ToastDisplay title="Bottom Left" variant="info" />
        </ToastProvider>

        <ToastProvider placement="bottom-center">
          <ToastDisplay title="Bottom Center" variant="info" />
        </ToastProvider>

        <ToastProvider placement="bottom-right">
          <ToastDisplay title="Bottom Right" variant="info" />
        </ToastProvider>
      </Stack>
    </Stack>
  );
};

export const CustomDuration = () => {
  const DurationDemo = () => {
    const { addToast } = useToast();
    return (
      <Button
        onClick={() =>
          addToast('This stays for 10 seconds.', {
            duration: 10000,
            variant: 'warning',
          })
        }
      >
        Show 10s Toast
      </Button>
    );
  };

  return (
    <ToastProvider placement="bottom-center">
      <Stack spacing={2} style={{ padding: '2rem' }}>
        <Typography variant="h4">Custom Duration</Typography>
        <Typography variant="body">
          You can specify exactly how long the toast should persist on screen.
        </Typography>
        <div>
          <DurationDemo />
        </div>
      </Stack>
    </ToastProvider>
  );
};
