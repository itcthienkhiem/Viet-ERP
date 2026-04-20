import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const promotion = await prisma.promotion.findUnique({
    where: { id: params.id },
  });
  if (!promotion) {
    return NextResponse.json({ error: "Không tìm thấy khuyến mãi" }, { status: 404 });
  }
  return NextResponse.json(promotion);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const promotion = await prisma.promotion.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        value: body.value !== undefined ? parseFloat(body.value) : undefined,
        maxDiscount: body.maxDiscount !== undefined
          ? (body.maxDiscount ? parseFloat(body.maxDiscount) : null)
          : undefined,
        minOrderAmount: body.minOrderAmount !== undefined
          ? (body.minOrderAmount ? parseFloat(body.minOrderAmount) : null)
          : undefined,
        usageLimit: body.usageLimit !== undefined
          ? (body.usageLimit ? parseInt(body.usageLimit) : null)
          : undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
      },
    });
    return NextResponse.json(promotion);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
