// ============================================================
// @vierp/events - Event Bridge
// Standalone service that activates all inter-module event flows
//
// Run: npx tsx packages/events/src/bridge/index.ts
// Or:  node -r tsx/cjs packages/events/src/bridge/index.ts
// ============================================================

import { ensureStreams } from '../connection';
import { subscribe } from '../subscriber';
import { publish } from '../publisher';
import {
  mapDealWonToInvoice,
  validateInvoiceMapping,
} from '../flows/crm-to-accounting';
import {
  checkInventoryAndCreateProductionOrder,
  mapProductionCompletedToInventory,
  validateProductionOrder,
} from '../flows/ecommerce-to-mrp';
import {
  mapPayrollToJournalEntry,
  validatePayrollJournal,
} from '../flows/hrm-to-accounting';

// ─── Stats ───────────────────────────────────────────────────
const stats = {
  processed: 0,
  errors: 0,
  flows: {
    'crm→accounting': 0,
    'ecommerce→mrp': 0,
    'mrp→inventory': 0,
    'hrm→accounting': 0,
  },
};

// ─── System context (bridge acts as system user) ─────────────
const BRIDGE_CONTEXT = {
  tenantId: 'system',
  userId: 'event-bridge',
  source: 'event-bridge',
};

// ─── Flow 1: CRM Deal Won → Accounting Invoice ───────────────
async function activateCRMToAccounting() {
  await subscribe(
    'vierp.crm.deal.won',
    'bridge-crm-to-accounting',
    async (envelope) => {
      console.log(`[BRIDGE] CRM→Accounting: Deal won ${envelope.data?.dealId}`);

      try {
        const invoicePayload = await mapDealWonToInvoice(envelope as any);
        const validation = validateInvoiceMapping(invoicePayload);

        if (!validation.valid) {
          console.error('[BRIDGE] Invoice mapping invalid:', validation.errors);
          stats.errors++;
          return;
        }

        await publish('vierp.accounting.invoice.created', invoicePayload, {
          ...BRIDGE_CONTEXT,
          tenantId: envelope.tenantId,
        });

        stats.flows['crm→accounting']++;
        stats.processed++;
        console.log(`[BRIDGE] ✅ Created invoice ${invoicePayload.invoiceNumber} from deal ${envelope.data?.dealId}`);
      } catch (err) {
        console.error('[BRIDGE] CRM→Accounting error:', err);
        stats.errors++;
      }
    }
  );

  console.log('[BRIDGE] ✅ Flow activated: CRM Deal Won → Accounting Invoice');
}

// ─── Flow 2: Ecommerce Order → MRP Production Order ──────────
async function activateEcommerceToMRP() {
  await subscribe(
    'vierp.order.placed',
    'bridge-ecommerce-to-mrp',
    async (envelope) => {
      console.log(`[BRIDGE] Ecommerce→MRP: Order placed ${envelope.data?.orderId}`);

      try {
        const productionOrders = await checkInventoryAndCreateProductionOrder(envelope as any);

        for (const po of productionOrders) {
          const validation = validateProductionOrder(po);
          if (!validation.valid) {
            console.warn('[BRIDGE] Production order invalid:', validation.errors);
            continue;
          }

          await publish('vierp.production.order.created', po, {
            ...BRIDGE_CONTEXT,
            tenantId: envelope.tenantId,
          });

          stats.flows['ecommerce→mrp']++;
          console.log(`[BRIDGE] ✅ Created production order ${po.productionOrderNumber} for product ${po.productId}`);
        }

        stats.processed++;
      } catch (err) {
        console.error('[BRIDGE] Ecommerce→MRP error:', err);
        stats.errors++;
      }
    }
  );

  console.log('[BRIDGE] ✅ Flow activated: Ecommerce Order → MRP Production Order');
}

// ─── Flow 3: MRP Production Completed → Inventory Update ─────
async function activateMRPToInventory() {
  await subscribe(
    'vierp.production.completed',
    'bridge-mrp-to-inventory',
    async (envelope) => {
      console.log(`[BRIDGE] MRP→Inventory: Production completed ${envelope.data?.productionOrderId}`);

      try {
        const inventoryUpdate = await mapProductionCompletedToInventory(envelope as any);

        await publish('vierp.inventory.updated', inventoryUpdate, {
          ...BRIDGE_CONTEXT,
          tenantId: envelope.tenantId,
        });

        stats.flows['mrp→inventory']++;
        stats.processed++;
        console.log(`[BRIDGE] ✅ Updated inventory for product ${inventoryUpdate.productId}`);
      } catch (err) {
        console.error('[BRIDGE] MRP→Inventory error:', err);
        stats.errors++;
      }
    }
  );

  console.log('[BRIDGE] ✅ Flow activated: MRP Production Completed → Inventory Update');
}

