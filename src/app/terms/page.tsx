import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BRAND.name}.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: August 18, 2026</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            These terms cover the OpsKnight website. Use of the software is
            governed by the {BRAND.license} license in the source repository.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            {BRAND.license} License
          </h2>
          <p>
            OpsKnight is open-source software distributed under the Apache
            License, Version 2.0. By downloading or running the software, you
            agree to that license. The full text is in the repository LICENSE
            file.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">No warranty</h2>
          <p>
            THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Changes</h2>
          <p>
            We may update these terms. We will try to give at least 30 days’
            notice before material changes take effect.
          </p>
        </div>
      </div>
    </main>
  );
}
