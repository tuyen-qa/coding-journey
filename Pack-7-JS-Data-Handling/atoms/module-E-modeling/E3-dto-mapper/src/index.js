export function toDTO(order){ return { id: String(order.id), total: Number(order.totalCents) }; }
export function fromDTO(dto){ return { id: dto.id, totalCents: Number(dto.total) }; }
