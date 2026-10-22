const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Get token from localStorage
function getAuthHeader() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jbc_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw {
        status: res.status,
        message: data.message || `Request failed with status ${res.status}`,
        data,
      };
    }
    return data;
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      message:
        error.message || "Failed to connect to backend server. Make sure it is running.",
    };
  }
}

export const api = {
  // Auth
  login: (identifier, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ loginIdentifier: identifier, password }),
    }),

  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMe: () => request("/auth/me"),

  // Hero section & Cloudinary image upload
  getHeroSlides: () => request("/hero"),
  getAllHeroSlides: () => request("/hero/all"),
  uploadHeroImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const token = typeof window !== "undefined" ? localStorage.getItem("jbc_token") : null;

    const res = await fetch(`${API_BASE}/hero/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Failed to upload image to Cloudinary");
    }
    return data;
  },
  createHeroSlide: (data) =>
    request("/hero", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateHeroSlide: (id, data) =>
    request(`/hero/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteHeroSlide: (id) =>
    request(`/hero/${id}`, {
      method: "DELETE",
    }),

  // Courses
  getCourses: () => request("/courses"),
  createCourse: (data) =>
    request("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCourse: (id, data) =>
    request(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCourse: (id) =>
    request(`/courses/${id}`, {
      method: "DELETE",
    }),

  // Students & Approvals & Course Completion Data Purge
  getStudents: () => request("/students"),
  updateStudentApproval: (id, approved, status) =>
    request(`/students/${id}/approval`, {
      method: "PATCH",
      body: JSON.stringify({ approved, status }),
    }),
  deleteStudent: (id) =>
    request(`/students/${id}`, {
      method: "DELETE",
    }),
  bulkDeleteStudents: (studentIds) =>
    request("/students/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ studentIds }),
    }),

  // Quizzes
  getQuizzes: (category) =>
    request(`/quizzes${category ? `?category=${encodeURIComponent(category)}` : ""}`),
  getAdminQuizzes: () => request("/quizzes/admin-all"),
  getAdminQuiz: (id) => request(`/quizzes/admin/${id}`),
  getQuiz: (id) => request(`/quizzes/${id}`),
  submitQuiz: (id, answers, timeSpentSeconds) =>
    request(`/quizzes/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers, timeSpentSeconds }),
    }),
  createQuiz: (data) =>
    request("/quizzes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  importQuizJson: (quizData, jsonString) =>
    request("/quizzes/json-import", {
      method: "POST",
      body: JSON.stringify({ quizData, jsonString }),
    }),
  updateQuiz: (id, data) =>
    request(`/quizzes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteQuiz: (id) =>
    request(`/quizzes/${id}`, {
      method: "DELETE",
    }),

  // Results, Deletions, Downloads & Leaderboard
  getMyResults: () => request("/results/my-results"),
  getAllResults: () => request("/results/all"),
  deleteQuizResult: (id) =>
    request(`/results/${id}`, {
      method: "DELETE",
    }),
  bulkDeleteQuizResults: (resultIds) =>
    request("/results/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ resultIds }),
    }),
  clearAllQuizResults: () =>
    request("/results/clear-all/confirm", {
      method: "DELETE",
    }),
  downloadResultsExport: async (format = "csv") => {
    // const token = getToken();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jbc_token") : null;
    // console.log(token);
    
    const res = await fetch(`${API_BASE}/results/export?format=${format}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to export results");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `JBC_Quiz_Results_${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
  getLeaderboard: () => request("/results/leaderboard"),
};
