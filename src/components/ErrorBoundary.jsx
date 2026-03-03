import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unexpected error while rendering this page.",
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      const title = this.props.fallbackTitle || "Something went wrong";
      return (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 text-rose-200">
            {this.state.message}
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
