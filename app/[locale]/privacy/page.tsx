import Link from "next/link";
import type { Metadata } from "next";

type Params = { locale: "de" | "en" };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = (await params) ?? { locale: "de" };

  return {
    alternates: {
      canonical: `/${locale}/privacy`,
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = (await params) ?? { locale: "de" };

  const isDe = locale === "de";

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        {isDe ? "Datenschutzerklärung" : "Privacy Policy"}
      </h1>
      <p className="text-neutral-700 mb-8">
        {isDe
          ? "Der Schutz Ihrer personenbezogenen Daten ist uns sehr wichtig. Nachfolgend informieren wir Sie verständlich darüber, welche Daten wir verarbeiten, zu welchen Zwecken und welche Rechte Sie als betroffene Person haben."
          : "Protecting your personal data is very important to us. Below we explain in clear terms what data we process, for which purposes and which rights you have as a data subject."}
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "1. Verantwortlicher" : "1. Data Controller"}
          </h2>
          <p className="text-neutral-700">
            {isDe ? (
              <>
                Enduro Drift Bosnien - Silvija Strahimira Kranjcevica, 70280
                Gornji Vakuf-Uskoplje, Bosnien und Herzegowina
                <br />
                E-Mail: endurodriftbosnien@gmail.com / Telefon: +387 63 136 095
              </>
            ) : (
              <>
                Enduro Drift Bosnia - Silvija Strahimira Kranjcevica, 70280
                Gornji Vakuf-Uskoplje, Bosnia & Herzegovina
                <br />
                Email: endurodriftbosnien@gmail.com / Phone: +387 63 136 095
              </>
            )}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe
              ? "2. Kategorien verarbeiteter Daten"
              : "2. Categories of Data Processed"}
          </h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-1">
            <li>
              {isDe
                ? "Stammdaten (Name, E-Mail, Telefonnummer) bei Anmeldung / Kontakt"
                : "Basic data (name, email, phone) when registering / contacting us"}
            </li>
            <li>
              {isDe
                ? "Nutzungsdaten (Logfiles, IP-Adresse, Zeitstempel)"
                : "Usage data (log files, IP address, timestamps)"}
            </li>
            <li>
              {isDe
                ? "Inhaltsdaten (Blog-Kommentare, Gästebuch-Einträge, hochgeladene Bilder)"
                : "Content data (blog comments, guest book entries, uploaded images)"}
            </li>
            <li>
              {isDe
                ? "Metadaten (Browsertyp, Sprache, ungefähre Region)"
                : "Metadata (browser type, language, approximate region)"}
            </li>
            <li>
              {isDe
                ? "Authentifizierungsdaten (E-Mail + Passwort - verschlüsselt)"
                : "Authentication data (email + password - encrypted)"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe
              ? "3. Zwecke & Rechtsgrundlagen (DSGVO)"
              : "3. Purposes & Legal Bases (GDPR)"}
          </h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-1">
            <li>
              {isDe
                ? "Bereitstellung der Website & Sicherheit (Art. 6 Abs. 1 lit. f DSGVO)"
                : "Website operation & security (Art. 6(1)(f) GDPR)"}
            </li>
            <li>
              {isDe
                ? "Beantwortung von Anfragen & Buchungen (Art. 6 Abs. 1 lit. b / f DSGVO)"
                : "Responding to inquiries & bookings (Art. 6(1)(b)/(f) GDPR)"}
            </li>
            <li>
              {isDe
                ? "Nutzerkonto-Verwaltung / Authentifizierung (Art. 6 Abs. 1 lit. b DSGVO)"
                : "User account management / authentication (Art. 6(1)(b) GDPR)"}
            </li>
            <li>
              {isDe
                ? "Analyse & Verbesserung (Google Analytics - sofern aktiv: Art. 6 Abs. 1 lit. f DSGVO)"
                : "Analytics & improvement (Google Analytics - if active: Art. 6(1)(f) GDPR)"}
            </li>
            <li>
              {isDe
                ? "Versand von E-Mails (Anmeldung / Bestätigung: Art. 6 Abs. 1 lit. b DSGVO)"
                : "Sending emails (registration / confirmation: Art. 6(1)(b) GDPR)"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "4. Speicherung & Löschung" : "4. Storage & Deletion"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Personenbezogene Daten speichern wir nur solange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Kontodaten können Sie selbst jederzeit löschen oder per Anfrage entfernen lassen."
              : "We store personal data only as long as required for the respective purpose or where statutory retention duties apply. You may delete your account data at any time or request removal."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe
              ? "5. Weitergabe an Dritte"
              : "5. Disclosure to Third Parties"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Wir verwenden externe Dienste wie Hosting-Provider, ggf. CDN (Bilder / Medien) und Analysedienste. Eine Weitergabe erfolgt nur, wenn sie zur Leistungserbringung notwendig ist. Keine Weitergabe zu Werbezwecken."
              : "We use external services such as hosting providers, possibly CDNs (images/media) and analytics tools. Data is only disclosed where necessary to provide the service. No sale of data for advertising purposes."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "6. Cookies & Tracking" : "6. Cookies & Tracking"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Unsere Seite kann technisch notwendige Cookies einsetzen (Session / Auth). Optionale Analyse-Cookies (Google Analytics) werden nur gesetzt, wenn Sie dem zustimmen. Sie können Cookies im Browser jederzeit löschen."
              : "Our site may use technically necessary cookies (session/auth). Optional analytics cookies (Google Analytics) are only set if you consent. You can delete cookies anytime via your browser."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "7. Ihre Rechte" : "7. Your Rights"}
          </h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-1">
            <li>
              {isDe
                ? "Auskunft über gespeicherte Daten"
                : "Access to stored data"}
            </li>
            <li>
              {isDe
                ? "Berichtigung unrichtiger Daten"
                : "Rectification of inaccurate data"}
            </li>
            <li>
              {isDe
                ? "Löschung / Einschränkung (sofern keine Pflicht entgegensteht)"
                : "Erasure / restriction (unless retention duties apply)"}
            </li>
            <li>
              {isDe
                ? "Datenübertragbarkeit (Art. 20 DSGVO)"
                : "Data portability (Art. 20 GDPR)"}
            </li>
            <li>
              {isDe
                ? "Widerspruch gegen Verarbeitung (Art. 21 DSGVO)"
                : "Object to processing (Art. 21 GDPR)"}
            </li>
            <li>
              {isDe
                ? "Beschwerde bei einer Datenschutzbehörde"
                : "Complaint to a supervisory authority"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "8. Sicherheit" : "8. Security"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Wir verwenden gängige Sicherheitsmaßnahmen (HTTPS, Zugriffsbeschränkungen, Passwort-Hashing), um Daten gegen Verlust und unbefugten Zugriff zu schützen."
              : "We use industry-standard protections (HTTPS, access controls, password hashing) to safeguard data from loss and unauthorized access."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "9. Änderungen" : "9. Changes"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Wir können diese Datenschutzerklärung anpassen, wenn rechtliche oder technische Änderungen dies erfordern. Die aktuelle Version ist immer auf dieser Seite verfügbar."
              : "We may update this privacy policy where legal or technical changes require it. The current version is always available on this page."}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe
              ? "10. Kontakt für Datenschutzanfragen"
              : "10. Contact for Privacy Requests"}
          </h2>
          <p className="text-neutral-700">
            {isDe
              ? "Richten Sie Ihre Anfrage bitte an: endurodriftbosnien@gmail.com - Betreff: Datenschutz"
              : "Please send requests to: endurodriftbosnien@gmail.com - Subject: Privacy"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            {isDe ? "11. Google reCAPTCHA" : "11. Google reCAPTCHA"}
          </h2>
          <p className="text-neutral-700">
            {isDe ? (
              <>
                Diese Website ist durch reCAPTCHA geschützt und es gelten die
                Datenschutzerklärung und Nutzungsbedingungen von Google.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-amber-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Datenschutzrichtlinie
                </a>{" "}
                und{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="text-amber-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nutzungsbedingungen
                </a>{" "}
                finden Sie hier. Wir verwenden reCAPTCHA ausschließlich zur
                Abwehr von Spam und Missbrauch (z. B. bei Kontaktformularen).
              </>
            ) : (
              <>
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply. See the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-amber-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="text-amber-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
                . We use reCAPTCHA solely to prevent spam and abuse (e.g., on
                contact forms).
              </>
            )}
          </p>
        </div>
      </section>

      <div className="mt-10 text-sm text-neutral-500">
        {isDe ? "Stand: November 2025" : "Last updated: November 2025"}
      </div>

      <div className="mt-8">
        <Link
          href={`/${locale}`}
          className="text-amber-600 font-semibold hover:underline"
        >
          {isDe ? "← Zurück zur Startseite" : "← Back to Home"}
        </Link>
      </div>
    </main>
  );
}
