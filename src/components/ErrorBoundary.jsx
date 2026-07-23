import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-6">
          <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <h1 className="font-display text-2xl font-semibold text-navy-deep">Une erreur est survenue</h1>
            <p className="mt-2 text-sm text-slate-500">
              L'application a rencontré un problème inattendu. Veuillez recharger la page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
              className="mt-6 rounded-lg bg-navy-deep px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Revenir à l'accueil
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
