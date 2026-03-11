import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { TbMail } from "react-icons/tb";

export const SOCIAL_LINKS = [
  {
    id: "email",
    href: "mailto:agnilickaya5@gmail.com",
    label: "Email",
    Icon: TbMail,
  },
  {
    id: "telegram",
    href: "https://t.me/anastasi_coco",
    label: "Telegram",
    Icon: FaTelegramPlane,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/ahnylytska/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    id: "github",
    href: "https://github.com/meisnastia",
    label: "GitHub",
    Icon: AiFillGithub,
  },
];

export const EMAIL = "agnilickaya5@gmail.com";
