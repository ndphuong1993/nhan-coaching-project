"use server"

import { revalidatePath } from "next/cache"

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Simulate a delay for network request
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Basic validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // In a real application, you would send this data to a database or an email service
  console.log("Contact form submitted:")
  console.log(`Name: ${name}`)
  console.log(`Email: ${email}`)
  console.log(`Message: ${message}`)

  // Simulate a success or failure
  const success = Math.random() > 0.1 // 90% success rate for demo

  if (success) {
    revalidatePath("/") // Revalidate the page if needed
    return {
      success: true,
      message: "formSuccess", // Key for translation
    }
  } else {
    return {
      success: false,
      message: "formError", // Key for translation
    }
  }
}
