import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Global UI Error Boundary to capture runtime component errors cleanly
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B16] text-white flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#0F172A] border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">
              System Notice
            </span>
            <h2 className="text-2xl font-black">Something went wrong</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/5 text-left overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error occurred.'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);