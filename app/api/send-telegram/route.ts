import { NextRequest, NextResponse } from "next/server"

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: "HTML" | "Markdown"
}

interface ContactData {
  name: string
  email: string
  message: string
}

interface OrderData {
  orderId: string
  customerName: string
  contactMethod: string
  contactValue: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
  totalPrice: number
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (!type || !data) {
      return NextResponse.json({ error: "Неверные данные запроса" }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error("❌ Telegram переменные не настроены")
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 500 })
    }

    let message = ""

    if (type === "contact") {
      const contactData = data as ContactData
      message = `
🔔 <b>Новое сообщение с сайта</b>

👤 <b>Имя:</b> ${contactData.name}
📧 <b>Email:</b> ${contactData.email}

💬 <b>Сообщение:</b>
${contactData.message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
      `.trim()
    } else if (type === "order") {
      const orderData = data as OrderData
      const itemsList = orderData.items
        .map(item => `• ${item.name} - $${item.price} x ${item.quantity}`)
        .join('\n')

      message = `
🛒 <b>Новый заказ #${orderData.orderId}</b>

👤 <b>Клиент:</b> ${orderData.customerName}
📞 <b>Контакт:</b> ${orderData.contactMethod} - ${orderData.contactValue}

📦 <b>Товары:</b>
${itemsList}

💰 <b>Итого:</b> $${orderData.totalPrice}

⏰ <b>Время заказа:</b> ${new Date().toLocaleString('ru-RU')}
      `.trim()
    } else {
      return NextResponse.json({ error: "Неизвестный тип сообщения" }, { status: 400 })
    }

    const telegramMessage: TelegramMessage = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }

    console.log(`📤 Отправляем ${type} сообщение в Telegram...`)

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(telegramMessage),
    })

    const responseData = await response.json()

    if (!response.ok || !responseData.ok) {
      console.error("❌ Ошибка Telegram API:", responseData)
      throw new Error(responseData.description || "Ошибка отправки сообщения")
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
