import { AuditLog } from '../models/index.js';

export class AuditService {
  public static async log(
    actorId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      await AuditLog.create({
        actorId,
        action,
        entityType,
        entityId,
        metadata
      });
    } catch (err) {
      console.error('[AuditService] Failed to record log entry:', err);
    }
  }
}
