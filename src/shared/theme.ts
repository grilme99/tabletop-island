import { ColorUtil } from "./util/color-utils";

// Most colors are taken from here https://tailwindcss.com/docs/customizing-colors
namespace Theme {
    // Colors
    export const White = new Color3(1, 1, 1);
    export const Black = new Color3(0, 0, 0);

    export const Gray50 = ColorUtil.hexColor(0xf9fafb);
    export const Gray100 = ColorUtil.hexColor(0xf3f4f6);
    export const Gray200 = ColorUtil.hexColor(0xe5e7eb);
    export const Gray300 = ColorUtil.hexColor(0xd1d5db);
    export const Gray400 = ColorUtil.hexColor(0x9ca3af);
    export const Gray500 = ColorUtil.hexColor(0x6b7280);
    export const Gray600 = ColorUtil.hexColor(0x4b5563);
    export const Gray700 = ColorUtil.hexColor(0x374151);
    export const Gray800 = ColorUtil.hexColor(0x1f2937);
    export const Gray900 = ColorUtil.hexColor(0x111827);

    export const Red50 = ColorUtil.hexColor(0xfef2f2);
    export const Red100 = ColorUtil.hexColor(0xfee2e2);
    export const Red200 = ColorUtil.hexColor(0xfecaca);
    export const Red300 = ColorUtil.hexColor(0xfca5a5);
    export const Red400 = ColorUtil.hexColor(0xf87171);
    export const Red500 = ColorUtil.hexColor(0xef4444);
    export const Red600 = ColorUtil.hexColor(0xdc2626);
    export const Red700 = ColorUtil.hexColor(0xb91c1c);
    export const Red800 = ColorUtil.hexColor(0x991b1b);
    export const Red900 = ColorUtil.hexColor(0x7f1d1d);

    export const Yellow50 = ColorUtil.hexColor(0xfffbeb);
    export const Yellow100 = ColorUtil.hexColor(0xfef3c7);
    export const Yellow200 = ColorUtil.hexColor(0xfde68a);
    export const Yellow300 = ColorUtil.hexColor(0xfcd34d);
    export const Yellow400 = ColorUtil.hexColor(0xfbbf24);
    export const Yellow500 = ColorUtil.hexColor(0xf59e0b);
    export const Yellow600 = ColorUtil.hexColor(0xd97706);
    export const Yellow700 = ColorUtil.hexColor(0xb45309);
    export const Yellow800 = ColorUtil.hexColor(0x92400e);
    export const Yellow900 = ColorUtil.hexColor(0x78350f);

    export const Green50 = ColorUtil.hexColor(0xecfdf5);
    export const Green100 = ColorUtil.hexColor(0xd1fae5);
    export const Green200 = ColorUtil.hexColor(0xa7f3d0);
    export const Green300 = ColorUtil.hexColor(0x6ee7b7);
    export const Green400 = ColorUtil.hexColor(0x34d399);
    export const Green500 = ColorUtil.hexColor(0x10b981);
    export const Green600 = ColorUtil.hexColor(0x059669);
    export const Green700 = ColorUtil.hexColor(0x047857);
    export const Green800 = ColorUtil.hexColor(0x065f46);
    export const Green900 = ColorUtil.hexColor(0x064e3b);

    export const Blue50 = ColorUtil.hexColor(0xeff6ff);
    export const Blue100 = ColorUtil.hexColor(0xdbeafe);
    export const Blue200 = ColorUtil.hexColor(0xbfdbfe);
    export const Blue300 = ColorUtil.hexColor(0x93c5fd);
    export const Blue400 = ColorUtil.hexColor(0x60a5fa);
    export const Blue500 = ColorUtil.hexColor(0x3b82f6);
    export const Blue600 = ColorUtil.hexColor(0x2563eb);
    export const Blue700 = ColorUtil.hexColor(0x1d4ed8);
    export const Blue800 = ColorUtil.hexColor(0x1e40af);
    export const Blue900 = ColorUtil.hexColor(0x1e3a8a);

    export const Indigo50 = ColorUtil.hexColor(0xeef2ff);
    export const Indigo100 = ColorUtil.hexColor(0xe0e7ff);
    export const Indigo200 = ColorUtil.hexColor(0xc7d2fe);
    export const Indigo300 = ColorUtil.hexColor(0xa5b4fc);
    export const Indigo400 = ColorUtil.hexColor(0x818cf8);
    export const Indigo500 = ColorUtil.hexColor(0x6366f1);
    export const Indigo600 = ColorUtil.hexColor(0x4f46e5);
    export const Indigo700 = ColorUtil.hexColor(0x4338ca);
    export const Indigo800 = ColorUtil.hexColor(0x3730a3);
    export const Indigo900 = ColorUtil.hexColor(0x312e81);

    export const Purple50 = ColorUtil.hexColor(0xf5f3ff);
    export const Purple100 = ColorUtil.hexColor(0xede9fe);
    export const Purple200 = ColorUtil.hexColor(0xddd6fe);
    export const Purple300 = ColorUtil.hexColor(0xc4b5fd);
    export const Purple400 = ColorUtil.hexColor(0xa78bfa);
    export const Purple500 = ColorUtil.hexColor(0x8b5cf6);
    export const Purple600 = ColorUtil.hexColor(0x7c3aed);
    export const Purple700 = ColorUtil.hexColor(0x6d28d9);
    export const Purple800 = ColorUtil.hexColor(0x5b21b6);
    export const Purple900 = ColorUtil.hexColor(0x4c1d95);

    export const Pink50 = ColorUtil.hexColor(0xfdf2f8);
    export const Pink100 = ColorUtil.hexColor(0xfce7f3);
    export const Pink200 = ColorUtil.hexColor(0xfbcfe8);
    export const Pink300 = ColorUtil.hexColor(0xf9a8d4);
    export const Pink400 = ColorUtil.hexColor(0xf472b6);
    export const Pink500 = ColorUtil.hexColor(0xec4899);
    export const Pink600 = ColorUtil.hexColor(0xdb2777);
    export const Pink700 = ColorUtil.hexColor(0xbe185d);
    export const Pink800 = ColorUtil.hexColor(0x9d174d);
    export const Pink900 = ColorUtil.hexColor(0x831843);

    export const TextPrimary = Red600;
    export const TextSecondary = Gray500;

    export const FontPrimary = Enum.Font.GothamBlack;
    export const FontSecondary = Enum.Font.GothamSemibold;
    export const FontNormal = Enum.Font.Gotham;
}

export default Theme;
