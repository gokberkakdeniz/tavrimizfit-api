/* eslint-disable no-prototype-builtins */

const messages = {
  "errors.unexpected": "Beklemeyen bir hata oluştu.",
  "errors.access_denied": "Erişim reddedildi.",
  "validation.missing_email_or_name": "Eposta ve şifre girilmeli.",
  "validation.invalid_email_or_name": "Eposta veya şifre geçersiz.",
  "validations.maxlength": (name: string, length: number) =>
    `${name} ${length} karakterden uzun olmamalı.`,
  "validations.minlength": (name: string, length: number) =>
    `${name} ${length} karakterden kısa olmamalı.`,
  success: "Başarılı",
  "success.updated": "Başarıyla güncellendi!",
  "success.added": "Başarıyla eklendi!",
  "success.removed": "Başarıyla silindi!",
} as const;

export type Message = keyof typeof messages;

const $ = (message: Message): string => messages[message];

export default $;
