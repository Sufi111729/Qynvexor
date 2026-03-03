const CONTACT_MODE = import.meta.env.VITE_CONTACT_MODE || "mock";

export async function sendContactMessage(payload) {
  if (CONTACT_MODE === "api") {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to send message via API endpoint.");
    }

    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 900));
  return { success: true, mode: "mock" };
}
