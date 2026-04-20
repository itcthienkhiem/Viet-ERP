// ============================================================
// CRM — NATS Event Publisher (fire-and-forget, non-blocking)
// Publishes events to NATS JetStream for inter-module flows
// Falls back silently if NATS is unavailable
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

/**
 * Publish a NATS event — fire-and-forget, never throws
 */
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
      source: 'crm',
    })
  } catch (err) {
    // Non-blocking — log but don't crash
    console.warn('[CRM NATS] Publish failed (non-critical):', subject, err instanceof Error ? err.message : err)
  }
}
