import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tenantId = searchParams.get("tenantId") ?? "default";
  const status = searchParams.get("status") ?? "";

  const where: any = { tenantId };
  if (status) where.status = status;

  const promotions = await prisma.promotion.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(promotions);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Tên khuyến mãi là bắt buộc" }, { status: 400 });
    }
    if (!body.startDate || !body.endDate) {
      return NextResponse.json({ error: "Ngày bắt đầu và kết thúc là bắt buộc" }, { status: 400 });
    }

    // Check coupon code uniqueness
    if (body.code) {
      const existing = await prisma.promotion.findUnique({
        where: { code: body.code.toUpperCase() },
      });
      if (existing) {
        return NextResponse.json(
          { error: `Mã coupon "${body.code}" đã tồn tại` },
          { status: 400 }
        );
      }
    }

    const promotion = await prisma.promotion.create({
      data: {
        tenantId: body.tenantId ?? "default",
        name: body.name.trim(),
        description: body.description ?? null,
        code: body.code ? body.code.toUpperCase().trim() : null,
        type: body.type ?? "PERCENTAGE",
        status: "DRAFT",
        value: parseFloat(body.value) || 0,
        maxDiscount: body.maxDiscount ? parseFloat(body.maxDiscount) : null,
        minOrderAmount: body.minOrderAmount ? parseFloat(body.minOrderAmount) : null,
        minQuantity: body.minQuantity ? parseInt(body.minQuantity) : null,
        usageLimit: body.usageLimit ? parseInt(body.usageLimit) : null,
        perCustomerLimit: body.perCustomerLimit ? parseInt(body.perCustomerLimit) : null,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        buyQuantity: body.buyQuantity ? parseInt(body.buyQuantity) : null,
        getQuantity: body.getQuantity ? parseInt(body.getQuantity) : null,
      },
    });

    return NextResponse.json(promotion, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
