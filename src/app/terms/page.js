import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: September 2026</p>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            By using Shelf & Story, you agree to the following terms.
          </p>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Copyright & Authorship</h2>
            <p>
              All books published on Shelf & Story are original works written and owned by Okafor Emmanuel, the sole author and copyright holder of this platform's content. Shelf & Story does not distribute, sell, or license books from third-party authors. Any resemblance to other works is coincidental.
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Purchases</h2>
            <p>Books purchased through Shelf & Story are for personal reading use only. Redistribution, resale, or sharing of purchased content is not permitted.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Accounts</h2>
            <p>You are responsible for keeping your account credentials secure. Any activity under your account is your responsibility.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Payments</h2>
            <p>All payments are processed securely by Paystack. Prices are shown at checkout before payment is completed.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.</p>
          </div>

          <div>
            <h2 className="text-slate-900 font-semibold mb-2">Contact us</h2>
            <p>Questions about these terms can be sent to <a href="mailto:okaforemmanuel0159@gmail.com" className="text-blue-700 hover:underline">okaforemmanuel0159@gmail.com</a>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}