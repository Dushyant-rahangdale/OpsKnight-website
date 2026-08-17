import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | OpsKnight',
  description: 'Terms of Service for OpsKnight.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24 pt-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Terms of Service</h1>
        
        <p className="text-slate-300 mb-6">Last updated: August 18, 2026</p>

        <p className="text-slate-300 leading-relaxed mb-6">
          Please read these Terms of Service carefully before using the OpsKnight website or software.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">AGPL-3.0 License</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          OpsKnight is open-source software distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). 
          By downloading, installing, or using the software, you agree to comply with the terms of this license. 
          The full text of the license is available in the source code repository.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">No Warranty</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
          TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
          SOFTWARE.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Changes to Terms</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide 
          at least 30 days&apos; notice prior to any new terms taking effect.
        </p>
      </div>
    </main>
  );
}
