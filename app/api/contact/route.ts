import { NextRequest, NextResponse } from "next/server";
import { insertLead, getAllSettings } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  workEmail: z.string().email(),
  companyName: z.string().min(1),
  companySize: z.string().min(1),
  service: z.string().min(1),
  challenge: z.string().min(50),
  referral: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const lead = insertLead({
      full_name: data.fullName,
      work_email: data.workEmail,
      company_name: data.companyName,
      company_size: data.companySize,
      service: data.service,
      challenge: data.challenge,
      referral: data.referral,
    });

    const settings = getAllSettings();
    if (settings["notification_email"]) {
      sendLeadNotification(settings, lead).catch((err) =>
        console.error("Email notification failed:", err)
      );
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", issues: err.issues }, { status: 400 });
    }
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
