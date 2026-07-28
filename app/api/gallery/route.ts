import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const whereClause: any = {};

    if (category && category !== "All") {
      whereClause.category = category;
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { category: { contains: query } },
      ];
    }

    const images = await prisma.gallery.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "Image URL is required." },
        { status: 400 }
      );
    }

    const image = await prisma.gallery.create({
      data: {
        title: title || "Untitled Image",
        category: category || "General",
        url,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save gallery image" },
      { status: 500 }
    );
  }
}
