// ============================================================
// HRM — NATS Event Publisher (fire-and-forget, non-blocking)
// ============================================================

let publishFn: ((subject: string, data: unknown, ctx: { tenantId: string; userId: string; source: string }) => Promise<void>) | null = null

async function getPublisher() {
  if (publishFn) return publishFn
  try {
    const { publish } = await import('@vierp/events/publisher')
    publishFn = publish as any
    return publishFn
  } catch {
    return null
  }
}

export async function publishNATS(
  subject: string,
  data: unknown,
  context: { tenantId?: string; userId?: string } = {}
): Promise<void> {
  try {
    const pub = await getPublisher()
    if (!pub) return

    await pub(subject, data, {
      tenantId: context.tenantId || 'default',
      userId: context.userId || 'system',
      source: 'hrm',
    })
  } catch (err) {
    console.warn('[HRM NATS] Publish failed (non-critical):', subject, err instanceof Error ? err.message : err)
  }
}
