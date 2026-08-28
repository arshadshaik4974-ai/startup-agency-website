import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ChevronDown, ChevronUp, Mail, Phone, Globe, Briefcase, Layers, Calendar, MessageSquare, Sparkles } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'reviewing', 'contacted', 'accepted', 'rejected'] as const;
type Status = typeof STATUS_OPTIONS[number];

const STATUS_STYLES: Record<Status, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  reviewing: 'bg-amber-50 text-amber-700 border-amber-200',
  contacted: 'bg-purple-50 text-purple-700 border-purple-200',
  accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

export const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('startup_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        setError(error.message);
      } else {
        setSubmissions(data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('startup_submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update status: ' + error.message);
    } else {
      setSubmissions(prev =>
        prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
      );
    }
    setUpdatingId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statusCount = (status: string) => submissions.filter(s => s.status === status).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Submissions Dashboard</h1>
        <p className="text-sm text-gray-500">Review and manage startup idea submissions.</p>
      </div>

      {/* Stats Bar */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {STATUS_OPTIONS.map(status => (
            <div key={status} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{status}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCount(status)}</p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl w-full"></div>
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No submissions yet.</p>
          <p className="text-sm text-gray-400 mt-1">Submissions from the public form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const statusStyle = STATUS_STYLES[sub.status as Status] || STATUS_STYLES.new;

            return (
              <div key={sub.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Summary Row */}
                <button
                  onClick={() => toggleExpand(sub.id)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{sub.startup_name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 truncate">{sub.full_name} • {sub.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">{formatDate(sub.created_at)}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 pb-6 pt-4">
                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <a href={`mailto:${sub.email}`} className="hover:text-black transition-colors truncate">{sub.email}</a>
                      </div>
                      {sub.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{sub.phone}</span>
                        </div>
                      )}
                      {sub.country && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{sub.country}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{formatDate(sub.created_at)}</span>
                      </div>
                    </div>

                    {/* Startup Info */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-gray-500">Industry:</span>
                        <span className="font-medium text-gray-900">{sub.industry}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Layers className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-gray-500">Stage:</span>
                        <span className="font-medium text-gray-900">{sub.startup_stage}</span>
                      </div>
                    </div>

                    {/* Idea Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Startup Idea</h4>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{sub.idea}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Problem Being Solved</h4>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{sub.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">What Makes It Different</h4>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{sub.solution_difference}</p>
                      </div>
                      {sub.support_needed && sub.support_needed.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Support Needed</h4>
                          <div className="flex flex-wrap gap-2">
                            {sub.support_needed.map((item: string) => (
                              <span key={item} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{item}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {sub.additional_message && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> Additional Message
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{sub.additional_message}</p>
                        </div>
                      )}
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">Update status:</span>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map(status => (
                          <button
                            key={status}
                            onClick={() => updateStatus(sub.id, status)}
                            disabled={updatingId === sub.id || sub.status === status}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              sub.status === status 
                                ? `${STATUS_STYLES[status]} ring-2 ring-offset-1 ring-gray-300` 
                                : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      {updatingId === sub.id && <span className="text-xs text-gray-400 animate-pulse">Saving...</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
