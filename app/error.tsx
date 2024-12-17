'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 text-center rounded-lg">
        <h2 className="text-2xl font-semibold">Something went wrong!</h2>
        <div>
          <p className="text-neutral-500">
            We&apos;re sorry for the inconvenience.
          </p>
          <p className="text-neutral-500">
            Please try again.
          </p>
        </div>
        <Button
          className="w-full py-2 mt-4"
          onClick={() => reset()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}