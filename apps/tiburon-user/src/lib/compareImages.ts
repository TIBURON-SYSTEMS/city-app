export async function compareImages(imageUrl1: string, imageUrl2: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini", // 或者 gpt-4o-mini
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Compare these two pictures, and only tell me what is different in the second picture compared to the first.",
            },
            { type: "image_url", image_url: { url: imageUrl1 } },
            { type: "image_url", image_url: { url: imageUrl2 } },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
}
