import { ColorUtil } from "../util/color-utils";

// Most colors are taken from here https://tailwindcss.com/docs/customizing-colors
namespace Theme {
    // Colors
    export const white = new Color3(1, 1, 1);
    export const black = new Color3(0, 0, 0);

    export const gray50 = ColorUtil.hexColor(0xf9fafb);
    export const gray100 = ColorUtil.hexColor(0xf3f4f6);
    export const gray200 = ColorUtil.hexColor(0xe5e7eb);
    export const gray300 = ColorUtil.hexColor(0xd1d5db);
    export const gray400 = ColorUtil.hexColor(0x9ca3af);
    export const gray500 = ColorUtil.hexColor(0x6b7280);
    export const gray600 = ColorUtil.hexColor(0x4b5563);
    export const gray700 = ColorUtil.hexColor(0x374151);
    export const gray800 = ColorUtil.hexColor(0x1f2937);
    export const gray900 = ColorUtil.hexColor(0x111827);

    export const red50 = ColorUtil.hexColor(0xfef2f2);
    export const red100 = ColorUtil.hexColor(0xfee2e2);
    export const red200 = ColorUtil.hexColor(0xfecaca);
    export const red300 = ColorUtil.hexColor(0xfca5a5);
    export const red400 = ColorUtil.hexColor(0xf87171);
    export const red500 = ColorUtil.hexColor(0xef4444);
    export const red600 = ColorUtil.hexColor(0xdc2626);
    export const red700 = ColorUtil.hexColor(0xb91c1c);
    export const red800 = ColorUtil.hexColor(0x991b1b);
    export const red900 = ColorUtil.hexColor(0x7f1d1d);

    export const yellow50 = ColorUtil.hexColor(0xfffbeb);
    export const yellow100 = ColorUtil.hexColor(0xfef3c7);
    export const yellow200 = ColorUtil.hexColor(0xfde68a);
    export const yellow300 = ColorUtil.hexColor(0xfcd34d);
    export const yellow400 = ColorUtil.hexColor(0xfbbf24);
    export const yellow500 = ColorUtil.hexColor(0xf59e0b);
    export const yellow600 = ColorUtil.hexColor(0xd97706);
    export const yellow700 = ColorUtil.hexColor(0xb45309);
    export const yellow800 = ColorUtil.hexColor(0x92400e);
    export const yellow900 = ColorUtil.hexColor(0x78350f);

    export const green50 = ColorUtil.hexColor(0xecfdf5);
    export const green100 = ColorUtil.hexColor(0xd1fae5);
    export const green200 = ColorUtil.hexColor(0xa7f3d0);
    export const green300 = ColorUtil.hexColor(0x6ee7b7);
    export const green400 = ColorUtil.hexColor(0x34d399);
    export const green500 = ColorUtil.hexColor(0x10b981);
    export const green600 = ColorUtil.hexColor(0x059669);
    export const green700 = ColorUtil.hexColor(0x047857);
    export const green800 = ColorUtil.hexColor(0x065f46);
    export const green900 = ColorUtil.hexColor(0x064e3b);

    export const blue50 = ColorUtil.hexColor(0xeff6ff);
    export const blue100 = ColorUtil.hexColor(0xdbeafe);
    export const blue200 = ColorUtil.hexColor(0xbfdbfe);
    export const blue300 = ColorUtil.hexColor(0x93c5fd);
    export const blue400 = ColorUtil.hexColor(0x60a5fa);
    export const blue500 = ColorUtil.hexColor(0x3b82f6);
    export const blue600 = ColorUtil.hexColor(0x2563eb);
    export const blue700 = ColorUtil.hexColor(0x1d4ed8);
    export const blue800 = ColorUtil.hexColor(0x1e40af);
    export const blue900 = ColorUtil.hexColor(0x1e3a8a);

    export const indigo50 = ColorUtil.hexColor(0xeef2ff);
    export const indigo100 = ColorUtil.hexColor(0xe0e7ff);
    export const indigo200 = ColorUtil.hexColor(0xc7d2fe);
    export const indigo300 = ColorUtil.hexColor(0xa5b4fc);
    export const indigo400 = ColorUtil.hexColor(0x818cf8);
    export const indigo500 = ColorUtil.hexColor(0x6366f1);
    export const indigo600 = ColorUtil.hexColor(0x4f46e5);
    export const indigo700 = ColorUtil.hexColor(0x4338ca);
    export const indigo800 = ColorUtil.hexColor(0x3730a3);
    export const indigo900 = ColorUtil.hexColor(0x312e81);

    export const purple50 = ColorUtil.hexColor(0xf5f3ff);
    export const purple100 = ColorUtil.hexColor(0xede9fe);
    export const purple200 = ColorUtil.hexColor(0xddd6fe);
    export const purple300 = ColorUtil.hexColor(0xc4b5fd);
    export const purple400 = ColorUtil.hexColor(0xa78bfa);
    export const purple500 = ColorUtil.hexColor(0x8b5cf6);
    export const purple600 = ColorUtil.hexColor(0x7c3aed);
    export const purple700 = ColorUtil.hexColor(0x6d28d9);
    export const purple800 = ColorUtil.hexColor(0x5b21b6);
    export const purple900 = ColorUtil.hexColor(0x4c1d95);

    export const pink50 = ColorUtil.hexColor(0xfdf2f8);
    export const pink100 = ColorUtil.hexColor(0xfce7f3);
    export const pink200 = ColorUtil.hexColor(0xfbcfe8);
    export const pink300 = ColorUtil.hexColor(0xf9a8d4);
    export const pink400 = ColorUtil.hexColor(0xf472b6);
    export const pink500 = ColorUtil.hexColor(0xec4899);
    export const pink600 = ColorUtil.hexColor(0xdb2777);
    export const pink700 = ColorUtil.hexColor(0xbe185d);
    export const pink800 = ColorUtil.hexColor(0x9d174d);
    export const pink900 = ColorUtil.hexColor(0x831843);

    export const primaryColor = green500;

    export const primaryTextColor = blue600;
    export const secondaryTextColor = gray500;

    export const fontPrimary = Enum.Font.GothamBlack;
    export const fontSecondary = Enum.Font.GothamSemibold;
    export const fontNormal = Enum.Font.Gotham;
}

export default Theme;
