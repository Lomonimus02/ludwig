import { NextRequest, NextResponse } from "next/server"

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: "HTML" | "Markdown"
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Сообщение не может быть пустым" }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error("❌ Telegram переменные не настроены")
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 500 })
    }

    const telegramMessage: TelegramMessage = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }

    console.log("📤 Отправляем сообщение в Telegram...")

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(telegramMessage),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error("❌ Ошибка Telegram API:", data)
      throw new Error(data.description || "Ошибка отправки сообщения")
    }

    console.log("✅ Сообщение успешно отправлено")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Ошибка отправки сообщения:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Неизвестная ошибка" },
      { status: 500 }
    )
  }
}
