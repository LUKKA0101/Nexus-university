"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = transporter;
const nodemailer_1 = __importDefault(require("nodemailer"));
function transporter(to, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        yield transport.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Convite de acesso",
            html: `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #f5f5f5; padding: 2rem;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden;">
    <div style="background: #1a1a2e; padding: 1.5rem 2rem;">
      <p style="color: #fff; font-size: 18px; font-weight: 500; margin: 0;">Escola</p>
    </div>
    <div style="padding: 2rem;">
      <p style="font-size: 16px; color: #333; margin: 0 0 1.5rem;">Você foi convidado a acessar a plataforma. Clique no botão abaixo para definir sua senha.</p>
      <a href="${process.env.APP_URL}/register-password/${token}" style="display: inline-block; background: #1a1a2e; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 15px;">
        Ativar minha conta
      </a>
      <p style="font-size: 13px; color: #999; margin: 1.5rem 0 0; line-height: 1.7;">
        Este link expira em 48 horas. Se você não esperava este email, pode ignorá-lo.
      </p>
    </div>
    <div style="border-top: 1px solid #eee; padding: 1rem 2rem;">
      <p style="font-size: 12px; color: #999; margin: 0;">© 2025 Escola. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`,
        });
    });
}
