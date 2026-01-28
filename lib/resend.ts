import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Email sender configuration
export const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev'
export const SUPPORT_EMAIL = 'pablofernando@live.com'

// Email templates
export const emailTemplates = {
  leadWelcome: {
    subject: '🎉 Bem-vindo à Masterclass de Ebooks com IA!',
    getHtml: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 40px 20px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #0ea5e9;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 14px;
            }
            .benefit {
              display: flex;
              align-items: start;
              margin: 15px 0;
            }
            .benefit-icon {
              color: #10b981;
              margin-right: 10px;
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✨ Bem-vindo, ${name}!</h1>
            <p>Você está a um passo de criar ebooks profissionais com IA</p>
          </div>

          <div class="content">
            <h2>Obrigado por se cadastrar!</h2>
            <p>Estamos muito felizes em ter você conosco na jornada de criação de ebooks com Inteligência Artificial.</p>

            <h3>O que você vai aprender:</h3>
            <div class="benefit">
              <span class="benefit-icon">✅</span>
              <div>
                <strong>Criar ebooks em 3-5 dias</strong><br>
                Método validado e testado com dezenas de alunos
              </div>
            </div>
            <div class="benefit">
              <span class="benefit-icon">✅</span>
              <div>
                <strong>Manter sua voz autoral</strong><br>
                IA como ferramenta, você no controle criativo
              </div>
            </div>
            <div class="benefit">
              <span class="benefit-icon">✅</span>
              <div>
                <strong>Qualidade profissional</strong><br>
                Edição e formatação de alto nível
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}#checkout" class="button">
                Garantir Minha Vaga Agora
              </a>
            </div>

            <p><strong>Bônus exclusivos inclusos:</strong></p>
            <ul>
              <li>💎 Biblioteca de Prompts Profissionais (R$ 197)</li>
              <li>📋 Checklist de Qualidade Editorial (R$ 97)</li>
              <li>🎨 Templates de Formatação (R$ 247)</li>
              <li>📘 Playbook Completo de Lançamento (R$ 147)</li>
            </ul>

            <p>Não perca essa oportunidade de transformar seu conhecimento em produtos digitais de alta conversão.</p>

            <p>Nos vemos na masterclass! 🚀</p>
          </div>

          <div class="footer">
            <p>Dúvidas? Responda este email ou entre em contato em ${SUPPORT_EMAIL}</p>
            <p style="font-size: 12px; color: #999;">
              Você recebeu este email porque se cadastrou em nossa lista.<br>
              ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}
            </p>
          </div>
        </body>
      </html>
    `,
  },

  purchaseConfirmed: {
    subject: '🎊 Pagamento Confirmado - Bem-vindo à Masterclass!',
    getHtml: (name: string, productName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .success-icon {
              font-size: 60px;
              margin-bottom: 20px;
            }
            .content {
              background: #ffffff;
              padding: 40px 20px;
              border: 2px solid #10b981;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .info-box {
              background: #f0fdf4;
              border-left: 4px solid #10b981;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="success-icon">✅</div>
            <h1>Pagamento Confirmado!</h1>
            <p>Parabéns, ${name}! Você agora faz parte da Masterclass</p>
          </div>

          <div class="content">
            <h2>Bem-vindo à Masterclass de Ebooks com IA! 🎉</h2>
            <p>Seu pagamento foi confirmado com sucesso e você já tem acesso total ao conteúdo.</p>

            <div class="info-box">
              <strong>📦 Produto adquirido:</strong><br>
              ${productName}
            </div>

            <h3>Próximos Passos:</h3>
            <ol>
              <li><strong>Acesse a área de membros</strong> - Link enviado por email separado</li>
              <li><strong>Complete seu perfil</strong> - Para personalizar sua experiência</li>
              <li><strong>Comece pelo Módulo 1</strong> - Fundamentos e mindset</li>
              <li><strong>Entre no grupo privado</strong> - Networking com outros alunos</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/area-membros" class="button">
                Acessar Área de Membros
              </a>
            </div>

            <h3>Seus Bônus Exclusivos:</h3>
            <ul>
              <li>💎 Biblioteca de Prompts Profissionais</li>
              <li>📋 Checklist de Qualidade Editorial</li>
              <li>🎨 Templates de Formatação</li>
              <li>📘 Playbook Completo de Lançamento</li>
            </ul>

            <div class="info-box">
              <strong>🎁 Bônus Surpresa:</strong><br>
              Você também ganhou acesso ao nosso Workshop de Landing Pages!<br>
              Aprenda a criar páginas de vendas de alta conversão para seus ebooks.
            </div>

            <p>Estamos aqui para ajudar você a ter sucesso! Se tiver qualquer dúvida, responda este email.</p>

            <p><strong>Vamos criar ebooks incríveis juntos! 🚀</strong></p>
          </div>

          <div class="footer">
            <p>Suporte: ${SUPPORT_EMAIL}</p>
            <p style="font-size: 12px; color: #999;">
              ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}
            </p>
          </div>
        </body>
      </html>
    `,
  },

  purchasePending: {
    subject: '⏳ Pagamento em Análise - Masterclass Ebooks IA',
    getHtml: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 40px 20px;
              border: 2px solid #f59e0b;
              border-radius: 0 0 10px 10px;
            }
            .info-box {
              background: #fffbeb;
              border-left: 4px solid #f59e0b;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>⏳ Pagamento em Análise</h1>
            <p>Olá, ${name}!</p>
          </div>

          <div class="content">
            <p>Recebemos seu pedido e seu pagamento está sendo processado.</p>

            <div class="info-box">
              <strong>ℹ️ O que acontece agora:</strong><br><br>
              Dependendo do método de pagamento escolhido, a confirmação pode levar:<br>
              <ul>
                <li><strong>PIX:</strong> Alguns minutos após o pagamento</li>
                <li><strong>Cartão de Crédito:</strong> Até 24 horas</li>
                <li><strong>Boleto:</strong> Até 2 dias úteis após o pagamento</li>
              </ul>
            </div>

            <p>Assim que seu pagamento for confirmado, você receberá um email com:</p>
            <ul>
              <li>✅ Confirmação da compra</li>
              <li>🔑 Link de acesso à área de membros</li>
              <li>🎁 Todos os bônus inclusos</li>
            </ul>

            <p>Fique tranquilo, assim que tudo estiver ok você terá acesso imediato ao conteúdo!</p>

            <p>Qualquer dúvida, estamos à disposição.</p>
          </div>

          <div class="footer">
            <p>Suporte: ${SUPPORT_EMAIL}</p>
            <p style="font-size: 12px; color: #999;">
              ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}
            </p>
          </div>
        </body>
      </html>
    `,
  },

  adminNotification: {
    subject: '🔔 Nova Compra Realizada - Masterclass Ebooks IA',
    getHtml: (userName: string, userEmail: string, productName: string, amount: number, purchaseId: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: monospace;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #0ea5e9;
              color: white;
              padding: 20px;
              border-radius: 8px;
            }
            .info {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .info-row {
              margin: 10px 0;
              padding: 10px;
              background: white;
              border-left: 3px solid #0ea5e9;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>🎉 Nova Compra Realizada!</h2>
          </div>

          <div class="info">
            <div class="info-row">
              <strong>👤 Cliente:</strong> ${userName}
            </div>
            <div class="info-row">
              <strong>📧 Email:</strong> ${userEmail}
            </div>
            <div class="info-row">
              <strong>📦 Produto:</strong> ${productName}
            </div>
            <div class="info-row">
              <strong>💰 Valor:</strong> R$ ${amount.toFixed(2)}
            </div>
            <div class="info-row">
              <strong>🆔 Purchase ID:</strong> ${purchaseId}
            </div>
            <div class="info-row">
              <strong>⏰ Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
          </div>

          <p>Acesse o dashboard para mais detalhes.</p>
        </body>
      </html>
    `,
  },
}
