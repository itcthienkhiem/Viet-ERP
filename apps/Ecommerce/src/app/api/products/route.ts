import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateSlug } from '@/lib/catalog-engine';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');

  const where: any = { deletedAt: null };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (status) where.status = status;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { where: { isPrimary: true }, take: 1 } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name?.trim()) return NextResponse.json({ error: 'Tên sản phẩm là bắt buộc' }, { status: 400 });
    if (!body.sku?.trim()) return NextResponse.json({ error: 'SKU là bắt buộc' }, { status: 400 });
    if (!body.basePrice) return NextResponse.json({ error: 'Giá gốc là bắt buộc' }, { status: 400 });

    // Check SKU uniqueness
    const existing = await prisma.product.findFirst({
      where: { sku: body.sku, tenantId: body.tenantId ?? 'default' },
    });
    if (existing) return NextResponse.json({ error: `SKU "${body.sku}" đã tồn tại` }, { status: 400 });

    const slug = generateSlug(body.name);

    const product = await prisma.product.create({
      data: {
        tenantId: body.tenantId ?? 'default',
        sku: body.sku.trim(),
        name: body.name.trim(),
        slug,
        shortDescription: body.shortDescription ?? null,
        description: body.description ?? null,
        type: body.type ?? 'PHYSICAL',
        status: 'DRAFT',
        basePrice: parseFloat(body.basePrice),
        salePrice: body.salePrice ? parseFloat(body.salePrice) : null,
        costPrice: body.costPrice ? parseFloat(body.costPrice) : null,
        vatRate: parseFloat(body.vatRate ?? '10'),
        trackInventory: body.trackInventory ?? true,
        stockQuantity: body.stockQuantity ?? 0,
        lowStockAlert: body.lowStockAlert ?? 5,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: err.message ?? 'Lỗi server' }, { status: 500 });
  }
}
