// config.js - Konfigurasi Lab Utama SoulGPT
const SUPABASE_URL = "https://vmwvmofluqtzgpobdugr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Xgl5rJGT0U7N77ZiSQm0lg_UqqzKvDl";

let supabaseClient = null;

if (typeof window.supabase !== 'undefined') {
    // Inisialisasi client dasar
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Library Supabase gagal dimuat dari CDN!");
}

// Fungsi proteksi halaman lokal yang dijamin 100% lolos dari blokir browser
function checkAuth(requireUser = true) {
    // Tangkap sesi dari URL (Bypass blokir file:/// di Edge/Chrome)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLoggedIn = urlParams.get('logged_in');
    const urlUid = urlParams.get('uid');
    const urlAccess = urlParams.get('access_token');
    const urlRefresh = urlParams.get('refresh_token');
    
    if (urlLoggedIn === "active" && urlUid) {
        sessionStorage.setItem("soulgpt_logged_in", "active");
        sessionStorage.setItem("soulgpt_uid", urlUid);
        if (urlAccess) sessionStorage.setItem("soulgpt_access_token", urlAccess);
        if (urlRefresh) sessionStorage.setItem("soulgpt_refresh_token", urlRefresh);
        window.history.replaceState({}, document.title, window.location.pathname); // bersihkan URL
    }

    const sessionToken = sessionStorage.getItem("soulgpt_logged_in");

    if (requireUser && sessionToken !== "active") {
        window.location.href = "login.html";
        return false;
    } else if (!requireUser && sessionToken === "active") {
        window.location.href = "index.html";
        return true;
    }
    return true;
}
