import { NextResponse } from "next/server";
import { EmailService } from "@/lib/email/service";

export async function POST(req: Request) {
  try {
    // Input validation
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const data = await req.json();

    // Check required fields
    const requiredFields = ["name", "email", "subject", "message"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    await EmailService.sendContactFormEmails(data);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Contact API error:", error);

    // Handle specific errors
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (error instanceof Error && error.message === "Invalid email address") {
      return NextResponse.json(
        { error: "Invalid email address provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
