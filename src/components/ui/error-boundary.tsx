"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[40vh] items-center justify-center px-6">
            <div className="text-center">
              <p className="font-display text-2xl text-cream">Something went wrong</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 rounded-full border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:border-gold"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
