/* eslint-disable no-prototype-builtins */

export interface MessageParams {
  [key: string]: unknown;
}

export interface MessageDict {
  [key: string]: string | ((params: MessageParams) => string);
}

const messages = {
  "errors.unexpected": "Beklemeyen bir hata oluştu.",
  "errors.access_denied": "Erişim reddedildi.",
  "validation.missing_email_or_name": "Eposta ve şifre girilmeli.",
  "validation.invalid_email_or_name": "Eposta veya şifre geçersiz.",
  "validations.max_length": ({ name, length }: MessageParams) =>
    `${name} ${length} karakterden uzun olmamalı.`,
  "validations.min_length": ({ name, length }: MessageParams) =>
    `${name} ${length} karakterden kısa olmamalı.`,
  "success.updated": "Başarıyla güncellendi.",
  "success.added": "Başarıyla eklendi.",
  "success.removed": "Başarıyla silindi.",
} as const;

export type Message = keyof typeof messages;

const $ = (message: Message, params?: MessageParams): string => {
  const value = messages[message];

  if (typeof value === "function") return value(params);

  return value;
};

export default $;
