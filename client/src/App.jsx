import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SoftwareDevelopment from './pages/SoftwareDevelopment';
import AISolutions from './pages/AISolutions';
import AutomationServices from './pages/AutomationServices';
import Consulting from './pages/Consulting';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Integrations from './pages/Integrations';
import UseCases from './pages/UseCases';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import ForgotPassword from './pages/ForgotPassword';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminChatLogs from './pages/admin/AdminChatLogs';

function App() {
    return (
        <HelmetProvider>
            <ChatProvider>
                <AuthProvider>
                    <UserAuthProvider>
                        <Router>
                            <Routes>
                                {/* ─── Public Routes ─────────────────────── */}
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="about" element={<About />} />
                                    <Route path="services" element={<Services />} />
                                    <Route path="services/software-development" element={<SoftwareDevelopment />} />
                                    <Route path="services/ai-solutions" element={<AISolutions />} />
                                    <Route path="services/automation" element={<AutomationServices />} />
                                    <Route path="services/consulting" element={<Consulting />} />
                                    <Route path="solutions" element={<Solutions />} />
                                    <Route path="pricing" element={<Pricing />} />
                                    <Route path="features" element={<Features />} />
                                    <Route path="integrations" element={<Integrations />} />
                                    <Route path="use-cases" element={<UseCases />} />
                                    <Route path="documentation" element={<Documentation />} />
                                    <Route path="blog" element={<Blog />} />
                                    <Route path="case-studies" element={<CaseStudies />} />
                                    <Route path="careers" element={<Careers />} />
                                    <Route path="contact" element={<Contact />} />
                                    <Route path="login" element={<UserLogin />} />
                                    <Route path="signup" element={<UserSignup />} />
                                    <Route path="forgot-password" element={<ForgotPassword />} />
                                    <Route path="privacy" element={<Privacy />} />
                                    <Route path="terms" element={<Terms />} />
                                    <Route path="*" element={<NotFound />} />
                                </Route>

                                {/* ─── Hidden Admin Routes ───────────────── */}
                                <Route path="/skylix-admin-portal/login" element={<AdminLogin />} />
                                <Route path="/skylix-admin-portal" element={<AdminLayout />}>
                                    <Route path="dashboard" element={<AdminDashboard />} />
                                    <Route path="contacts" element={<AdminContacts />} />
                                    <Route path="chat-logs" element={<AdminChatLogs />} />
                                </Route>
                            </Routes>
                        </Router>
                    </UserAuthProvider>
                </AuthProvider>
            </ChatProvider>
        </HelmetProvider>
    );
}

export default App;
