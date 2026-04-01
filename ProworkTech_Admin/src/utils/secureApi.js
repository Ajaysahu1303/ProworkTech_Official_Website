/**
 * Secure API utility for admin panel.
 * Handles authentication headers and auto-logout on expired/invalid tokens.
 */

const API_BASE = "http://localhost:5000";

/**
 * Makes an authenticated API request. 
 * Automatically attaches the admin token and handles auth failures.
 */
export async function secureApiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("adminToken");

    // If no token, redirect immediately
    if (!token) {
        handleLogout();
        throw new Error("No authentication token found");
    }

    const headers = {
        ...options.headers,
    };

    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    // Auto-logout on auth failure
    if (response.status === 401 || response.status === 403) {
        const data = await response.json().catch(() => ({}));
        
        // Token is expired or tampered
        if (data.code === "TOKEN_EXPIRED" || data.code === "INVALID_TOKEN" || data.code === "NO_TOKEN" || data.code === "INVALID_FORMAT") {
            handleLogout(data.message || "Session expired. Please login again.");
            throw new Error(data.message || "Authentication failed");
        }
    }

    return response;
}

/**
 * Handles forced logout — clears token and redirects to login
 */
function handleLogout(message) {
    localStorage.removeItem("adminToken");
    
    // Only redirect if not already on login page
    if (!window.location.pathname.includes("/login")) {
        // Store a message for the login page to display
        if (message) {
            sessionStorage.setItem("loginMessage", message);
        }
        window.location.href = "/login";
    }
}
