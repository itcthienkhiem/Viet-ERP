import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tenantId = searchParams.get("tenantId") ?? "default";

  const storefronts = await prisma.storefront.findMany({
    where: { tenantId, deletedAt: null },
    include: {
      _count: { select: { orders: true, products: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(storefronts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Tên cửa hàng là bắt buộc" }, { status: 400 });
    }
    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "Slug là bắt buộc" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.storefront.findUnique({
      where: { slug: body.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: `Slug "${body.slug}" đã tồn tại` },
        { status: 400 }
      );
    }

    const storefront = await prisma.storefront.create({
      data: {
        tenantId: body.tenantId ?? "default",
        name: body.name.trim(),
        slug: body.slug.trim(),
        domain: body.domain ?? null,
        description: body.description ?? null,
        currency: body.currency ?? "VND",
        locale: body.locale ?? "vi-VN",
        metaTitle: body.metaTitle ?? null,
        metaDescription: body.metaDescription ?? null,
      },
    });

    return NextResponse.json(storefront, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
