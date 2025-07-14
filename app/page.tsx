// app/page.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white text-gray-800 font-sans">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/nhan-logo.jpg"
              alt="Nhân Logo"
              width={60}
              height={60}
              className="rounded-full shadow-sm"
            />
            <span className="text-3xl font-bold text-green-700 italic tracking-tight">
              Nhân
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Đặt lịch khai vấn
        </Button>
      </header>

      {/* HERO SECTION */}
      <FadeIn>
        <section className="text-center py-32 px-4 bg-gradient-to-r from-blue-50 to-green-50">
          <h2 className="text-5xl md:text-6xl font-bold text-green-700 leading-tight drop-shadow-sm">
            Đưa bạn trở lại với lối sống<br />và cuộc sống của bạn
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
            Khám phá hành trình phát triển cá nhân với không gian khai vấn chữa lành — nơi bạn được lắng nghe và kết nối với chính mình.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Bắt đầu hành trình
            </Button>
          </div>
        </section>
      </FadeIn>

      {/* SERVICES SECTION */}
      <FadeIn>
        <section id="services" className="py-24 px-6 bg-white">
          <h3 className="text-4xl font-bold text-center text-green-700 mb-14">
            Dịch vụ của Nhân
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              "Khai vấn 1:1",
              "Khai vấn nhóm (5 người)",
              "Cho thuê địa điểm khai vấn",
              "Không gian mở cho workshop",
              "Tổ chức workshop khai vấn",
              "Bán ấn phẩm (sổ, bút, sách...)"
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-green-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all"
              >
                <h4 className="text-xl font-semibold text-green-800 mb-2">{service}</h4>
                <p className="text-sm text-gray-600">
                  Dịch vụ {service.toLowerCase()} giúp bạn kết nối, phát triển và chữa lành
                  trong môi trường thân thiện và chuyên nghiệp.
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* COACHES */}
      <FadeIn>
        <section className="py-24 px-6 bg-blue-50">
          <h3 className="text-4xl font-bold text-center text-blue-700 mb-14">
            Đội ngũ huấn luyện viên
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {["Phương", "Trang", "Minh"].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="text-center bg-white p-6 rounded-3xl shadow-md hover:shadow-xl"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
                <h4 className="text-lg font-semibold text-green-700">{name}</h4>
                <p className="text-sm text-gray-500">
                  Chuyên gia khai vấn & phát triển cá nhân
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="py-24 px-6 text-center bg-green-100">
          <h3 className="text-3xl font-bold text-green-800 mb-6">
            Bạn đã sẵn sàng cho hành trình của mình?
          </h3>
          <Button
            size="lg"
            onClick={() => window.open("https://forms.gle/YOUR_GOOGLE_FORM", "_blank")}
          >
            Đặt lịch ngay
          </Button>
        </section>
      </FadeIn>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center bg-white border-t">
        <p className="text-sm text-gray-500">
          © 2025 Nhân Coaching. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
