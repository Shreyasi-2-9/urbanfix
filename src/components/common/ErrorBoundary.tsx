import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, RefreshCw, Home, Shield } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UrbanFix Uncaught Runtime Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleResetData = () => {
    try {
      const keys = [
        'urbanfix_complaints_v1',
        'urbanfix_notifications_v1',
        'urbanfix_audit_v1',
        'urbanfix_active_role_v1',
        'urbanfix_workers_v1',
        'urbanfix_voted_complaints_v1',
      ];
      keys.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#F4F6F4] text-[#111827] flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-card p-6 md:p-8 space-y-6">
            {/* Header / Brand */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#176B4D] flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">UrbanFix Platform</h2>
                <p className="text-xs text-gray-500">Brihanmumbai Municipal Corporation (BMC)</p>
              </div>
            </div>

            {/* Error Message */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-amber-900">Application Rendering Interrupted</p>
                <p className="text-amber-800 leading-relaxed">
                  {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
                </p>
              </div>
            </div>

            {/* Development Error Details */}
            {this.state.error && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <span>Error Details</span>
                  <span className="font-mono text-[10px] text-gray-400">Development Trace</span>
                </div>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-gray-800">
                  <p className="text-rose-400 font-bold mb-1">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className="text-gray-400 text-[10px] whitespace-pre-wrap leading-tight">
                      {this.state.error.stack}
                    </pre>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-emerald-400 text-[10px] mt-2 whitespace-pre-wrap leading-tight border-t border-gray-800 pt-2">
                      Component Stack:{this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleRetry}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#13593F] active:bg-[#0E4631] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Rendering</span>
              </button>

              <button
                onClick={this.handleResetData}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-300 shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset Demo Data</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  try {
                    localStorage.setItem('urbanfix_active_role_v1', 'citizen');
                  } catch (e) {}
                  window.location.href = '/';
                }}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Citizen Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

