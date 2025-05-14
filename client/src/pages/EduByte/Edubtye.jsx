import React from "react";
import HeroSection from "./components/HeroSection";
import ProblemSolution from "./components/ProblemSolution";
import Features from "./components/Features";
import Advantages from "./components/Advantages";
import DemoTestimonials from "./components/DemoTestimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import SEO from "../../components/SEO/SEO";

const Edubtye = () => {
  const seoData = {
    title:
      "EduByte - Sistem Informasi Sekolah Terpadu | LMS, CBT, & Manajemen Sekolah",
    description:
      "EduByte adalah sistem informasi sekolah terpadu yang menyediakan LMS, CBT, manajemen keuangan, PPDB online, dan sistem akademik lengkap. Solusi digital untuk sekolah modern dengan fitur ujian online, pembayaran SPP, absensi digital, dan laporan akademik terintegrasi.",
    keywords:
      "sistem informasi sekolah, aplikasi sekolah, manajemen sekolah online, LMS sekolah, CBT sekolah, PPDB online, ujian online sekolah, pembayaran SPP online, absensi digital sekolah, rapor online, sistem akademik sekolah, administrasi sekolah, keuangan sekolah online, pembelajaran daring, elearning sekolah, manajemen perpustakaan sekolah, sistem penilaian siswa, database siswa online, aplikasi guru, sistem informasi akademik",
    ogTitle: "EduByte - Sistem Informasi Sekolah Modern & Terpadu",
    ogDescription:
      "Tingkatkan kualitas pendidikan dengan sistem informasi sekolah terpadu. Fitur lengkap: LMS, CBT, PPDB online, manajemen keuangan, dan sistem akademik digital.",
    ogImage: "https://jadidalmargibi.com/edubyte-preview.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "EduByte - Sistem Informasi Sekolah",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web-based",
      offers: {
        "@type": "Offer",
        price: "Hubungi Kami",
        priceCurrency: "IDR",
      },
      description:
        "Sistem informasi sekolah terpadu dengan fitur LMS, CBT, manajemen keuangan, PPDB online, dan sistem akademik lengkap untuk sekolah modern.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150",
      },
      featureList: [
        "Learning Management System (LMS)",
        "Computer Based Test (CBT)",
        "PPDB Online",
        "Manajemen Keuangan Sekolah",
        "Sistem Absensi Digital",
        "Rapor Online",
        "Database Siswa & Guru",
        "Perpustakaan Digital",
        "Sistem Penilaian Terintegrasi",
        "Manajemen Tugas & Ujian",
        "Pembayaran SPP Online",
        "Laporan Akademik Real-time",
      ],
    },
  };

  return (
    <div className='edubyte-landing'>
      <SEO {...seoData} />
      <HeroSection />
      <ProblemSolution />
      <Features />
      <Advantages />
      <DemoTestimonials />
      <Pricing />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Edubtye;
