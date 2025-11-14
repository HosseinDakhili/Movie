import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="px-6 mt-40 md:px-16 lg:px-36 w-full text-gray-300"
    >
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img alt="لوگو" className="h-11" src={assets.logo} />
          <p className="mt-6 text-sm leading-6 text-gray-400">
            این وبسایت یک پلتفرم نمایش فیلم است که به شما امکان می‌دهد آخرین
            آثار سینمایی، تریلرها و اطلاعات دقیق هر فیلم را مشاهده کنید.
            نسخهٔ موبایل نیز از طریق لینک‌های زیر قابل دریافت است.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto"
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-9 w-auto"
            />
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">دسترسی سریع</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">صفحه اصلی</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">تماس با ما</a>
              </li>
              <li>
                <a href="#">قوانین و حریم خصوصی</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5">ارتباط با ما</h2>
            <div className="text-sm space-y-2">
              <p>۰۹۱۲-۱۲۳-۴۵۶۷</p>
              <p>support@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-sm pb-5">
        © {new Date().getFullYear()} ساخته شده توسط{" "}
        <a href="#" className="font-semibold">
          HosseinDakhili
        </a>{" "}
        | تمامی حقوق محفوظ است.
      </p>
    </footer>
  );
};

export default Footer;
