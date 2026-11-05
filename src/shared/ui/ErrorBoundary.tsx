import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State { return { failed: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page rendering failed', error, info.componentStack);
  }

  render() {
    if (this.state.failed) return <main className="wrap"><h1>All Faiths Monuments</h1><p>{document.documentElement.lang === 'es' ? 'No pudimos cargar esta página. Actualízala e inténtalo de nuevo.' : 'We could not load this page. Please refresh and try again.'}</p></main>;
    return this.props.children;
  }
}
