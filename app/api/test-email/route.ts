import { NextResponse } from 'next/server'
import { resend, EMAIL_FROM, emailTemplates } from '@/lib/resend'

export async function GET() {
  try {
    // Test simple email
    const data = await resend.emails.send({
      from: EMAIL_FROM,
      to: 'pablofernando@live.com',
      subject: '🧪 Teste de Email - Ebook Landing Page',
      html: emailTemplates.leadWelcome.getHtml('Pablo Fernando'),
    })

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso!',
      emailId: data.data?.id,
      data,
    })
  } catch (error) {
    console.error('Error sending test email:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao enviar email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
