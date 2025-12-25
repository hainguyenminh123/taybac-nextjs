import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#8B4513" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Voltaire:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Organization schema (static) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tây Bắc Store",
              alternateName: "TayBacStore",
              url: "https://taybacstore.vn",
              logo: "https://taybacstore.vn/logo.png",
              description:
                "Chuyên cung cấp đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy giòn.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hà Nội",
                addressCountry: "VN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84901234567",
                contactType: "customer service",
                availableLanguage: "Vietnamese",
              },
              sameAs: ["https://facebook.com/taybacstore", "https://zalo.me/0901234567"],
            }),
          }}
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tây Bắc Store",
              image: "https://taybacstore.vn/og-image.jpg",
              description:
                "Cửa hàng đặc sản Tây Bắc Điện Biên - Thịt trâu gác bếp, lạp xưởng, măng khô chính gốc vùng cao",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hà Nội",
                addressRegion: "Hà Nội",
                addressCountry: "VN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 21.0285,
                longitude: 105.8542,
              },
              telephone: "+84901234567",
              priceRange: "₫₫",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "22:00",
              },
              areaServed: {
                "@type": "Country",
                name: "Vietnam",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tây Bắc Store",
              url: "https://taybacstore.vn",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://taybacstore.vn/san-pham?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