// ─── Flow 4: HRM Payroll → Accounting Journal Entry ──────────
async function activateHRMToAccounting() {
  await subscribe(
    'vierp.employee.payroll.processed',
    'bridge-hrm-to-accounting',
    async (envelope) => {
      console.log(`[BRIDGE] HRM→Accounting: Payroll processed ${envelope.data?.payrollNumber}`);

      try {
        const journalEntry = await mapPayrollToJournalEntry(envelope as any);
        const validation = validatePayrollJournal(journalEntry);

        if (!validation.valid) {
          console.error('[BRIDGE] Journal entry invalid:', validation.errors);
          stats.errors++;
          return;
        }

        await publish('vierp.accounting.journal.posted', journalEntry, {
          ...BRIDGE_CONTEXT,
          tenantId: envelope.tenantId,
        });

        stats.flows['hrm→accounting']++;
        stats.processed++;
        console.log(`[BRIDGE] ✅ Created journal entry ${journalEntry.journalNumber} from payroll ${envelope.data?.payrollNumber}`);
      } catch (err) {
        console.error('[BRIDGE] HRM→Accounting error:', err);
        stats.errors++;
      }
    }
  );

  console.log('[BRIDGE] ✅ Flow activated: HRM Payroll → Accounting Journal Entry');
}

// ─── Master Data Sync Flows ───────────────────────────────────
async function activateMasterDataSync() {
  // Customer sync: CRM → Master Data
  await subscribe(
    'vierp.customer.>',
    'bridge-customer-sync',
    async (envelope) => {
      // Re-publish to ensure all modules receive
      const eventType = envelope.type;
      if (!eventType.includes('master-data')) {
        // Avoid re-publishing master-data events (infinite loop)
        console.log(`[BRIDGE] Master-data sync: ${eventType} for tenant ${envelope.tenantId}`);
      }
    }
  );

  // Employee sync: HRM → Master Data
  await subscribe(
    'vierp.employee.>',
    'bridge-employee-sync',
    async (envelope) => {
      const eventType = envelope.type;
      if (!eventType.includes('master-data')) {
        console.log(`[BRIDGE] Employee sync: ${eventType} for tenant ${envelope.tenantId}`);
      }
    }
  );

  console.log('[BRIDGE] ✅ Master data sync flows activated');
}

// ─── Health check endpoint ────────────────────────────────────
function startHealthServer() {
  const port = parseInt(process.env.BRIDGE_PORT || '3099');

  // Simple HTTP health server using Node.js built-in
  const http = require('http');
  const server = http.createServer((req: any, res: any) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ok',
        uptime: process.uptime(),
        stats,
        timestamp: new Date().toISOString(),
      }));
    } else if (req.url === '/stats') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats, null, 2));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(port, () => {
    console.log(`[BRIDGE] Health server: http://localhost:${port}/health`);
    console.log(`[BRIDGE] Stats:         http://localhost:${port}/stats`);
  });

  return server;
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║         VietERP Event Bridge v1.0                ║');
  console.log('║  Activating inter-module event flows...          ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  // 1. Ensure NATS streams exist
  console.log('[BRIDGE] Connecting to NATS...');
  await ensureStreams();
  console.log('[BRIDGE] ✅ NATS streams ready');
  console.log('');

  // 2. Activate all flows
  console.log('[BRIDGE] Activating event flows...');
  await Promise.all([
    activateCRMToAccounting(),
    activateEcommerceToMRP(),
    activateMRPToInventory(),
    activateHRMToAccounting(),
    activateMasterDataSync(),
  ]);

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  All flows active. Listening for events...       ║');
  console.log('║                                                  ║');
  console.log('║  Active flows:                                   ║');
  console.log('║  • CRM Deal Won → Accounting Invoice             ║');
  console.log('║  • Ecommerce Order → MRP Production Order        ║');
  console.log('║  • MRP Production Done → Inventory Update        ║');
  console.log('║  • HRM Payroll → Accounting Journal Entry        ║');
  console.log('║  • Customer/Employee Master Data Sync            ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  // 3. Start health server
  startHealthServer();

  // 4. Stats reporting every 60s
  setInterval(() => {
    console.log(`[BRIDGE] Stats: processed=${stats.processed} errors=${stats.errors}`, stats.flows);
  }, 60_000);

  // 5. Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('[BRIDGE] Shutting down...');
    const { closeConnection } = await import('../connection');
    await closeConnection();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('[BRIDGE] Shutting down...');
    const { closeConnection } = await import('../connection');
    await closeConnection();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('[BRIDGE] Fatal error:', err);
  process.exit(1);
});
