export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "—";
    const email = formData.get("email")?.toString() || "—";
    const message = formData.get("message")?.toString() || "—";

    const text = `
📩 New Contact Message

👤 Name: ${name}
📧 Email: ${email}

📝 Message:
${message}
    `;

    const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!tgResponse.ok) {
      throw new Error("Telegram API error");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Message failed" }),
      { status: 500 }
    );
  }
};
