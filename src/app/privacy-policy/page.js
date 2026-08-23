import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: August 2026</p>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            Shelf & Story ("we", "us") respects your privacy. This policy explains what information we collect and how we use it.
          </p>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Information we collect</h2>
            <p>When you create an account, we collect your email address. When you make a purchase, payment is processed securely by Paystack — we do not store your card details.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">How we use your information</h2>
            <p>We use your account information to manage your library, process purchases, and provide access to books you've bought.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Data storage</h2>
            <p>Your account and purchase data is stored securely with Supabase. We do not sell or share your personal information with third parties, other than payment processing through Paystack.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Contact us</h2>
            <p>If you have questions about this policy, reach out at <a href="mailto:okaforemmanuel0159@gmail.com" className="text-blue-700 hover:underline">okaforemmanuel0159@gmail.com</a>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}