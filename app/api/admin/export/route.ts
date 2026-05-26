import { NextResponse } from "next/server";
import { getAllSettings, getAllServices, getAllTestimonials } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import puppeteer from "puppeteer";

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = getAllSettings();
  const services = getAllServices();
  const testimonials = getAllTestimonials();

  const s = (key: string, fallback = "") => settings[key] ?? fallback;

  const headline = [
    s("hero_headline_1", "We build AI agents that"),
    s("hero_highlight", "operate"),
    s("hero_headline_2", "inside your business"),
  ].join(" ");

  const stats = [
    { value: s("stat_1_value", "5×"), label: s("stat_1_label", "faster deployment vs in-house") },
    { value: s("stat_2_value", "60%"), label: s("stat_2_label", "average support cost reduction") },
    { value: s("stat_3_value", "Day 1"), label: s("stat_3_label", "ROI-focused from first session") },
  ];

  let founderTags: string[] = [];
  try { founderTags = JSON.parse(s("founder_tags", "[]")); } catch {}

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    color: #111;
    background: #fff;
    font-size: 13px;
    line-height: 1.6;
  }

  /* Cover */
  .cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
  }
  .cover-logo {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .cover-logo span { color: #2563eb; }
  .cover-headline {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.05;
    max-width: 600px;
  }
  .cover-headline em { color: #2563eb; font-style: normal; }
  .cover-sub {
    font-size: 16px;
    color: #555;
    max-width: 520px;
    margin-top: 20px;
    line-height: 1.6;
  }
  .cover-meta {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Stats bar */
  .stats-bar {
    display: flex;
    border: 1px solid #e5e5e5;
    margin: 0 60px 0 60px;
  }
  .stat {
    flex: 1;
    padding: 24px 28px;
    border-right: 1px solid #e5e5e5;
  }
  .stat:last-child { border-right: none; }
  .stat-value {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -1px;
    color: #111;
  }
  .stat-label {
    font-size: 11px;
    color: #777;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Content pages */
  .page {
    padding: 60px;
    page-break-before: always;
  }
  .section-label {
    font-size: 10px;
    font-weight: 600;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 20px;
    color: #111;
  }
  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    margin-bottom: 6px;
    margin-top: 20px;
  }
  p { color: #444; margin-bottom: 12px; }
  .service-block {
    border: 1px solid #e5e5e5;
    padding: 20px 24px;
    margin-bottom: 12px;
    break-inside: avoid;
  }
  .service-number {
    font-size: 10px;
    font-weight: 600;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  .service-title {
    font-size: 15px;
    font-weight: 700;
    color: #111;
    margin-bottom: 8px;
  }
  .service-insight {
    font-size: 11.5px;
    color: #2563eb;
    font-style: italic;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #eff6ff;
    border-left: 2px solid #2563eb;
  }
  .service-bullets { list-style: none; }
  .service-bullets li {
    font-size: 12px;
    color: #555;
    padding: 3px 0;
    padding-left: 14px;
    position: relative;
  }
  .service-bullets li::before {
    content: "—";
    position: absolute;
    left: 0;
    color: #2563eb;
  }
  .testimonial {
    border: 1px solid #e5e5e5;
    padding: 20px 24px;
    margin-bottom: 12px;
    break-inside: avoid;
  }
  .testimonial-quote {
    font-size: 13px;
    color: #333;
    font-style: italic;
    margin-bottom: 12px;
    line-height: 1.7;
  }
  .testimonial-author {
    font-size: 11px;
    font-weight: 700;
    color: #111;
  }
  .testimonial-role {
    font-size: 11px;
    color: #888;
  }
  .objection {
    border-left: 2px solid #e5e5e5;
    padding: 10px 16px;
    margin-bottom: 14px;
  }
  .objection-q {
    font-size: 12px;
    font-weight: 700;
    color: #111;
    margin-bottom: 5px;
  }
  .objection-a {
    font-size: 12px;
    color: #555;
    line-height: 1.6;
  }
  .tag {
    display: inline-block;
    font-size: 10px;
    color: #555;
    border: 1px solid #ddd;
    padding: 3px 8px;
    margin: 2px 2px 2px 0;
  }
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .cta-box {
    background: #2563eb;
    color: #fff;
    padding: 28px 32px;
    margin-top: 24px;
  }
  .cta-box h3 { color: #fff; margin-top: 0; }
  .cta-box p { color: rgba(255,255,255,0.8); margin-bottom: 6px; }
  .tone-item {
    font-size: 12px;
    color: #444;
    padding: 6px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tone-item::before { content: "✓"; color: #2563eb; font-weight: 700; }
  .divider { height: 1px; background: #e5e5e5; margin: 24px 0; }
  .cover-bottom { display: flex; align-items: flex-end; justify-content: space-between; }
  .cover-contact { font-size: 12px; color: #555; }
  .cover-contact strong { color: #111; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-logo">talpur<span>.</span>ai</div>
  <div>
    <div class="section-label">AI Sales Agent Brief</div>
    <div class="cover-headline">${headline.replace(s("hero_highlight", "operate"), `<em>${s("hero_highlight", "operate")}</em>`)}</div>
    <div class="cover-sub">${s("hero_subheadline", "Automating workflows, generating leads, and reducing operational costs.")}</div>
  </div>
  <div class="cover-bottom">
    <div class="cover-contact">
      <strong>${s("contact_email", "hello@talpur.ai")}</strong><br>
      ${s("contact_location", "Paris, France")}
    </div>
    <div class="cover-meta">Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
  </div>
</div>

<!-- STATS BAR -->
<div class="stats-bar">
  ${stats.map(st => `
  <div class="stat">
    <div class="stat-value">${st.value}</div>
    <div class="stat-label">${st.label}</div>
  </div>`).join("")}
</div>

<!-- PAGE 2: POSITIONING + SERVICES -->
<div class="page">
  <div class="section-label">Who we are</div>
  <h2>Positioning</h2>
  <p>${s("about_paragraph", "We build AI execution infrastructure — not demos.")}</p>
  <p><strong>${s("about_headline_1", "Systems > Prompts.")} ${s("about_headline_2", "Execution > Ideas.")}</strong></p>

  <div class="divider"></div>

  <div class="section-label">What we offer</div>
  <h2>Services</h2>
  ${services.map(svc => {
    let items: string[] = [];
    try { items = JSON.parse(svc.items); } catch {}
    return `
  <div class="service-block">
    <div class="service-number">${svc.number}</div>
    <div class="service-title">${svc.title}</div>
    <div class="service-insight">${svc.insight}</div>
    <ul class="service-bullets">
      ${items.map(i => `<li>${i}</li>`).join("")}
    </ul>
  </div>`;
  }).join("")}
</div>

<!-- PAGE 3: ICP + OBJECTIONS -->
<div class="page">
  <div class="section-label">Who we work with</div>
  <h2>Ideal Client Profile</h2>
  <div class="two-col">
    <div>
      <h3>Company type</h3>
      <ul class="service-bullets">
        <li>B2B companies with repetitive operational workflows</li>
        <li>Sales-led orgs needing automated lead qualification</li>
        <li>Support teams handling high ticket volume</li>
        <li>Companies who tried AI tools but need real systems</li>
      </ul>
    </div>
    <div>
      <h3>Decision makers</h3>
      <ul class="service-bullets">
        <li>Head of Operations</li>
        <li>VP Sales / Revenue</li>
        <li>CEO / Founder</li>
        <li>CTO / Head of Product</li>
      </ul>
    </div>
  </div>

  <div class="divider"></div>

  <div class="section-label">Handle objections</div>
  <h2>Common Objections</h2>

  <div class="objection">
    <div class="objection-q">"We already use ChatGPT"</div>
    <div class="objection-a">We don't build chatbots — we build systems. There's a difference between a prompt and a production pipeline that runs 24/7 inside your existing tools.</div>
  </div>
  <div class="objection">
    <div class="objection-q">"This is too expensive"</div>
    <div class="objection-a">Our systems typically pay for themselves within the first month through reduced headcount costs or increased lead conversion.</div>
  </div>
  <div class="objection">
    <div class="objection-q">"We tried AI before and it didn't work"</div>
    <div class="objection-a">That's exactly why we start with an AI strategy session — to identify where AI creates real ROI before writing a single line of code.</div>
  </div>
  <div class="objection">
    <div class="objection-q">"We're not ready"</div>
    <div class="objection-a">No business is ever fully ready. We assess your current state and build incrementally — you see results on Day 1.</div>
  </div>
</div>

<!-- PAGE 4: TESTIMONIALS + FOUNDER -->
${testimonials.length > 0 ? `
<div class="page">
  <div class="section-label">Social proof</div>
  <h2>Client Testimonials</h2>
  ${testimonials.map(t => `
  <div class="testimonial">
    <div class="testimonial-quote">"${t.quote}"</div>
    <div class="testimonial-author">${t.name}</div>
    <div class="testimonial-role">${t.role}</div>
  </div>`).join("")}

  <div class="divider"></div>

  <div class="section-label">Leadership</div>
  <h2>About the Founder</h2>
  <h3>${s("founder_name", "Mir Arshad Ali")}</h3>
  <p>${founderTags.join(" · ")}</p>
  <p>${s("founder_bio", "")}</p>
</div>` : ""}

<!-- PAGE 5: TONE + CTA -->
<div class="page">
  <div class="section-label">Agent guidelines</div>
  <h2>Tone & Communication Rules</h2>
  <div class="tone-item">Direct and confident — no fluff, no buzzwords</div>
  <div class="tone-item">Lead with outcomes, not features</div>
  <div class="tone-item">Use the word "systems" not "solutions" or "tools"</div>
  <div class="tone-item">Never say "leverage" or "synergy"</div>
  <div class="tone-item">Reference ROI and speed to value early</div>
  <div class="tone-item">Short sentences. Clear claims. Specific numbers when possible.</div>
  <div class="tone-item">Always acknowledge the prospect's current pain before pitching</div>

  <div class="cta-box">
    <h3>Call to Action</h3>
    <p><strong>Primary:</strong> ${s("hero_cta_primary_text", "Explore our services")}</p>
    <p><strong>Meeting:</strong> Book a 30-minute discovery call</p>
    ${s("contact_calendly_url") ? `<p><strong>Calendly:</strong> ${s("contact_calendly_url")}</p>` : ""}
    <p><strong>Response time:</strong> ${s("contact_response_time", "Within 24 hours")}</p>
    <p><strong>Email:</strong> ${s("contact_email", "hello@talpur.ai")}</p>
  </div>
</div>

</body>
</html>`;

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
  });
  await browser.close();

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="talpur-ai-sales-brief.pdf"`,
    },
  });
}
