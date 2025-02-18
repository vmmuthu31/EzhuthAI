interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the time window
}

interface RateLimitState {
  requests: number;
  startTime: number;
}

export const rateLimit = ({ interval, maxRequests }: RateLimitConfig) => {
  const state: RateLimitState = {
    requests: 0,
    startTime: Date.now(),
  };

  return {
    async check(): Promise<void> {
      const now = Date.now();

      // Reset if interval has passed
      if (now - state.startTime >= interval) {
        state.requests = 0;
        state.startTime = now;
      }

      // Check if limit is exceeded
      if (state.requests >= maxRequests) {
        throw new Error("Rate limit exceeded");
      }

      state.requests++;
    },
  };
};
