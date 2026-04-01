/**
 * API client — single entry-point for all backend calls.
 * Auto-attaches JWT token from localStorage.
 */
const API_BASE = 'http://localhost:4000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('ic_token');
  const headers = { ...options.headers };

  // Don't set Content-Type for FormData — browser adds multipart boundary
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await res.json();

  if (!res.ok) {
    const err = new Error(json.error || 'Request failed');
    err.status = res.status;
    throw err;
  }

  return json.data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const auth = {
  login: (email, password, role) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    }),
};

// ── Participants ──────────────────────────────────────────────────────────────
export const participants = {
  register: (formData) =>
    request('/participants/register', { method: 'POST', body: formData }),

  getAll: () => request('/participants'),

  getMe: () => request('/participants/me'),

  updatePhoto: (formData) =>
    request('/participants/me/photo', { method: 'PATCH', body: formData }),

  updateProfile: (data) =>
    request('/participants/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  confirmLunch: (id, status) =>
    request(`/participants/${id}/lunch`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  remove: (id) =>
    request(`/participants/${id}`, { method: 'DELETE' }),

  exportAll: async () => {
    const token = localStorage.getItem('ic_token');
    const res = await fetch(`${API_BASE}/participants/export`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.text();
  },
};

// ── Exhibitors ────────────────────────────────────────────────────────────────
export const exhibitors = {
  register: (formData) =>
    request('/exhibitors/register', { method: 'POST', body: formData }),

  getAll: () => request('/exhibitors'),

  getMe: () => request('/exhibitors/me'),

  updateStatus: (id, status) =>
    request(`/exhibitors/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  addProject: (formData) =>
    request('/exhibitors/me/projects', { method: 'POST', body: formData }),

  getMyProjects: () => request('/exhibitors/me/projects'),

  getExhibitorProjects: (id) => request(`/exhibitors/${id}/projects`),

  getPublicAll: () => request('/exhibitors/public/all'),
  getPublicDetails: (id) => request(`/exhibitors/public/${id}`),
  getPublicProjects: (id) => request(`/exhibitors/public/${id}/projects`),
};

// ── Agenda ────────────────────────────────────────────────────────────────────
export const agenda = {
  getAll: () => request('/agenda'),
  create: (data) => request('/agenda', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/agenda/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/agenda/${id}`, { method: 'DELETE' }),
};

// ── Workshops ─────────────────────────────────────────────────────────────────
export const workshops = {
  getAll: () => request('/workshops'),

  create: (data) =>
    request('/workshops', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/workshops/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  remove: (id) =>
    request(`/workshops/${id}`, { method: 'DELETE' }),

  registerForWorkshop: (id) => 
    request(`/workshops/${id}/register`, { method: 'POST' }),

  getMyRegistrations: () => 
    request('/workshops/my-registrations'),

  getRegistrants: (id) => 
    request(`/workshops/${id}/registrations`),
};

// ── Subscriptions ─────────────────────────────────────────────────────────────
export const subscriptions = {
  subscribe: (email) =>
    request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  getAll: () => request('/subscriptions'),
};

