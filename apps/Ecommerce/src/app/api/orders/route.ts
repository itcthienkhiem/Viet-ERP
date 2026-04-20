import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateOrderNumber } from '@/lib/cart-engine';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');

  const where: any = {};
  if (status) where.status = status;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { lines: { select: { id: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, page, limit });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Get next order sequence
    const lastOrder = await prisma.order.findFirst({ orderBy: { orderNumber: 'desc' } });
    const seq = lastOrder
      ? parseInt(lastOrder.orderNumber.split('-').pop() ?? '0') + 1
      : 1;
    const orderNumber = generateOrderNumber(new Date().getFullYear(), seq);

    const order = await prisma.order.create({
      data: {
        tenantId: body.tenantId ?? 'default',
        storefrontId: body.storefrontId,
        orderNumber,
        customerId: body.customerId ?? 'guest',
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        shippingAddress: body.shippingAddress,
        billingAddress: body.billingAddress,
        subtotal: body.subtotal,
        taxAmount: body.taxAmount,
        shippingFee: body.shippingFee ?? 0,
        discount: body.discount ?? 0,
        total: body.total,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        lines: {
          create: body.lines.map((line: any) => ({
            productId: line.productId,
            variantId: line.variantId,
            productName: line.productName,
            sku: line.sku,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            discount: line.discount ?? 0,
            taxRate: line.taxRate ?? 10,
            taxAmount: line.taxAmount,
            lineTotal: line.lineTotal,
          })),
        },
      },
      include: { lines: true },
    });

    // Publish to NATS for inter-module flows (Ecommerce → MRP production order)
    try {
      const { publish } = await import('@vierp/events/publisher')
      publish('vierp.order.placed', {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerId: order.customerId,
        customerName: order.customerName,
        lineItems: order.lines.map((l: any) => ({
          productId: l.productId,
          productName: l.productName,
          sku: l.sku,
          quantity: l.quantity,
          unitPrice: Number(l.unitPrice),
        })),
        totalAmount: Number(order.total),
        currency: 'VND',
      }, {
        tenantId: order.tenantId,
        userId: body.customerId || 'guest',
        source: 'ecommerce',
      }).catch(() => {})
    } catch {
      // Non-blocking
    }

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
