import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isValidTransition } from "@/lib/order-engine";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status: newStatus, note, actor } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      select: { id: true, status: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    if (!isValidTransition(order.status as any, newStatus)) {
      return NextResponse.json(
        {
          error: `Không thể chuyển từ "${order.status}" sang "${newStatus}"`,
        },
        { status: 400 }
      );
    }

    // Build timestamp updates
    const timestampUpdates: Record<string, Date> = {};
    const now = new Date();
    if (newStatus === "CONFIRMED") timestampUpdates.confirmedAt = now;
    if (newStatus === "SHIPPED") timestampUpdates.shippedAt = now;
    if (newStatus === "DELIVERED") timestampUpdates.deliveredAt = now;
    if (newStatus === "COMPLETED") timestampUpdates.completedAt = now;
    if (newStatus === "CANCELLED") timestampUpdates.cancelledAt = now;

    const [updatedOrder] = await prisma.$transaction([
      prisma.order.update({
        where: { id: params.id },
        data: { status: newStatus, ...timestampUpdates },
      }),
      prisma.orderTimeline.create({
        data: {
          orderId: params.id,
          status: newStatus,
          note: note ?? null,
          actor: actor ?? "admin",
        },
      }),
    ]);

    return NextResponse.json(updatedOrder);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
