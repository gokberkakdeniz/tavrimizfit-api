/* eslint-disable no-prototype-builtins */

const messages = {
  "errors.unexpected": "Beklemeyen bir hata oluştu.",
} as const;

export type Message = keyof typeof messages;

const $ = (message: Message): string => messages[message];

export default $;
