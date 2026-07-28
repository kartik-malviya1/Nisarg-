import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, phone, message, subject } = body;

    // Use phoneNumber or phone
    const finalPhone = phoneNumber || phone || "";
    const finalMessage = subject ? `[Subject: ${subject}] ${message}` : message;

    if (!name || !finalMessage) {
      return NextResponse.json(
        { error: "Name and message are required fields." },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email: email || null,
        phoneNumber: finalPhone,
        message: finalMessage,
      },
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit contact message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, contacts });
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
    }

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Contact deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete contact submission" },
      { status: 500 }
    );
  }
}
