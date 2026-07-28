import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, category, url } = body;

    const updatedImage = await prisma.gallery.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(url !== undefined && { url }),
      },
    });

    return NextResponse.json({ success: true, image: updatedImage });
  } catch (error: any) {
    console.error("Error updating gallery image:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
