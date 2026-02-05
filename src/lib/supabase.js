// Local stub for session & progress persistence (JS version)
// Replaces Supabase client for local development when no backend is used.

function genId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function createSession() {
  try {
    let id = localStorage.getItem('local_session_id');
    if (!id) {
      id = genId('sess');
      localStorage.setItem('local_session_id', id);

      const sessions = JSON.parse(localStorage.getItem('local_sessions') || '[]');
      sessions.push({ id, session_start: new Date().toISOString(), created_at: new Date().toISOString() });
      localStorage.setItem('local_sessions', JSON.stringify(sessions));
    }
    return id;
  } catch (err) {
    console.error('Error creating local session:', err);
    return null;
  }
}

export async function logProgress(progress) {
  try {
    const entries = JSON.parse(localStorage.getItem('learning_progress') || '[]');
    entries.push({ id: genId('lp'), ...progress, created_at: new Date().toISOString() });
    localStorage.setItem('learning_progress', JSON.stringify(entries));
  } catch (err) {
    console.error('Error logging local progress:', err);
  }
}
