import Image from 'next/image'; // Import Next.js Image component
import Head from 'next/head'; // If you want to include custom font via `@font-face`
import { nightTokyo } from "@/utils/fonts"; // Import the nightTokyo font

export default function Custom404() {
  return (
    <>
      {/* Adding custom font via @font-face */}
      <Head>
        <style>{`
          @font-face {
            font-family: 'NightinTokyo';
            src: url('/assets/font/NightinTokyo.ttf') format('truetype');
          }
        `}</style>
      </Head>

      <div className="w-full h-screen bg-[#001f3d] flex flex-col items-center justify-center text-center px-4">
        <div className="text-lg text-white mb-4">
          <p>This website is a movie platform created as part of a college project.</p>
          <p>It is built solely for educational purposes and is not intended for commercial use or sale.</p>
          <p>Please enjoy browsing the content!</p>
        </div>

        {/* Added "Created by" and image */}
        <div className="mt-4">
          <p className="text-lg text-white">Created by</p>
          <Image
            src="https://th.bing.com/th/id/OIP.SmnQrozPVg1WdFThnnjqhwHaKQ?w=156&h=197&c=7&r=0&o=5&pid=1.7"
            alt="Image"
            width={156}
            height={197}
            className="rounded-md mt-2"
          />
        </div>

        {/* Added Kishore's name with custom font and correct size */}
        <div className="mt-4">
          <p className={`${nightTokyo.className} text-3xl text-white`}>Kishore</p>
        </div>
      </div>
    </>
  );
}
