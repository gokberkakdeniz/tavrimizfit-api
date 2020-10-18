/* eslint-disable no-prototype-builtins */

export interface MessageParams {
  [key: string]: unknown;
}

const messages = {
  "errors.unexpected": "Beklemeyen bir hata oluştu.",
  "errors.access_denied": "Erişim reddedildi.",
  "validations.invalid_email_or_name": "Eposta veya şifre geçersiz.",
  "validations.required_info": ({ name }: MessageParams) =>
    `Lütfen ${name} giriniz.`,
  "validations.max_length": ({ name, length }: MessageParams) =>
    `${name} ${length} karakterden uzun olmamalı.`,
  "validations.min_length": ({ name, length }: MessageParams) =>
    `${name} ${length} karakterden kısa olmamalı.`,
  "validations.must_be_unique": ({ name }: MessageParams) =>
    `Bu ${name} kullanılmaktadır.`,
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
