import { APP_NAME, CONTACT, OPERATOR } from '../core/brand';
import { Back } from '../ui/components';

/** #/privacy: what is stored, where and why. Plain language; keep it in step with worker/index.ts and src/core/sync.ts. */
export function Privacy() {
  return (
    <div class="stack-lg">
      <div class="row">
        <h1 class="grow">Privacy</h1>
        <Back href="#/settings" />
      </div>
      <section class="card stack prose">
        <p>
          {APP_NAME} is free and works without an account. This page explains what is stored about you and why.
          It is run by {OPERATOR || '[operator name]'}, who you can reach at{' '}
          {CONTACT ? <a href={`mailto:${CONTACT}`}>{CONTACT}</a> : '[contact]'}.
        </p>

        <h2>Without an account</h2>
        <p>
          Your progress (words, XP, streak, settings) is stored only in your browser on this device. Nothing is sent to
          us. Backup files you save stay wherever you put them.
        </p>

        <h2>With an account</h2>
        <p>If you create an account to sync between devices, we store:</p>
        <ul>
          <li>your <b>username</b> (choose one that doesn't reveal who you are, if you prefer);</li>
          <li>your <b>password</b> and <b>recovery code</b>, only in scrambled form (hashed) that can't be turned back into them;</li>
          <li>your <b>learning progress</b>, the same data as in a backup file;</li>
          <li>one entry per <b>signed-in device</b> (a random key and dates), so you stay signed in.</li>
        </ul>
        <p>
          We don't ask for an email, real name or anything else, show no ads, use no trackers and share nothing with
          anyone. The only purpose is syncing your progress, which is why you created the account (GDPR Art. 6(1)(b)).
        </p>
        <p>
          To limit password guessing and spam sign-ups, a scrambled form of your network (IP) address is counted for up to
          one hour. It is not linked to your account.
        </p>

        <h2>Where it is stored</h2>
        <p>
          The app and the database run on Cloudflare (Cloudflare, Inc.), which processes the data on our behalf. Like any
          web host, Cloudflare sees your IP address when your device connects. The database is kept in Europe; Cloudflare may
          transfer data outside the EU under the EU Standard Contractual Clauses.
        </p>

        <h2>Analyse sentences &amp; captions</h2>
        <p>
          Text, subtitle files, screenshots and the window or screen you share for live caption reading in Analyse sentences &amp; captions are
          processed only on your device and never sent to us. Only the recognised text is kept: on the page until you
          clear it, and on this device (in your browser, not synced or in backups) if you save it to read on later. To read screenshots, the app downloads a text-recognition program and its language data once from
          jsDelivr (a public file host), which sees your IP address like any website. Wiktionary links open Wiktionary, run
          by the Wikimedia Foundation, under its own privacy policy.
        </p>

        <h2>Watch</h2>
        <p>
          Watching a YouTube video in Stampify uses YouTube's own embedded player in its privacy-enhanced mode; YouTube
          (Google) then sees that you watch it, under its own privacy policy. Video and subtitle files you open from your
          device stay on your device.
        </p>

        <h2>How long</h2>
        <p>
          As long as you keep the account. A signed-in device stops working after a year of not being used. Delete your
          account in Settings → Account and everything stored with it is deleted at once.
        </p>

        <h2>Your rights</h2>
        <p>
          You can see your data (it is your progress in the app, and you can save it as a backup file), correct it, take
          it with you, and delete it, all from the app. For anything else, or to complain, contact us at the address
          above. You can also complain to your data protection authority (in Poland: UODO, uodo.gov.pl).
        </p>
      </section>
    </div>
  );
}
