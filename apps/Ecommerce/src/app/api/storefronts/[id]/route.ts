import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const storefront = await prisma.storefront.findUnique({
    where: { id: params.id },
    include: {
      products: {
        include: { product: true },
        take: 50,
      },
      _count: { select: { orders: true, products: true } },
    },
  });
  if (!storefront) {
    return NextResponse.json({ error: "Không tìm thấy cửa hàng" }, { status: 404 });
  }
  return NextResponse.json(storefront);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const storefront = await prisma.storefront.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        domain: body.domain,
        status: body.status,
        currency: body.currency,
        locale: body.locale,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
      },
    });
    return NextResponse.json(storefront);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
