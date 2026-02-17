import { NextResponse } from "next/server";

/**
 * GET /api/contact - Get contact information
 * POST /api/contact - Submit contact form
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const contactData = {
    hero: {
      media: {
        media_type: "image",
        mobile_path: "/images/contact-banner.jpg",
        desktop_path: "/images/contact-banner.jpg",
        media_alt: "contact-hero-1",
      },
      title_ar: "تواصل معنا",
      title: "Contact Us",
    },

    contact_info: {
      title:
        "“We'd love to hear about your next project — let's build something remarkable together.”",
      title_ar: "العنوان",
      address: {
        icon_path: "/images/icon-address.svg",
        label: "Address",
        label_ar: "العنوان",
        details:
          "57PH+4PJ - Business Bay - Bay Square Dubai United Arab Emirates",
      },
      phone: {
        icon_path: "/images/icon-phone.svg",
        label: "Phone",
        label_ar: "الهاتف",
        details: "+971 4 123 4567",
      },
      email: {
        icon_path: "/images/icon-contact-mail.svg",
        label: "Email Address",
        label_ar: "البريد الالكتروني",
        details: "info@wassopm.com",
      },
      whatsapp: {
        icon_path: "/images/icon-contact-whatsapp.svg",
        label: "Whatsapp",
        label_ar: "واتساب",
        details: "+01 4567 2334",
      },
      location: {
        label: "location",
        label_ar: "الموقع",
        details:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3686686686686!2d55.26!3d25.186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDExJzA5LjYiTiA1NcKwMTUnMzYuMCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae",
      },
      social_media: {
        facebook: "https://www.facebook.com/wasso",
        instagram: "https://www.instagram.com/wasso",
        linkedin: "https://www.linkedin.com/company/wasso",
        twitter: "https://www.twitter.com/wasso",
      },
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "Contact information fetched successfully",
      message_ar: "تم جلب معلومات الاتصال بنجاح",
      data: contactData,
    },
    { status: 200 },
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, inquiry_type } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          message_ar: "الحقول المطلوبة مفقودة",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
          message_ar: "تنسيق البريد الإلكتروني غير صحيح",
        },
        { status: 400 },
      );
    }

    // In a real application, you would:
    // 1. Save the contact form submission to a database
    // 2. Send an email notification to the team
    // 3. Send a confirmation email to the user
    // For now, we'll just return a success response

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        message_ar: "تم إرسال نموذج الاتصال بنجاح",
        data: {
          submission_id: `CONTACT-${Date.now()}`,
          status: "received",
          status_ar: "تم الاستلام",
          estimated_response_time: "24-48 hours",
          estimated_response_time_ar: "24-48 ساعة",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting contact form",
        message_ar: "خطأ في إرسال نموذج الاتصال",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
