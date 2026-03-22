
var SUPABASE_URL = 'https://vfjkubzqclqwohxpwpga.supabase.co';
var SUPABASE_KEY = 'sb_publishable_TFS2wG_pf7GVjLZjwJUosg_tvr2IMXb';

var supabaseClient = null;
try {
    var _sb = window.supabase;
    if (_sb && typeof _sb.createClient === 'function') {
        supabaseClient = _sb.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('Supabase initialized via window.supabase.createClient');
    } else if (window.createClient && typeof window.createClient === 'function') {
        supabaseClient = window.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('Supabase initialized via window.createClient');
    } else {
        console.warn('Supabase SDK not found on window:', Object.keys(window).filter(function(k){ return k.toLowerCase().includes('supabase'); }));
    }
} catch (err) {
    console.warn('Supabase init error:', err);
}

document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar hamburger ---
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // --- Auth tab switching ---
    var registerTab = document.getElementById('registerTab');
    var loginTab = document.getElementById('loginTab');
    var registerForm = document.getElementById('registerForm');
    var loginForm = document.getElementById('loginForm');
    var successMessage = document.getElementById('successMessage');
    var switchToLogin = document.getElementById('switchToLogin');
    var switchToRegister = document.getElementById('switchToRegister');

    function showRegister() {
        if (!registerForm) return;
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        if (successMessage) successMessage.classList.add('hidden');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
    function showLogin() {
        if (!loginForm) return;
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        if (successMessage) successMessage.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    }
    if (registerTab) registerTab.addEventListener('click', showRegister);
    if (loginTab) loginTab.addEventListener('click', showLogin);
    if (switchToLogin) switchToLogin.addEventListener('click', function (e) { e.preventDefault(); showLogin(); });
    if (switchToRegister) switchToRegister.addEventListener('click', function (e) { e.preventDefault(); showRegister(); });

    // --- Validation helpers ---
    function showError(inputId, errorId, msg) {
        var el = document.getElementById(inputId);
        var err = document.getElementById(errorId);
        if (el) { el.classList.add('error'); el.classList.remove('success'); }
        if (err) err.textContent = msg;
    }
    function clearError(inputId, errorId) {
        var el = document.getElementById(inputId);
        var err = document.getElementById(errorId);
        if (el) { el.classList.remove('error'); el.classList.add('success'); }
        if (err) err.textContent = '';
    }
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- Password strength ---
    var regPwd = document.getElementById('regPassword');
    var sBar = document.getElementById('strengthBar');
    var sTxt = document.getElementById('strengthText');
    if (regPwd) {
        regPwd.addEventListener('input', function () {
            var p = regPwd.value, s = 0;
            if (p.length >= 6) s++;
            if (p.length >= 10) s++;
            if (/[A-Z]/.test(p)) s++;
            if (/[0-9]/.test(p)) s++;
            if (/[^A-Za-z0-9]/.test(p)) s++;
            var pct = (s / 5) * 100;
            var col = '#f5576c', lbl = 'Weak';
            if (s >= 4) { col = '#43e97b'; lbl = 'Strong'; }
            else if (s >= 3) { col = '#fee140'; lbl = 'Medium'; }
            else if (s >= 2) { col = '#ffa726'; lbl = 'Fair'; }
            if (sBar) { sBar.style.width = pct + '%'; sBar.style.background = col; }
            if (sTxt) { sTxt.textContent = p.length > 0 ? 'Strength: ' + lbl : ''; sTxt.style.color = col; }
        });
    }

    function setButtonLoading(btnId, loading, originalText) {
        var btn = document.getElementById(btnId);
        if (!btn) return;
        btn.disabled = loading;
        btn.textContent = loading ? 'Please wait...' : originalText;
    }

    function showSuccess(title, text) {
        if (registerForm) registerForm.classList.add('hidden');
        if (loginForm) loginForm.classList.add('hidden');
        var authTabs = document.getElementById('authTabs');
        if (authTabs) authTabs.classList.add('hidden');
        if (successMessage) successMessage.classList.remove('hidden');
        var titleEl = document.getElementById('successTitle');
        var textEl = document.getElementById('successText');
        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = text;
    }

    // --- Register form ---
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            var name = document.getElementById('regName').value.trim();
            var email = document.getElementById('regEmail').value.trim();
            var pwd = document.getElementById('regPassword').value;
            var cpwd = document.getElementById('regConfirmPassword').value;

            if (!name) { showError('regName','regNameError','Name is required.'); ok=false; }
            else if (name.length < 2) { showError('regName','regNameError','Min 2 characters.'); ok=false; }
            else clearError('regName','regNameError');

            if (!email) { showError('regEmail','regEmailError','Email is required.'); ok=false; }
            else if (!isValidEmail(email)) { showError('regEmail','regEmailError','Invalid email.'); ok=false; }
            else clearError('regEmail','regEmailError');

            if (!pwd) { showError('regPassword','regPasswordError','Password is required.'); ok=false; }
            else if (pwd.length < 6) { showError('regPassword','regPasswordError','Min 6 characters.'); ok=false; }
            else clearError('regPassword','regPasswordError');

            if (!cpwd) { showError('regConfirmPassword','regConfirmPasswordError','Confirm your password.'); ok=false; }
            else if (pwd !== cpwd) { showError('regConfirmPassword','regConfirmPasswordError','Passwords do not match.'); ok=false; }
            else clearError('regConfirmPassword','regConfirmPasswordError');

            if (!ok) return;

            setButtonLoading('registerBtn', true, 'Create Account');

            if (supabaseClient) {
                supabaseClient.auth.signUp({
                    email: email,
                    password: pwd,
                    options: { data: { full_name: name } }
                }).then(function (result) {
                    setButtonLoading('registerBtn', false, 'Create Account');
                    if (result.error) {
                        showError('regEmail', 'regEmailError', result.error.message);
                    } else {
                        showSuccess('Registration Successful!', 'Welcome, ' + name + '! Please check your email to verify your account.');
                    }
                }).catch(function (err) {
                    setButtonLoading('registerBtn', false, 'Create Account');
                    showError('regEmail', 'regEmailError', 'An error occurred. Please try again.');
                });
            } else {
                setButtonLoading('registerBtn', false, 'Create Account');
                showSuccess('Registration Successful!', 'Welcome, ' + name + '!');
            }
        });
    }

    // --- Login form ---
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            var email = document.getElementById('loginEmail').value.trim();
            var pwd = document.getElementById('loginPassword').value;

            if (!email) { showError('loginEmail','loginEmailError','Email is required.'); ok=false; }
            else if (!isValidEmail(email)) { showError('loginEmail','loginEmailError','Invalid email.'); ok=false; }
            else clearError('loginEmail','loginEmailError');

            if (!pwd) { showError('loginPassword','loginPasswordError','Password is required.'); ok=false; }
            else if (pwd.length < 6) { showError('loginPassword','loginPasswordError','Min 6 characters.'); ok=false; }
            else clearError('loginPassword','loginPasswordError');

            if (!ok) return;

            setButtonLoading('loginBtn', true, 'Login');

            if (supabaseClient) {
                supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: pwd
                }).then(function (result) {
                    setButtonLoading('loginBtn', false, 'Login');
                    if (result.error) {
                        showError('loginPassword', 'loginPasswordError', result.error.message);
                    } else {
                        var user = result.data.user;
                        var displayName = (user.user_metadata && user.user_metadata.full_name)
                            ? user.user_metadata.full_name
                            : email;
                        showSuccess('Login Successful!', 'Welcome back, ' + displayName + '!');
                    }
                }).catch(function (err) {
                    setButtonLoading('loginBtn', false, 'Login');
                    showError('loginPassword', 'loginPasswordError', 'An error occurred. Please try again.');
                });
            } else {
                setButtonLoading('loginBtn', false, 'Login');
                showSuccess('Login Successful!', 'Welcome back!');
            }
        });
    }

    // --- Contact form ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            var name = document.getElementById('contactName').value.trim();
            var email = document.getElementById('contactEmail').value.trim();
            var subject = document.getElementById('contactSubject').value.trim();
            var message = document.getElementById('contactMessage').value.trim();

            if (!name) { showError('contactName','contactNameError','Name is required.'); ok=false; }
            else clearError('contactName','contactNameError');

            if (!email) { showError('contactEmail','contactEmailError','Email is required.'); ok=false; }
            else if (!isValidEmail(email)) { showError('contactEmail','contactEmailError','Invalid email.'); ok=false; }
            else clearError('contactEmail','contactEmailError');

            if (!subject) { showError('contactSubject','contactSubjectError','Subject is required.'); ok=false; }
            else clearError('contactSubject','contactSubjectError');

            if (!message) { showError('contactMessage','contactMessageError','Message is required.'); ok=false; }
            else if (message.length < 10) { showError('contactMessage','contactMessageError','Min 10 characters.'); ok=false; }
            else clearError('contactMessage','contactMessageError');

            if (!ok) return;

            var btn = document.getElementById('contactSubmitBtn');
            if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

            function onSuccess() {
                if (btn) {
                    btn.textContent = '\u2713 Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
                }
                contactForm.reset();
                setTimeout(function () {
                    if (btn) {
                        btn.textContent = 'Send Message';
                        btn.style.background = '';
                        btn.disabled = false;
                    }
                }, 3000);
            }

            function onError(msg) {
                if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
                showError('contactMessage', 'contactMessageError', msg);
            }

            if (supabaseClient) {
                supabaseClient.from('contact_messages').insert([{
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                }]).then(function (result) {
                    if (result.error) {
                        onError('Failed to send: ' + result.error.message);
                    } else {
                        onSuccess();
                    }
                }).catch(function (err) {
                    onError('An error occurred. Please try again.');
                });
            } else {
                onSuccess();
            }
        });
    }
});
