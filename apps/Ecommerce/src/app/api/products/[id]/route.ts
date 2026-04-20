import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: { orderBy: { sortOrder: 'asc' } },
      categories: { include: { category: true } },
    },
  });
  if (!product) return NextResponse.json({ error: 'Không tìm thấy sản phẩm' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        shortDescription: body.shortDescription,
        description: body.description,
        type: body.type,
        status: body.status,
        basePrice: body.basePrice !== undefined ? parseFloat(body.basePrice) : undefined,
        salePrice: body.salePrice !== undefined ? (body.salePrice ? parseFloat(body.salePrice) : null) : undefined,
        costPrice: body.costPrice !== undefined ? (body.costPrice ? parseFloat(body.costPrice) : null) : undefined,
        vatRate: body.vatRate !== undefined ? parseFloat(body.vatRate) : undefined,
        trackInventory: body.trackInventory,
        stockQuantity: body.stockQuantity,
        lowStockAlert: body.lowStockAlert,
      },
    });
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
