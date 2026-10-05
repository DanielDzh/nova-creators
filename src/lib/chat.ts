import { CHAT_DEMO } from "@/config/interaction";

/** How long the creator "types" a line: longer lines take longer, up to a cap. */
export const typingDelay = (text: string) =>
  Math.min(CHAT_DEMO.typingBaseMs + text.length * CHAT_DEMO.typingPerCharMs, CHAT_DEMO.typingMaxMs);

export const firstName = (fullName: string) => fullName.split(" ")[0];
